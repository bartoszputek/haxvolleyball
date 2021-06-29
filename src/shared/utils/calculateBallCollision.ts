import Ball from 'shared/components/ball';
import Player from 'shared/components/player';
import Globals from 'shared/globals';
import { calculateDistance } from 'shared/utils/calculationHelpers';

export default function calculateBallCollision(ball: Ball, player: Player): void {
  calculateBallAcceleration(ball);
  calculateBallWallCollisionY(ball);
  calculateBallWallCollisionX(ball);
  calculateBallPlayerCollision(ball, player);
}

function calculateBallAcceleration(ball: Ball): void {
  if (ball.acc_y + Globals.BALL_STEP_ACCELERATION > Globals.BALL_MAX_ACCELERATION) {
    ball.acc_y = Globals.BALL_MAX_ACCELERATION;
  } else {
    ball.acc_y += Globals.BALL_STEP_ACCELERATION;
  }

  if (ball.acc_x > 0) {
    ball.acc_x -= Globals.BALL_STEP_ACCELERATION;
  } else if (ball.acc_x < 0) {
    ball.acc_x += Globals.BALL_STEP_ACCELERATION;
  }
}

function calculateBallWallCollisionY(ball: Ball): void {
  const delta = Globals.TIME_STEP;

  const distance = Math.round(ball.acc_y * delta);
  if (distance + ball.y.value + Globals.BALL_RADIUS > Globals.CANVAS_HEIGHT) {
    // floor
    ball.y.value = Globals.CANVAS_HEIGHT - Globals.BALL_RADIUS;
  } else if (distance + ball.y.value < Globals.BALL_RADIUS) {
    // ceiling
    ball.y.value = Globals.BALL_RADIUS;
    ball.acc_y *= -1;
  }
}

function calculateBallWallCollisionX(ball: Ball): void {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(ball.acc_x * delta);
  if (distance + ball.x.value < Globals.BALL_RADIUS) {
    // left border
    ball.x.value = Globals.BALL_RADIUS;
    ball.acc_x *= -1;
  } else if (distance + ball.x.value + Globals.BALL_RADIUS > Globals.CANVAS_WIDTH) {
    // right border
    ball.x.value = Globals.CANVAS_WIDTH - Globals.BALL_RADIUS;
    ball.acc_x *= -1;
  }
}

function calculateBallPlayerCollision(ball: Ball, player: Player): void {
  const playerDistance = calculateDistance(ball, player);
  if (playerDistance <= Globals.BALL_RADIUS + Globals.PLAYER_RADIUS) {
    const x = player.x.value;
    const y = player.y.value;
    if (x < ball.x.value - Globals.BALL_RADIUS / 2) {
      ball.acc_x = Globals.BALL_PLAYER_ACCELERATION;
    } else if (x > ball.x.value + Globals.BALL_RADIUS / 2) {
      ball.acc_x = -1 * Globals.BALL_PLAYER_ACCELERATION;
    }
    if (y < ball.y.value - Globals.BALL_RADIUS / 2) {
      ball.acc_y = Globals.BALL_PLAYER_ACCELERATION;
    } else if (y > ball.y.value + Globals.BALL_RADIUS / 2) {
      ball.acc_y = -1 * Globals.BALL_PLAYER_ACCELERATION;
    }
  }
}

export function calculateBallMove(ball: Ball):void {
  const delta = Globals.TIME_STEP;
  ball.y.value += Math.round(ball.acc_y * delta);
  ball.x.value += Math.round(ball.acc_x * delta);
}
