import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import Player from 'shared/components/player';
import { ISubscriber } from 'shared/types';
import { io } from 'socket.io-client';

export default class MovePlayer implements ISubscriber {
  private socket = io();

  private player!: Player;

  Handle(Notify: ControlButtonPressed): void {
    // this.socket.emit('move', Notify.player.id, Notify.vector);

    this.player = Notify.player;
    this.player.move(Notify.vector);
  }
}
