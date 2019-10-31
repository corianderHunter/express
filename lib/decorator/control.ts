import {
  REFLECT_PATH,
  REFLECT_CLASS_CONTROL_TYPE,
  REFLECT_CLASS_TYPE,
  REFLECT_METHOD
} from './reflectConst';
import { Router } from 'express';
import * as express from '../..';
import { mapHttpVerbs } from './httpVerbs';

export function Control(name: string = '/'): ClassDecorator {
  return function(target) {
    Reflect.defineMetadata(
      REFLECT_CLASS_TYPE,
      REFLECT_CLASS_CONTROL_TYPE,
      target
    );
    Reflect.defineMetadata(REFLECT_PATH, name, target);
  };
}

export const mapControl = (control): { path: string; router: Router } => {
  if (
    Reflect.getMetadata(REFLECT_CLASS_TYPE, control) !==
    REFLECT_CLASS_CONTROL_TYPE
  )
    throw new Error(control + `is not a Module`);
  const path = Reflect.getMetadata(REFLECT_PATH, control);
  const router = express.Router();
  const httpVerbMethods = Reflect.ownKeys(control.prototype)
    .filter(
      key =>
        key !== 'constructor' &&
        Reflect.hasMetadata(REFLECT_METHOD, control['prototype'][key])
    )
    .map(key => {
      return { method: control['prototype'][key], key };
    });
  mapHttpVerbs(router, control, httpVerbMethods);
  return { path, router };
};
