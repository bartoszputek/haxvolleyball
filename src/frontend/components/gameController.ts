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
import joinGame from 'frontend/subscribers/joinGame';
import JoiningGame from 'frontend/events/joiningGame';
import Globals from 'shared/globals';
import WorldUpdater from 'shared/components/worldUpdater';

export default class GameController {
  private socket;

  private roomId!: string;

  private gameState!: GameState;

  private ownPlayer!: Player;

  private emittedGameStates: Map<number, string>;

  private gameBoard: GameBoard;

  private eventAggregator: EventAggregator;

  private worldUpdater: WorldUpdater;

  private frameCounter: number = 0;

  private delta: number = 0;

  private lastFrameTimeMs: number = 0;

  constructor(gameBoard: GameBoard) {
    this.emittedGameStates = new Map <number, string>();
    this.socket = io();
    this.gameBoard = gameBoard;
    this.eventAggregator = new EventAggregator();
    this.worldUpdater = new WorldUpdater();
    this.setupEventAggregator();
    this.setupListeners();
    this.setupSocket();
  }

  startGame(): Promise<string> {
    return new Promise((resolve: (roomId: string) => void) => {
      this.socket.on('connect', () => {
        this.roomId = this.socket.id;
        this.gameState = GameStateFactory.createNewGameState(this.roomId);
        this.worldUpdater.gameState = this.gameState;
        this.ownPlayer = this.gameState.getPlayers()[0];
        this.frameCounter += 1;
        this.emittedGameStates.set(this.frameCounter, JSON.stringify(this.gameState));
        const args = {
          socket: this.socket,
          timestamp: this.frameCounter,
        };
        this.eventAggregator.Publish(new GameStarted(args));
        requestAnimationFrame((timestamp: number) => this.generateFrame(timestamp));

        resolve(this.roomId);
      });
    });
  }

  joinGame(roomId: string):void {
    this.socket.on('connect', () => {
      this.frameCounter += 1;
      const args = {
        socket: this.socket,
        roomId,
        timestamp: this.frameCounter,
      };
      this.eventAggregator.Publish(new JoiningGame(args));
    });
  }

  generateFrame(timestamp: number): void {
    requestAnimationFrame((newTimestamp: number) => this.generateFrame(newTimestamp));

    const publishEvent = () => {
      const args = {
        socket: this.socket,
        roomId: this.roomId,
        timestamp: this.frameCounter,
      };
      this.eventAggregator.Publish(new GenerateLocalFrame(args));
    };

    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    while (this.delta >= Globals.TIME_STEP) {
      this.frameCounter += 1;
      // console.log('UPDATE', this.frameCounter, this.gameState.getPlayers()[0].x, this.gameState.getPlayers()[0].y);
      this.worldUpdater.updateWorld(Globals.TIME_STEP);
      this.emittedGameStates.set(this.frameCounter, JSON.stringify(this.gameState));
      publishEvent();
      this.delta -= Globals.TIME_STEP;
    }

    this.gameBoard.eraseCanvas();
    this.drawPlayers();
  }

  private drawPlayers(): void {
    this.gameState.getPlayers().forEach((player:Player) => {
      this.gameBoard.drawPlayer(player);
    });
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      this.frameCounter += 1;
      const args = {
        socket: this.socket,
        roomId: this.roomId,
        vector: { direction: 'x', orientation: 1 },
        gameState: this.gameState,
        player: this.ownPlayer,
        timestamp: this.frameCounter,
        cb: (timestamp: number, gameState: GameState) => {
          this.emittedGameStates.set(timestamp, JSON.stringify(gameState));
        },
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
      this.frameCounter += 1;
      const args = {
        socket: this.socket,
        roomId: this.roomId,
        vector: { direction: 'x', orientation: 1 },
        gameState: this.gameState,
        player: this.ownPlayer,
        timestamp: this.frameCounter,
        cb: (timestamp: number, gameState: GameState) => {
          this.emittedGameStates.set(timestamp, JSON.stringify(gameState));
        },
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
    this.eventAggregator.AddSubscriber(EventType.JoiningGame, joinGame);
  }

  private setupSocket() {
    this.socket.on('compareGameStates', (gameState: SerializedGameState, timestamp:number) => {
      if (this.emittedGameStates.has(timestamp)) {
        const state = this.emittedGameStates.get(timestamp);
        if (state !== JSON.stringify(gameState)) {
          console.log('NZ', timestamp);
          console.log(state);
          console.log(JSON.stringify(gameState));
          this.gameState = GameStateFactory.deserializeGameState(gameState);
        }

        this.emittedGameStates.delete(timestamp);
      } else {
        console.log('KLATKA ZGUBIONA');
      }
    });

    this.socket.on('joinedGame', (gameState: SerializedGameState, roomId: string) => {
      this.roomId = roomId;
      this.gameState = GameStateFactory.deserializeGameState(gameState);
      this.worldUpdater.gameState = this.gameState;
      this.ownPlayer = this.gameState.getPlayers()[1];
      this.generateFrame(0);
    });
  }
}
