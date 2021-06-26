import Room from 'backend/components/room';
import { Action } from 'shared/types';
import deserializePlayerActions from 'shared/utils/deserializePlayerActions';

export default function handleQueues(room: Room) {
  const { worldUpdater, gameState } = room;
  const queues:Action[][] = [];
  gameState.getPlayers().forEach((player) => {
    const queue = room.queues.get(player.id);
    if (queue) {
      const actions = deserializePlayerActions(player, queue);
      worldUpdater.mergeActions(actions);
      queues.push(queue);
    }
  });
  return queues;
}
