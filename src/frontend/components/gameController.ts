import EventAggregator from 'frontend/components/eventAggregator';
import {
  EventType, SerializedGameState, SerializedPlayer,
} from 'shared/types';
import { io } from 'socket.io-client';
import GameBoard from 'frontend/components/gameBoard';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import movePlayer from 'frontend/subscribers/movePlayer';
import stopPlayer from 'frontend/subscribers/stopPlayer';
import startGame from 'frontend/subscribers/startGame';
import GameStarted from 'frontend/events/gameStarted';
import GameStateFactory from 'shared/components/gameStateFactory';
import joinGame from 'frontend/subscribers/joinGame';
import JoiningGame from 'frontend/events/joiningGame';
import WorldUpdater from 'shared/components/worldUpdater';
import setupControls from 'frontend/utils/setupControls';

export default class GameController {
  private socket;

  private roomId!: string;

  private gameState!: GameState;

  private ownPlayer!: Player;

  private emittedGameStates: Map<number, string>;

  private gameBoard: GameBoard;

  private eventAggregator: EventAggregator;

  private worldUpdater: WorldUpdater;

  private tickCounter: number = 1;

  constructor(gameBoard: GameBoard) {
    this.emittedGameStates = new Map <number, string>();
    this.socket = io();
    this.gameBoard = gameBoard;
    this.eventAggregator = new EventAggregator();
    this.worldUpdater = new WorldUpdater();
    this.setupEventAggregator();
    this.setupSocket();
  }

  startGame(): Promise<string> {
    return new Promise((resolve: (roomId: string) => void) => {
      this.socket.on('connect', () => {
        this.roomId = this.socket.id;
        this.gameState = GameStateFactory.createNewGameState(this.roomId);
        this.worldUpdater.gameState = this.gameState;
        this.ownPlayer = this.gameState.getPlayers()[0];
        this.setupListeners();

        const args = {
          socket: this.socket,
        };
        this.eventAggregator.Publish(new GameStarted(args));

        requestAnimationFrame((timestamp: number) => this.generateFrame(timestamp));

        resolve(this.roomId);
      });
    });
  }

  joinGame(roomId: string):void {
    this.socket.on('connect', () => {
      const args = {
        socket: this.socket,
        roomId,
      };
      this.eventAggregator.Publish(new JoiningGame(args));
    });
  }

  generateFrame(timestamp: number): void {
    requestAnimationFrame((newTimestamp: number) => this.generateFrame(newTimestamp));

    this.gameBoard.eraseCanvas();
    this.drawPlayers();
  }

  private drawPlayers(): void {
    this.gameState.getPlayers().forEach((player:Player) => {
      this.gameBoard.drawPlayer(player);
    });
  }

  private setupListeners(): void {
    setupControls(this.socket, this.roomId, this.gameState, this.ownPlayer, this.eventAggregator);
  }

  private setupEventAggregator(): void {
    this.eventAggregator.AddSubscriber(EventType.GameStarted, startGame);
    this.eventAggregator.AddSubscriber(EventType.KeyPressed, movePlayer);
    this.eventAggregator.AddSubscriber(EventType.KeyUp, stopPlayer);
    this.eventAggregator.AddSubscriber(EventType.JoiningGame, joinGame);
  }

  private setupSocket() {
    this.socket.on('joinedGame', (gameState: SerializedGameState, roomId: string) => {
      console.log('joined');
      this.roomId = roomId;
      this.gameState = GameStateFactory.deserializeGameState(gameState);
      this.worldUpdater.gameState = this.gameState;
      this.ownPlayer = this.gameState.getPlayers()[1];
      this.setupListeners();

      this.generateFrame(0);
    });

    this.socket.on('setGamestate', () => {
      this.emittedGameStates.set(this.tickCounter, JSON.stringify(this.gameState));
      this.tickCounter += 1;
    });

    this.socket.on('processTick', (tickId: number, serializedPlayer: SerializedPlayer) => {
      console.log('tick process');
      this.socket.emit('actions', this.ownPlayer.queue, this.roomId);
      this.worldUpdater.updateWorld();
      this.emittedGameStates.set(this.tickCounter, JSON.stringify(this.gameState));
      this.tickCounter += 1;
      const saved = <string>this.emittedGameStates.get(tickId);
      const lastGameState: GameState = GameStateFactory.deserializeGameState(JSON.parse(saved));

      if (JSON.stringify(serializedPlayer) !== JSON.stringify(lastGameState.getPlayers()[0])) {
        console.log(tickId);
        console.log(JSON.stringify(serializedPlayer));
        console.log(JSON.stringify(lastGameState.getPlayers()[0]));
      }
    });
  }
}
