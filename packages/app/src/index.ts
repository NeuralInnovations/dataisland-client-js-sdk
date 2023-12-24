import { create } from 'ts-node';
import { version } from '../../../package.json';
import { _createApp } from './internal.ts';
export { Events } from './events.ts';

export namespace DataIsland {

    const _apps = new Map<string, App>();

    /**
     * Current SDK version.
     */
    export const SDK_VERSION = version;

    /**
     * Default DataIsland App name.
     */
    export const DEFAULT_NAME = '[DEFAULT]';

    /**
     * DataIsland App settings.
     */
    export interface Settings {
        name: string | undefined;
        host: string | undefined;
        /**
         * GDPR compliant
         */
        automaticDataCollectionEnabled: boolean | undefined;
    }

    /**
     * DataIsland App instance.
     */
    export interface App {
        get name(): string;
        get host(): string;
    }

    /**
     * Returns a DataIsland App instance.
     * @param settings Optional settings. If none present, uses default settings.
     */
    export function app(settings?: Settings | undefined): App {
        let name = DEFAULT_NAME;
        if (settings) {
            name = settings.name || DEFAULT_NAME;
        }
        let app: App = _apps[name] || (_apps[name] = _createApp(name, settings));
        return app as App;
    }
}