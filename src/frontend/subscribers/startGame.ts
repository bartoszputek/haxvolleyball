import GameStarted from 'frontend/events/gameStarted';
import { SubscriberCallback } from 'shared/types';

export default <SubscriberCallback> function movePlayer(notify: GameStarted):void {
  notify.socket.emit('startGame', notify.gameState);
};
