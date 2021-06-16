import JoiningGame from 'frontend/events/joiningGame';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function joinGame(notify: JoiningGame):void {
  notify.socket.emit('joinGame', notify.roomId);
};
