import Player from 'shared/components/player';
import { Command } from 'shared/types';

export default function deserializePlayerAction(player: Player,
  command:Command, args: any):(() => void) | undefined {
  if (command === Command.PlayerMove) {
    return () => player.move(args);
  }
  if (command === Command.PlayerStop) {
    return () => player.stop(args);
  }
  return undefined;
}
