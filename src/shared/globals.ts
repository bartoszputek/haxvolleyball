export default class Globals {
  static CANVAS_CONTAINER_NAME: string = 'gameBoard';

  static TIME_STEP: number = 1000 / 60;

  static CANVAS_HEIGHT: number = 500;

  static CANVAS_WIDTH: number = 1000;

  static PLAYER_RADIUS: number = 20;

  static PLAYER_ACCELERATION: number = 0.3;

  static PLAYER_RED_STARTING_COORDINATES: [number, number] = [120, 150];

  static PLAYER_BLUE_STARTING_COORDINATES: [number, number] = [700, 150];

  static BALL_RADIUS: number = 10;

  static BALL_MAX_ACCELERATION: number = 0.2;

  static BALL_STEP_ACCELERATION: number = 0.002;

  static BALL_PLAYER_ACCELERATION: number = 0.4;

  static BALL_RED_STARTING_COORDINATES: [number, number] = [100, 100];

  static BALL_BLUE_STARTING_COORDINATES: [number, number] = [400, 100];

  static BALL_COLOR: string = '#ffffff';

  static COLOR_BLUE_TEAM: string = '#1650ff';

  static COLOR_RED_TEAM: string = '#ff2e2e';
}
