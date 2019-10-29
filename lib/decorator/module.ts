import {
  REFLECT_CONTROL,
  REFLECT_IMPORT,
  REFLECT_CLASS_MODULE_TYPE,
  REFLECT_CLASS_TYPE
} from './reflectConst';

interface ModuleParams {
  imports?: any[];
  controls: any[];
  providers?: any[];
}

const Module = ({
  imports = [],
  controls = [],
  providers = []
}: ModuleParams): ClassDecorator => target => {
  if (!controls.length) throw new Error('controls can not be Empty!');
  console;
  Reflect.defineMetadata(REFLECT_CLASS_TYPE, REFLECT_CLASS_MODULE_TYPE, target);
  Reflect.defineMetadata(REFLECT_CONTROL, controls, target);
  Reflect.defineMetadata(REFLECT_IMPORT, imports, target);
};

export default Module;
