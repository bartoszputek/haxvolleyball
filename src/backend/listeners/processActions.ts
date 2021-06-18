import Room from 'backend/components/room';
import { Socket } from 'socket.io';

export default function processActions(socket: Socket, rooms: Room[]) {
  socket.on('actions', (actions: any, roomId: string) => {
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      const gameState = selectedRoom.getGameState();
      const player = gameState.getPlayerById(socket.id);
      if (player) {
        player.queue = actions;
      } else {
        console.log('The player doesn\'t exist in this room');
      }
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
