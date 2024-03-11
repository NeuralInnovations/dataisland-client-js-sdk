import { Service, type ServiceContext } from "./service"
import { MiddlewareService } from "./middlewareService"
import { RequestBuilder } from "./requestBuilder"
import { Request } from "node-fetch"
import { Response } from "./response"
import fetch from "node-fetch"
import { Headers } from "node-fetch"

/**
 * Options for the RpcService.
 */
export interface RequestOptions {
  searchParams?: Map<string, string>
  headers?: [string, string][] | Record<string, string> | Headers
}

/**
 * RPC service.
 */
export class RpcService extends Service {

  constructor(
    serviceContext: ServiceContext,
    /**
     * Host of the RPC service.
     * It is not used if you use the `urlBuilder` option.
     */
    public readonly host: string,
    /**
     * Options for the RpcService.
     */
    private readonly options?: {
      // make it possible to override the url builder
      urlBuilder?: (path: string) => URL
      // make it possible to override the fetch method
      fetchMethod?: (uri: Request) => Promise<Response>
    }
  ) {
    super(serviceContext)

    serviceContext.onRegister = async () => {
      serviceContext.resolve(MiddlewareService)?.useMiddleware((req, next) => {
        if (!req.headers.has("accept")) {
          req.headers.set("accept", "text/plain")
        }

        if ((req as any).discardContentType) {
          delete (req as any).discardContentType
        } else {
          req.headers.set("content-type", "application/json")
        }

        return next(req)
      })
    }
  }

  /**
   * Request method.
   */
  async request(req: Request): Promise<Response> {
    const middlewareService = this.resolve(MiddlewareService)
    if (middlewareService !== undefined) {
      return await middlewareService.process(req, async req => {
        return (await this.options?.fetchMethod?.(req)) ?? (await fetch(req.url))
      })
    }
    return (await this.options?.fetchMethod?.(req)) ?? (await fetch(req))
  }

  /**
   * Build URL.
   * @param path
   */
  buildUrl(path: string): URL {
    if (this.options !== undefined && this.options.urlBuilder !== undefined) {
      return this.options.urlBuilder(path)
    }
    if (this.host.endsWith("/") && path.startsWith("/")) {
      return new URL(`${this.host}${path.slice(1)}`)
    }
    if (!this.host.endsWith("/") && !path.startsWith("/")) {
      return new URL(`${this.host}/${path}`)
    }
    return new URL(`${this.host}${path}`)
  }

  /**
   * Create a request builder.
   * @param path
   */
  requestBuilder(path: string): RequestBuilder {
    return new RequestBuilder(this.buildUrl(path), this.request.bind(this))
  }

  /**
   * Send a GET request.
   * @param path
   * @param options
   */
  async get(path: string, options?: RequestOptions): Promise<Response> {
    return this.requestBuilder(path)
      .searchParams(options?.searchParams)
      .headers(options?.headers)
      .sendGet()
  }

  /**
   * Send a POST request.
   * @param path
   * @param body JSON object
   * @param options
   */
  async post(
    path: string,
    body: object | null | undefined,
    options?: RequestOptions
  ): Promise<Response> {
    return this.requestBuilder(path)
      .searchParams(options?.searchParams)
      .headers(options?.headers)
      .sendPostJson(body)
  }

  /**
   * Send a PUT request.
   * @param path
   * @param body JSON object
   * @param options
   */
  async put(
    path: string,
    body: object | null | undefined,
    options?: RequestOptions
  ): Promise<Response> {
    return this.requestBuilder(path)
      .searchParams(options?.searchParams)
      .headers(options?.headers)
      .sendPutJson(body)
  }

  /**
   * Send a DELETE request.
   * @param path
   * @param options
   */
  async delete(path: string, options?: RequestOptions): Promise<Response> {
    return this.requestBuilder(path)
      .searchParams(options?.searchParams)
      .headers(options?.headers)
      .sendDelete()
  }
}
