// @flow

export type Either<A, B> =
  | { right: true, value: B }
  | { right: false, value: A }

export const Right = <A, B> (value: B): Either<A, B> =>
  ({ right: true, value })

export const Left = <A, B> (value: A): Either<A, B> =>
  ({ right: false, value })

export const classify = <A> (p: A => boolean, a: A): Either<A, A> =>
  p(a) ? Right(a) : Left(a)

export const bimapEither = <A, B, C, D> (f: A => C, g: B => D, e: Either<A, B>): Either<C, D> =>
  e.right ? Right(g(e.value)) : Left(f(e.value))
