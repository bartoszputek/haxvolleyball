import { SerializedCoordinate } from 'shared/types';
import Coordinate from 'shared/components/coordinate';
import Globals from 'shared/globals';

export default class CoordinateFactory {
  static createRedCoordinates(): [Coordinate, Coordinate] {
    const x: Coordinate = new Coordinate(120,
      Globals.PLAYER_VMAX, Globals.PLAYER_ACCELERATION, 0, 0);
    const y: Coordinate = new Coordinate(150,
      Globals.PLAYER_VMAX, Globals.PLAYER_ACCELERATION, 0, 0);
    return [x, y];
  }

  static deserializeCoordinates(serializedCoordinates: SerializedCoordinate): Coordinate {
    const coordinate: Coordinate = new Coordinate(
      serializedCoordinates.value,
      serializedCoordinates.vmax,
      serializedCoordinates.acceleration,
      serializedCoordinates.orientation,
      serializedCoordinates.delta,
    );

    return coordinate;
  }
}
