export function Control(name: string): ClassDecorator {
  return function(...args) {
    console.log(args, name);
  };
}
