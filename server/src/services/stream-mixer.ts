import {
  ACTION,
  API_OPERATION,
  CloudApi,
  EVENT,
  MediasoupSocketApi,
  MIXER_PIPE_TYPE,
  MIXER_RENDER_TYPE,
  MixerAddAudioData,
  MixerAddVideoData,
  MixerCreateOptions,
  MixerInput,
  MixerOptions,
  MixerPipeRtmpData,
  MixerPipeStopInput,
  MixerRemoveData,
  MixerUpdateData,
} from 'avcore';
import { MediaKind } from 'mediasoup-client/lib/RtpParameters';
import { LAYOUT } from '../../../client/src/shared/socket';
import { CallRecordingService } from '../services';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface AddCommand {
  action: ACTION.MIXER_ADD;
  data: Omit<MixerAddVideoData, 'mixerId'> | Omit<MixerAddAudioData, 'mixerId'>;
}
interface UpdateCommand {
  action: ACTION.MIXER_UPDATE;
  data: Omit<MixerUpdateData, 'mixerId'>;
}
interface RemoveCommand {
  action: ACTION.MIXER_REMOVE;
  data: Omit<MixerRemoveData, 'mixerId'>;
}
interface StartRtmpCommand {
  action: ACTION.MIXER_PIPE_START;
  data: Omit<MixerPipeRtmpData, 'mixerId'>;
}
interface StopRtmpCommand {
  action: ACTION.MIXER_PIPE_STOP;
  data: Omit<MixerPipeStopInput, 'mixerId'>;
}
type MixerCommand =
  | AddCommand
  | UpdateCommand
  | RemoveCommand
  | StartRtmpCommand
  | StopRtmpCommand;
export class StreamMixer {
  readonly kinds: MediaKind[];
  // private readonly padding: number = 0;
  private layout: LAYOUT = LAYOUT.GRID_1;
  private mixerId: string;
  private rtmpPipeId: string | undefined;
  private readonly width: number;
  private readonly height: number;
  private readonly frameRate?: number;
  private readonly audioSampleRate?: number;
  private readonly audioChannels?: number;
  private cloudApi: CloudApi;
  private api: MediasoupSocketApi;
  private readonly queue: MixerCommand[] = [];
  private streamsMap: { [x: string]: number } = {};
  private readonly layoutOptions: {
    [x: string]: MixerOptions | undefined;
  } = {};
  pipeId: string;
  callId: string;
  constructor(
    cloudApi: CloudApi,
    {
      width = 400,
      height = 800,
      audioSampleRate,
      frameRate,
      audioChannels,
    }: MixerCreateOptions,
    kinds: MediaKind[] = ['video', 'audio']
  ) {
    this.cloudApi = cloudApi;
    this.kinds = kinds;
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.audioSampleRate = audioSampleRate;
    this.audioChannels = audioChannels;
  }
  async init(stream: string): Promise<string> {
    const api = await this.cloudApi.create(API_OPERATION.MIXER);
    const { width, height, frameRate, audioSampleRate, audioChannels } = this;
    const { mixerId } = await api.mixerStart({
      width,
      height,
      frameRate,
      audioSampleRate,
      audioChannels,
    });
    this.mixerId = mixerId;
    api.client.on(EVENT.MIXER_STOPPED, async ({ mixerId }: MixerInput) => {
      if (mixerId === this.mixerId) {
        await this.close();
      }
    });
    await api.listenMixerStopped({ mixerId });
    await api.mixerPipeStart({
      stream,
      mixerId,
      type: MIXER_PIPE_TYPE.LIVE,
      kinds: this.kinds,
    });

    this.callId = stream;
    this.api = api;
    await Promise.all(this.queue.map((json) => this.command(json)));
    this.queue.splice(0, this.queue.length);
    return mixerId;
  }
  async add(stream, kind): Promise<void> {
    if (this.kinds.includes(kind)) {
      if (kind === 'video') {
      } else {
        await this.command({
          action: ACTION.MIXER_ADD,
          data: { kind, stream },
        });
      }
    }
  }

  getMixerId() {
    return this.mixerId;
  }

