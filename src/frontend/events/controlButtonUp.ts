import Player from 'shared/components/player';
import { EventType, IEvent, Vector } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class ControlButtonUp implements IEvent {
  readonly eventType = EventType.KeyUp;

  vector: Vector;

  player: Player;

  socket: Socket;

  constructor(vector: Vector, player: Player, socket: Socket) {
    this.vector = vector;
    this.player = player;
    this.socket = socket;
  }
}
