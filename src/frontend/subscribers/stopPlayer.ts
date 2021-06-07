import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function stopPlayer(notify: ControlButtonPressed):void {
  notify.player.stop(notify.vector);
  notify.socket.emit('stopPlayer', notify.roomId, notify.vector, notify.timestamp);
};
