import { REFLECT_PARAM } from "./reflectConst";
import { Request, Response, NextFunction } from "express";

type RouteParamTypes = "PARAM" | "QUERY" | "BODY" | "REQ" | "RES" | "NEXT";

export interface RouteParamMetaData {
  type: RouteParamTypes;
  index: number;
  prop?: string;
}

const createRouteParamsDecorator = (type: RouteParamTypes, prop?: string) => (
  target,
  key,
  paramIdx
) => {
  const preMetaData: RouteParamMetaData[] =
    Reflect.getMetadata(REFLECT_PARAM, target, key) || [];
  Reflect.defineMetadata(
    REFLECT_PARAM,
    [
      ...preMetaData,
      {
        type,
        index: paramIdx,
        ...(prop ? { prop } : {})
      }
    ],
    target,
    key
  );
};

export const Param = (key?: string): ParameterDecorator =>
  createRouteParamsDecorator("PARAM", key);

export const Query = (key?: string): ParameterDecorator =>
  createRouteParamsDecorator("QUERY", key);

export const Body = createRouteParamsDecorator("BODY");

export const Req = createRouteParamsDecorator("REQ");

export const Res = createRouteParamsDecorator("RES");

export const Next = createRouteParamsDecorator("NEXT");

export const mapRouteParams = (
  paramsDecorator: RouteParamMetaData[],
  req: Request,
  res: Response,
  next: NextFunction
): any[] => {
  if (!paramsDecorator || !paramsDecorator.length) return [req, res, next];
  const args = [];
  args.length = paramsDecorator.length;
  paramsDecorator.forEach(paramDecorator => {
    const { type, index, prop } = paramDecorator;
    switch (type) {
      case "PARAM":
        args[index] = prop ? req.params[prop] : req.params;
        break;
      case "QUERY":
        args[index] = prop ? req.query[prop] : req.query;
        break;
      case "BODY":
        args[index] = req.body;
        break;
      case "REQ":
        args[index] = req;
        break;
      case "RES":
        args[index] = res;
        break;
      case "NEXT":
        args[index] = next;
        break;
      default:
        args[index] = undefined;
    }
  });
  return args;
};
