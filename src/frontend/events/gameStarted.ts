import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class GameStarted implements IEvent {
  readonly eventType = EventType.GameStarted;

  socket: Socket;

  constructor(args:{ socket: Socket }) {
    this.socket = args.socket;
  }
}
