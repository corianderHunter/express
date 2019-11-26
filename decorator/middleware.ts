import { REFLECT_MIDDLEWARE } from "./reflectConst";
import { Request, Response, NextFunction } from "express";

type MiddlewareFunctionType = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export function Middleware(middleware: MiddlewareFunctionType): ClassDecorator {
  return function(target) {
    const middlewares = Reflect.getMetadata(REFLECT_MIDDLEWARE, target) || [];
    Reflect.defineMetadata(
      REFLECT_MIDDLEWARE,
      [...middlewares, middleware],
      target
    );
  };
}
