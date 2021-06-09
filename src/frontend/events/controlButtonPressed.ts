import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import { EventType, IEvent, Vector } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class ControlButtonPressed implements IEvent {
  readonly eventType = EventType.KeyPressed;

  socket: Socket;

  roomId: string;

  vector: Vector;

  gameState: GameState;

  player: Player;

  timestamp: number;

  cb: any;

  constructor(args:{ socket: Socket, roomId: string, vector: Vector,
    gameState: GameState, player: Player, timestamp: number, cb: any }) {
    this.socket = args.socket;
    this.roomId = args.roomId;
    this.vector = args.vector;
    this.gameState = args.gameState;
    this.player = args.player;
    this.timestamp = args.timestamp;
    this.cb = args.cb;
  }
}
