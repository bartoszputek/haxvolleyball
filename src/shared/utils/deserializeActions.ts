import Player from 'shared/components/player';
import { Action, Entity } from 'shared/types';
import deserializePlayerAction from 'shared/utils/deserializePlayerAction';
import deserializeBallAction from 'shared/utils/deserializeBallAction';
import Ball from 'shared/components/ball';

export default function deserializeActions(player: Player, ball: Ball | undefined,
  actions:Action[]):(() => void)[] {
  const queue:(() => void)[] = [];
  actions.forEach((action) => {
    if (action.entity === Entity.Player) {
      const serializedAction = deserializePlayerAction(player, action.command, action.args);
      if (serializedAction) {
        queue.push(serializedAction);
      }
    }
    if (action.entity === Entity.Ball) {
      if (ball) {
        const serializedAction = deserializeBallAction(ball, action.command, action.args);
        if (serializedAction) {
          queue.push(serializedAction);
        }
      }
    }
  });
  return queue;
}
