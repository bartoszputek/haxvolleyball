import Room from 'backend/components/room';
import PlayerFactory from 'shared/components/playerFactory';
import { Socket } from 'socket.io';

export default function joinGame(socket: Socket, rooms: Room[], startSendingTickets: any) {
  socket.on('joinGame', (roomId: string) => {
    console.log(roomId);
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      socket.join(roomId);
      const gameState = selectedRoom.getGameState();
      const newPlayer = PlayerFactory.createJoinPlayer(socket.id);
      gameState.addPlayer(newPlayer);
      socket.emit('joinedGame', gameState, roomId, 1);
      startSendingTickets(selectedRoom);
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
