import camelCase from 'camelcase';
import { REFLECT_PATH, REFLECT_METHOD } from './reflectConst';

const VERBS: string[] = ['GET', 'POST', 'DELETE', 'PUT', 'ALL'];

type VerbTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'ALL' | 'OPTION';

const createHttpVerbDecorator = (type: VerbTypes) => (
  router: string
): MethodDecorator => (target, key, desciptor) => {
  Reflect.defineMetadata(REFLECT_METHOD, type.toLowerCase(), desciptor.value);
  Reflect.defineMetadata(REFLECT_PATH, router, desciptor.value);
};

export const Get = createHttpVerbDecorator('GET');

export const Post = createHttpVerbDecorator('POST');

export const Delete = createHttpVerbDecorator('DELETE');

export const Put = createHttpVerbDecorator('PUT');

export const All = createHttpVerbDecorator('ALL');

export const Option = createHttpVerbDecorator('OPTION');
