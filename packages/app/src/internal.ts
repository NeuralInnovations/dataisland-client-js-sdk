import { DataIsland } from './index.ts';

class App implements DataIsland.App {
    constructor(
        public readonly name: string,
        public readonly host: string
    ) { }
}

export function _createApp(name, settings): DataIsland.App {
    return new App(name, settings) as DataIsland.App;
}