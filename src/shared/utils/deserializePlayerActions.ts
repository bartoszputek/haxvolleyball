import Player from 'shared/components/player';
import { Action, Entity } from 'shared/types';
import deserializePlayerAction from 'shared/utils/deserializePlayerAction';

export default function deserializePlayerActions(player: Player,
  actions:Action[]):(() => void)[] {
  const queue:(() => void)[] = [];
  actions.forEach((action) => {
    if (action.entity === Entity.Player) {
      const serializedAction = deserializePlayerAction(player, action.command, action.args);
      if (serializedAction) {
        queue.push(serializedAction);
      }
    }
  });
  return queue;
}
