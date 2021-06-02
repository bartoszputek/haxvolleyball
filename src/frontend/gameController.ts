import EventAggregator from 'frontend/eventAggregator';
import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import Player from 'shared/components/player';
import { Key, Team, Vector } from 'shared/types';
import { io } from 'socket.io-client';
import ControlButtonUp from './events/controlButtonUp';

export default class GameController {
  private socket = io();

  private eventAggregator: EventAggregator;

  private players: Player[] = [];

  constructor(eventAggregator: EventAggregator) {
    this.socket.emit('startGame');
    // this.socket.on('get', (arg) => {
    //   console.log(arg);
    //   // this.players.push(new Player(arg));
    //   this.players.push(new Player('1', 120, 150, Team.Red));
    // });

    this.players.push(new Player('1', 120, 150, Team.Red));

    this.eventAggregator = eventAggregator;
    this.setupListeners();
    this.setupSocket();
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === Key.Right) {
        const vector:Vector = { direction: 'x', orientation: 1 };
        this.eventAggregator.Publish(new ControlButtonPressed(vector, this.players[0]));
      }
      if (e.key === Key.Up) {
        const vector:Vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(new ControlButtonPressed(vector, this.players[0]));
      }
      if (e.key === Key.Left) {
        const vector:Vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(new ControlButtonPressed(vector, this.players[0]));
      }
      if (e.key === Key.Down) {
        const vector:Vector = { direction: 'y', orientation: 1 };
        this.eventAggregator.Publish(new ControlButtonPressed(vector, this.players[0]));
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === Key.Right) {
        const vector:Vector = { direction: 'x', orientation: 1 };
        this.eventAggregator.Publish(new ControlButtonUp(vector, this.players[0]));
      }
      if (e.key === Key.Up) {
        const vector:Vector = { direction: 'y', orientation: -1 };
        this.eventAggregator.Publish(new ControlButtonUp(vector, this.players[0]));
      }
      if (e.key === Key.Left) {
        const vector:Vector = { direction: 'x', orientation: -1 };
        this.eventAggregator.Publish(new ControlButtonUp(vector, this.players[0]));
      }
      if (e.key === Key.Down) {
        const vector:Vector = { direction: 'y', orientation: 1 };
        this.eventAggregator.Publish(new ControlButtonUp(vector, this.players[0]));
      }
    });
  }

  private setupSocket() {
    this.socket.on('dwa', () => {
      // this.players[0] = new Player(arg);
    });
  }

  getPlayers(): Player[] {
    return this.players;
  }

  updatePlayers(): void {
    this.players[0].updatePosition();
    this.socket.emit('siedem');
  }
}
