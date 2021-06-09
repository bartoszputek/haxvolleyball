export default class Coordinate {
  value: number;

  private orientation: number;

  constructor(value: number, orientation: number) {
    this.value = value;
    this.orientation = orientation;
  }

  getOrientation(): number {
    return this.orientation;
  }

  setOrientation(orientation: number) {
    this.orientation = orientation;
  }
}
