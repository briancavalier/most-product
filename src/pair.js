// @flow

export const dup = <A> (a: A): [A, A] =>
  [a, a]

export const first = <A, B, C> (f: A => C, [a, b]: [A, B]): [C, B] =>
  [f(a), b]

export const second = <A, B, C> (f: B => C, [a, b]: [A, B]): [A, C] =>
  [a, f(b)]

export const fold = <A, B, C> (f: (A, B) => C, [a, b]: [A, B]): C =>
  f(a, b)
