import getCurrentTime from 'backend/utils/getCurrentTime';
import { NotificationType } from 'shared/types';

export default function getNotification(content:string, type:NotificationType)
  : [string, NotificationType] {
  const time = getCurrentTime();
  const message = `[${time}] ${content}`;
  return [message, type];
  // socket.emit('getNotification', message, type);
}
