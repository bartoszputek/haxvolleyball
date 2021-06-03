import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function StopPlayer(arg: ControlButtonPressed):void {
  arg.player.stop(arg.vector);
};
