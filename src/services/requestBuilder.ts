// import { Request, Response, Headers, FormData } from "../utils/request"

export class RequestBuilder {
  private readonly _headers: Record<string, string>
  private readonly _searchParams: URLSearchParams

  constructor(
    private readonly _url: URL,
    private readonly _request: (req: Request) => Promise<Response>
  ) {
    this._headers = {}
    this._searchParams = new URLSearchParams()
  }

  public header(name: string, value: string): RequestBuilder {
    this._headers[name] = value
    return this
  }

  public headers(
    headers?: [string, string][] | Record<string, string> | Headers
  ): RequestBuilder {
    if (headers === undefined) {
      return this
    }
    if (headers instanceof Headers) {
      headers.forEach((value, name) => {
        this._headers[name] = value
      })
    } else {
      Object.entries(headers).forEach(([name, value]) => {
        this._headers[name] = value
      })
    }
    return this
  }

  public searchParam(name: string, value: string): RequestBuilder {
    this._searchParams.set(name, value)
    return this
  }

  public searchParams(searchParams?: Map<string, string>): RequestBuilder {
    if (searchParams === undefined) {
      return this
    }
    searchParams.forEach((value, name) => {
      this._searchParams.set(name, value)
    })
    return this
  }

  public async sendPostFormData(body: FormData): Promise<Response> {
    const url = this._url

    // set search params
    url.search = this._searchParams.toString()

    // create request
    const req = new Request(url, {
      method: "POST",
      headers: this._headers,
      body: body
    })

    // discard content type
    const reqAny = req as any
    reqAny.discardContentType = true

    return await this._request(
      req
    )
  }

  public async sendPostJson(body: object | null | undefined): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    let json: string | undefined = undefined
    if (body !== undefined && body !== null && typeof body === "object") {
      json = JSON.stringify(body)
    }
    const request = new Request(url, {
      method: "POST",
      headers: this._headers,
      body: json
    })
    return await this._request(
      request
    )
  }

  public async sendGet(): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    return await this._request(
      new Request(url, {
        method: "GET",
        headers: this._headers
      })
    )
  }

  public async sendDelete(): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    return await this._request(
      new Request(url, {
        method: "DELETE",
        headers: this._headers
      })
    )
  }

  public async sendDeleteJson(body: object | null | undefined): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    let json: string | undefined = undefined
    if (body !== undefined && body !== null && typeof body === "object") {
      json = JSON.stringify(body)
    }
    return await this._request(
      new Request(url, {
        method: "DELETE",
        headers: this._headers,
        body: json
      })
    )
  }

  public async sendPutJson(body: object | null | undefined): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    let json: string | undefined = undefined
    if (body !== undefined && body !== null && typeof body === "object") {
      json = JSON.stringify(body)
    }
    return await this._request(
      new Request(url, {
        method: "PUT",
        headers: this._headers,
        body: json
      })
    )
  }

  public async sendPutFormData(body: FormData): Promise<Response> {
    const url = this._url

    // set search params
    url.search = this._searchParams.toString()

    // create request
    const req = new Request(url, {
      method: "PUT",
      headers: this._headers,
      body: body
    })

    // discard content type
    const reqAny = req as any
    reqAny.discardContentType = true

    return await this._request(
      req
    )
  }
}
