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

export function createApplication(modules: any[]) {
  if (!modules.length) throw new Error('modules can not be empty!');
  for (let i = 0; i < modules.length; i++) {
    if (
      Reflect.getMetadata(REFLECT_CLASS_TYPE, modules[i]) !==
      REFLECT_CLASS_MODULE_TYPE
    )
      throw new Error(modules[i] + ` is not a Module`);
  }
  const app = expresss();
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
        const methodType = Reflect.getMetadata(REFLECT_METHOD, method);
        const path = Reflect.getMetadata(REFLECT_PATH, method);
        const params = Reflect.getMetadata(
          REFLECT_PARAM,
          control.prototype,
          key as symbol | string
        );
        router[methodType](path, (req, res, next) => {
          const args = [];
          Reflect.apply(method, undefined, args);
        });
      });
    });
  });
}
