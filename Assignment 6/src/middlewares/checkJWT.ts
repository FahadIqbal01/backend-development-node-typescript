import { Response, NextFunction } from "express";
import { CompareToken } from "../utils/jwt-token";
import { RequestBody } from "../types/authorization.type";
import { JwtPayload } from "jsonwebtoken";

export function CheckJWT(
  request: RequestBody,
  response: Response,
  next: NextFunction
) {
  try {
    const token: string = request.headers.authorization?.split(
      " "
    )[1] as string;
    if (!token) {
      response
        .status(400)
        .json({ status: "failed", message: "Token not found." });
    }

    const decodedPayload: string | JwtPayload = CompareToken(token);
    request.user = decodedPayload;

    next();
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}
