// @flow

export const dup = <A> (a: A): [A, A] =>
  [a, a]

export const projectPair = <A, B, C> (f: A => B, g: A => C, a: A): [B, C] =>
  [f(a), g(a)]

export const bimapPair = <A, B, C, D> (f: A => C, g: B => D, [a, b]: [A, B]): [C, D] =>
  [f(a), g(b)]

export const foldPair = <A, B, C> (f: (A, B) => C, [a, b]: [A, B]): C =>
  f(a, b)
