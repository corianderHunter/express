import { REFLECT_PARAM } from './reflectConst';

type RouteParamTypes = 'PARAM' | 'QUERY' | 'BODY' | 'REQ' | 'RES' | 'NEXT';

const createRouteParamsDecorator = (type: RouteParamTypes, key?: string) => (
  target,
  key,
  paramIdx
) => {
  const preMetaData = Reflect.getMetadata(REFLECT_PARAM, target, key) || [];
  Reflect.defineMetadata(
    REFLECT_PARAM,
    [
      ...preMetaData,
      {
        type: type.toLowerCase(),
        index: paramIdx,
        ...(key ? { targetKey: key } : {})
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
