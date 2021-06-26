import { Vector } from 'shared/types';
import Coordinate from 'shared/components/coordinate';

export default class Ball {
  x:Coordinate;

  y:Coordinate;

  acc_x: number;

  acc_y: number;

  constructor(x:Coordinate, y:Coordinate) {
    this.x = x;
    this.y = y;
    this.acc_x = 0;
    this.acc_y = -0.3;
  }

  move(vector: Vector): void {
    if (vector.direction === 'x') {
      this.x.setOrientation(vector.orientation * 1);
    }
    if (vector.direction === 'y') {
      this.y.setOrientation(vector.orientation * 1);
    }
  }

  stop(vector: Vector): void {
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
}
