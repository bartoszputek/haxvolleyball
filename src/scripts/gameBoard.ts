import Globals from './globals';
import { Team } from './types';

export default class GameBoard {
  private element: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor() {
    this.element = <HTMLCanvasElement>document.getElementById(Globals.CANVAS_CONTAINER_NAME);
    this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
    // console.log(this.element);
    this.drawPlayer(100, 120, Team.Red);
  }

  drawPlayer(x: number, y: number, team: Team): void {
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.arc(x, y, 20, 0, 2 * Math.PI);
    if (team === Team.Blue) {
      this.context.fillStyle = Globals.COLOR_BLUE_TEAM;
    }
    if (team === Team.Red) {
      this.context.fillStyle = Globals.COLOR_RED_TEAM;
    }
    this.context.fill();
    this.context.stroke();
  }
}
