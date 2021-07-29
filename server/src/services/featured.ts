import { FeaturedRecording } from "../models";
import {
  BlockRecordingResponse, UpdateRecordingResponse, Document, CreateBlockRecordingRequest,
  BasicResponse,
} from "../../../client/src/shared/interfaces";

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

  static async checkFeaturedRecording({ _id }: Document): Promise<UpdateRecordingResponse> {
    try {
      const featuredrecordings = await FeaturedRecording.find({
        callrecording: _id
      });

      return { code: featuredrecordings.length };
    } catch (err) {
      throw err;
    }
  }

  static async updateFeaturedRecording({
    user: user,
    callrecording: callrecording,
  }: CreateBlockRecordingRequest): Promise<BasicResponse> {
    try {
      const featuredrecording = await FeaturedRecording.findOne({
        user: user,
        callrecording: callrecording
      });

      let status = false;
      
      if(featuredrecording) {
        await this.removeFeatured({
          user: user,
          callrecording: callrecording,
        });
      } else {
        await this.addFeatured({
          user: user,
          callrecording: callrecording,
        });
        status = true;
      }

      return { success: status };
    } catch (err) {
      throw err;
    }
  }

  static async getFeaturedRecording({
    user: user,
    callrecording: callrecording,
  }: CreateBlockRecordingRequest): Promise<BasicResponse> {
    try {
      const featuredrecording = await FeaturedRecording.findOne({
        user: user,
        callrecording: callrecording
      });

      let status = false;

      if (featuredrecording) {
        status = true;
      }

      return { success: status };
    } catch (err) {
      throw err;
    }
  }
}
