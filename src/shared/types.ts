export type Nullable<T> = T | null;

export enum Team {
  Blue,
  Red,
}

export enum Action {
  Move,
  Stop,
}

export enum Key{
  Right = 'ArrowRight',
  Up = 'ArrowUp',
  Left = 'ArrowLeft',
  Down = 'ArrowDown',
}

export type Vector = {
  direction: string;
  orientation: number;
};

export type SerializedGameState = {
  players:SerializedPlayer[]
  ball:SerializedBall;
};

export type SerializedPlayer = {
  id:string;
  x:SerializedCoordinate;
  y:SerializedCoordinate;
  team:Team;
};

export type SerializedBall = {
  x:SerializedCoordinate;
  y:SerializedCoordinate;
};

export type SerializedCoordinate = {
  value: number;
  delta: number;
  vmax: number;
  orientation: number;
  acceleration: number;
};
