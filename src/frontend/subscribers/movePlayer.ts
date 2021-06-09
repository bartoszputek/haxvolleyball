import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function movePlayer(notify: ControlButtonPressed):void {
  const { player } = notify;
  if (!player.isMoving(notify.vector)) {
    player.move(notify.vector);
    notify.cb(notify.timestamp, notify.gameState);
    notify.socket.emit('playerMove', notify.roomId, notify.vector, notify.timestamp);
  }
};
