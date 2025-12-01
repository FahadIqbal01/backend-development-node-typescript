import { Request, Response, NextFunction } from "express";

export function logger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(
    `${request.url} - ${request.method} - ${new Date().toLocaleTimeString()}`
  );

  next();
}
