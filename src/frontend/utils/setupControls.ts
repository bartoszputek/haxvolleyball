import Player from 'shared/components/player';
import WorldUpdater from 'shared/components/worldUpdater';
import { Action, Key, Vector } from 'shared/types';

export default function setupControls(player: Player, worldUpdater: WorldUpdater) {
  document.addEventListener('keydown', (e) => {
    function move(vector: Vector) {
      if (!player.isMoving(vector)) {
        worldUpdater.addPlayerAction(player, Action.Move, vector);
      }
    }

    if (e.key === Key.Right) {
      const vector: Vector = { direction: 'x', orientation: 1 };
      move(vector);
    }
    if (e.key === Key.Up) {
      const vector: Vector = { direction: 'y', orientation: -1 };
      move(vector);
    }
    if (e.key === Key.Left) {
      const vector: Vector = { direction: 'x', orientation: -1 };
      move(vector);
    }
    if (e.key === Key.Down) {
      const vector: Vector = { direction: 'y', orientation: 1 };
      move(vector);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === Key.Right) {
      const vector: Vector = { direction: 'x', orientation: 1 };
      worldUpdater.addPlayerAction(player, Action.Stop, vector);
    }
    if (e.key === Key.Up) {
      const vector: Vector = { direction: 'y', orientation: -1 };
      worldUpdater.addPlayerAction(player, Action.Stop, vector);
    }
    if (e.key === Key.Left) {
      const vector: Vector = { direction: 'x', orientation: -1 };
      worldUpdater.addPlayerAction(player, Action.Stop, vector);
    }
    if (e.key === Key.Down) {
      const vector: Vector = { direction: 'y', orientation: 1 };
      worldUpdater.addPlayerAction(player, Action.Stop, vector);
    }
  });
}
