import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (err instanceof Error && err.stack) {
      return res.status(parseInt(err.stack, 10)).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

export default ErrorHandler;