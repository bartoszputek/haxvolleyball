import { Team, Vector } from 'scripts/types';

export default class Player {
  x:number;

  y:number;

  dx:number;

  dy:number;

  xDirection: number;

  yDirection: number;

  team:Team;

  constructor(x:number, y:number, team:Team) {
    this.xDirection = 0;
    this.yDirection = 0;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.team = team;
  }

  move(vector: Vector): void {
    if (vector.direction === 'x') {
      this.xDirection = vector.orientation * 1;
      // this.dx += vector.orientation * 1;
    }
    if (vector.direction === 'y') {
      this.yDirection = vector.orientation * 1;
      // this.dy += vector.orientation * 1;
    }
    console.log(this.dx, this.dy);
  }

  stop(vector: Vector): void {
    console.log('UP');
    if (vector.direction === 'x') {
      this.xDirection = 0;
      // this.dx = 0;
    }
    if (vector.direction === 'y') {
      this.xDirection = 0;
      // this.dy = 0;
    }
  }

  calculateAcceleration(): void {
    if (this.xDirection === 1) {
      this.dx += 1;
    } else if (this.xDirection === 0) {
      this.dx = 0;
    } else if (this.xDirection === -1) {
      this.dx += -1;
    }
    if (this.yDirection === 1) {
      this.dy += 1;
    } else if (this.yDirection === 0) {
      this.dy = 0;
    } else if (this.yDirection === -1) {
      this.dy += -1;
    }
  }

  updatePosition(): void {
    this.calculateAcceleration();
    this.x += this.dx;
    this.y += this.dy;
  }
}
