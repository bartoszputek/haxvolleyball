import EventAggregator from 'scripts/eventAggregator';
import ControlButtonPressed from 'scripts/events/controlButtonPressed';
import Player from 'scripts/player';
import { Key, Team, Vector } from 'scripts/types';
import ControlButtonUp from './events/controlButtonUp';

export default class GameController {
  private eventAggregator: EventAggregator;

  private players: Player[] = [];

  constructor(eventAggregator: EventAggregator) {
    this.players.push(new Player(100, 120, Team.Red));
    this.eventAggregator = eventAggregator;
    this.setupListeners();
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

  getPlayers(): Player[] {
    return this.players;
  }
}
