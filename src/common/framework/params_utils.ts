import { objectEquals } from './util/util.js';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ParamArgument = any;
export interface ParamSpec {
  [k: string]: ParamArgument;
}
export type ParamSpecIterable = Iterable<ParamSpec>;
export type ParamSpecIterator = IterableIterator<ParamSpec>;

export function extractPublicParams(params: ParamSpec): ParamSpec {
  const publicParams: ParamSpec = {};
  for (const k of Object.keys(params)) {
    if (!k.startsWith('_')) {
      publicParams[k] = params[k];
    }
  }
  return publicParams;
}

export function stringifyPublicParams(p: ParamSpec | null): string {
  if (p === null || paramsEquals(p, {})) {
    return '';
  }
  return JSON.stringify(extractPublicParams(p));
}

export function paramsEquals(x: ParamSpec | null, y: ParamSpec | null): boolean {
  if (x === y) {
    return true;
  }
  if (x === null) {
    x = {};
  }
  if (y === null) {
    y = {};
  }

  for (const xk of Object.keys(x)) {
    if (x[xk] !== undefined && !(xk in y)) {
      return false;
    }
    if (!objectEquals(x[xk], y[xk])) {
      return false;
    }
  }

  for (const yk of Object.keys(y)) {
    if (y[yk] !== undefined && !(yk in x)) {
      return false;
    }
  }
  return true;
}

export function paramsSupersets(sup: ParamSpec | null, sub: ParamSpec | null): boolean {
  if (sub === null) {
    return true;
  }
  if (sup === null) {
    sup = {};
  }
  for (const k of Object.keys(sub)) {
    if (!(k in sup) || sup[k] !== sub[k]) {
      return false;
    }
  }
  return true;
}
