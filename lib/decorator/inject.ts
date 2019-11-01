export let injectContainer = new Map<string, any>();

export const Injectable = (name: string): ClassDecorator => target => {
  if (injectContainer.has(name)) {
    throw new Error(injectContainer.get(name) + `has injected with "${name}"`);
  } else {
    injectContainer.set('name', target);
  }
};

export const Inject = (name: string): PropertyDecorator => (target, key) => {
  console.log('origin', target[key]);
  console.log('inject', target, key);
};
