import EventAggregator from 'frontend/components/eventAggregator';
import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { EventType, Key, SerializedGameState } from 'shared/types';
import { io } from 'socket.io-client';
import ControlButtonUp from 'frontend/events/controlButtonUp';
import GameBoard from 'frontend/components/gameBoard';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import movePlayer from 'frontend/subscribers/movePlayer';
import stopPlayer from 'frontend/subscribers/stopPlayer';
import requestServerFrame from 'frontend/subscribers/requestServerFrame';
import startGame from 'frontend/subscribers/startGame';
import GameStarted from 'frontend/events/gameStarted';
import GameStateFactory from 'shared/components/gameStateFactory';
import GenerateLocalFrame from 'frontend/events/generateLocalFrame';

export default class GameController {
  private socket;

  private roomId!: string;

  private gameState!: GameState;

  private emittedGameStates: Map<number, GameState> = new Map <number, GameState>();

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
      const timestamp = Date.now();
      this.emittedGameStates.set(timestamp, this.gameState);
      const args = {
        socket: this.socket,
        timestamp,
      };
      this.eventAggregator.Publish(new GameStarted(args));
      this.generateFrame();
    });
  }

  generateFrame(): void {
    window.requestAnimationFrame(() => this.generateFrame());
    this.updatePlayers();
    const timestamp = Date.now();
    this.emittedGameStates.set(timestamp, this.gameState);
    const args = {
      socket: this.socket,
      roomId: this.roomId,
      timestamp,
    };
    this.eventAggregator.Publish(new GenerateLocalFrame(args));
    this.gameBoard.eraseCanvas();
    this.gameBoard.drawPlayer(this.gameState.getPlayers()[0]);
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      const args = {
        socket: this.socket,
        roomId: this.roomId,
        vector: { direction: 'x', orientation: 1 },
        player: this.gameState.getPlayers()[0],
        timestamp: Date.now(),
      };
      if (e.key === Key.Right) {
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Up) {
        args.vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Left) {
        args.vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
      if (e.key === Key.Down) {
        args.vector = { direction: 'y', orientation: 1 };
        this.eventAggregator.Publish(
          new ControlButtonPressed(args),
        );
      }
    });

    document.addEventListener('keyup', (e) => {
      const args = {
        roomId: this.roomId,
        vector: { direction: 'x', orientation: 1 },
        player: this.gameState.getPlayers()[0],
        socket: this.socket,
        timestamp: Date.now(),
      };
      if (e.key === Key.Right) {
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Up) {
        args.vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Left) {
        args.vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(
          new ControlButtonUp(args),
        );
      }
      if (e.key === Key.Down) {
        args.vector = { direction: 'y', orientation: 1 };
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
  }

  private setupSocket() {
    this.socket.on('compareGameStates', (gameState: SerializedGameState, timestamp:number) => {
      if (this.emittedGameStates.has(timestamp)) {
        const state = this.emittedGameStates.get(timestamp);
        if (JSON.stringify(state) !== JSON.stringify(gameState)) {
          console.log(JSON.stringify(state));
          console.log(JSON.stringify(gameState));
          this.gameState = GameStateFactory.deserializeGameState(gameState);
        }
        this.emittedGameStates.delete(timestamp);
      }
    });
  }

  updatePlayers(): void {
    this.gameState.getPlayers().forEach((player: Player) => {
      player.updatePosition();
    });
  }
}
