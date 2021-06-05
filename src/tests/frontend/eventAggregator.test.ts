/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import EventAggregator from 'frontend/components/eventAggregator';
import {
  EventType, IEvent, SubscriberCallback,
} from 'shared/types';

class TestEvent1 implements IEvent {
  readonly eventType: EventType = 1;
}

class TestEvent2 implements IEvent {
  readonly eventType: EventType = 2;
}

const callback = (arg: IEvent) => ({}) as SubscriberCallback;
const testCallback1 = jest.fn(() => callback);
const testCallback2 = jest.fn(() => callback);

beforeEach(() => {
  testCallback1.mockClear();
  testCallback2.mockClear();
});

test('Add subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const event1 = new TestEvent1();
  const eventType1 = event1.eventType;
  const event2 = new TestEvent2();
  const eventType2 = event2.eventType;

  ea.AddSubscriber(eventType1, testCallback1);
  ea.AddSubscriber(eventType1, testCallback1);
  ea.AddSubscriber(eventType2, testCallback1);
  ea.AddSubscriber(eventType1, testCallback2);
  ea.Publish(event1);

  expect(testCallback1).toHaveBeenCalledTimes(2);
  expect(testCallback2).toHaveBeenCalledTimes(1);
});

test('Add/remove subscribers and handle them', () => {
  const ea: EventAggregator = new EventAggregator();
  const event = new TestEvent1();
  const { eventType } = event;

  ea.AddSubscriber(eventType, testCallback1);
  ea.RemoveSubscriber(eventType, testCallback1);
  ea.AddSubscriber(eventType, testCallback2);
  ea.Publish(event);

  expect(testCallback1).toHaveBeenCalledTimes(0);
  expect(testCallback2).toHaveBeenCalledTimes(1);
});
