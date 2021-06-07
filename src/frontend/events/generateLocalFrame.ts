import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class GenerateLocalFrame implements IEvent {
  readonly eventType = EventType.GenerateLocalFrame;

  socket: Socket;

  roomId: string;

  timestamp: number;

  constructor(args:{ socket: Socket, roomId: string, timestamp: number }) {
    this.socket = args.socket;
    this.roomId = args.roomId;
    this.timestamp = args.timestamp;
  }
}
