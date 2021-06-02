import express from 'express';
import http from 'http';
import path from 'path';
import { Vector } from 'shared/types';
import { Socket } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../../public')));

const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket: Socket) => {
  socket.on('startGame', () => {
    // players = [];
    // const player: Player = new Player(socket.id, 100, 120, Team.Red);
    // players.push(player);
    // const t = player.parse();
    // socket.emit('get', t);
  });

  socket.on('move', (playerId: string, vector: Vector) => {
    console.log('move');
    // players.forEach((player) => {
    //   if (player.id === playerId) {
    //     player.move(vector);
    //     player.updatePosition();
    //   }
    // });
  });

  socket.on('stop', (playerId: string, vector: Vector) => {
    console.log('move');
    // players.forEach((player) => {
    //   if (player.id === playerId) {
    //     player.stop(vector);
    //     player.updatePosition();
    //   }
    // });
  });

  socket.on('siedem', () => {
    // if (players[0]) {
    //   const t = players[0].parse();
    //   // console.log(t);
    //   socket.emit('dwa', t);
    // }
  });
});

httpServer.listen(8080);

app.get('/', (req, res) => {
  console.log('Homepage');
  res.render('index');
});
