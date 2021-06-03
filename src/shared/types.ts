export type Nullable<T> = T | null;

export enum Team {
  Blue,
  Red,
}

export enum Key{
  Right = 'ArrowRight',
  Up = 'ArrowUp',
  Left = 'ArrowLeft',
  Down = 'ArrowDown',
}

export type Vector = {
  direction: string;
  orientation: number;
};

export interface ISubscriber {
  Handle(Notify: IEvent): void;
}

export enum EventType {
  'KeyPressed',
  'KeyUp',
  'GenerateLocalFrame',
  'ReceivedServerFrame',
}

export interface IEvent {
  readonly eventType: EventType;
}

export type SubscriberCallback = (arg: IEvent) => void;

export interface IEventAggregator {
  AddSubscriber(event: EventType, subscriber: SubscriberCallback): void;
  RemoveSubscriber(event: EventType, subscriber: SubscriberCallback): void;
  Publish(event: IEvent): void;
}
