import ReceivedServerFrame from 'frontend/events/receivedServerFrame';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function requestServerFrame(arg: ReceivedServerFrame):void {
  arg.socket.emit('generateFrame');
};
