import Room from 'backend/components/room';

export default function getSocketRoom(socketId: string, rooms: Room[]): Room | undefined {
  return rooms.find((room) => room.gameState.getPlayerById(socketId));
}
