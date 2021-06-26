import Globals from 'shared/globals';
import { Team } from 'shared/types';
import Player from 'shared/components/player';
import Ball from 'shared/components/ball';

export default class GameBoard {
  private element: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor() {
    this.element = <HTMLCanvasElement>document.getElementById(Globals.CANVAS_CONTAINER_NAME);
    this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
    this.element.width = Globals.CANVAS_WIDTH;
    this.element.height = Globals.CANVAS_HEIGHT;
  }

  eraseCanvas(): void {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  draw(players: Player[], ball?:Ball) {
    players.forEach((player:Player) => {
      this.drawPlayer(player);
    });
    if (ball) {
      this.drawBall(ball);
    }
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

  drawBall(ball: Ball): void {
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.arc(ball.x.value, ball.y.value, Globals.BALL_RADIUS, 0, 2 * Math.PI);
    this.context.fillStyle = Globals.BALL_COLOR;
    this.context.fill();
    this.context.stroke();
  }
}
