// @flow

import { type Stream } from '@most/types'
import { map, scan } from '@most/core'
import { dup, first, second, fold } from './pair'
import { type Either } from './either'

// Streams of products

export const split = <A> (s: Stream<A>): Stream<[A, A]> =>
  map(dup, s)

export const unsplit = <A, B, C> (f: (A, B) => C, s: Stream<[A, B]>): Stream<C> =>
  map(p => fold(f, p), s)

export const mapFirst = <A, B, C> (f: A => B, s: Stream<[A, C]>): Stream<[B, C]> =>
  map(p => first(f, p), s)

export const mapSecond = <A, B, C> (f: B => C, s: Stream<[A, B]>): Stream<[A, C]> =>
  map(p => second(f, p), s)

export const update = <A, B> (ab: [A, B], s: Stream<Either<A, B>>): Stream<[A, B]> =>
  scan(_update, ab, s)

const _update = <A, B> ([a, b]: [A, B], eab: Either<A, B>): [A, B] =>
  eab.right ? [a, eab.value] : [eab.value, b]
