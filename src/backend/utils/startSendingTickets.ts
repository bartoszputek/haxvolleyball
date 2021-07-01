import Room from 'backend/components/room';
import WorldUpdater from 'shared/components/worldUpdater';
import Globals from 'shared/globals';
import { Server } from 'socket.io';
import handleQueues from './handleQueues';

export default function startSendingTickets(room: Room, io: Server) {
  room.worldUpdater = new WorldUpdater();
  const { worldUpdater, gameState } = room;
  worldUpdater.gameState = gameState;

  let tickId = 1;

  setInterval(() => {
    const queues = handleQueues(room);

    worldUpdater.updateWorld();

    const hostId = gameState.getPlayers()[0].id;
    const joinId = gameState.getPlayers()[1].id;
    io.to(hostId).emit('processTick', tickId, gameState, queues[1]);
    io.to(joinId).emit('processTick', tickId, gameState, queues[0]);
    tickId += 1;
  }, Globals.TIME_STEP);
}
