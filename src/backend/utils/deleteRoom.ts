import Room from 'backend/components/room';

export default function deleteRoom(room: Room, rooms: Room[]): void {
  const index = rooms.indexOf(room);
  if (index > -1) {
    rooms.splice(index, 1);
  }
}
