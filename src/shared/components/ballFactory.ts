import Ball from 'shared/components/ball';
import CoordinateFactory from 'shared/components/coordinateFactory';
import Globals from 'shared/globals';
import { SerializedBall } from 'shared/types';

export default class BallFactory {
  static createRedBall(): Ball {
    const [x, y] = CoordinateFactory.createRedBallCoordinates();
    const accX = Globals.BALL_STARTING_X_ACCELERATION;
    const accY = Globals.BALL_STARTING_Y_ACCELERATION;

    const ball: Ball = new Ball(x, y, accX, accY);

    return ball;
  }

  static createBlueBall(): Ball {
    const [x, y] = CoordinateFactory.createBlueBallCoordinates();
    const accX = Globals.BALL_STARTING_X_ACCELERATION;
    const accY = Globals.BALL_STARTING_Y_ACCELERATION;

    const ball: Ball = new Ball(x, y, accX, accY);

    return ball;
  }

  static deserializeBall(serializedBall: SerializedBall): Ball {
    const x = CoordinateFactory.deserializeCoordinates(serializedBall.x);
    const y = CoordinateFactory.deserializeCoordinates(serializedBall.y);
    const { accX } = serializedBall;
    const { accY } = serializedBall;
    const ball: Ball = new Ball(x, y, accX, accY);

    return ball;
  }
}
