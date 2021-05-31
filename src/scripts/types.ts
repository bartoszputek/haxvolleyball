export type Nullable<T> = T | null;

export enum Team {
  Blue,
  Red,
}

export interface ISubscriber {
  Handle(Notify: MyEvent): void;
}

export enum MyEvent {
  Event1,
  Event2,
}

export interface IEventAggregator {
  AddSubscriber(event: MyEvent, subscriber: ISubscriber): void;
  RemoveSubscriber(event: MyEvent, subscriber: ISubscriber): void;
  Publish(event: MyEvent): void;
}
