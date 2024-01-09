import { type Constructor, type Registry } from './registry'

export class Context {
  constructor(private readonly registry: Registry) {}

  resolve<T>(type: Constructor<T>): T | undefined {
    return this.registry.get(type)
  }
}
