import Ball from 'shared/components/ball';
import Player from 'shared/components/player';
import Globals from 'shared/globals';

export function calculateDistance(ball: Ball, player: Player): number {
  return Math.round(Math.sqrt(
    Math.abs(player.x.value - ball.x.value) ** 2
      + Math.abs(player.y.value - ball.y.value) ** 2,
  ));
}

export function calculateY(ball: Ball, player: Player): number {
  return Math.round(
    Math.sqrt(
      (Globals.BALL_RADIUS + Globals.PLAYER_RADIUS) ** 2
        - Math.abs(player.x.value - ball.x.value) ** 2,
    ),
  );
}

export function calculateX(ball: Ball, player: Player): number {
  return Math.round(
    Math.sqrt(
      (Globals.BALL_RADIUS + Globals.PLAYER_RADIUS) ** 2
        - Math.abs(player.y.value - ball.y.value) ** 2,
    ),
  );
}
