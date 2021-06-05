import Player from 'shared/components/player';

export default class GameState {
  private players:Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
