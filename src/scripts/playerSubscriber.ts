import { ISubscriber, MyEvent } from './types';

export default class PlayerSubscriber implements ISubscriber {
  Handle(Notify: MyEvent): void {}
}
