import http from 'http';
import app from './app';

class Server {
  private PORT: number;

  private server: http.Server;

  constructor() {
    this.PORT = +process.env.PORT;
  }

  public startUp(): void {
    const server = app.listen(this.PORT, () => {
      console.log(`🤖 Server started at ${this.PORT}`);
    });

    this.server = server;
    process.on('SIGTERM', this.shutDown.bind(this));
    process.on('SIGINT', this.shutDown.bind(this));
  }

  public shutDown(): void {
    console.log('Shutting server down');

    this.server.close(() => {
      console.log('Closing connections');
      process.exit(0);
    });
  }
}

export default Server;
