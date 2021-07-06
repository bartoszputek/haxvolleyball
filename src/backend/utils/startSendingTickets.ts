import Room from 'backend/components/room';
import handleQueues from 'backend/utils/handleQueues';
import WorldUpdater from 'shared/components/worldUpdater';
import Globals from 'shared/globals';
import { Server } from 'socket.io';

export default function startSendingTickets(room: Room, io: Server): void {
  room.worldUpdater = new WorldUpdater();
  const { worldUpdater, gameState } = room;
  worldUpdater.gameState = gameState;

  let tickId = 1;

  room.interval = setInterval(() => {
    const hostId = gameState.getPlayers()[0].id;
    const joinId = gameState.getPlayers()[1].id;

    const queues = handleQueues(room);

    worldUpdater.updateWorld();

    const score = room.metagame.checkScore();

    if (score) {
      io.to(hostId).emit('getScore', score);
      io.to(joinId).emit('getScore', score);
    }

    io.to(hostId).emit('processTick', tickId, gameState, queues[1]);
    io.to(joinId).emit('processTick', tickId, gameState, queues[0]);
    tickId += 1;
  }, Globals.TIME_STEP);
}
