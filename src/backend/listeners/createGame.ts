import Room from 'backend/components/room';
import generateID from 'backend/utils/generateID';
import getNotification from 'backend/utils/getNotification';
import GameStateFactory from 'shared/components/gameStateFactory';
import { NotificationType } from 'shared/types';
import { Socket } from 'socket.io';

export default function createGame(socket: Socket, rooms: Room[]) {
  socket.on('createGame', () => {
    if (rooms.length > 100) {
      const message = 'Cannot create more rooms!';
      socket.emit('getNotification', ...getNotification(message, NotificationType.Error));
      console.log('Cannot create more rooms!');
    } else {
      const gameState = GameStateFactory.createNewGameState(socket.id);
      const id = generateID(rooms);
      const room = new Room(id, gameState);
      socket.join(id);
      rooms.push(room);
      room.queues.set(socket.id, []);
      const message = 'Room has been created.';
      socket.emit('getNotification', ...getNotification(message, NotificationType.Message));
      socket.emit('createdGame', room.id);
    }
  });
}
