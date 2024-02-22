/**
 * Constructor type.
 */
export type Constructor<T> = new (...args: any[]) => T

/**
 * Provider interface.
 */
abstract class Provider {
  /**
   * Provide method.
   */
  abstract provide(): any | undefined
}

/**
 * MethodProvider class.
 */
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

/**
 * ValueProvider class.
 */
class ValueProvider<T> extends Provider {
  constructor(private readonly value: T | undefined) {
    super()
  }

  provide(): T | undefined {
    return this.value
  }
}

/**
 * RegistryItem class.
 */
export class RegistryItem<T> {
  constructor(
    private readonly registry: Map<Constructor<any>, Provider>,
    private readonly type: Constructor<T>
  ) {
  }

  /**
   * As value method.
   * @param value
   */
  asValue(value: T): void {
    this.registry.set(this.type, new ValueProvider<T>(value))
  }

  /**
   * As provider method.
   * @param provider
   * @param oneTime
   */
  asProvider<T>(provider: () => T, oneTime: boolean = false): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, oneTime))
  }

  /**
   * As factory method.
   * @param provider
   */
  asFactory<T>(provider: () => T): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, false))
  }

  /**
   * As singleton method.
   * @param provider
   */
  asSingleton<T>(provider: () => T): void {
    this.registry.set(this.type, new MethodProvider<T>(provider, true))
  }
}

/**
 * Registry class.
 */
export class Registry {
  private readonly services: Map<Constructor<any>, Provider> = new Map()

  /**
   * Map method.
   * @param type
   */
  map<T>(type: Constructor<T>): RegistryItem<T> {
    return new RegistryItem<T>(this.services, type)
  }

  /**
   * Set method.
   * @param type
   * @param provider
   */
  set<T>(type: Constructor<T>, provider: Provider): void {
    this.services.set(type, provider)
  }

  /**
   * Get method.
   * @param type
   */
  get<T>(type: Constructor<T>): T | undefined {
    const provider = this.services.get(type)
    if (provider === undefined) {
      return undefined
    }
    return provider.provide()
  }
}
