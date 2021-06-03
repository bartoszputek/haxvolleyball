import Globals from 'shared/globals';
import { Team } from 'shared/types';
import Player from 'shared/components/player';

export default class GameBoard {
  private element: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor() {
    this.element = <HTMLCanvasElement>document.getElementById(Globals.CANVAS_CONTAINER_NAME);
    this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
    this.element.width = Globals.CANVAS_WIDTH;
    this.element.height = Globals.CANVAS_HEIGHT;
  }

  drawPlayer(player: Player): void {
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.arc(player.x.value, player.y.value, Globals.PLAYER_RADIUS, 0, 2 * Math.PI);
    if (player.team === Team.Blue) {
      this.context.fillStyle = Globals.COLOR_BLUE_TEAM;
    }
    if (player.team === Team.Red) {
      this.context.fillStyle = Globals.COLOR_RED_TEAM;
    }
    this.context.fill();
    this.context.stroke();
  }

  eraseCanvas(): void {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }
}
