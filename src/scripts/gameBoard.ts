import Globals from 'scripts/globals';
import { Team } from 'scripts/types';
import Player from 'scripts/player';
import GameController from 'scripts/gameController';

export default class GameBoard {
  private gameController: GameController;

  private element: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor(gameController: GameController) {
    this.gameController = gameController;
    this.element = <HTMLCanvasElement>document.getElementById(Globals.CANVAS_CONTAINER_NAME);
    this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
    // console.log(this.element);
  }

  draw():void {
    window.requestAnimationFrame(() => this.draw());
    this.eraseCanvas();

    this.gameController.getPlayers().forEach((player) => {
      player.updatePosition();
      this.drawPlayer(player);
    });
  }

  drawPlayer(player: Player): void {
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.arc(player.x, player.y, 20, 0, 2 * Math.PI);
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
