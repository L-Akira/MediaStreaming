import { Request, Response } from 'express';
import { pipeline } from 'stream';
import videoService from '../../services/VideoService';

class VideoController {
  public async getVideo(req: Request, res: Response) {
    const { range } = req.headers;
    if (!range) {
      return res.status(400).json({ message: 'Required Range Header' });
    }
    const {
      start,
      end,
      contentLength,
      videoStreamChunk,
      videoSize,
    } = await videoService.getVideo(range);

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    });

    return pipeline(
      videoStreamChunk,
      res,
      (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        }
      },
    );
  }
}

export default new VideoController();
