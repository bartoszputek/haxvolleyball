import GameState from 'shared/components/gameState';
import { EventType, IEvent } from 'shared/types';
import { Socket } from 'socket.io-client';

export default class GameStarted implements IEvent {
  readonly eventType = EventType.GameStarted;

  gameState: GameState;

  socket: Socket;

  constructor(args:{ gameState:GameState, socket: Socket }) {
    this.gameState = args.gameState;
    this.socket = args.socket;
  }
}
