import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import { EventType, IEvent, Vector } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class ControlButtonUp implements IEvent {
  readonly eventType = EventType.KeyUp;

  socket: Socket;

  roomId: string;

  vector: Vector;

  gameState: GameState;

  player: Player;

  cb: any;

  constructor(args:{ socket: Socket, roomId: string, vector: Vector,
    gameState: GameState, player: Player }) {
    this.socket = args.socket;
    this.roomId = args.roomId;
    this.vector = args.vector;
    this.gameState = args.gameState;
    this.player = args.player;
  }
}
