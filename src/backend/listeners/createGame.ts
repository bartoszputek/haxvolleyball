import logger from 'backend/components/logger';
import Room from 'backend/components/room';
import generateID from 'backend/utils/generateID';
import getNotification from 'backend/utils/getNotification';
import getSocketRoom from 'backend/utils/getSocketRoom';
import GameStateFactory from 'shared/components/gameStateFactory';
import Globals from 'shared/globals';
import { NotificationType } from 'shared/types';
import { Socket } from 'socket.io';

export default function createGame(socket: Socket, rooms: Room[]) {
  socket.on('createGame', () => {
    try {
      if (rooms.length > Globals.MAX_ROOMS_NUMBER) {
        throw new Error('Cannot create more rooms!');
      }
      if (getSocketRoom(socket.id, rooms)) {
        throw new Error('You have already created the room!');
      }

      const gameState = GameStateFactory.createNewGameState(socket.id);
      const id = generateID(rooms);
      const room = new Room(id, gameState);
      socket.join(id);
      rooms.push(room);
      room.queues.set(socket.id, []);

      const message = 'Room has been created.';
      socket.emit('getNotification', ...getNotification(message, NotificationType.Message));
      socket.emit('createdGame', room.id);
    } catch (error) {
      socket.emit('getNotification', ...getNotification(error.message, NotificationType.Error));
      logger.error(error);
    }
  });
}
