import EventAggregator from 'frontend/components/eventAggregator';
import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import {
  EventType, Key, Vector,
} from 'shared/types';
import { io } from 'socket.io-client';
import ControlButtonUp from 'frontend/events/controlButtonUp';
import GameBoard from 'frontend/components/gameBoard';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import movePlayer from 'frontend/subscribers/movePlayer';
import stopPlayer from 'frontend/subscribers/stopPlayer';
import requestServerFrame from 'frontend/subscribers/requestServerFrame';
import processServerFrame from 'frontend/subscribers/processServerFrame';
import GenerateLocalFrame from 'frontend/events/generateFrame';
import ReceivedServerFrame from 'frontend/events/receivedServerFrame';

export default class GameController {
  private socket = io();

  private gameState: GameState;

  private gameBoard: GameBoard;

  private eventAggregator: EventAggregator;

  constructor(gameBoard: GameBoard, gameState: GameState) {
    this.gameState = gameState;
    this.gameBoard = gameBoard;
    this.eventAggregator = new EventAggregator();
    this.setupEventAggregator();
    this.setupListeners();
    this.setupSocket();
  }

  generateFrame(): void {
    window.requestAnimationFrame(() => this.generateFrame());
    // this.socket.emit('test');
    this.eventAggregator.Publish(new GenerateLocalFrame(this.socket));
    this.gameBoard.eraseCanvas();
    this.updatePlayers();
    this.gameBoard.drawPlayer(this.gameState.getPlayers()[0]);
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === Key.Right) {
        const vector:Vector = { direction: 'x', orientation: 1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Up) {
        const vector:Vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Left) {
        const vector:Vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Down) {
        const vector:Vector = { direction: 'y', orientation: 1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === Key.Right) {
        const vector:Vector = { direction: 'x', orientation: 1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Up) {
        const vector:Vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Left) {
        const vector:Vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
      if (e.key === Key.Down) {
        const vector:Vector = { direction: 'y', orientation: 1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(vector, this.gameState.getPlayers()[0], this.socket),
        );
      }
    });
  }

  private setupEventAggregator(): void {
    this.eventAggregator.AddSubscriber(EventType.KeyPressed, movePlayer);
    this.eventAggregator.AddSubscriber(EventType.KeyUp, stopPlayer);
    this.eventAggregator.AddSubscriber(EventType.GenerateLocalFrame, requestServerFrame);
    this.eventAggregator.AddSubscriber(EventType.ReceivedServerFrame, processServerFrame);
  }

  private setupSocket() {
    this.socket.on('eska', (arg) => {
      this.eventAggregator.Publish(new ReceivedServerFrame(arg, this.socket));
    });
  }

  updatePlayers(): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      player.updatePosition();
    });
  }
}
