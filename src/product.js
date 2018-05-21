// @flow

import { type Stream } from '@most/types'
import { map, scan } from '@most/core'
import { id } from '@most/prelude'
import { dup, bimapPair, foldPair } from './pair'
import { type Either } from './either'

// Streams of products

export const split = <A> (s: Stream<A>): Stream<[A, A]> =>
  map(dup, s)

export const unsplit = <A, B, C> (f: (A, B) => C, s: Stream<[A, B]>): Stream<C> =>
  map(p => foldPair(f, p), s)

export const mapBoth = <A, B, C, D> (f: A => C, g: B => D, s: Stream<[A, B]>): Stream<[C, D]> =>
  map(p => bimapPair(f, g, p), s)

export const mapFirst = <A, B, C> (f: A => B, s: Stream<[A, C]>): Stream<[B, C]> =>
  mapBoth(f, id, s)

export const mapSecond = <A, B, C> (g: B => C, s: Stream<[A, B]>): Stream<[A, C]> =>
  mapBoth(id, g, s)

export const update = <A, B> (ab: [A, B], s: Stream<Either<A, B>>): Stream<[A, B]> =>
  scan(_update, ab, s)

const _update = <A, B> ([a, b]: [A, B], eab: Either<A, B>): [A, B] =>
  eab.right ? [a, eab.value] : [eab.value, b]
