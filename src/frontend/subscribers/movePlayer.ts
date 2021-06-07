import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function movePlayer(notify: ControlButtonPressed):void {
  if (notify.player.isMoving(notify.vector)) {
    notify.player.move(notify.vector);
    notify.socket.emit('playerMove', notify.roomId, notify.vector, notify.timestamp);
  }
};
