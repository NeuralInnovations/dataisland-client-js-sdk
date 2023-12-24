import { Disposable, disposable, disposableContainer } from "./disposable";

export namespace Events {
    export interface Events<TE, TD> {
        get events(): EventDispatcher<TE, TD>;
    }

    export interface Input<ET, DT> {
        type: ET;
        data: DT;
    }

    export interface Event<ET, DT> extends Input<ET, DT> {
        unsubscribe(): void;
    }

    export interface EventSubscriber<ET, DT> {
        on(callback: (event: Event<ET, DT>) => void, type?: ET): Disposable;
    }

    export interface EventDispatcher<ET, DT> extends EventSubscriber<ET, DT> {
        dispatch(input: Input<ET, DT>): void;
    }

    export function dispatcher<ET, DT>(): EventDispatcher<ET, DT> {
        return new EventDispatcherImpl<ET, DT>();
    }

    class EventDispatcherImpl<ET, DT> implements EventDispatcher<ET, DT> {
        private _listeners: { callback: Function, disposable: Disposable }[] = [];

        dispatch(input: Input<ET, DT>): void {
            this._listeners.slice().forEach(it => it.callback({
                type: input.type,
                data: input.data,
                unsubscribe: () => {
                    it.disposable.dispose();
                }
            }));
        }

        on(callback: (event: Event<ET, DT>) => void, type?: ET): Disposable {
            const container = disposableContainer()
            if (type !== undefined) {
                const cb = callback;
                function listener(evt: Event<ET, DT>) {
                    if (evt.type === type) {
                        cb(evt);
                    }
                }
                const value = { callback: listener, disposable: container };
                container.addCallback(() => {
                    this._listeners = this._listeners.filter(it => it !== value);
                }, this);

                this._listeners.push(value);

                return container;
            }

            const value = { callback: callback, disposable: container };
            this._listeners.push(value);
            return disposable(() => {
                this._listeners = this._listeners.filter(it => it !== value);
            }, this);
        }

    }
}
