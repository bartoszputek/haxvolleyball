import GameState from 'shared/components/gameState';

export default class Room {
  private id:string;

  private gameState: GameState;

  public queue: (() => void)[] = [];

  constructor(id:string, gameState: GameState) {
    this.id = id;
    this.gameState = gameState;
  }

  getId(): string {
    return this.id;
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
