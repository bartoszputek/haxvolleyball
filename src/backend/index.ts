import express from 'express';
import http from 'http';
import path from 'path';
import { Socket } from 'socket.io';
import Room from 'backend/components/room';
import GameState from 'shared/components/gameState';
import { SerializedGameState, Vector } from 'shared/types';
import GameStateFactory from 'shared/components/gameStateFactory';

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

io.on('connection', (socket: Socket) => {
  socket.on('startGame', (serializedGameState: SerializedGameState) => {
    const gameState = GameStateFactory.deserializeGameState(serializedGameState);
    rooms.push(new Room(socket.id, gameState));
  });

  socket.on('playerMove', (roomId: string, vector:Vector) => {
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      const selectedPlayer = selectedRoom.getGameState().getPlayers()
        .find((player) => player.id === socket.id);
      if (selectedPlayer) {
        console.log(selectedPlayer);
        selectedPlayer.move(vector);
      } else {
        console.log('The player doesn\'t exist in this room');
      }
    } else {
      console.log('The room no longer/never exist!');
    }
    socket.emit('hello', 'world');
  });

  socket.on('generateFrame', () => {
    // console.log('frame generating');
    socket.emit('eska', 1);
  });
});

httpServer.listen(8080);

app.get('/', (req, res) => {
  console.log('Homepage');
  res.render('index');
});
