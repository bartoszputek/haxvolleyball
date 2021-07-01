import Ball from 'shared/components/ball';
import Net from 'shared/components/net';
import Player from 'shared/components/player';
import Globals from 'shared/globals';
import { calculateDistance } from 'shared/utils/calculationHelpers';

export default function calculateBallCollision(ball: Ball, player: Player, net: Net): void {
  calculateBallAcceleration(ball);
  calculateBallWallCollisionY(ball);
  calculateBallWallCollisionX(ball);
  calculateBallPlayerCollision(ball, player);
  calculateBallNetCollision(ball, net);
}

function calculateBallAcceleration(ball: Ball): void {
  if (ball.accY + Globals.BALL_STEP_ACCELERATION > Globals.BALL_MAX_ACCELERATION) {
    ball.accY = Globals.BALL_MAX_ACCELERATION;
  } else {
    ball.accY += Globals.BALL_STEP_ACCELERATION;
  }

  if (ball.accX > 0) {
    ball.accX -= Globals.BALL_STEP_ACCELERATION;
  } else if (ball.accX < 0) {
    ball.accX += Globals.BALL_STEP_ACCELERATION;
  }
}

function calculateBallWallCollisionY(ball: Ball): void {
  const delta = Globals.TIME_STEP;

  const distance = Math.round(ball.accY * delta);
  if (distance + ball.y.value + Globals.BALL_RADIUS > Globals.CANVAS_HEIGHT) {
    // floor
    ball.y.value = Globals.CANVAS_HEIGHT - Globals.BALL_RADIUS;
  } else if (distance + ball.y.value < Globals.BALL_RADIUS) {
    // ceiling
    ball.y.value = Globals.BALL_RADIUS;
    ball.accY *= -1;
  }
}

function calculateBallWallCollisionX(ball: Ball): void {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(ball.accX * delta);
  if (distance + ball.x.value < Globals.BALL_RADIUS) {
    // left border
    ball.x.value = Globals.BALL_RADIUS;
    ball.accX *= -1;
  } else if (distance + ball.x.value + Globals.BALL_RADIUS > Globals.CANVAS_WIDTH) {
    // right border
    ball.x.value = Globals.CANVAS_WIDTH - Globals.BALL_RADIUS;
    ball.accX *= -1;
  }
}

function calculateBallPlayerCollision(ball: Ball, player: Player): void {
  const playerDistance = calculateDistance(ball, player);
  if (playerDistance <= Globals.BALL_RADIUS + Globals.PLAYER_RADIUS) {
    const x = player.x.value;
    const y = player.y.value;
    if (x < ball.x.value - Globals.BALL_RADIUS / 2) {
      ball.accX = Globals.BALL_PLAYER_ACCELERATION;
    } else if (x > ball.x.value + Globals.BALL_RADIUS / 2) {
      ball.accX = -1 * Globals.BALL_PLAYER_ACCELERATION;
    }
    if (y < ball.y.value - Globals.BALL_RADIUS / 2) {
      ball.accY = Globals.BALL_PLAYER_ACCELERATION;
    } else if (y > ball.y.value + Globals.BALL_RADIUS / 2) {
      ball.accY = -1 * Globals.BALL_PLAYER_ACCELERATION;
    }
  }
}

function calculateBallNetCollision(ball: Ball, net: Net): void {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(ball.accX * delta);
  const netLeftborder = net.x - (net.thickness / 2);
  const netRightborder = net.x + (net.thickness / 2);
  const distanceY = Math.round(ball.accY * delta);
  if (distanceY + ball.y.value > Globals.CANVAS_HEIGHT - net.height) {
    if (distance + ball.x.value + Globals.BALL_RADIUS > netLeftborder
       && distance + ball.x.value - Globals.BALL_RADIUS < netRightborder) {
      if (ball.x.value > net.x) {
        ball.x.value = netRightborder + Globals.BALL_RADIUS;
      } else {
        ball.x.value = netLeftborder - Globals.BALL_RADIUS;
      }
      ball.accX = 0;
    }
  }
}

export function calculateBallMove(ball: Ball):void {
  const delta = Globals.TIME_STEP;
  ball.y.value += Math.round(ball.accY * delta);
  ball.x.value += Math.round(ball.accX * delta);
}
