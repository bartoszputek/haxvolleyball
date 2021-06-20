import Room from 'backend/components/room';
import PlayerFactory from 'shared/components/playerFactory';
import { Socket } from 'socket.io';

export default function joinGame(socket: Socket, rooms: Room[], startSendingTickets: any) {
  socket.on('joinGame', (roomId: string) => {
    console.log(roomId);
    const selectedRoom = rooms.find((room) => room.id === roomId);
    if (selectedRoom) {
      selectedRoom.queues.set(socket.id, []);
      const { gameState } = selectedRoom;
      const newPlayer = PlayerFactory.createJoinPlayer(socket.id);
      gameState.addPlayer(newPlayer);
      socket.emit('joinedGame', gameState, roomId);
      socket.to(roomId).emit('joinedGame', gameState, roomId);
      startSendingTickets(selectedRoom);
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
