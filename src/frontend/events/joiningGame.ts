import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class JoiningGame implements IEvent {
  readonly eventType = EventType.JoiningGame;

  socket: Socket;

  roomId: string;

  constructor(args:{ socket: Socket, roomId: string }) {
    this.socket = args.socket;
    this.roomId = args.roomId;
  }
}
