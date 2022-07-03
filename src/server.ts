import http from 'http';
import { Socket } from 'net';
import app from './app';

class Server {
  private PORT: number;

  private server: http.Server;

  private connections: Socket[];

  constructor() {
    this.PORT = process.env.PORT;
    this.connections = [];
  }

  public startUp(): void {
    const server = app.listen(this.PORT, () => {
      console.log(`🤖 Server started at ${this.PORT}`);
    });
    this.server = server;
    this.keepTrackOfConnections();
    process.on('SIGTERM', this.shutDown.bind(this));
    process.on('SIGINT', this.shutDown.bind(this));
  }

  public shutDown(): void {
    console.log('Shutting server down');

    this.server.close(() => {
      console.log('Closing connections');
      process.exit(0);
    });

    setTimeout(
      () => process.exit(1),
      process.env.TIMEOUT_TO_CUT_FORCE_SHUTDOWN_SEC * 1e3,
    );

    this.connections.forEach((current) => current.end());
    setTimeout(
      () => this.connections.forEach((current) => current.destroy()),
      process.env.TIMEOUT_TO_CUT_CONNECTIONS_SEC * 1e3,
    );
  }

  private keepTrackOfConnections() {
    this.server.on('connection', (connection) => {
      this.connections.push(connection);
      connection.on('close', () => {
        this.connections = this.connections.filter((current) => current !== connection);
      });
    });
  }
}

export default Server;
