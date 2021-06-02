import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import Player from 'shared/components/player';
import { ISubscriber } from 'shared/types';
import { io } from 'socket.io-client';

export default class StopPlayer implements ISubscriber {
  private socket = io();

  private player!: Player;

  Handle(Notify: ControlButtonPressed): void {
    // this.socket.emit('stop', Notify.player.id, Notify.vector);
    this.player = Notify.player;
    this.player.stop(Notify.vector);
  }
}
