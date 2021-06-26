import GameState from 'shared/components/gameState';
import WorldUpdater from 'shared/components/worldUpdater';
import { Action } from 'shared/types';

export default class Room {
  id:string;

  gameState: GameState;

  worldUpdater!: WorldUpdater;

  queues:Map<string, Action[]> = new Map();

  constructor(id:string, gameState: GameState) {
    this.id = id;
    this.gameState = gameState;
  }
}
