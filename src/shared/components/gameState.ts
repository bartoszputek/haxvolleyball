import Player from 'shared/components/player';
import { Team } from 'shared/types';

export default class GameState {
  private players:Player[] = [];

  addHost(): void {
    this.players.push(new Player('1', 120, 150, Team.Red));
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
