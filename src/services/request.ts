// import { Request as NodeFetchRequest } from "node-fetch"
//
// export class Request extends NodeFetchRequest {
// }

// export { Request } from "node-fetch"

export class Request2 {
  public readonly url: string | URL
  public readonly init: RequestInit | undefined

  constructor(url: string | URL, init?: RequestInit) {
    this.url = url
    this.init = init || { headers: new Headers() }
    if (this.init.headers === undefined) {
      this.init.headers = new Headers()
    }
  }

  get headers(): Headers {
    return <Headers>this.init!.headers!
  }
}
