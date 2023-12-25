import { type App, type Settings } from './index'

export function _createApp(name: string, settings?: Settings | undefined): App {
  return {
    get name(): string {
      return name
    },
    get host(): string {
      return settings?.host ?? 'https://dataisland.io'
    }
  }
}
