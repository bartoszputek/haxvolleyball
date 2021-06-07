import Room from 'backend/components/room';
import GameStateFactory from 'shared/components/gameStateFactory';
import { Socket } from 'socket.io';

export default function startGame(socket: Socket, rooms: Room[]) {
  socket.on('startGame', (timestamp:number) => {
    const gameState = GameStateFactory.createNewGameState(socket.id);
    rooms.push(new Room(socket.id, gameState));
    socket.emit('compareGameStates', gameState, timestamp);
  });
}
