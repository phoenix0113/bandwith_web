import { FeaturedRecording } from "../models";
import { BlockRecordingResponse, UpdateRecordingResponse } from "../../../client/src/shared/interfaces";

export class FeaturedService {
  static async getFeaturedRecordingsByID({
    _id : _id,
  }): Promise<BlockRecordingResponse> {
    const ids: Array<string> = [];
    const recordings = await FeaturedRecording.find({
      user: _id
    });

    recordings.map(async (recordItem) => {
      ids.push(recordItem.callrecording);
    });

    return { ids: ids };
  }

  static async addFeatured({
    callrecording: callrecording,
    user: user,
  }): Promise<UpdateRecordingResponse> {

    const rec = new FeaturedRecording({
      callrecording,
      user,
    });
    await rec.save();

    return { code: 200 };
  }

  static async removeFeatured({
     callrecording: callrecording,
     user: user,
   }): Promise<UpdateRecordingResponse> {

    const recording = await FeaturedRecording.findOne({
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
