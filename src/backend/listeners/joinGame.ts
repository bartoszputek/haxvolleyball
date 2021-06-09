import Room from 'backend/components/room';
import PlayerFactory from 'shared/components/playerFactory';
import { Socket } from 'socket.io';

export default function joinGame(socket: Socket, rooms: Room[], io: any) {
  socket.on('joinGame', (timestamp:number, roomId: string) => {
    const selectedRoom = rooms.find((room) => room.getId() === roomId);
    if (selectedRoom) {
      const gameState = selectedRoom.getGameState();
      const newPlayer = PlayerFactory.createJoinPlayer(socket.id);
      gameState.addPlayer(newPlayer);
      io.to(socket.id).emit('joinedGame', gameState, roomId);
      socket.emit('compareGameStates', gameState, timestamp);
    } else {
      console.log('The room no longer/never exist!');
    }
  });
}
