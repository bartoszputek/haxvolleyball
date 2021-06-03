import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function movePlayer(arg: ControlButtonPressed):void {
  // this.socket.emit('move', Notify.player, Notify.vector);
  arg.player.move(arg.vector);
};
