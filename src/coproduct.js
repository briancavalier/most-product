// @flow

import { type Stream } from '@most/types'
import { map, merge } from '@most/core'
import { id, curry2, curry3 } from '@most/prelude'
import { type Either, Left, Right, bimapEither, classify } from './either'

// Streams of coproducts

export const inject = curry2(<A, B> (sa: Stream<A>, sb: Stream<B>): Stream<Either<A, B>> =>
  merge(map(Left, sa), map(Right, sb)))

export const partition = curry2(<A> (p: A => boolean, sa: Stream<A>): Stream<Either<A, A>> =>
  map(a => classify(p, a), sa))

export const unpartition = <A> (saa: Stream<Either<A, A>>): Stream<A> =>
  map(aa => aa.value, saa)

const _mapEither = <A, B, C, D> (f: A => C, g: B => D, s: Stream<Either<A, B>>): Stream<Either<C, D>> =>
  map(eab => bimapEither(f, g, eab), s)

export const mapEither = curry3(<A, B, C, D> (f: A => C, g: B => D, s: Stream<Either<A, B>>): Stream<Either<C, D>> =>
  _mapEither(f, g, s))

export const mapLeft = curry2(<A, B, C> (f: A => C, s: Stream<Either<A, B>>): Stream<Either<C, B>> =>
  _mapEither(f, id, s))

export const mapRight = curry2(<A, B, C> (g: B => C, s: Stream<Either<A, B>>): Stream<Either<A, C>> =>
  _mapEither(id, g, s))
