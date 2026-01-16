import { Response, NextFunction } from "express";
import { RequestBody } from "../types/authorization.type";

export function AuthorizeRole(roles: string[]) {
  return (request: RequestBody, response: Response, next: NextFunction) => {
    if (!roles.includes(request.user.role)) {
      return response.status(400).json({
        status: "failed",
        message: `${request.user.role} access denied.`,
      });
    }

    next();
  };
}
