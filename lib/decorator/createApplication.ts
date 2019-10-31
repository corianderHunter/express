import * as express from '../..';
import {
  REFLECT_CLASS_TYPE,
  REFLECT_CLASS_MODULE_TYPE,
  REFLECT_CONTROL,
  REFLECT_SERVICE
} from './reflectConst';
import * as bodyParser from 'body-parser';
import { Application, Router } from 'express';
import { mapControl } from './control';

export function createApplication(modules: any[]): Application {
  if (!modules.length) throw new Error('modules can not be empty!');
  for (let i = 0; i < modules.length; i++) {
    if (
      Reflect.getMetadata(REFLECT_CLASS_TYPE, modules[i]) !==
      REFLECT_CLASS_MODULE_TYPE
    )
      throw new Error(modules[i] + ` is not a Module`);
  }
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  modules.forEach(_module => {
    const controls = Reflect.getMetadata(REFLECT_CONTROL, _module);
    const services = Reflect.getMetadata(REFLECT_SERVICE, _module);

    const routers: { path: string; router: Router }[] = controls.map(control =>
      mapControl(control, services)
    );
    routers.forEach(({ path, router }) => app.use(path, router));
  });
  return app;
}
