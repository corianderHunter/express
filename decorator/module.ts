import {
  REFLECT_CONTROL,
  REFLECT_IMPORT,
  REFLECT_CLASS_MODULE_TYPE,
  REFLECT_CLASS_TYPE,
  REFLECT_SERVICE
} from "./reflectConst";

interface ModuleParams {
  imports?: any[];
  controls: any[];
  services?: any[];
}

export const Module = ({
  imports = [],
  controls = [],
  services = []
}: ModuleParams): ClassDecorator => target => {
  if (!controls.length) throw new Error("controls can not be Empty!");
  console;
  Reflect.defineMetadata(REFLECT_CLASS_TYPE, REFLECT_CLASS_MODULE_TYPE, target);
  Reflect.defineMetadata(REFLECT_CONTROL, controls, target);
  Reflect.defineMetadata(REFLECT_IMPORT, imports, target);
  Reflect.defineMetadata(REFLECT_SERVICE, services, target);
};
