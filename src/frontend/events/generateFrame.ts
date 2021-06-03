import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class GenerateLocalFrame implements IEvent {
  readonly eventType = EventType.GenerateLocalFrame;

  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
