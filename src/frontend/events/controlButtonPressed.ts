import Player from 'shared/components/player';
import { EventType, IEvent, Vector } from 'shared/types';

export default class ControlButtonPressed implements IEvent {
  readonly eventType = EventType.KeyPressed;

  vector: Vector;

  player: Player;

  constructor(vector: Vector, player: Player) {
    this.vector = vector;
    this.player = player;
  }
}
