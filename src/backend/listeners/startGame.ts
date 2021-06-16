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
    socket.emit('setGamestate', gameState);

    let i = 1;
    setInterval(() => {
      worldUpdater.updateWorld();
      socket.emit('processTick', i, gameState.getPlayers()[0]);
      i += 1;
    }, Globals.TIME_STEP);
  });
}
