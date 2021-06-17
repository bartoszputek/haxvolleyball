import GameState from 'shared/components/gameState';
import Player from 'shared/components/player';
import EventAggregator from 'frontend/components/eventAggregator';
import { Key } from 'shared/types';
import ControlButtonPressed from 'frontend/events/controlButtonPressed';
import ControlButtonUp from 'frontend/events/controlButtonUp';

export default function setupControls(socket: any, roomId: string,
  gameState: GameState, player: Player, eventAggregator: EventAggregator) {
  document.addEventListener('keydown', (e) => {
    const args = {
      socket,
      roomId,
      vector: { direction: 'x', orientation: 1 },
      gameState,
      player,
    };
    if (e.key === Key.Right) {
      eventAggregator.Publish(
        new ControlButtonPressed(args),
      );
    }
    if (e.key === Key.Up) {
      args.vector = { direction: 'y', orientation: -1 };
      eventAggregator.Publish(
        new ControlButtonPressed(args),
      );
    }
    if (e.key === Key.Left) {
      args.vector = { direction: 'x', orientation: -1 };
      eventAggregator.Publish(
        new ControlButtonPressed(args),
      );
    }
    if (e.key === Key.Down) {
      args.vector = { direction: 'y', orientation: 1 };
      eventAggregator.Publish(
        new ControlButtonPressed(args),
      );
    }
  });

  document.addEventListener('keyup', (e) => {
    const args = {
      socket,
      roomId,
      vector: { direction: 'x', orientation: 1 },
      gameState,
      player,
    };
    if (e.key === Key.Right) {
      eventAggregator.Publish(
        new ControlButtonUp(args),
      );
    }
    if (e.key === Key.Up) {
      args.vector = { direction: 'y', orientation: -1 };
      eventAggregator.Publish(
        new ControlButtonUp(args),
      );
    }
    if (e.key === Key.Left) {
      args.vector = { direction: 'x', orientation: -1 };
      eventAggregator.Publish(
        new ControlButtonUp(args),
      );
    }
    if (e.key === Key.Down) {
      args.vector = { direction: 'y', orientation: 1 };
      eventAggregator.Publish(
        new ControlButtonUp(args),
      );
    }
  });
}
