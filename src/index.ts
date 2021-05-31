import express from 'express';
import http from 'http';
import path from 'path';
import { Socket } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '../public')));

const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
});

httpServer.listen(8080);

app.get('/', (req, res) => {
  console.log('Homepage');
  res.render('index');
});
