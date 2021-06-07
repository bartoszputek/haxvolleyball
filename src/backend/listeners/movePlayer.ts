import Room from 'backend/components/room';
import { Vector } from 'shared/types';
import { Socket } from 'socket.io';

export default function movePlayer(socket: Socket, rooms: Room[]) {
  socket.on('playerMove', (roomId: string, vector:Vector, timestamp:number) => {
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      const gameState = selectedRoom.getGameState();
      const selectedPlayer = gameState.getPlayers().find((player) => player.id === socket.id);
      if (selectedPlayer) {
        selectedPlayer.move(vector);
        socket.emit('compareGameStates', gameState, timestamp);
      } else {
        console.log('The player doesn\'t exist in this room');
      }
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
