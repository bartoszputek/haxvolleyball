import Player from 'shared/components/player';
import Globals from 'shared/globals';
import { Team } from 'shared/types';

export default function calculatePlayerCollision(player: Player): void {
  player.x.value = calculatePlayerWallCollisionX(player) || calculatePlayerNormalMoveX(player);
  player.y.value = calculatePlayerWallCollisionY(player) || calculatePlayerNormalMoveY(player);
}

export function calculatePlayerWallCollisionX(player: Player): number {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(player.x.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
  const rightBorder = getRightBorder(player);
  const leftBorder = getLeftBorder(player);
  if (distance + player.x.value + Globals.PLAYER_RADIUS > rightBorder) {
    return rightBorder - Globals.PLAYER_RADIUS;
  } if (distance + player.x.value < Globals.PLAYER_RADIUS + leftBorder) {
    return Globals.PLAYER_RADIUS + leftBorder;
  }
  return 0;
}

function getRightBorder(player: Player): number {
  if (player.team === Team.Red) {
    return Globals.CANVAS_WIDTH / 2;
  }
  return Globals.CANVAS_WIDTH;
}

function getLeftBorder(player: Player): number {
  if (player.team === Team.Red) {
    return 0;
  }
  return Globals.CANVAS_WIDTH / 2;
}

function calculatePlayerWallCollisionY(player: Player): number {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(player.y.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
  if (distance + player.y.value + Globals.PLAYER_RADIUS > Globals.CANVAS_HEIGHT) {
    player.y.value = Globals.CANVAS_HEIGHT - Globals.PLAYER_RADIUS;
  } else if (distance + player.y.value < Globals.PLAYER_RADIUS) {
    player.y.value = Globals.PLAYER_RADIUS;
  }
  return 0;
}

function calculatePlayerNormalMoveX(player: Player): number {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(player.x.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
  return player.x.value + distance;
}

function calculatePlayerNormalMoveY(player: Player): number {
  const delta = Globals.TIME_STEP;
  const distance = Math.round(player.y.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
  return player.y.value + distance;
}
