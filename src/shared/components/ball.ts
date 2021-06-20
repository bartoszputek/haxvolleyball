import { Action, Vector } from 'shared/types';
import Coordinate from 'shared/components/coordinate';

export default class Ball {
  x:Coordinate;

  y:Coordinate;

  queue:[Action, Vector][] = [];

  constructor(x:Coordinate, y:Coordinate) {
    this.x = x;
    this.y = y;
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
    this.queue.push([Action.Move, vector]);
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
    this.queue.push([Action.Stop, vector]);
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

  handleActions() {
    this.queue.forEach((action) => {
      if (action[0] === Action.Move) {
        this.moveAction(action[1]);
      }
      if (action[0] === Action.Stop) {
        this.stopAction(action[1]);
      }
    });
    this.queue = [];
  }
}
