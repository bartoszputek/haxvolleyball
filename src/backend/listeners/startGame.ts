import Room from 'backend/components/room';
import GameStateFactory from 'shared/components/gameStateFactory';
import WorldUpdater from 'shared/components/worldUpdater';
import Globals from 'shared/globals';
import { Socket } from 'socket.io';

export default function startGame(socket: Socket, rooms: Room[]) {
  socket.on('startGame', () => {
    const gameState = GameStateFactory.createNewGameState(socket.id);
    const worldUpdater = new WorldUpdater();
    worldUpdater.gameState = gameState;
    const room = new Room(socket.id, gameState);
    rooms.push(room);

    socket.join(socket.id);

    let tickId = 1;
    socket.emit('setGamestate', gameState, tickId);
    setInterval(() => {
      worldUpdater.updateWorld();
      // console.log(gameState.getPlayers()[1]);
      socket.emit('processTick', tickId, gameState.getPlayers()[0]);
      // socket.broadcast.emit('processTick', i, gameState.getPlayers()[0]);
      // socket.to(socket.id).emit('processTick', i, gameState.getPlayers()[1]);
      tickId += 1;
    }, Globals.TIME_STEP);
  });
}
