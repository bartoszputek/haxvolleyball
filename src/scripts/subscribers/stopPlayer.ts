import ControlButtonPressed from 'scripts/events/controlButtonPressed';
import Player from 'scripts/player';
import { ISubscriber } from 'scripts/types';

export default class StopPlayer implements ISubscriber {
  private player!: Player;

  Handle(Notify: ControlButtonPressed): void {
    this.player = Notify.player;
    this.player.stop(Notify.vector);
  }
}
