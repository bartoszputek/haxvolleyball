export type Nullable<T> = T | null;

export enum Team {
  Blue,
  Red,
}

export interface ISubscriber {
  Handle(Notify: IEvent): void;
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

export enum EventType {
  'KeyPressed',
  'KeyUp',
}

export interface IEvent {
  readonly eventType: EventType;
}

export interface IEventAggregator {
  AddSubscriber(event: EventType, subscriber: ISubscriber): void;
  RemoveSubscriber(event: EventType, subscriber: ISubscriber): void;
  Publish(event: IEvent): void;
}
