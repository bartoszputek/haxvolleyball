import BallFactory from 'shared/components/ballFactory';
import GameState from 'shared/components/gameState';
import Globals from 'shared/globals';
import { Team } from 'shared/types';

export default class MetaGame {
  gameState: GameState;

  score:[number, number] = [0, 0];

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  checkScore():[number, number] | undefined {
    const ball = this.gameState.getBall();
    const net = this.gameState.getNet();
    if (ball) {
      if (ball.y.value + Globals.BALL_RADIUS > Globals.CANVAS_HEIGHT) {
        if (ball.x.value < net.x) {
          this.gameState.setBall(BallFactory.createRedBall());
          this.increaseScore(Team.Red);
          return this.score;
        }
        this.gameState.setBall(BallFactory.createBlueBall());
        this.increaseScore(Team.Blue);
        return this.score;
      }
    }
    return undefined;
  }

  private increaseScore(team: Team):void {
    if (team === Team.Red) {
      this.score[0] += 1;
    }
    if (team === Team.Blue) {
      this.score[1] += 1;
    }
  }
}
