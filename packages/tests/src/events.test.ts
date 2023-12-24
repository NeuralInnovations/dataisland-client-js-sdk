import { Events } from "../../app/src/index";

test('Events, test general', () => {
    enum ET {
        A,
        B,
    }
    const dispatcher = Events.dispatcher<ET, number>();

    let a1 = 0, a2 = 0, b1 = 0, b2 = 0;

    const aDisposable1 = dispatcher.on((evt) => { a1 += evt.data; }, ET.A);
    const aDisposable2 = dispatcher.on((evt) => { if (evt.type == ET.A) a2 += evt.data; });
    const bDisposable1 = dispatcher.on((evt) => { b1 += evt.data; }, ET.B);
    const bDisposable2 = dispatcher.on((evt) => { if (evt.type == ET.B) b2 += evt.data; });

    dispatcher.dispatch({ type: ET.A, data: 1 });

    expect(a1).toBe(1);
    expect(a2).toBe(1);
    expect(b1).toBe(0);
    expect(b2).toBe(0);

    aDisposable1.dispose();

    dispatcher.dispatch({ type: ET.A, data: 2 });
    dispatcher.dispatch({ type: ET.B, data: 3 });

    expect(a1).toBe(1);
    expect(a2).toBe(3);
    expect(b1).toBe(3);
    expect(b2).toBe(3);

    aDisposable2.dispose();

    dispatcher.dispatch({ type: ET.A, data: 3 });

    expect(a1).toBe(1);
    expect(a2).toBe(3);
    expect(b1).toBe(3);
    expect(b2).toBe(3);

    bDisposable1.dispose();
    bDisposable2.dispose();

    dispatcher.dispatch({ type: ET.B, data: 4 });

    expect(a1).toBe(1);
    expect(a2).toBe(3);
    expect(b1).toBe(3);
    expect(b2).toBe(3);
});

test('Events, test this', () => {
    enum ET {
        A,
        B,
    }
    const dispatcher = Events.dispatcher<ET, number>();

    let a = {
        value: 0
    };
    let b = {
        value: 0
    };

    const aDisposable = dispatcher.on((evt) => { a.value += evt.data; }, ET.A);
    const bDisposable = dispatcher.on((evt) => { b.value += evt.data; }, ET.B);

    dispatcher.dispatch({ type: ET.A, data: 1 });
    dispatcher.dispatch({ type: ET.B, data: 2 });

    expect(a.value).toBe(1);
    expect(b.value).toBe(2);

    aDisposable.dispose();
    bDisposable.dispose();

    dispatcher.dispatch({ type: ET.A, data: 3 });
    dispatcher.dispatch({ type: ET.B, data: 4 });

    expect(a.value).toBe(1);
    expect(b.value).toBe(2);
});

test('Events, test unsubscribe', () => {
    const dispatcher = Events.dispatcher<any, number>();

    let index = 0;

    dispatcher.on((evt) => { index += evt.data; evt.unsubscribe(); });
    dispatcher.on((evt) => { index += evt.data; });

    dispatcher.dispatch({ data: 1 });

    expect(index).toBe(2);

    dispatcher.dispatch({ data: 1 });

    expect(index).toBe(3);
});