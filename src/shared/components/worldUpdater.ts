import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';

export default class WorldUdpater {
  gameState!: GameState;

  updateWorld() {
    this.updatePlayers();
  }

  private updatePlayers(): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      player.updatePosition();
    });
  }
}
