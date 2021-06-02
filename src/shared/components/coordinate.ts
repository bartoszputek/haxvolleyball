export default class Coordinate {
  value: number;

  delta: number = 0;

  private vmax: number = 0;

  private orientation: number = 0;

  private acceleration: number;

  constructor(value: number, vmax: number, acceleration: number) {
    this.value = value;
    this.vmax = vmax;
    this.acceleration = acceleration;
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
