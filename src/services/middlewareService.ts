import { Service } from './service'
import { type Middleware } from '../middleware'
import { type Disposable } from '../disposable'

export class MiddlewareService extends Service {
  _middlewares: Middleware[] = []

  public useMiddleware(middleware: Middleware): Disposable {
    this._middlewares.push(middleware)
    const result = this.lifetime.defineNested()
    result.addCallback(() => {
      this._middlewares = this._middlewares.filter(m => m !== middleware)
    }, this)
    return result
  }

  public async process(
    req: Request,
    next: (req: Request) => Promise<Response>
  ): Promise<Response> {
    const middlewares = this._middlewares.slice()
    let index = -1

    const processNext = async (request: Request): Promise<Response> => {
      index++
      if (index < middlewares.length) {
        await middlewares[index](request, processNext)
      }
      return await next(request)
    }
    return await processNext(req)
  }
}
