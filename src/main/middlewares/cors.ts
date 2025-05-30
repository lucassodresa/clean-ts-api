import { NextFunction, Request, Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-method', '*')
  res.header('access-control-allow-headers', '*')
  next()
}
