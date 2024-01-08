/**
 * DataIsland App request middleware.
 */
export type Middleware = (
  req: Request,
  next: () => Promise<Response>
) => Promise<void>
