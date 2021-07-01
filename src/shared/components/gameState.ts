import Player from 'shared/components/player';
import Ball from 'shared/components/ball';
import Net from 'shared/components/net';

export default class GameState {
  private players:Player[];

  private ball?:Ball;

  private net: Net;

  constructor(players: Player[]) {
    this.players = players;
    this.net = new Net();
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayerById(id:string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  setBall(ball: Ball): void {
    this.ball = ball;
  }

  getBall(): Ball | undefined {
    return this.ball;
  }

  getNet(): Net {
    return this.net;
  }
}
