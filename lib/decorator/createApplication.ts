import * as expresss from '../..';
import {
  REFLECT_CLASS_TYPE,
  REFLECT_CLASS_MODULE_TYPE,
  REFLECT_CONTROL,
  REFLECT_CLASS_CONTROL_TYPE,
  REFLECT_PATH,
  REFLECT_METHOD,
  REFLECT_PARAM
} from './reflectConst';
import { RouteParamMetaData } from './routeParams';
import {
  Request,
  Response,
  NextFunction,
  Application
} from 'express-serve-static-core';
import * as bodyParser from 'body-parser';

const mapParams = (
  paramsDecorator: RouteParamMetaData[],
  req: Request,
  res: Response,
  next: NextFunction
): any[] => {
  const args = [];
  args.length = paramsDecorator.length;
  paramsDecorator.forEach(paramDecorator => {
    const { type, index, prop } = paramDecorator;
    switch (type) {
      case 'PARAM':
        args[index] = prop ? req.params[prop] : req.params;
        break;
      case 'QUERY':
        args[index] = prop ? req.query[prop] : req.query;
        break;
      case 'BODY':
        args[index] = req.body;
        break;
      case 'REQ':
        args[index] = req;
        break;
      case 'RES':
        args[index] = res;
        break;
      case 'NEXT':
        args[index] = next;
        break;
      default:
        args[index] = undefined;
    }
  });
  return args;
};

export function createApplication(modules: any[]): Application {
  if (!modules.length) throw new Error('modules can not be empty!');
  for (let i = 0; i < modules.length; i++) {
    if (
      Reflect.getMetadata(REFLECT_CLASS_TYPE, modules[i]) !==
      REFLECT_CLASS_MODULE_TYPE
    )
      throw new Error(modules[i] + ` is not a Module`);
  }
  const app = expresss();
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  modules.forEach(_module => {
    const controls = Reflect.getMetadata(REFLECT_CONTROL, _module);
    controls.forEach(control => {
      if (
        Reflect.getMetadata(REFLECT_CLASS_TYPE, control) !==
        REFLECT_CLASS_CONTROL_TYPE
      )
        throw new Error(control + `is not a Module`);
      const path = Reflect.getMetadata(REFLECT_PATH, control);
      const router = expresss.Router();
      const httpVerbMethods = Reflect.ownKeys(control.prototype)
        .filter(
          key =>
            key !== 'constructor' &&
            Reflect.hasMetadata(REFLECT_METHOD, control['prototype'][key])
        )
        .map(key => {
          return { method: control['prototype'][key], key };
        });
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
          async (req: Request, res: Response, next: NextFunction) => {
            const args = mapParams(params, req, res, next);
            const result = await Reflect.apply(method, undefined, args);
            res.json(result);
          }
        );
      });
      app.use(path, router);
    });
  });
  return app;
}
