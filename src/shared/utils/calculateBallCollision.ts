import Ball from 'shared/components/ball';
import Player from 'shared/components/player';
import Globals from 'shared/globals';

function calculateBallAcceleration(ball: Ball): void {
  if (ball.acc_y + Globals.BALL_STEP_ACCELERATION > Globals.BALL_MAX_ACCELERATION) {
    ball.acc_y = Globals.BALL_MAX_ACCELERATION;
  } else {
    ball.acc_y += Globals.BALL_STEP_ACCELERATION;
  }

  if (ball.acc_x > 0) {
    ball.acc_x -= 0.002;
  } else if (ball.acc_x < 0) {
    ball.acc_x += 0.002;
  }
}

export default function calculateBallCollision(ball: Ball, player: Player): void {
  calculateBallAcceleration(ball);
  const delta = Globals.TIME_STEP;

  let distance = Math.round(ball.acc_y * delta);
  if (distance + ball.y.value + Globals.BALL_RADIUS > Globals.CANVAS_HEIGHT) {
    // floor
    ball.y.value = Globals.CANVAS_HEIGHT - Globals.BALL_RADIUS;
  } else if (distance + ball.y.value < Globals.BALL_RADIUS) {
    // ceiling
    ball.y.value = Globals.BALL_RADIUS;
    ball.acc_y *= -1;
  }

  distance = Math.round(ball.acc_x * delta);
  if (distance + ball.x.value < Globals.BALL_RADIUS) {
    // left border
    ball.x.value = Globals.BALL_RADIUS;
    ball.acc_x *= -1;
  } else if (distance + ball.x.value + Globals.BALL_RADIUS > Globals.CANVAS_WIDTH) {
    // right border
    ball.x.value = Globals.CANVAS_WIDTH - Globals.BALL_RADIUS;
    ball.acc_x *= -1;
  }

  const player1 = calculateDistance(ball, player);
  if (player1 <= Globals.BALL_RADIUS + Globals.PLAYER_RADIUS) {
    const x = player.x.value;
    if (x < ball.x.value - Globals.BALL_RADIUS / 2) {
      // left
      ball.acc_y = -0.4;
      ball.acc_x = 0.4;
      ball.y.value += Math.round(ball.acc_y * delta);
      ball.x.value += Math.round(ball.acc_x * delta);
    } else if (x > ball.x.value + Globals.BALL_RADIUS / 2) {
      // right
      ball.acc_y = -0.4;
      ball.acc_x = -0.4;
      ball.y.value += Math.round(ball.acc_y * delta);
      ball.x.value += Math.round(ball.acc_x * delta);
    } else {
      ball.acc_y = -0.4;
      ball.y.value += Math.round(ball.acc_y * delta);
      ball.x.value += Math.round(ball.acc_x * delta);
    }
  } else {
    ball.y.value += Math.round(ball.acc_y * delta);
    ball.x.value += Math.round(ball.acc_x * delta);
  }
}

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
