import GameBoard from 'frontend/gameBoard';
import GameController from 'frontend/gameController';
import EventAggregator from 'frontend/eventAggregator';
import { EventType } from 'shared/types';
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
