import { type App, DEFAULT_HOST, DEFAULT_NAME, type Settings } from './index'

export function _createApp(settings: Settings): App {
  return {
    get name(): string {
      return settings.name ?? DEFAULT_NAME
    },
    get host(): string {
      return settings?.host ?? DEFAULT_HOST
    },
    get settings(): Settings {
      return settings
    }
  }
}
