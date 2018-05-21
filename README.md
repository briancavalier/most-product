# Streams of products and coproducts

Playing with streams of products (pairs) and coproducts (eithers).

## Example

Let's say you need to conditionally map events that match a predicate.

You can do it declaratively in 3 composable steps: Partition the stream into evens and odds, tag each respectively, reassemble the stream of tagged values.

```js
const nums: Stream<number> = // ...

const tagged: Stream<string> = unpartition(mapEither(tagOdd, tagEven, partition(isEven, nums)))
```

Using [pipelining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator):

```js
const tagged: Stream<string> = nums
  |> partition(isEven)
  |> mapEither(tagOdd, tagEven)
  |> unpartition
```

### In detail

```js
// Tag even numbers with "Even", and odd numbers with "Odd"
// Ideally, we could write 3 independent functions, and compose
// a solution from them easily:
// 1. an isEven predicate
// 2. an "Even" tagging function
// 3. an "Odd" tagging function

const isEven = x => x % 2 === 0
const tagEven = x => `Even ${x}`
const tagOdd = x => `Odd ${x}`

// The stream of numbers we want to tag
// We want to end up with a Stream<string>
const nums: Stream<number> = // ...
```

### Attempt 1

One approach is to `filter` the same stream twice.

```js
// We have to remember to multicast since we'll end up
// creating 2 streams derived from nums and merging them.
// That kind of "diamond shape" requires multicasting
const multicastNums: Stream<number> = multicast(nums)

const even: Stream<string> = map(tagEven, filter(isEven, multicastNums))
const odd: Stream<string> = map(tagOdd, filter(x => !isEven(x), multicastNums))

const tagged: Stream<string> = merge(even, odd)
```

That works, but has 2 downsides:

1. It has to apply the isEven predicate _twice_ to each event
2. It has to use multicast, which is easy to forget

### Attempt 2

Another approach is to write a conditional lambda.

```js
// We can be explicit and write a new lambda to conditionally
// map the events
const tagged: Stream<string> = map(x => isEven(x) ? tagEven(x) : tagOdd(x), nums)
```

This is a reasonable solution, but still leaves room for improvement:

1. The "extra" lambda requires us to think about each event value one at a time, rather than only thinking about the `nums` as a whole.
2. The lambda mentions `x` 3 times

Can we be even more declarative and compositional?

### Using a coproduct stream

```js
// We can solve the problem in 3 declarative steps:
// 1. partition the stream of numbers into evens and odds
// 2. tag the evens and odds
// 3. "unpartition" the stream containing the tagged evens and odds
const tagged: Stream<string> = unpartition(mapEither(tagOdd, tagEven, partition(isEven, nums)))
```

This is completely declarative, with no "extra" lambda, and transforms `nums` as a whole, rather than being concerned with each event.
