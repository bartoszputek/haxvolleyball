import { Action, SerializedGameState } from 'shared/types';
import { io } from 'socket.io-client';
import GameBoard from 'frontend/components/gameBoard';
import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import GameStateFactory from 'shared/components/gameStateFactory';
import WorldUpdater from 'shared/components/worldUpdater';
import setupControls from 'frontend/utils/setupControls';
import areEqual from 'frontend/utils/areEqual';
import deserializePlayerActions from 'shared/utils/deserializePlayerActions';
import deserializeActions from 'shared/utils/deserializeActions';

export default class GameController {
  private socket;

  private roomId!: string;

  private gameState!: GameState;

  private ownPlayer!: Player;

  private emittedGameStates: Map<number, string>;

  private gameBoard: GameBoard;

  private worldUpdater: WorldUpdater;

  private tickCounter: number = 1;

  constructor(gameBoard: GameBoard) {
    this.emittedGameStates = new Map <number, string>();
    this.socket = io();
    this.gameBoard = gameBoard;
    this.worldUpdater = new WorldUpdater();
    this.setupSocket();
  }

  createGame(): Promise<string> {
    return new Promise((resolve: (roomId: string) => void) => {
      this.socket.on('connect', () => {
        this.roomId = this.socket.id;
        this.socket.emit('createGame');

        resolve(this.roomId);
      });
    });
  }

  joinGame(roomId: string):void {
    this.socket.on('connect', () => {
      this.socket.emit('joinGame', roomId);
    });
  }

  generateFrame(timestamp: number): void {
    requestAnimationFrame((newTimestamp: number) => this.generateFrame(newTimestamp));

    this.gameBoard.eraseCanvas();
    this.gameBoard.draw(this.gameState.getPlayers(), this.gameState.getBall());
  }

  private setupListeners(): void {
    setupControls(this.ownPlayer, this.worldUpdater);
  }

  private setupSocket() {
    this.socket.on('joinedGame', (gameState: SerializedGameState, roomId: string) => {
      this.roomId = roomId;
      this.gameState = GameStateFactory.deserializeGameState(gameState);
      this.worldUpdater.gameState = this.gameState;
      this.ownPlayer = <Player>this.gameState.getPlayerById(this.socket.id);
      this.emittedGameStates.set(this.tickCounter, JSON.stringify(this.gameState));
      this.tickCounter = 2;

      this.setupListeners();

      this.generateFrame(0);
    });

    this.socket.on('processTick', (tickId: number, serializedGameState: SerializedGameState, serverActionQueue: Action[]) => {
      console.log('tick process');
      this.socket.emit('actions', this.worldUpdater.serializedActionQueue, this.roomId);

      this.synchronizeWorld(serverActionQueue);
      this.correctWorld(tickId, serializedGameState);
    });
  }

  private synchronizeWorld(serverActionQueue: Action[]) {
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

  private correctWorld(tickId: number, serializedGameState: SerializedGameState) {
    const saved = <string>this.emittedGameStates.get(tickId);
    const lastGameState: GameState = GameStateFactory.deserializeGameState(JSON.parse(saved));
    const serializedPlayer = GameStateFactory
      .deserializeGameState(serializedGameState)
      .getPlayerById(this.socket.id);

    if (areEqual(serializedPlayer, lastGameState.getPlayerById(this.socket.id))) {
      // console.log(tickId);
      // console.log(JSON.stringify(serializedPlayer));
      // console.log(JSON.stringify(lastGameState.getPlayerById(this.socket.id)));
    }

    // const serializedBall = GameStateFactory
    //   .deserializeGameState(serializedGameState)
    //   .getBall();

    // console.log(serializedGameState);

    // if (areEqual(serializedBall, lastGameState.getBall())) {
    //   console.log(tickId);
    //   if (serializedBall) {
    //     this.gameState.setBall(serializedBall);
    //   }
    // }
  }
}
