import { Request, Response } from 'express';
import path from 'path';

class HtmlController {
  public getVideoPage(req: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, '../../../assets/video.html'));
  }
}

export default new HtmlController();
