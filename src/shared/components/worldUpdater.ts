import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';

export default class WorldUdpater {
  gameState!: GameState;

  updateWorld(delta: number) {
    this.updatePlayers(delta);
  }

  private updatePlayers(delta: number): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      player.updatePosition(delta);
    });
  }
}
