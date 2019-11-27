import {
  REFLECT_PATH,
  REFLECT_METHOD,
  REFLECT_PARAM,
  REFLECT_MIDDLEWARE
} from "./reflectConst";
import { Request, Response, NextFunction } from "express";
import { RouteParamMetaData, mapRouteParams, Next } from "./routeParams";
import * as assert from "assert";

type VerbTypes = "GET" | "POST" | "DELETE" | "PUT" | "ALL" | "OPTION";

const createHttpVerbDecorator = (type: VerbTypes) => (
  router: string
): MethodDecorator => (target, key, desciptor) => {
  Reflect.defineMetadata(REFLECT_METHOD, type.toLowerCase(), desciptor.value);
  Reflect.defineMetadata(REFLECT_PATH, router, desciptor.value);
};

export const Get = createHttpVerbDecorator("GET");

export const Post = createHttpVerbDecorator("POST");

export const Delete = createHttpVerbDecorator("DELETE");

export const Put = createHttpVerbDecorator("PUT");

export const All = createHttpVerbDecorator("ALL");

export const Option = createHttpVerbDecorator("OPTION");

export const mapHttpVerbs = (
  router,
  control,
  httpVerbMethods,
  controlInstance
) => {
  const middlewares = Reflect.getMetadata(REFLECT_MIDDLEWARE, control) || [];
  const applyMiddleWares = middlewares.length
    ? middlewares
    : [(req, res, next) => next()];
  httpVerbMethods.forEach(({ method, key }) => {
    const methodType: string = Reflect.getMetadata(REFLECT_METHOD, method);
    const path = Reflect.getMetadata(REFLECT_PATH, method);
    const params = Reflect.getMetadata(
      REFLECT_PARAM,
      control.prototype,
      key as symbol | string
    ) as RouteParamMetaData[];
    router[methodType.toLowerCase()](
      path,
      ...applyMiddleWares,
      async (req: Request, res: Response, next: NextFunction) => {
        const args = mapRouteParams(params, req, res, next);
        const result = await Reflect.apply(method, controlInstance, args);
        if (!res.headersSent) {
          res.json(result || "");
        }
      }
    );
  });
};
