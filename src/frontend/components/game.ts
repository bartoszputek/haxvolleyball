import GameBoard from 'frontend/components/gameBoard';
import GameController from 'frontend/components/gameController';
import GameLogger from 'frontend/components/gameLogger';

export default class Game {
  private gameBoard: GameBoard;

  private gameLogger: GameLogger;

  private gameController: GameController;

  constructor() {
    this.gameLogger = new GameLogger();
    this.gameBoard = new GameBoard();
    this.gameController = new GameController(this.gameBoard, this.gameLogger);
    this.gameLogger.setupListeners(this.gameController);
  }
}
