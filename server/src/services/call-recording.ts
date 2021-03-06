import { spawn } from 'child_process';
import { dir } from 'tmp-promise';
import { CloudApi, API_OPERATION, ListRecordingItem } from 'avcore';
import { CallRecording, ICallRecording } from '../models';
import {
  CreateCallRecordingRequest,
  Document,
  PipeId,
  PublishRecordingRequest,
  GetRecordResponse,
  GetAllRecordsQuery,
  GetAllRecordsResponse,
  ReportRequest,
  GetAllRecordingID,
  DeleteCallRecordingRequest,
} from '../../../client/src/shared/interfaces';
import { conf } from '../config';
import { CallInput } from '../../../client/src/shared/socket';
import { StorageHandler } from './storage';
import { FeaturedService } from './featured';

export class CallRecordingService {
  static cloudApi: CloudApi = new CloudApi(conf.cloud.url, conf.cloud.token);

  static async removeStreamRecords({ pipeId }: PipeId) {
    try {
      const api = await CallRecordingService.cloudApi.create(
        API_OPERATION.RECORDING
      );
      await api.deleteStreamRecordings({ stream: pipeId });
    } catch (err) {
      throw err;
    }
  }

  static async createCallRecording({
    pipeId,
    callId,
    status,
  }: CreateCallRecordingRequest) {
    try {
      const list = await CallRecordingService.getListRecordingByPipeId({
        pipeId,
      });

      const rec = new CallRecording({
        pipeId,
        list,
        callId,
        status,
        createDate: Date.now(),
        name: Date.now().toString(),
      });
      await rec.save();
      await CallRecordingService.replaceRecording(rec);
      await CallRecordingService.takeThumbnail(rec);

      return { _id: rec._id.toString() };
    } catch (err) {
      throw err;
    }
  }

  static async getListRecordingByPipeId({
    pipeId,
  }: PipeId): Promise<ListRecordingItem[]> {
    const api = await CallRecordingService.cloudApi.create(
      API_OPERATION.RECORDING
    );

    const { list } = await api.streamRecordings({ stream: pipeId });

    return list;
  }

  static async publishRecording(
    { callId, participants }: PublishRecordingRequest,
    user: string
  ) {
    try {
      const recording = await CallRecording.findOne({
        callId,
      });

      // Convert timestamp to milliseconds
      const date = new Date(Number(recording?.createDate));

      // Year
      const year = date.getFullYear().toString();

      // Month
      let month = "0";
      month += (date.getMonth() + 1).toString();

      // Day
      let day = "0";
      day += date.getDate().toString();

      // Hours
      let hours = "0";
      hours += date.getHours().toString();

      // Minutes
      let minutes = "0";
      minutes += date.getMinutes().toString();

      // Seconds
      let seconds = "0";
      seconds += date.getSeconds().toString();

      // Display date time in MM-dd-yyyy h:m:s format
      let formattedTime = month.substr(-2).toString();
      formattedTime += "-";
      formattedTime += day.substr(-2).toString();
      formattedTime += "-";
      formattedTime += year;
      formattedTime += " ";
      formattedTime += hours.substr(-2).toString();
      formattedTime += ":";
      formattedTime += minutes.substr(-2).toString();
      formattedTime += ":";
      formattedTime += seconds.substr(-2).toString();

      const rec = await CallRecording.findOneAndUpdate(
        { callId },
        {
          $set: {
            user,
            participants,
            name: formattedTime,
            authorList: [user, participants[0]],
          },
        },
        {
          new: true,
        }
      );

      return { _id: rec?._id.toString() };
    } catch (err) {
      throw err;
    }
  }

  static async removeRecordingFromStorage(filePath: string) {
    const api = await CallRecordingService.cloudApi.create(
      API_OPERATION.RECORDING
    );

    await api.deleteRecording({ filePath });
  }

