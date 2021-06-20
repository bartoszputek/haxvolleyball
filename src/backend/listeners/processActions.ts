import Room from 'backend/components/room';
import { Action } from 'shared/types';
import { Socket } from 'socket.io';

export default function processActions(socket: Socket, rooms: Room[]) {
  socket.on('actions', (actions: [Action, any][], roomId: string) => {
    const selectedRoom = rooms.find((room) => room.id === roomId);
    if (selectedRoom) {
      const { gameState } = selectedRoom;
      const player = gameState.getPlayerById(socket.id);
      if (player) {
        if (actions.length > 0) {
          console.log(actions);
        }
        selectedRoom.queues.set(socket.id, actions);
      } else {
        console.log('The player doesn\'t exist in this room');
      }
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
