import {
  REFLECT_CLASS_TYPE,
  REFLECT_PATH,
  REFLECT_CLASS_MIDDLEWARE_TYPE
} from "./reflectConst";
import { Request, Response, NextFunction } from "express";

type MiddlewareFunctionType = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export function Middleware(middleware: MiddlewareFunctionType): ClassDecorator {
  return function(target) {
    Reflect.defineMetadata(
      REFLECT_CLASS_TYPE,
      REFLECT_CLASS_MIDDLEWARE_TYPE,
      target
    );
    Reflect.defineMetadata(REFLECT_PATH, name, target);
  };
}