  static async takeThumbnail(rec: ICallRecording): Promise<void> {
    try {
      const recordingSignedUrl = rec.list[0].url;

      const d = await dir({ unsafeCleanup: true });
      const tempOutput = `${d.path}/out.jpg`;
      const [fileName] = rec.list[0].fullKey.split('.');
      let thName = fileName.split('/');
      thName[0] = conf.thumbnailPath;

      const options = [
        '-i',
        recordingSignedUrl,
        '-vf',
        "select='eq(n\\,34)'",
        '-vframes',
        '1',
        tempOutput,
      ];

      await CallRecordingService.excecuteProc(conf.ffmpeg.path, options);

      const key = `${thName.join('/')}.jpg`;
      await StorageHandler.get().upload(tempOutput, key, 'image/jpg');
      d.cleanup();

      rec.thumbnail = `${conf.storage.endpoint}/${conf.storage.bucket}/${key}`;

      await rec.save();
    } catch (err) {
      throw err;
    }
  }

  static async replaceRecording(rec: ICallRecording) {
    const { list } = rec;

    const [fileName] = list[0].fullKey.split('.');
    const mkvToRemove = list[0].key;

    const d = await dir({ unsafeCleanup: true });
    const tempOutput = `${d.path}/out.mp4`;

    await CallRecordingService.convertToMp4(list[0].url, tempOutput);

    await StorageHandler.get().upload(
      tempOutput,
      `${fileName}.mp4`,
      'video/mp4'
    );
    d.cleanup();

    await CallRecordingService.removeRecordingFromStorage(mkvToRemove);

    const list1 = await CallRecordingService.getListRecordingByPipeId({
      pipeId: rec.pipeId,
    });
    list1[0].url = list1[0].url.split('?')[0];

    rec.list = list1;
    await rec.save();
  }

  static async convertToMp4(input: string, output: string) {
    const options: string[] = [
      '-ss',
      conf.ffmpeg.recordCutTime,
      '-i',
      input,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      output,
    ];

    await CallRecordingService.excecuteProc(conf.ffmpeg.path, options);
  }

