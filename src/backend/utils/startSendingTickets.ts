import Room from 'backend/components/room';
import WorldUpdater from 'shared/components/worldUpdater';
import Globals from 'shared/globals';
import { Server } from 'socket.io';

export default function startSendingTickets(room: Room, io: Server) {
  const gameState = room.getGameState();
  const worldUpdater = new WorldUpdater();
  worldUpdater.gameState = gameState;

  let tickId = 1;

  setInterval(() => {
    const { queue } = gameState.getPlayers()[0];
    worldUpdater.updateWorld();
    io.in(room.getId()).emit('processTick', tickId, gameState, queue);
    // socket.emit('processTick', tickId, gameState.getPlayers()[0]);
    // socket.broadcast.emit('processTick', i, gameState.getPlayers()[0]);
    // socket.to(socket.id).emit('processTick', i, gameState.getPlayers()[1]);
    tickId += 1;
  }, Globals.TIME_STEP);
}
