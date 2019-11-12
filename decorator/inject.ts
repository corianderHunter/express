import { REFLECT_INJECTS } from "./reflectConst";

interface InjectMetadata {
  key: string;
  injectName: string;
}

export let injectContainer = new Map<string, any>();

export const Injectable = (name: string): ClassDecorator => target => {
  if (injectContainer.has(name)) {
    throw new Error(injectContainer.get(name) + `has injected with "${name}"`);
  } else {
    injectContainer.set(name, Reflect.construct(target, []));
  }
};

export const Inject = (name: string): PropertyDecorator => (target, key) => {
  const injected: InjectMetadata[] =
    Reflect.getMetadata(REFLECT_INJECTS, target) || [];
  Reflect.defineMetadata(
    REFLECT_INJECTS,
    [
      ...injected,
      {
        key,
        injectName: name
      }
    ],
    target
  );
};

export const mapInject = (target, instance) => {
  const injected: InjectMetadata[] =
    Reflect.getMetadata(REFLECT_INJECTS, target) || [];
  if (!injected.length) return instance;
  injected.forEach(({ key, injectName }) => {
    const injectedSource = injectContainer.get(injectName);
    if (injectedSource === undefined)
      throw new Error(
        "can not find Injectable target that named " + injectName
      );
    instance[key] = injectedSource;
  });
  return instance;
};
