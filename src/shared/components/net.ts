import Globals from 'shared/globals';

export default class Net {
  x: number;

  height: number;

  thickness: number;

  constructor() {
    this.x = Globals.NET_CENTER_POINT;
    this.height = Globals.NET_HEIGHT;
    this.thickness = Globals.NET_THICKNESS;
  }
}
