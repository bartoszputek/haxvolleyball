import Ball from './ball';
import CoordinateFactory from './coordinateFactory';

export default class BallFactory {
  static createRedBall(): Ball {
    const [x, y] = CoordinateFactory.createRedBallCoordinates();

    const ball: Ball = new Ball(x, y);

    return ball;
  }

  static createBlueBall(): Ball {
    const [x, y] = CoordinateFactory.createBlueBallCoordinates();

    const ball: Ball = new Ball(x, y);

    return ball;
  }
}
