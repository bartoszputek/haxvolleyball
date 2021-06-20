import deserializePlayerAction from 'shared/utils/deserializePlayerAction';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import Globals from 'shared/globals';
import { Action, Team } from 'shared/types';

export default class WorldUpdater {
  gameState!: GameState;

  actionQueue:(() => void)[] = [];

  serializedActionQueue:[Action, any][] = [];

  addPlayerAction(player: Player, actionType: Action, args: any) {
    const action = deserializePlayerAction(player, actionType, args);
    if (action) {
      this.actionQueue.push(action);
      this.serializedActionQueue.push([actionType, args]);
    }
  }

  mergeActions(actionQueue: (() => void)[]) {
    this.actionQueue = this.actionQueue.concat(actionQueue);
  }

  handleActions() {
    this.actionQueue.forEach((action) => {
      action();
    });
    this.actionQueue = [];
    this.serializedActionQueue = [];
  }

  updateWorld() {
    this.handleActions();
    this.updatePlayers();
  }

  private updatePlayers(): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      WorldUpdater.calculatePlayerCollision(player);
    });
  }

  private static calculatePlayerCollision(player: Player): void {
    const delta = Globals.TIME_STEP;
    let distance = Math.round(player.x.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
    const rightBorder = WorldUpdater.getRightBorder(player);
    const leftBorder = WorldUpdater.getLeftBorder(player);
    if (distance + player.x.value + Globals.PLAYER_RADIUS > rightBorder) {
      player.x.value = rightBorder - Globals.PLAYER_RADIUS;
    } else if (distance + player.x.value < Globals.PLAYER_RADIUS + leftBorder) {
      player.x.value = Globals.PLAYER_RADIUS + leftBorder;
    } else {
      player.x.value += distance;
    }

    distance = Math.round(player.y.getOrientation() * Globals.PLAYER_ACCELERATION * delta);
    if (distance + player.y.value + Globals.PLAYER_RADIUS > Globals.CANVAS_HEIGHT) {
      player.y.value = Globals.CANVAS_HEIGHT - Globals.PLAYER_RADIUS;
    } else if (distance + player.y.value < Globals.PLAYER_RADIUS) {
      player.y.value = Globals.PLAYER_RADIUS;
    } else {
      player.y.value += distance;
    }
  }

  private static getRightBorder(player: Player): number {
    if (player.team === Team.Red) {
      return Globals.CANVAS_WIDTH / 2;
    }
    return Globals.CANVAS_WIDTH;
  }

  private static getLeftBorder(player: Player): number {
    if (player.team === Team.Red) {
      return 0;
    }
    return Globals.CANVAS_WIDTH / 2;
  }
}
