import { Action, NotificationType, SerializedGameState } from 'shared/types';
import { io } from 'socket.io-client';
import GameBoard from 'frontend/components/gameBoard';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import GameStateFactory from 'shared/components/gameStateFactory';
import WorldUpdater from 'shared/components/worldUpdater';
import setupControls from 'frontend/utils/setupControls';
import areEqual from 'frontend/utils/areEqual';
import deserializeActions from 'shared/utils/deserializeActions';
import GameLogger from 'frontend/components/gameLogger';

export default class GameController {
  private gameBoard: GameBoard;

  private gameLogger: GameLogger;

  private worldUpdater: WorldUpdater;

  private socket;

  public roomId!: string;

  private gameState?: GameState;

  private ownPlayer!: Player;

  private emittedGameStates: Map<number, string>;

  private tickCounter: number = 1;

  private requestAnimationFrame: any;

  constructor(gameBoard: GameBoard, gameLogger: GameLogger) {
    this.gameBoard = gameBoard;
    this.gameLogger = gameLogger;
    this.worldUpdater = new WorldUpdater();
    this.emittedGameStates = new Map <number, string>();
    this.socket = io();
    this.setupSocket();
  }

  createGame(): void {
    this.socket.emit('createGame');
  }

  joinGame(roomId: string):void {
    this.socket.emit('joinGame', roomId);
  }

  generateFrame(): void {
    this.requestAnimationFrame = requestAnimationFrame(() => this.generateFrame());

    this.gameBoard.eraseCanvas();
    if (this.gameState) {
      this.gameBoard.draw(this.gameState.getPlayers(),
        this.gameState.getNet(), this.gameState.getBall());
    }
  }

  private setupListeners(): void {
    setupControls(this.ownPlayer, this.worldUpdater);
  }

  private setupSocket() {
    this.socket.on('createdGame', (roomId: string) => {
      this.gameLogger.setRoomId(roomId);
    });

    this.socket.on('joinedGame', (gameState: SerializedGameState, roomId: string) => {
      this.roomId = roomId;
      this.gameLogger.setRoomId(roomId);
      this.gameState = GameStateFactory.deserializeGameState(gameState);
      this.worldUpdater.gameState = this.gameState;
      this.ownPlayer = <Player>this.gameState.getPlayerById(this.socket.id);
      this.emittedGameStates.set(this.tickCounter, JSON.stringify(this.gameState));
      this.tickCounter = 2;

      this.setupListeners();

      this.generateFrame();
    });

    this.socket.on('resetGame', () => {
      cancelAnimationFrame(this.requestAnimationFrame);
      this.worldUpdater = new WorldUpdater();
      this.emittedGameStates = new Map <number, string>();
      this.gameBoard.eraseCanvas();
      this.tickCounter = 1;
      this.gameLogger.setScore(['0', '0']);
    });

    this.socket.on('getNotification', (text: string, type:NotificationType) => {
      if (type === NotificationType.Message) {
        this.gameLogger.addMessage(text);
      }
      if (type === NotificationType.Error) {
        this.gameLogger.addError(text);
      }
    });

    this.socket.on('getScore', (score:[string, string]) => {
      this.gameLogger.setScore(score);
    });

    this.socket.on('processTick', (tickId: number, serializedGameState: SerializedGameState, serverActionQueue: Action[]) => {
      console.log('tick process');
      this.socket.emit('actions', this.worldUpdater.serializedActionQueue, this.roomId);
      this.correctWorld(tickId, serializedGameState);
      this.synchronizeWorld(serverActionQueue);
    });
  }

  private synchronizeWorld(serverActionQueue: Action[]) {
    if (!this.gameState) {
      return;
    }

    let enemyPlayer;
    if (this.ownPlayer === this.gameState.getPlayers()[0]) {
      enemyPlayer = this.gameState.getPlayers()[1];
    } else {
      enemyPlayer = this.gameState.getPlayers()[0];
    }

    const ball = this.gameState.getBall();

    const actions = deserializeActions(enemyPlayer, ball, serverActionQueue);

    this.worldUpdater.mergeActions(actions);
    this.worldUpdater.updateWorld();
    this.emittedGameStates.set(this.tickCounter, JSON.stringify(this.gameState));
    this.tickCounter += 1;
  }

  private correctWorld(tickId: number, serializedGameState: SerializedGameState):void {
    if (!this.gameState) {
      return;
    }

    const saved = <string>this.emittedGameStates.get(tickId);
    const lastGameState: GameState = GameStateFactory.deserializeGameState(JSON.parse(saved));
    const serializedPlayer = GameStateFactory
      .deserializeGameState(serializedGameState)
      .getPlayerById(this.socket.id);

    if (!areEqual(serializedPlayer, lastGameState.getPlayerById(this.socket.id))) {
      // console.log(JSON.stringify(serializedPlayer));
      // console.log(JSON.stringify(lastGameState.getPlayerById(this.socket.id)));
      if (serializedPlayer) {
        // ??
        this.gameState.getPlayers()[0] = serializedPlayer;
      }
    }

    const serializedBall = GameStateFactory
      .deserializeGameState(serializedGameState)
      .getBall();

    if (!areEqual(serializedBall, lastGameState.getBall())) {
      if (serializedBall) {
        this.gameState.setBall(serializedBall);
      }
    }
  }
}
