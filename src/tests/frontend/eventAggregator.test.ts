import { mocked } from 'ts-jest/utils';
import EventAggregator from 'scripts/eventAggregator';
import ControlButtonPressed from 'scripts/events/controlButtonPressed';
import { EventType } from 'scripts/types';
import MovePlayer from 'scripts/subscribers/movePlayer';
import GameController from 'scripts/gameController';
import Player from 'scripts/player';

jest.mock('scripts/playerSubscriber');
const mockedPlayerSubscriber = mocked(MovePlayer, true);

beforeEach(() => {
  mocked(MovePlayer, true).mockClear();
});

test('Add subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const ps1 = new MovePlayer();
  const ps2 = new MovePlayer();
  const cbp = new ControlButtonPressed('ArrowLeft');
  const instancePs1 = mockedPlayerSubscriber.mock.instances[0].Handle;
  const instancePs2 = mockedPlayerSubscriber.mock.instances[1].Handle;

  ea.AddSubscriber(EventType.KeyPressed, ps1);
  ea.AddSubscriber(EventType.KeyPressed, ps2);
  ea.Publish(cbp);

  expect(instancePs1).toHaveBeenCalledTimes(1);
  expect(instancePs2).toHaveBeenCalledTimes(1);
});

test('Add/remove subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const ps1 = new MovePlayer();
  const ps2 = new MovePlayer();
  const ps3 = new MovePlayer();
  const ps4 = new MovePlayer();
  const cbp = new ControlButtonPressed('ArrowLeft');
  const instancePs1 = mockedPlayerSubscriber.mock.instances[0].Handle;
  const instancePs2 = mockedPlayerSubscriber.mock.instances[1].Handle;
  const instancePs3 = mockedPlayerSubscriber.mock.instances[2].Handle;
  const instancePs4 = mockedPlayerSubscriber.mock.instances[3].Handle;

  ea.AddSubscriber(EventType.KeyPressed, ps1);
  ea.AddSubscriber(EventType.KeyPressed, ps1);
  ea.AddSubscriber(EventType.KeyPressed, ps2);
  ea.AddSubscriber(EventType.KeyPressed, ps3);
  ea.RemoveSubscriber(EventType.KeyPressed, ps2);
  ea.RemoveSubscriber(EventType.KeyPressed, ps4);

  expect(instancePs1).toHaveBeenCalledTimes(0);
  expect(instancePs2).toHaveBeenCalledTimes(0);
  expect(instancePs3).toHaveBeenCalledTimes(0);
  expect(instancePs4).toHaveBeenCalledTimes(0);

  ea.Publish(cbp);

  expect(instancePs1).toHaveBeenCalledTimes(2);
  expect(instancePs2).toHaveBeenCalledTimes(0);
  expect(instancePs3).toHaveBeenCalledTimes(1);
  expect(instancePs4).toHaveBeenCalledTimes(0);
});
