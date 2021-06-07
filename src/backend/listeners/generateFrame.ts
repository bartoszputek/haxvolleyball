import Room from 'backend/components/room';
import Player from 'shared/components/player';
import { Socket } from 'socket.io';

export default function generateFrame(socket: Socket, rooms: Room[]) {
  socket.on('requestServerFrame', (roomId: string, timestamp:number) => {
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      const gameState = selectedRoom.getGameState();
      gameState.getPlayers().forEach((player: Player) => {
        player.updatePosition();
      });

      socket.emit('compareGameStates', gameState, timestamp);
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
