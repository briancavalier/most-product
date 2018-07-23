// @flow

import { type Stream } from '@most/types'
import { map, scan } from '@most/core'
import { id, curry2, curry3 } from '@most/prelude'
import { dup, bimapPair, foldPair, projectPair } from './pair'
import { type Either, toPair } from './either'

// Streams of products

export const project = curry3(<A, B, C> (f: A => B, g: A => C, s: Stream<A>): Stream<[B, C]> =>
  map(a => projectPair(f, g, a), s))

export const split = <A> (s: Stream<A>): Stream<[A, A]> =>
  map(dup, s)

export const unsplit = curry2(<A, B, C> (f: (A, B) => C, s: Stream<[A, B]>): Stream<C> =>
  map(p => foldPair(f, p), s))

export const _mapBoth = <A, B, C, D> (f: A => C, g: B => D, s: Stream<[A, B]>): Stream<[C, D]> =>
  map(p => bimapPair(f, g, p), s)

export const mapBoth = curry3(<A, B, C, D> (f: A => C, g: B => D, s: Stream<[A, B]>): Stream<[C, D]> =>
  _mapBoth(f, g, s))

export const mapFirst = curry2(<A, B, C> (f: A => B, s: Stream<[A, C]>): Stream<[B, C]> =>
  _mapBoth(f, id, s))

export const mapSecond = curry2(<A, B, C> (g: B => C, s: Stream<[A, B]>): Stream<[A, C]> =>
  _mapBoth(id, g, s))

export const update = curry2(<A, B> (ab: [A, B], s: Stream<Either<A, B>>): Stream<[A, B]> =>
  scan(toPair, ab, s))
