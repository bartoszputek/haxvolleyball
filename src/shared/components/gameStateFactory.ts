import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import { SerializedGameState, SerializedPlayer } from 'shared/types';
import playerFactory from 'shared/components/playerFactory';

export default class GameStateFactory {
  static createNewGameState(hostId: string): GameState {
    const players: Player[] = [];
    const player: Player = playerFactory.createHostPlayer(hostId);
    players.push(player);
    const gameState = new GameState(players);

    return gameState;
  }

  static deserializeGameState(serializedGameState: SerializedGameState) {
    const players: Player[] = [];

    serializedGameState.players.forEach((player: SerializedPlayer) => {
      players.push(playerFactory.deserializePlayer(player));
    });
    const gameState = new GameState(players);

    return gameState;
  }
}
