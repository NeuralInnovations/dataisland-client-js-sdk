export class RequestBuilder {
  private readonly _headers: Headers
  private readonly _searchParams: URLSearchParams

  constructor(
    private readonly _url: URL,
    private readonly _request: (req: Request) => Promise<Response>
  ) {
    this._headers = new Headers()
    this._searchParams = new URLSearchParams()
  }

  public header(name: string, value: string): RequestBuilder {
    this._headers.set(name, value)
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
        this._headers.set(name, value)
      })
    } else {
      Object.entries(headers).forEach(([name, value]) => {
        this._headers.set(name, value)
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

  public async sendPost(body?: BodyInit | null | object): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    if (body !== undefined && body !== null && typeof body === 'object') {
      body = JSON.stringify(body)
    }
    return await this._request(
      new Request(url, {
        method: 'POST',
        headers: this._headers,
        body
      })
    )
  }

  public async sendGet(): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    return await this._request(
      new Request(url, {
        method: 'GET',
        headers: this._headers
      })
    )
  }

  public async sendDelete(): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    return await this._request(
      new Request(url, {
        method: 'DELETE',
        headers: this._headers
      })
    )
  }

  public async sendPut(body?: BodyInit | null | object): Promise<Response> {
    const url = this._url
    url.search = this._searchParams.toString()
    if (body !== undefined && body !== null && typeof body === 'object') {
      body = JSON.stringify(body)
    }
    return await this._request(
      new Request(url, {
        method: 'PUT',
        headers: this._headers,
        body
      })
    )
  }
}
