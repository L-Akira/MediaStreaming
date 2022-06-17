import { ReadStream } from 'fs';

export interface IVideoProcessResult {
  start: number,
  end: number,
  contentLength: number,
  videoSize: number,
  videoStreamChunk: ReadStream,
}
