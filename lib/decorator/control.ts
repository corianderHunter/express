import {
  REFLECT_PATH,
  REFLECT_CLASS_CONTROL_TYPE,
  REFLECT_CLASS_TYPE
} from './reflectConst';

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
