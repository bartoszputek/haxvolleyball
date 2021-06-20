import Player from 'shared/components/player';
import { Action } from 'shared/types';
import deserializePlayerAction from 'shared/utils/deserializePlayerAction';

export default function deserializePlayerActions(player: Player,
  actions:[Action, any][]):(() => void)[] {
  const queue:(() => void)[] = [];
  actions.forEach((action) => {
    const serializedAction = deserializePlayerAction(player, action[0], action[1]);
    if (serializedAction) {
      queue.push(serializedAction);
    }
  });
  return queue;
}
