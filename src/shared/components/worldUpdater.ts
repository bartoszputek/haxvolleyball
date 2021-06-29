import deserializePlayerAction from 'shared/utils/deserializePlayerAction';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import { Action } from 'shared/types';
import calculatePlayerCollision from 'shared/utils/calculatePlayerCollision';
import calculateBallCollision, { calculateBallMove } from 'shared/utils/calculateBallCollision';

export default class WorldUpdater {
  gameState!: GameState;

  actionQueue:(() => void)[] = [];

  serializedActionQueue:Action[] = [];

  addPlayerAction(player: Player, action: Action) {
    const exec = deserializePlayerAction(player, action.command, action.args);
    if (exec) {
      this.actionQueue.push(exec);
      this.serializedActionQueue.push(action);
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
    this.updateBall();
  }

  private updatePlayers(): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      const ball = this.gameState.getBall();
      calculatePlayerCollision(player, ball);
    });
  }

  private updateBall(): void {
    const ball = this.gameState.getBall();
    if (ball) {
      this.gameState.getPlayers().forEach((player: Player) => {
        calculateBallCollision(ball, player);
      });
      calculateBallMove(ball);
    }
  }
}
