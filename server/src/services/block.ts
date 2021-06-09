import { BlockRecording } from "../models";
import { BlockRecordingResponse, UpdateRecordingResponse } from "../../../client/src/shared/interfaces";

export class BlockService {
  static async getBlockRecordingsByID({
    _id : _id,
  }): Promise<BlockRecordingResponse> {
    const ids: Array<string> = [];
    const recordings = await BlockRecording.find({
      user: _id
    });

    recordings.map(async (recordItem) => {
      ids.push(recordItem.callrecording);
    });

    return { ids: ids };
  }

  static async addBlock({
    callrecording: callrecording,
    user: user,
  }): Promise<UpdateRecordingResponse> {

    const rec = new BlockRecording({
      callrecording,
      user,
    });
    await rec.save();

    return { code: 200 };
  }

  static async removeBlock({
    callrecording: callrecording,
    user: user,
  }): Promise<UpdateRecordingResponse> {

    const recording = await BlockRecording.findOne({
      callrecording: callrecording,
      user: user,
    });

    if (!recording) {
      throw { status: 400, message: 'Recording not found' };
    }

    await recording.remove();

    return { code: 200 };
  }
}
