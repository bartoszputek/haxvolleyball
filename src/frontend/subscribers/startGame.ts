import GameStarted from 'frontend/events/gameStarted';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function startGame(notify: GameStarted):void {
  notify.socket.emit('startGame', notify.timestamp);
};
