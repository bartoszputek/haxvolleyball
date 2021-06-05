import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function movePlayer(notify: ControlButtonPressed):void {
  notify.socket.emit('playerMove', notify.roomId, notify.vector);
  notify.player.move(notify.vector);
};
