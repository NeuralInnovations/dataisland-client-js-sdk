import { Service, ServiceContext } from "./service"
import { AcquiringImpl } from "../storages/acquirings/acquiring.impl"
import { Acquiring } from "../storages/acquirings/acquiring"

export class AcquiringService extends Service {
  private readonly _acquiring: AcquiringImpl

  constructor(serviceContext: ServiceContext) {
    super(serviceContext)

    this._acquiring = new AcquiringImpl(serviceContext.context)
  }

  async initialize(): Promise<void> {
    return await this._acquiring.initialize()
  }

  get acquiring(): Acquiring {
    return this._acquiring
  }
}
