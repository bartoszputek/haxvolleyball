import Room from 'backend/components/room';
import generateID from 'backend/utils/generateID';
import GameStateFactory from 'shared/components/gameStateFactory';
import { Socket } from 'socket.io';

export default function createGame(socket: Socket, rooms: Room[]) {
  socket.on('createGame', () => {
    if (rooms.length > 100) {
      console.log('Cannot create more rooms!');
    } else {
      const gameState = GameStateFactory.createNewGameState(socket.id);
      const id = generateID(rooms);
      const room = new Room(id, gameState);
      rooms.push(room);
      room.queues.set(socket.id, []);
      socket.emit('createdGame', room.id);
    }
  });
}
