import GenerateLocalFrame from 'frontend/events/generateLocalFrame';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function requestServerFrame(notify: GenerateLocalFrame):void {
  notify.socket.emit('requestServerFrame', notify.roomId, notify.timestamp);
};
