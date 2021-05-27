import express from 'express';
import http from 'http';
import { Socket } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);

const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket: Socket) => {
  /* ... */
});

httpServer.listen(3000);

app.get('/', (req, res) => {
  console.log('Homepage');
  res.send('user ');
});
