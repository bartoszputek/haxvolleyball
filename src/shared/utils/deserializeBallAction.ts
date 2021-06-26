import Ball from 'shared/components/ball';
import { Command } from 'shared/types';

export default function deserializeBallAction(ball: Ball,
  command:Command, args: any):(() => void) | undefined {
  if (command === Command.BallMove) {
    return () => ball.move(args);
  }
  if (command === Command.BallStop) {
    return () => ball.stop(args);
  }
  return undefined;
}
