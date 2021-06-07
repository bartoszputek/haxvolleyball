import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class GameStarted implements IEvent {
  readonly eventType = EventType.GameStarted;

  socket: Socket;

  timestamp: number;

  constructor(args:{ socket: Socket, timestamp:number }) {
    this.socket = args.socket;
    this.timestamp = args.timestamp;
  }
}
