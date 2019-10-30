import { REFLECT_PARAM } from './reflectConst';

type RouteParamTypes = 'PARAM' | 'QUERY' | 'BODY' | 'REQ' | 'RES' | 'NEXT';

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
  createRouteParamsDecorator('PARAM', key);

export const Query = (key?: string): ParameterDecorator =>
  createRouteParamsDecorator('QUERY', key);

export const Body = createRouteParamsDecorator('BODY');

export const Req = createRouteParamsDecorator('REQ');

export const Res = createRouteParamsDecorator('REQ');

export const Next = createRouteParamsDecorator('NEXT');
