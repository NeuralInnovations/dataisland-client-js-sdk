// import { Request } from "./services/request"
import { Request } from "node-fetch"
import { Response } from "node-fetch"
/**
 * DataIsland App request middleware.
 */
export type Middleware = (
  req: Request,
  next: (req: Request) => Promise<Response>
) => Promise<Response>