  async remove(stream, kind): Promise<void> {
    if (this.kinds.includes(kind)) {
      if (kind === 'video' && stream in this.layoutOptions) {
        delete this.layoutOptions[stream];
      }
      await this.command({
        action: ACTION.MIXER_REMOVE,
        data: { kind, stream },
      });
    }
  }
  async startRtmp(url: string): Promise<void> {
    if (!this.rtmpPipeId) {
      await this.command({
        action: ACTION.MIXER_PIPE_START,
        data: { type: MIXER_PIPE_TYPE.RTMP, url, kinds: this.kinds },
      });
    }
  }
  async stopRtmp(): Promise<void> {
    const pipeId = this.rtmpPipeId;
    if (pipeId) {
      delete this.rtmpPipeId;
      await this.command({ action: ACTION.MIXER_PIPE_STOP, data: { pipeId } });
    }
  }
  async setLayout(
    layout: LAYOUT,
    streamsMap?: { [x: string]: number }
  ): Promise<void> {
    this.layout = layout;
    if (streamsMap) {
      for (const stream in this.streamsMap) {
        const old = this.layoutOptions[stream];
        if (!(stream in streamsMap) && old) {
          const options = this.layoutItem(-1);
          if (!StreamMixer.itemEqual(old, options)) {
            await this.command({
              action: ACTION.MIXER_UPDATE,
              data: { stream, options },
            });
            this.layoutOptions[stream] = options;
          }
        }
      }
      this.streamsMap = streamsMap;
    }
    await this.updateLayout();
  }
  async command(json: MixerCommand): Promise<void> {
    if (this.api && this.mixerId) {
      switch (json.action) {
        case ACTION.MIXER_ADD: {
          await this.api.mixerAdd({ ...json.data, mixerId: this.mixerId });
          break;
        }
        case ACTION.MIXER_UPDATE: {
          await this.api.mixerUpdate({ ...json.data, mixerId: this.mixerId });
          break;
        }
        case ACTION.MIXER_REMOVE: {
          await this.api.mixerRemove({ ...json.data, mixerId: this.mixerId });
          break;
        }
        case ACTION.MIXER_PIPE_START: {
          const { pipeId } = await this.api.mixerPipeStart({
            ...json.data,
            mixerId: this.mixerId,
          });
          this.rtmpPipeId = pipeId;
          break;
        }
        case ACTION.MIXER_PIPE_STOP: {
          await this.api.mixerPipeStop({ ...json.data, mixerId: this.mixerId });
          break;
        }
      }
    } else {
      console.log('queued', json.action);
      this.queue.push(json);
    }
  }
  async close(): Promise<void> {
    if (this.api) {
      const mixerId = this.mixerId;
      delete this.mixerId;
      if (mixerId) {
        console.log(`_MIXER_ await this.api.mixerClose({mixerId:${mixerId})`);
        await this.api.mixerClose({ mixerId });
      }
      this.api.clear();
    }
  }
  layoutItem(
    num: number,
    renderType: MIXER_RENDER_TYPE = MIXER_RENDER_TYPE.CROP
  ): MixerOptions {
    if (num >= 0) {
      const z = 0;
      if (this.layout === LAYOUT.GRID_1) {
        return {
          x: 0,
          y: 0,
          width: this.width,
          height: this.height / 2,
          z,
          renderType,
        };
      }

      if (this.layout === LAYOUT.GRID_2) {
        return {
          x: 0,
          y: (this.height / 2) * num,
          width: this.width,
          height: this.height / 2,
          z,
          renderType,
        };
      }
    }
    return { x: 0, y: 0, width: 32, height: 32, z: -1, renderType };
  }

  static itemEqual(a: MixerOptions, b: MixerOptions): boolean {
    return (
      a.height === b.height &&
      a.width === b.width &&
      a.x === b.x &&
      a.y === b.y &&
      a.z === b.z &&
      a.renderType === b.renderType
    );
  }
  async updateLayout(): Promise<void> {
    for (const stream in this.streamsMap) {
      const options = this.layoutItem(
        this.streamsMap[stream],
        // currently streams' names doesn't use _webcam suffix, so use crop everywhere
        // stream.endsWith('_webcam')
        //   ? MIXER_RENDER_TYPE.CROP
        //   : MIXER_RENDER_TYPE.SCALE
        MIXER_RENDER_TYPE.CROP
      );

      const old = this.layoutOptions[stream];
      this.layoutOptions[stream] = options;
      if (
        options.width + options.x > this.width ||
        options.height + options.y > this.height
      ) {
        console.error(
          '__MIXER__',
          LAYOUT[this.layout],
          this.streamsMap[stream],
          options
        );
      }
      if (old) {
        if (!StreamMixer.itemEqual(old, options)) {
          await this.command({
            action: ACTION.MIXER_UPDATE,
            data: { stream, options },
          });
        }
      } else {
        await this.command({
          action: ACTION.MIXER_ADD,
          data: { kind: 'video', stream, options },
        });
      }
    }
  }

  async saveCallRecord() {
    await CallRecordingService.createCallRecording({
      pipeId: this.pipeId,
      callId: this.callId,
    });
  }

  async changeLayout(layout: LAYOUT, streamsMap?: { [x: string]: number }) {
    this.layout = layout;

    for (const stream in streamsMap) {
      const options = this.layoutItem(
        streamsMap[stream],
        // currently streams' names doesn't use _webcam suffix, so use crop everywhere
        // stream.endsWith('_webcam')
        //   ? MIXER_RENDER_TYPE.CROP
        //   : MIXER_RENDER_TYPE.SCALE
        MIXER_RENDER_TYPE.CROP
      );

      const old = this.layoutOptions[stream];
      this.layoutOptions[stream] = options;
      if (
        options.width + options.x > this.width ||
        options.height + options.y > this.height
      ) {
        console.error(
          '__MIXER__',
          LAYOUT[this.layout],
          this.streamsMap[stream],
          options
        );
      }
      if (old) {
        if (!StreamMixer.itemEqual(old, options)) {
          await this.command({
            action: ACTION.MIXER_UPDATE,
            data: { stream, options },
          });
        }
      } else {
        await this.command({
          action: ACTION.MIXER_ADD,
          data: { kind: 'video', stream, options },
        });
      }
    }
  }

  async startRecording() {
    const { pipeId } = await this.api.mixerPipeStart({
      mixerId: this.mixerId,
      type: MIXER_PIPE_TYPE.RECORDING,
      kinds: this.kinds,
    });
    this.pipeId = pipeId;
  }
}
