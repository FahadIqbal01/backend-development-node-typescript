import { Request } from "express";

export interface RequestBody extends Request {
  user?: any;
}
