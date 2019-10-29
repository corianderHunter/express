import { REFLECT_PATH } from './ReflectConst';

export function Control(name: string): ClassDecorator {
  return function(target) {
    Reflect.defineMetadata(REFLECT_PATH, name, target);
  };
}
