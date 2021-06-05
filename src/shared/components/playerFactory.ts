import Player from 'shared/components/player';
import { SerializedPlayer, Team } from 'shared/types';
import CoordinateFactory from './coordinateFactory';

export default class GameStateFactory {
  static createHostPlayer(hostId: string): Player {
    const [x, y] = CoordinateFactory.createRedCoordinates();
    const player = new Player(hostId, x, y, Team.Red);

    return player;
  }

  static deserializePlayer(serializedPlayer: SerializedPlayer): Player {
    const x = CoordinateFactory.deserializeCoordinates(serializedPlayer.x);
    const y = CoordinateFactory.deserializeCoordinates(serializedPlayer.y);
    const player = new Player(serializedPlayer.id, x, y, serializedPlayer.team);

    return player;
  }
}
