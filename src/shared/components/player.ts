import { Team, Vector } from 'shared/types';
import Globals from 'shared/globals';
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

  calculateAcceleration(): void {
    this.x.calculateDelta();
    this.y.calculateDelta();
  }

  updatePosition(): void {
    this.calculateAcceleration();
    if (this.x.delta + this.x.value + Globals.PLAYER_RADIUS > Globals.CANVAS_WIDTH) {
      this.x.value = Globals.CANVAS_WIDTH - Globals.PLAYER_RADIUS;
    } else if (this.x.delta + this.x.value < Globals.PLAYER_RADIUS) {
      this.x.value = Globals.PLAYER_RADIUS;
    } else {
      this.x.value += this.x.delta;
    }
    if (this.y.delta + this.y.value + Globals.PLAYER_RADIUS > Globals.CANVAS_HEIGHT) {
      this.y.value = Globals.CANVAS_HEIGHT - Globals.PLAYER_RADIUS;
    } else if (this.y.delta + this.y.value < Globals.PLAYER_RADIUS) {
      this.y.value = Globals.PLAYER_RADIUS;
    } else {
      this.y.value += this.y.delta;
    }
  }
}
