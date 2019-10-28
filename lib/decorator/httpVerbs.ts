import camelCase from 'camelcase';

const VERBS: string[] = ['GET', 'POST', 'DELETE', 'PUT', 'ALL'];

export const Get = (router: string): MethodDecorator => (...args) => {
  console.log(router, args);
};

export const Post = (router: string): MethodDecorator => (...args) => {
  console.log(router, args);
};

export const Delete = (router: string): MethodDecorator => (...args) => {
  console.log(router, args);
};

export const Put = (router: string): MethodDecorator => (...args) => {
  console.log(router, args);
};

export const All = (router: string): MethodDecorator => (...args) => {
  console.log(router, args);
};
