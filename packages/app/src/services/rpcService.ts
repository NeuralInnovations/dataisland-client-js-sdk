import { Service, type ServiceContext } from './service'
import { MiddlewareService } from './middlewareService'

export class RpcService extends Service {
  async request(req: Request): Promise<Response> {
    throw new Error('Not implemented')
  }

  buildUrl(path: string): string {
    throw new Error('Not implemented')
  }

  async get(path: string): Promise<Response> {
    return await this.request(
      new Request(this.buildUrl(path), {
        method: 'GET'
      })
    )
  }

  async post(path: string, body?: BodyInit | null): Promise<Response> {
    return await this.request(
      new Request(this.buildUrl(path), {
        method: 'POST',
        body
      })
    )
  }

  async put(path: string, body?: BodyInit | null): Promise<Response> {
    return await this.request(
      new Request(this.buildUrl(path), {
        method: 'PUT',
        body
      })
    )
  }

  async delete(path: string): Promise<Response> {
    return await this.request(
      new Request(this.buildUrl(path), {
        method: 'DELETE'
      })
    )
  }
}

export class RpcServiceImpl extends RpcService {
  constructor(serviceContext: ServiceContext, public readonly host: string) {
    super(serviceContext)
  }

  override async request(req: Request): Promise<Response> {
    const middlewareService = this.resolve(MiddlewareService)
    if (middlewareService !== undefined) {
      return await middlewareService.process(req, async req => {
        return await fetch(req)
      })
    } else {
      return await fetch(req)
    }
  }

  override buildUrl(path: string): string {
    if (this.host.endsWith('/') && path.startsWith('/')) {
      return `${this.host}${path.slice(1)}`
    }
    return `${this.host}${path}`
  }
}
