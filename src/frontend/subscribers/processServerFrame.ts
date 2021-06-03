import ReceivedServerFrame from 'frontend/events/receivedServerFrame';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function processServerFrame(arg: ReceivedServerFrame):void {
  console.log(arg.arg);
};
