import Player from 'shared/components/player';
import WorldUpdater from 'shared/components/worldUpdater';
import {
  Action, Command, Entity, Key, Vector,
} from 'shared/types';

export default function setupControls(player: Player, worldUpdater: WorldUpdater) {
  document.addEventListener('keydown', (e) => {
    function move(vector: Vector) {
      if (!player.isMoving(vector)) {
        const action: Action = {
          entity: Entity.Player,
          command: Command.PlayerMove,
          args: vector,
        };
        worldUpdater.addPlayerAction(player, action);
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
    function stop(vector: Vector) {
      const action: Action = {
        entity: Entity.Player,
        command: Command.PlayerStop,
        args: vector,
      };
      worldUpdater.addPlayerAction(player, action);
    }

    if (e.key === Key.Right) {
      const vector: Vector = { direction: 'x', orientation: 1 };
      stop(vector);
    }
    if (e.key === Key.Up) {
      const vector: Vector = { direction: 'y', orientation: -1 };
      stop(vector);
    }
    if (e.key === Key.Left) {
      const vector: Vector = { direction: 'x', orientation: -1 };
      stop(vector);
    }
    if (e.key === Key.Down) {
      const vector: Vector = { direction: 'y', orientation: 1 };
      stop(vector);
    }
  });
}