  static async excecuteProc(ffmpeg: string, options: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const p = spawn(ffmpeg, options, {
        detached: false,
      });

      console.log(`${p.pid}:`, conf.ffmpeg.path, options.join(' '));
      // p.stderr.pipe(
      //   createWriteStream(`/root/server/logs/${Date.now()}_${p.pid}.log`)
      // );

      p.on('error', (err) => {
        console.error(err);
        reject(err);
      });

      p.on('exit', () => {
        resolve();
      });
    });
  }

  static async getRecordingById({ _id }: Document): Promise<GetRecordResponse> {
    const recording = await CallRecording.findById(_id)
      .populate({
        path: 'user',
        select: '-password -email -firebaseToken',
      })
      .populate({
        path: 'participants',
        select: '-password -email -firebaseToken',
      })
      .lean();

    if (!recording) {
      throw { status: 400, message: 'No such recording' };
    }

    return { ...JSON.parse(JSON.stringify(recording)) };
  }

  static async deleteRecording({ callId }: CallInput) {
    try {
      const record = await CallRecording.findOne({ callId });

      if (!record) {
        throw { status: 400, message: 'Recording not found' };
      }

      await record.remove();
    } catch (err) {
      throw err;
    }
  }

  // function for get new call recordings
  static async getNewRecords({
    limit,
    offset,
    key,
  }: GetAllRecordsQuery): Promise<GetAllRecordsResponse> {
    try {
      if (key === undefined) {
        key = '';
      }
      const recordings = await CallRecording.find({
        status: 'new',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      })
        .sort({
          _id: 'desc',
        })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      const all_recordings = await CallRecording.find({
        status: 'new',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      });

      const amount = all_recordings.length;

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }

  // function for get available call recordings
  static async getAvailableRecords({
    limit,
    offset,
    key,
  }: GetAllRecordsQuery): Promise<GetAllRecordsResponse> {
    try {
      if (key === undefined) {
        key = '';
      }
      const recordings = await CallRecording.find({
        status: 'public',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      })
        .sort({
          _id: 'desc',
        })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      const all_recordings = await CallRecording.find({
        status: 'public',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      });

      const amount = all_recordings.length;

      recordings.sort((a, b) =>
        FeaturedService.checkFeaturedRecording(a._id) >
        FeaturedService.checkFeaturedRecording(b._id)
          ? 1
          : -1
      );

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }

  // function for get blocked call recordings
  static async getBlockRecords({
    limit,
    offset,
    key,
  }: GetAllRecordsQuery): Promise<GetAllRecordsResponse> {
    try {
      if (key === undefined) {
        key = '';
      }
      const recordings = await CallRecording.find({
        status: 'block',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      })
        .sort({
          _id: 'desc',
        })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      const all_recordings = await CallRecording.find({
        status: 'block',
        name: { $regex: key, $options: 'i' },
        $where: 'this.list.length>0',
      });

      const amount = all_recordings.length;

      recordings.sort((a, b) =>
        FeaturedService.checkFeaturedRecording(a._id) >
        FeaturedService.checkFeaturedRecording(b._id)
          ? 1
          : -1
      );

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }

  static async getAllRecordings({
    limit,
    offset,
  }: GetAllRecordsQuery): Promise<GetAllRecordsResponse> {
    try {
      const amount = await CallRecording.countDocuments();

      const recordings = await CallRecording.find()
        .sort({ _id: 'desc', name: 'asc' })
        .skip((offset && +offset) || 0)
        .limit((limit && +limit) || 0)
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      recordings.sort((a, b) =>
        FeaturedService.checkFeaturedRecording(a._id) >
        FeaturedService.checkFeaturedRecording(b._id)
          ? 1
          : -1
      );

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }

  static async getAllRecordingID(): Promise<GetAllRecordingID> {
    try {
      const ids: Array<string> = [];
      const recordings = await CallRecording.find({
        status: { $in: ['public', 'feature'] },
      });

      await Promise.all(
        recordings.map((item) => {
          ids.push(item._id.toString());
        })
      );

      return { ids };
    } catch (err) {
      throw err;
    }
  }

  static async updateRecordingStatus({ _id, status }) {
    try {
      const recording = await CallRecording.findById(_id);
      if (!recording) {
        throw { status: 400, message: 'Recording not found' };
      }

      await CallRecording.findOneAndUpdate(
        { _id },
        { $set: { status } },
        {
          new: true,
        }
      );

      return { code: 200 };
    } catch (err) {
      throw err;
    }
  }

  static async sendReport({ id, email, title, body }: ReportRequest) {
    try {
      let api_key = process.env['MAILGUN_KEY'];
      let domain = process.env['MAILGUN_DOMAIN'];
      let mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

      let data = {
        from: email,
        to: process.env['MAIL_ADDRESS'],
        subject: title,
        text: 'https://app.bandwith.com/admin/video/' + id + ' ' + body,
      };

      mailgun.messages().send(data, function (error) {
        if (error) {
          throw error;
        }
      });

      return { code: 200 };
    } catch (err) {
      throw err;
    }
  }

  static async deleteRecord({
    recordId,
    authorId,
  }: DeleteCallRecordingRequest) {
    try {
      const recording = await CallRecording.findById(recordId);

      if (!recording) {
        throw { status: 400, message: 'Recording not found' };
      }

      if (recording.authorList?.length === 1) {
        await CallRecording.deleteOne({
          _id: recordId,
        });

        return { code: 200 };
      } else {
        if (recording.authorList?.[0] === authorId) {
          recording.authorList?.splice(0, 1);
        } else {
          recording.authorList?.splice(1, 1);
        }

        recording.save();
      }

      return { code: 200 };
    } catch (err) {
      throw err;
    }
  }

  static async getRecordingsByUserID({
    _id,
  }: Document): Promise<GetAllRecordsResponse> {
    try {
      const amount = await CallRecording.countDocuments();

      const recordings = await CallRecording.find({
        authorList: { $in: [_id] },
        status: 'public',
      })
        .sort({ _id: 'desc' })
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      recordings.sort((a, b) =>
        FeaturedService.checkFeaturedRecording(a._id) >
        FeaturedService.checkFeaturedRecording(b._id)
          ? 1
          : -1
      );

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }

  static async getAllRecordingsByUserID({
    _id,
  }: Document): Promise<GetAllRecordsResponse> {
    try {
      const amount = await CallRecording.countDocuments();

      const recordings = await CallRecording.find({
        authorList: { $in: [_id] },
      })
        .sort({ _id: 'desc' })
        .populate({
          path: 'user',
          select: '-password -email -firebaseToken',
        })
        .populate({
          path: 'participants',
          select: '-password -email -firebaseToken',
        });

      recordings.sort((a, b) =>
        FeaturedService.checkFeaturedRecording(a._id) >
        FeaturedService.checkFeaturedRecording(b._id)
          ? 1
          : -1
      );

      return { recordings: Object.assign([], recordings), amount };
    } catch (err) {
      throw err;
    }
  }
}
