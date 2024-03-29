import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import { SerializedGameState, SerializedPlayer } from 'shared/types';
import PlayerFactory from 'shared/components/playerFactory';
import BallFactory from 'shared/components/ballFactory';

export default class GameStateFactory {
  static createNewGameState(hostId: string): GameState {
    const players: Player[] = [];
    const player: Player = PlayerFactory.createHostPlayer(hostId);
    players.push(player);
    const gameState = new GameState(players);

    return gameState;
  }

  static deserializeGameState(serializedGameState: SerializedGameState) {
    const players: Player[] = [];

    serializedGameState.players.forEach((player: SerializedPlayer) => {
      players.push(PlayerFactory.deserializePlayer(player));
    });
    const gameState = new GameState(players);

    gameState.setBall(BallFactory.deserializeBall(serializedGameState.ball));

    return gameState;
  }
}
