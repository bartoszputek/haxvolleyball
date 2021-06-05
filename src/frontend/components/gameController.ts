import EventAggregator from 'frontend/components/eventAggregator';
import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { EventType, Key } from 'shared/types';
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
import startGame from 'frontend/subscribers/startGame';
import GameStarted from 'frontend/events/gameStarted';
import GameStateFactory from 'shared/components/gameStateFactory';

export default class GameController {
  private socket;

  private roomId!: string;

  private gameState!: GameState;

  private gameBoard: GameBoard;

  private eventAggregator: EventAggregator;

  constructor(gameBoard: GameBoard) {
    this.socket = io();
    this.gameBoard = gameBoard;
    this.eventAggregator = new EventAggregator();
    this.setupEventAggregator();
    this.setupListeners();
    this.setupSocket();
  }

  startGame(): void {
    this.socket.on('connect', () => {
      this.roomId = this.socket.id;
      this.gameState = GameStateFactory.createNewGameState(this.roomId);
      const args = {
        gameState: this.gameState,
        socket: this.socket,
      };
      this.eventAggregator.Publish(new GameStarted(args));
      this.generateFrame();
    });
  }

  generateFrame(): void {
    window.requestAnimationFrame(() => this.generateFrame());
    this.eventAggregator.Publish(new GenerateLocalFrame(this.socket));
    this.gameBoard.eraseCanvas();
    this.updatePlayers();
    this.gameBoard.drawPlayer(this.gameState.getPlayers()[0]);
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === Key.Right) {
        const args = {
          roomId: this.roomId,
          vector: { direction: 'x', orientation: 1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Up) {
        const args = {
          roomId: this.roomId,
          vector: { direction: 'y', orientation: -1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Left) {
        const args = {
          roomId: this.roomId,
          vector: { direction: 'x', orientation: -1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Down) {
        const args = {
          roomId: this.roomId,
          vector: { direction: 'y', orientation: 1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === Key.Right) {
        const args = {
          vector: { direction: 'x', orientation: 1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Up) {
        const args = {
          vector: { direction: 'y', orientation: -1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Left) {
        const args = {
          vector: { direction: 'x', orientation: -1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Down) {
        const args = {
          vector: { direction: 'y', orientation: 1 },
          player: this.gameState.getPlayers()[0],
          socket: this.socket,
        };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
    });
  }

  private setupEventAggregator(): void {
    this.eventAggregator.AddSubscriber(EventType.GameStarted, startGame);
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
