import Player from 'shared/components/player';
import { Action } from 'shared/types';

export default function deserializePlayerAction(player: Player,
  action:Action, args: any):(() => void) | undefined {
  if (action === Action.Move) {
    return () => player.move(args);
  }
  if (action === Action.Stop) {
    return () => player.stop(args);
  }
  return undefined;
}
