import { PlayerAction, Team, Vector } from 'shared/types';
import Globals from 'shared/globals';
import Coordinate from 'shared/components/coordinate';

export default class Player {
  id:string;

  x:Coordinate;

  y:Coordinate;

  team:Team;

  queue:[PlayerAction, Vector][] = [];

  constructor(id:string, x:Coordinate, y:Coordinate, team:Team) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.team = team;
  }

  isMoving(vector: Vector): boolean {
    if (vector.direction === 'x') {
      if (vector.orientation === this.x.getOrientation()) {
        return true;
      }
    }
    if (vector.direction === 'y') {
      if (vector.orientation === this.y.getOrientation()) {
        return true;
      }
    }
    return false;
  }

  move(vector: Vector): void {
    this.queue.push([PlayerAction.Move, vector]);
  }

  private moveAction(vector: Vector): void {
    if (vector.direction === 'x') {
      this.x.setOrientation(vector.orientation * 1);
    }
    if (vector.direction === 'y') {
      this.y.setOrientation(vector.orientation * 1);
    }
  }

  stop(vector: Vector): void {
    this.queue.push([PlayerAction.Stop, vector]);
  }

  private stopAction(vector: Vector): void {
    if (vector.direction === 'x') {
      if (this.x.getOrientation() === vector.orientation) {
        this.x.setOrientation(0);
      }
    }
    if (vector.direction === 'y') {
      if (this.y.getOrientation() === vector.orientation) {
        this.y.setOrientation(0);
      }
    }
  }

  updatePosition() {
    this.handleActions();
    const delta = Globals.TIME_STEP;
    let distance = Math.round(this.x.getOrientation() * 0.3 * delta);
    if (distance + this.x.value + Globals.PLAYER_RADIUS > Globals.CANVAS_WIDTH) {
      this.x.value = Globals.CANVAS_WIDTH - Globals.PLAYER_RADIUS;
    } else if (distance + this.x.value < Globals.PLAYER_RADIUS) {
      this.x.value = Globals.PLAYER_RADIUS;
    } else {
      this.x.value += distance;
    }

    distance = Math.round(this.y.getOrientation() * 0.3 * delta);
    if (distance + this.y.value + Globals.PLAYER_RADIUS > Globals.CANVAS_HEIGHT) {
      this.y.value = Globals.CANVAS_HEIGHT - Globals.PLAYER_RADIUS;
    } else if (distance + this.y.value < Globals.PLAYER_RADIUS) {
      this.y.value = Globals.PLAYER_RADIUS;
    } else {
      this.y.value += distance;
    }
  }

  private handleActions() {
    this.queue.forEach((action) => {
      if (action[0] === PlayerAction.Move) {
        this.moveAction(action[1]);
      }
      if (action[0] === PlayerAction.Stop) {
        this.stopAction(action[1]);
      }
    });
    this.queue = [];
  }
}
