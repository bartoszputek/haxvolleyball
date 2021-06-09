import { SerializedCoordinate } from 'shared/types';
import Coordinate from 'shared/components/coordinate';
import Globals from 'shared/globals';

export default class CoordinateFactory {
  static createRedCoordinates(): [Coordinate, Coordinate] {
    const x: Coordinate = new Coordinate(Globals.PLAYER_RED_STARTING_COORDINATES[0], 0);
    const y: Coordinate = new Coordinate(Globals.PLAYER_RED_STARTING_COORDINATES[1], 0);
    return [x, y];
  }

  static createBlueCoordinates(): [Coordinate, Coordinate] {
    const x: Coordinate = new Coordinate(Globals.PLAYER_BLUE_STARTING_COORDINATES[0], 0);
    const y: Coordinate = new Coordinate(Globals.PLAYER_BLUE_STARTING_COORDINATES[1], 0);
    return [x, y];
  }

  static deserializeCoordinates(serializedCoordinates: SerializedCoordinate): Coordinate {
    const coordinate: Coordinate = new Coordinate(
      serializedCoordinates.value,
      serializedCoordinates.orientation,
    );

    return coordinate;
  }
}
