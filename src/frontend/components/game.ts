import GameBoard from 'frontend/components/gameBoard';
import GameController from 'frontend/components/gameController';

export default class Game {
  private gameBoard: GameBoard;

  private gameController: GameController;

  constructor() {
    this.gameBoard = new GameBoard();
    this.gameController = new GameController(this.gameBoard);
  }

  async start(): Promise<string> {
    const roomId = await this.gameController.startGame();
    return roomId;
  }

  join(roomId: string): void {
    this.gameController.joinGame(roomId);
  }
}
