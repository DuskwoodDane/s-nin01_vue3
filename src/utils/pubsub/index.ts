import type { SearchAreaDataType, EventsName, subscribeCallback, SwitchStyle } from '@/utils/interface/pubsub';

class Pubsub {
  private readonly container = new Map<EventsName, Function[]>([]);

  /** 发布 */
  publish(name: 'switchStyle', data: SwitchStyle): void
  publish(name: 'highArea', data: string): void
  publish(name: 'searchAreaData', data: SearchAreaDataType): void
  publish(name: EventsName, data: any) {
    const fn = this.container.get(name);
    if (!fn) throw new ReferenceError(`${name}事件未被订阅`);
    fn.forEach((f) => f(...[name, data]));
  }

  /** 订阅 */
  subscribe(name: 'switchStyle', fn: subscribeCallback<SwitchStyle>): void
  subscribe(name: 'highArea', fn: subscribeCallback<string>): void
  subscribe(name: 'searchAreaData', fn: subscribeCallback<SearchAreaDataType>): void
  subscribe(name: EventsName, fn: subscribeCallback<any>) {
    const _fns = this.container.get(name);
    const fns = _fns ? _fns : [];
    fns?.push(fn);
    this.container.set(name, fns);
  }

  /** 取消订阅 */
  unsubscribe(name: EventsName) {
    const have = this.container.get(name);

    if (!have) throw new ReferenceError(`${name}事件未被订阅`);

    this.container.delete(name);
  }

}

const pubsub = new Pubsub();

export default pubsub;
