import express, { Express } from 'express';
import cors from 'cors';
import htmlRouter from './infrastructure/routes/htmlRoute';
import videoRouter from './infrastructure/routes/videoRoute';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.express.use('/html', htmlRouter);
    this.express.use('/api', videoRouter);
  }

  private middlewares() {
    this.express.use(cors());
  }
}

export default new App().express;
