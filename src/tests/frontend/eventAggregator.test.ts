import { mocked } from 'ts-jest/utils';
import { MyEvent } from '../../scripts/types';
import EventAggregator from '../../scripts/eventAggregator';
import PlayerSubscriber from '../../scripts/playerSubscriber';

jest.mock('../../scripts/playerSubscriber');
const mockedPlayerSubscriber = mocked(PlayerSubscriber, true);

beforeEach(() => {
  mocked(PlayerSubscriber, true).mockClear();
});

test('Add subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const ps1 = new PlayerSubscriber();
  const ps2 = new PlayerSubscriber();
  const instancePs1 = mockedPlayerSubscriber.mock.instances[0].Handle;
  const instancePs2 = mockedPlayerSubscriber.mock.instances[1].Handle;

  ea.AddSubscriber(MyEvent.Event1, ps1);
  ea.AddSubscriber(MyEvent.Event1, ps2);
  ea.Publish(MyEvent.Event1);

  expect(instancePs1).toHaveBeenCalledTimes(1);
  expect(instancePs2).toHaveBeenCalledTimes(1);
});

test('Add/remove subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const ps1 = new PlayerSubscriber();
  const ps2 = new PlayerSubscriber();
  const ps3 = new PlayerSubscriber();
  const ps4 = new PlayerSubscriber();
  const instancePs1 = mockedPlayerSubscriber.mock.instances[0].Handle;
  const instancePs2 = mockedPlayerSubscriber.mock.instances[1].Handle;
  const instancePs3 = mockedPlayerSubscriber.mock.instances[2].Handle;
  const instancePs4 = mockedPlayerSubscriber.mock.instances[3].Handle;

  ea.AddSubscriber(MyEvent.Event1, ps1);
  ea.AddSubscriber(MyEvent.Event1, ps1);
  ea.AddSubscriber(MyEvent.Event1, ps2);
  ea.AddSubscriber(MyEvent.Event1, ps3);
  ea.RemoveSubscriber(MyEvent.Event1, ps2);
  ea.RemoveSubscriber(MyEvent.Event1, ps4);

  ea.Publish(MyEvent.Event2);

  expect(instancePs1).toHaveBeenCalledTimes(0);
  expect(instancePs2).toHaveBeenCalledTimes(0);
  expect(instancePs3).toHaveBeenCalledTimes(0);
  expect(instancePs4).toHaveBeenCalledTimes(0);

  ea.Publish(MyEvent.Event1);

  expect(instancePs1).toHaveBeenCalledTimes(2);
  expect(instancePs2).toHaveBeenCalledTimes(0);
  expect(instancePs3).toHaveBeenCalledTimes(1);
  expect(instancePs4).toHaveBeenCalledTimes(0);
});
