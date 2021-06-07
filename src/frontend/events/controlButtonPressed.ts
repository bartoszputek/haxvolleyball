import Player from 'shared/components/player';
import { EventType, IEvent, Vector } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class ControlButtonPressed implements IEvent {
  readonly eventType = EventType.KeyPressed;

  socket: Socket;

  roomId: string;

  vector: Vector;

  player: Player;

  timestamp: number;

  constructor(args:{ socket: Socket, roomId: string, vector: Vector,
    player: Player, timestamp: number }) {
    this.socket = args.socket;
    this.roomId = args.roomId;
    this.vector = args.vector;
    this.player = args.player;
    this.timestamp = args.timestamp;
  }
}
