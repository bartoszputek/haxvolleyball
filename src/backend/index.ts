import express from 'express';
import http from 'http';
import path from 'path';
import { Socket } from 'socket.io';
import Room from 'backend/components/room';
import startGame from 'backend/listeners/startGame';
import joinGame from 'backend/listeners/joinGame';
import processActions from 'backend/listeners/processActions';

const app = express();
const httpServer = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../../public')));

const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

const rooms: Room[] = [];

const onConnection = (socket: Socket) => {
  startGame(socket, rooms);
  joinGame(socket, rooms, io);
  processActions(socket, rooms);
};

io.on('connection', onConnection);

httpServer.listen(8080);

app.get('/', (req, res) => {
  console.log('Homepage');
  res.render('index');
});
