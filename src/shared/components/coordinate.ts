export default class Coordinate {
  value: number;

  private vmax: number;

  private acceleration: number;

  private orientation: number;

  delta: number = 0;

  constructor(value: number, vmax: number,
    acceleration: number, orientation: number, delta: number) {
    this.value = value;
    this.vmax = vmax;
    this.acceleration = acceleration;
    this.orientation = orientation;
    this.delta = delta;
  }

  getOrientation(): number {
    return this.orientation;
  }

  setOrientation(orientation: number) {
    if (orientation !== this.orientation) {
      this.orientation = orientation;
      this.delta = 0;
    }
  }

  calculateDelta(): void {
    if (this.orientation === 1) {
      if (this.delta + this.acceleration < this.vmax) {
        this.delta += this.acceleration;
      } else {
        this.delta = this.vmax;
      }
    } else if (this.orientation === 0) {
      this.delta = 0;
    } else if (this.orientation === -1) {
      if (this.delta - this.acceleration > -1 * this.vmax) {
        this.delta -= this.acceleration;
      } else {
        this.delta = -1 * this.vmax;
      }
    }
  }
}
