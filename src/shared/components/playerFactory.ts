import CoordinateFactory from 'shared/components/coordinateFactory';
import Player from 'shared/components/player';
import { SerializedPlayer, Team } from 'shared/types';

export default class PlayerFactory {
  static createHostPlayer(hostId: string): Player {
    const [x, y] = CoordinateFactory.createRedCoordinates();
    const player = new Player(hostId, x, y, Team.Red);

    return player;
  }

  static createJoinPlayer(joinerId: string): Player {
    const [x, y] = CoordinateFactory.createBlueCoordinates();
    const player = new Player(joinerId, x, y, Team.Blue);

    return player;
  }

  static deserializePlayer(serializedPlayer: SerializedPlayer): Player {
    const x = CoordinateFactory.deserializeCoordinates(serializedPlayer.x);
    const y = CoordinateFactory.deserializeCoordinates(serializedPlayer.y);
    const player = new Player(serializedPlayer.id, x, y, serializedPlayer.team);

    return player;
  }
}
