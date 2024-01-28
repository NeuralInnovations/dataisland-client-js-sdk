/**
 * DataIsland App request middleware.
 */
export type Middleware = (
  req: Request,
  next: (req: Request) => Promise<Response>
) => Promise<Response>
