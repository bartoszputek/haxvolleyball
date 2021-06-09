export default class Globals {
  static CANVAS_CONTAINER_NAME: string = 'gameBoard';

  static TIME_STEP: number = 1000 / 60;

  static CANVAS_HEIGHT: number = 500;

  static CANVAS_WIDTH: number = 1000;

  static PLAYER_RADIUS: number = 20;

  static PLAYER_VMAX: number = 5;

  static PLAYER_ACCELERATION: number = 3;

  static PLAYER_RED_STARTING_COORDINATES: [number, number] = [120, 150];

  static PLAYER_BLUE_STARTING_COORDINATES: [number, number] = [700, 150];

  static COLOR_BLUE_TEAM: string = '#1650ff';

  static COLOR_RED_TEAM: string = '#ff2e2e';
}
