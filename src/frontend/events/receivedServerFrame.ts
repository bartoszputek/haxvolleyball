import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class ReceivedServerFrame implements IEvent {
  readonly eventType = EventType.ReceivedServerFrame;

  arg: any;

  socket: Socket;

  constructor(arg: any, socket: Socket) {
    this.arg = arg;
    this.socket = socket;
  }
}
