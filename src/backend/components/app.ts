import express from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import Room from 'backend/components/room';
import joinGame from 'backend/listeners/joinGame';
import processActions from 'backend/listeners/processActions';
import createGame from 'backend/listeners/createGame';
import startSendingTickets from 'backend/utils/startSendingTickets';
import leaveGame from 'backend/listeners/leaveGame';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

export default class App {
  private httpServer: http.Server;

  private app: express.Application;

  private io!: Server;

  private rooms: Room[] = [];

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    dotenv.config();

    if (process.env.NODE_ENV === 'production') {
      this.app.use(compression());
      this.app.use(helmet());
    }
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../../../views'));
    this.app.use(express.static(path.join(__dirname, '../../../public')));

    this.setupSockets();
    this.setupRoutes();
  }

  private setupSockets() {
    const options = {
      /* ... */
    };

    this.io = new Server(this.httpServer, options);

    const onConnection = (socket: Socket) => {
      createGame(socket, this.rooms);
      joinGame(socket, this.rooms,
        (room: Room) => startSendingTickets(room, this.io));
      leaveGame(socket, this.rooms);
      processActions(socket, this.rooms);
    };

    this.io.on('connection', onConnection);
  }

  private setupRoutes() {
    this.app.get('/', (req, res) => {
      res.render('index');
    });

    this.app.use((req, res) => {
      res.render('index');
    });
  }

  listen(): void {
    this.httpServer.listen(8080);
  }
}
