import Room from 'backend/components/room';

function isUnique(rooms:Room[], id: String):Boolean {
  for (let i = 0; i < rooms.length; i += 1) {
    const room = rooms[i];
    if (room.id === id) {
      return false;
    }
  }
  return true;
}

export default function generateID(rooms:Room[]):string {
  let i = 0;
  let id = Math.random().toString(36).substr(2, 9).toUpperCase();
  while (!isUnique(rooms, id)) {
    id = Math.random().toString(36).substr(2, 9).toUpperCase();
    i += 1;
    if (i > 5) {
      throw Error('Cannot generate unique ID!');
    }
  }

  return id;
}
