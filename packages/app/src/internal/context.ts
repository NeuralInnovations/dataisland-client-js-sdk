import { type Constructor, type Registry } from './registry'
import { type Lifetime } from '../disposable'

export class Context {
  constructor(
    private readonly registry: Registry,
    public readonly lifetime: Lifetime
  ) {}

  resolve<T>(type: Constructor<T>): T | undefined {
    return this.registry.get(type)
  }
}
