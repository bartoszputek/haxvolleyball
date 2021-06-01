import Player from 'scripts/player';
import { EventType, IEvent, Vector } from 'scripts/types';

export default class ControlButtonUp implements IEvent {
  readonly eventType = EventType.KeyUp;

  vector: Vector;

  player: Player;

  constructor(vector: Vector, player: Player) {
    this.vector = vector;
    this.player = player;
  }
}
