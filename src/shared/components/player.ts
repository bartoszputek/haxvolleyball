import { Team, Vector } from 'shared/types';
import Coordinate from 'shared/components/coordinate';

export default class Player {
  id:string;

  x:Coordinate;

  y:Coordinate;

  team:Team;

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
