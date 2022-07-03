import fs from 'fs';
import { IVideoProcessResult } from '../types/VideoProcessing';

class VideoService {
  public async getVideo(range: string): Promise<IVideoProcessResult> {
    const videoStat = fs.promises.stat(this.resolveVideoPath(process.env.VIDEO_NAME));
    const start = this.getRangeStart(range);
    const videoSize = (await videoStat).size;

    const end = this.getRangeEnd(
      start,
      process.env.CHUNK_SIZE_MB,
      videoSize,
    );

    const videoStreamChunk = fs.createReadStream(
      this.resolveVideoPath(process.env.VIDEO_NAME),
      { start, end },
    );

    return {
      start,
      end,
      contentLength: end - start + 1,
      videoSize,
      videoStreamChunk,
    };
  }

  private getRangeStart(range: string): number {
    return +range.split('-')[0].split('=')[1];
  }

  private getRangeEnd(start: number, chunkSize: number, videoSize: number) {
    return Math.min(start + (chunkSize * 1e6), videoSize - 1);
  }

  private resolveVideoPath(videoName: string) {
    return `./videos/${videoName}.mp4`;
  }
}

export default new VideoService();
