export type Constructor<T> = new (...args: any[]) => T

abstract class Provider {
  abstract provide(): any | undefined
}

class MethodProvider<T> extends Provider {
  private instance?: T
  private provided: boolean = false

  constructor(
    private readonly provider: () => T,
    private readonly providerOnce: boolean = false
  ) {
    super()
  }

  provide(): T | undefined {
    if (this.providerOnce && this.provided) {
      return this.instance
    }
    this.provided = true
    this.instance = this.provider()
    return this.instance
  }
}

class ValueProvider<T> extends Provider {
  constructor(private readonly value: T | undefined) {
    super()
  }

  provide(): T | undefined {
    return this.value
  }
}

export class RegistryItem<T> {
  constructor(
    private readonly registry: Map<Constructor<any>, Provider>,
    private readonly type: Constructor<T>
  ) {}

  asValue(value: T): void {
    this.registry.set(this.type, new ValueProvider<T>(value))
  }

  asProvider<T>(provider: () => T, oneTime: boolean = false): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, oneTime))
  }

  asFactory<T>(provider: () => T): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, false))
  }

  asSingleton<T>(provider: () => T): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, true))
  }
}

export class Registry {
  private readonly services: Map<Constructor<any>, Provider>

  constructor() {
    this.services = new Map()
  }

  map<T>(type: Constructor<T>): RegistryItem<T> {
    return new RegistryItem<T>(this.services, type)
  }

  set<T>(type: Constructor<T>, provider: Provider): void {
    this.services.set(type, provider)
  }

  get<T>(type: Constructor<T>): T | undefined {
    const provider = this.services.get(type)
    if (provider === undefined) {
      return undefined
    }
    return provider.provide()
  }
}
