import Room from 'backend/components/room';
import getNotification from 'backend/utils/getNotification';
import getSocketRoom from 'backend/utils/getSocketRoom';
import { NotificationType } from 'shared/types';
import { Socket } from 'socket.io';

export default function leaveGame(socket: Socket, rooms: Room[]) {
  socket.on('disconnecting', () => {
    const room = getSocketRoom(socket.id, rooms);
    if (room) {
      clearInterval(room.interval);
      const message = 'Player has left the game!';
      socket.to(room.id).emit('getNotification', ...getNotification(message, NotificationType.Error));
      socket.to(room.id).emit('resetGame');
    }
  });
}
