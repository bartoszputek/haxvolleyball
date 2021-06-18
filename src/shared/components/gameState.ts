import Player from 'shared/components/player';

export default class GameState {
  private players:Player[];

  constructor(players: Player[]) {
    this.players = players;
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
}
