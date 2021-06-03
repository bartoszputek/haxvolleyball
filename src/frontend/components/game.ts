import GameBoard from 'frontend/components/gameBoard';
import GameController from 'frontend/components/gameController';
import GameState from 'shared/components/gameState';

export default class Game {
  private gameBoard: GameBoard;

  private gameState: GameState;

  private gameController: GameController;

  constructor() {
    this.gameState = new GameState();
    this.gameState.addHost();
    this.gameBoard = new GameBoard();
    this.gameController = new GameController(this.gameBoard, this.gameState);
  }

  start():void {
    this.gameController.generateFrame();
  }
}
