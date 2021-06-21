Any | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/any?lang=javascript

# `Any`

```javascript
Any( values )
```

## [](#description)Description

The `Any` function tests the provided `values` and returns `true` if any of the items in `values` is `true`, otherwise it returns `false`.

`Any`関数は、与えられた`values`をテストし、`values`の項目のいずれかが`true`であれば`true`を返し、そうでなければ`false`を返します。

When `values` is an empty [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set), `Any` returns `false`, because `values` contains no `true` values.

`values`が空の[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)または[Set](https://docs.fauna.com/fauna/current/api/fql/types#set)の場合、`Any`は`false`を返します。なぜなら`values`は`true`の値を含まないからです。

`Any` is a better choice for handling collections of values than the similar [`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or) function.

`Any` は値の集まりを扱うのに、似たような [`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or) 関数よりも適しています。

The run time of `Any` is dependent on the number of elements in the underlying set or page — it’s linear, or _O(n)_. For very large sets or pages, executing `Any` might result in a query timeout error, or "width" error.

警告1
`Any` の実行時間は対象となるセットやページの要素数に依存しており、線形、つまり _O(n)_ となります。非常に大きなセットやページの場合、`Any` を実行すると、クエリのタイムアウトエラーや "width" エラーが発生することがあります。

For query "width" errors, the underlying set or page involves more than 100K items. This can happen when using a set function, such as [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference), where more than 100K items need to be considered to produce the set that `Any` evaluates. To resolve this, use [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) to limit the set or page size.

警告2
クエリ "width" のエラーでは、基礎となるセットやページに 100K 以上のアイテムが含まれています。これは、[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)のようなセット関数を使用している場合に発生する可能性があり、`Any` が評価するセットを生成するために 100K 以上のアイテムを考慮する必要があります。これを解決するには、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)を使用して、セットまたはページのサイズを制限します。

For example, instead of:

たとえば、次の代わりに：

shell

```shell
Any(
  Difference(
    Match(Index("Index1"), "term1"),
    Match(Index("Index2"), "term2")
  )
)
```

use:

shell

```shell
Any(
  Paginate(
    Difference(
      Match(Index("Index1"), "term1"),
      Match(Index("Index2"), "term2")
    ),
    { size: 10000 }
  )
)
```

This does mean that if the entire set must be evaluated to arrive at the correct result, you would have to page through the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) results.

警告3
これは、正しい結果に到達するためにセット全体を評価する必要がある場合、結果をページングする必要があることを意味しPaginate ます。

For query timeout errors, you may specify a larger query timeout via the [driver](https://docs.fauna.com/fauna/current/drivers/) that you are using.

警告4
クエリタイムアウトエラーの場合、使用しているドライバを介して、より大きなクエリタイムアウトを指定できます 。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set)|A group of values to test for being `true`.|

|引数|型|定義と要件|
|--|--|--|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set)|「真」であるかどうかを判定する値のグループ。|

## [](#returns)Returns

A [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean) indicating whether any of the items in `values` is `true`.

Aブール内のアイテムのいずれかがあるかどうかを示すvaluesです true。

## [](#examples)Examples

The following query uses `Any` multiple times to demonstrate how the function evaluates several groups of values:

次のクエリはAny、関数がいくつかの値のグループを評価する方法を示すために複数回使用します。

```javascript
client.query([
  q.Any([true, true, true]),
  q.Any([false, true, true]),
  q.Any([false, false, false]),
  q.Any([]),
])
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ true, true, false, false ]
```
