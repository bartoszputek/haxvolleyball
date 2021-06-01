import GameBoard from 'scripts/gameBoard';
import GameController from 'scripts/gameController';
import EventAggregator from 'scripts/eventAggregator';
import { EventType } from 'scripts/types';
import MovePlayer from './subscribers/movePlayer';
import StopPlayer from './subscribers/stopPlayer';

export default class Game {
  private gameBoard: GameBoard;

  private gameController: GameController;

  private eventAggregator: EventAggregator;

  constructor() {
    this.eventAggregator = new EventAggregator();
    this.gameController = new GameController(this.eventAggregator);
    this.gameBoard = new GameBoard(this.gameController);
    this.eventAggregator.AddSubscriber(EventType.KeyPressed, new MovePlayer());
    this.eventAggregator.AddSubscriber(EventType.KeyUp, new StopPlayer());

    this.gameBoard.draw();
  }
}
