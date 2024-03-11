export { Response } from "node-fetch"
export type ResponseInstance = Response

// export interface Response2 {
//   get headers(): Headers
//
//   get ok(): boolean
//
//   get status(): number
//
//   get statusText(): string
//
//   json(): Promise<any>
//
//   text(): Promise<string>
// }
//
// export class ResponseInstance2 implements Response {
//   body: BodyInit | null | undefined
//   init: ResponseInit | undefined
//
//   constructor(body?: BodyInit | null, init?: ResponseInit) {
//     this.body = body
//     this.init = init
//   }
//
//   get status(): number {
//     return this.init === undefined ? 200 : this.init!.status!
//   }
//
//   get statusText(): string {
//     return this.init === undefined ? "OK" : this.init!.statusText!
//   }
//
//   get ok(): boolean {
//     return this.init === undefined ? true : this.init!.status === 200
//   }
//
//   headers: Headers = new Headers()
//
//   json(): Promise<any> {
//     return new Promise<any>((resolve, reject) => {
//       if (this.body === undefined || this.body === null) {
//         reject(new Error("Body is undefined or null"))
//       }
//       try {
//         const json = JSON.parse(this.body!.toString())
//         resolve(json)
//       } catch (e) {
//         reject(e)
//       }
//     })
//   }
//
//   text(): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       if (this.body === undefined || this.body === null) {
//         reject(new Error("Body is undefined or null"))
//       }
//       resolve(this.body!.toString())
//     })
//   }
// }
