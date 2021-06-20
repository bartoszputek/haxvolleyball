import Room from 'backend/components/room';
import GameStateFactory from 'shared/components/gameStateFactory';
import { Socket } from 'socket.io';

export default function createGame(socket: Socket, rooms: Room[]) {
  socket.on('createGame', () => {
    const gameState = GameStateFactory.createNewGameState(socket.id);
    const room = new Room(socket.id, gameState);
    rooms.push(room);
    room.queues.set(socket.id, []);
  });
}
