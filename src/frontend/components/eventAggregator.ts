import {
  IEvent, EventType, SubscriberCallback,
} from 'shared/types';

export default class EventNew {
  private subscribers: Map<EventType, SubscriberCallback[]> = new Map
  <EventType, SubscriberCallback[]>();

  AddSubscriber(event: EventType, subscriber: SubscriberCallback): void {
    if (this.subscribers.has(event) === false) {
      this.subscribers.set(event, []);
    }

    const currentSubscribers = this.subscribers.get(event);
    if (currentSubscribers) {
      currentSubscribers.push(subscriber);
    }
  }

  RemoveSubscriber(event: EventType, subscriber: SubscriberCallback): void {
    if (this.subscribers.has(event)) {
      const currentSubscribers = this.subscribers.get(event);
      if (currentSubscribers) {
        const index = currentSubscribers.indexOf(subscriber, 0);
        if (index > -1) {
          currentSubscribers.splice(index, 1);
        }
      }
    }
  }

  Publish(event: IEvent): void {
    if (this.subscribers.has(event.eventType)) {
      const currentSubscribers = this.subscribers.get(event.eventType);
      if (currentSubscribers) {
        currentSubscribers.forEach((subscriber) => {
          subscriber(event);
        });
      }
    }
  }
}
