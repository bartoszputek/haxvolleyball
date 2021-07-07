import Room from 'backend/components/room';
import { Action } from 'shared/types';
import { Socket } from 'socket.io';

export default function processActions(socket: Socket, rooms: Room[]) {
  socket.on('actions', (actions: Action[], roomId: string) => {
    try {
      const selectedRoom = rooms.find((room) => room.id === roomId);
      if (!selectedRoom) {
        throw new Error('The room no longer/never exist!');
      }
      const { gameState } = selectedRoom;
      const player = gameState.getPlayerById(socket.id);
      if (!player) {
        throw new Error('The player doesn\'t exist in this room');
      }
      selectedRoom.queues.set(socket.id, actions);
    } catch (error) {
      console.log(error.message);
    }
  });
}
