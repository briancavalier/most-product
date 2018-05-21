// @flow

import { type Stream } from '@most/types'
import { map, merge } from '@most/core'
import { id } from '@most/prelude'
import { type Either, Left, Right, bimapEither, classify } from './either'

// Streams of coproducts

export const inject = <A, B> (sa: Stream<A>, sb: Stream<B>): Stream<Either<A, B>> =>
  merge(map(Left, sa), map(Right, sb))

export const partition = <A> (p: A => boolean, sa: Stream<A>): Stream<Either<A, A>> =>
  map(a => classify(p, a), sa)

export const unpartition = <A> (saa: Stream<Either<A, A>>): Stream<A> =>
  map(aa => aa.value, saa)

export const mapEither = <A, B, C, D> (f: A => C, g: B => D, s: Stream<Either<A, B>>): Stream<Either<C, D>> =>
  map(eab => bimapEither(f, g, eab), s)

export const mapLeft = <A, B, C> (f: A => C, s: Stream<Either<A, B>>): Stream<Either<C, B>> =>
  mapEither(f, id, s)

export const mapRight = <A, B, C> (g: B => C, s: Stream<Either<A, B>>): Stream<Either<A, C>> =>
  mapEither(id, g, s)
