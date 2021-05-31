import { IEventAggregator, ISubscriber, MyEvent } from './types';

export default class EventAggregator implements IEventAggregator {
  private subscribers: Map<MyEvent, ISubscriber[]> = new Map<MyEvent, ISubscriber[]>();

  AddSubscriber(event: MyEvent, subscriber: ISubscriber): void {
    if (this.subscribers.has(event) === false) {
      this.subscribers.set(event, []);
    }

    const currentSubscribers = this.subscribers.get(event);
    if (currentSubscribers) {
      currentSubscribers.push(subscriber);
    }
  }

  RemoveSubscriber(event: MyEvent, subscriber: ISubscriber): void {
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

  Publish(event: MyEvent): void {
    if (this.subscribers.has(event)) {
      const currentSubscribers = this.subscribers.get(event);
      if (currentSubscribers) {
        currentSubscribers.forEach((subscriber) => {
          subscriber.Handle(event);
        });
      }
    }
  }
}
