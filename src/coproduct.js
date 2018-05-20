// @flow

import { type Stream } from '@most/types'
import { map, merge } from '@most/core'
import { type Either, left, right, either } from './either'

// Streams of coproducts

export const inject = <A, B> (sa: Stream<A>, sb: Stream<B>): Stream<Either<A, B>> =>
  merge(map(left, sa), map(right, sb))

export const part = <A> (p: A => boolean, sa: Stream<A>): Stream<Either<A, A>> =>
  map(a => p(a) ? right(a) : left(a), sa)

export const unpart = <A> (saa: Stream<Either<A, A>>): Stream<A> =>
  map(aa => aa.value, saa)

export const mapLeft = <A, B, C> (f: A => C, s: Stream<Either<A, B>>): Stream<Either<C, B>> =>
  map(eac => eac.right ? right(eac.value) : left(f(eac.value)), s)

export const mapRight = <A, B, C> (f: B => C, s: Stream<Either<A, B>>): Stream<Either<A, C>> =>
  map(eac => eac.right ? right(f(eac.value)) : left(eac.value), s)
