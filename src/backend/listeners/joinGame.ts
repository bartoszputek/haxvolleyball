import Room from 'backend/components/room';
import getNotification from 'backend/utils/getNotification';
import BallFactory from 'shared/components/ballFactory';
import PlayerFactory from 'shared/components/playerFactory';
import { NotificationType } from 'shared/types';
import { Socket } from 'socket.io';

export default function joinGame(socket: Socket, rooms: Room[],
  startSendingTickets: (room: Room) => void) {
  socket.on('joinGame', (roomId: string) => {
    const selectedRoom = rooms.find((room) => room.id === roomId);
    if (selectedRoom) {
      const hostPlayerId = selectedRoom.gameState.getPlayers()[0].id;
      if (hostPlayerId === socket.id) {
        const message = 'You can\'t join to your room!';
        socket.emit('getNotification', ...getNotification(message, NotificationType.Error));
      } else if (selectedRoom.isFull()) {
        const message = 'The room is full!';
        socket.emit('getNotification', ...getNotification(message, NotificationType.Error));
      } else {
        selectedRoom.queues.set(socket.id, []);
        socket.join(selectedRoom.id);
        const { gameState } = selectedRoom;
        const newPlayer = PlayerFactory.createJoinPlayer(socket.id);
        gameState.addPlayer(newPlayer);
        gameState.setBall(BallFactory.createRedBall());
        socket.emit('joinedGame', gameState, roomId);

        const message = 'Succesfully joined to the room.';
        socket.emit('getNotification', ...getNotification(message, NotificationType.Message));

        socket.to(hostPlayerId).emit('joinedGame', gameState, roomId);
        startSendingTickets(selectedRoom);
      }
    } else {
      const message = 'The room no longer/never exist!';
      socket.emit('getNotification', ...getNotification(message, NotificationType.Error));
      console.log('The room no longer/never exist!');
    }
  });
}
