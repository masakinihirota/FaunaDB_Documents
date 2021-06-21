All | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/all?lang=javascript

# `All`

```javascript
All( values )
```

## [](#description)Description

The `All` function tests the provided `values` and returns `true` if all of the items in `values` are `true`, otherwise it returns `false`.

All機能が提供試験values戻るtrue 内のアイテムの全て場合valuesでありtrue、それ以外の場合は、返しを false。

When `values` is an empty [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set), `All` returns `true`, because `values` itself is set.

場合はvalues空である配列または設定し、All 戻りtrueので、values自身が設定されています。

`All` is a better choice for handling collections of values than the similar [`And`](https://docs.fauna.com/fauna/current/api/fql/functions/and) function.

All同様のAnd関数よりも、値のコレクションを処理するためのより良い選択です。

The run time of `All` is dependent on the number of elements in the underlying set or page — it’s linear, or _O(n)_. For very large sets or pages, executing `All` might result in a query timeout error, or "width" error.

警告1
`All`の実行時間は対象となるセットやページの要素数に依存しており、線形、つまり_O(n)_となります。非常に大きなセットやページの場合、`All`を実行すると、クエリのタイムアウトエラーや、「width」エラーが発生することがあります。

For query "width" errors, the underlying set or page involves more than 100K items. This can happen when using a set function, such as [`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference), where more than 100K items need to be considered to produce the set that `All` evaluates. To resolve this, use [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) to limit the set or page size.

警告2
クエリ「width」のエラーでは、基礎となるセットやページに100K以上のアイテムが含まれています。これは、[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)のようなセット関数を使用している場合に発生する可能性があり、`All` が評価するセットを生成するために、100K 以上のアイテムを考慮する必要があります。これを解決するには、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)を使ってセットやページのサイズを制限します。

For example, instead of:

たとえば、次の代わりに：

shell

```shell
All(
  Difference(
    Match(Index("Index1"), "term1"),
    Match(Index("Index2"), "term2")
  )
)
```

use:

shell

```shell
All(
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

これは、正しい結果を得るためにセット全体を評価しなければならない場合、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)の結果をページングする必要があることを意味します。

For query timeout errors, you may specify a larger query timeout via the [driver](https://docs.fauna.com/fauna/current/drivers/) that you are using.

クエリのタイムアウトエラーについては、使用している[ドライバー](https://docs.fauna.com/fauna/current/drivers/)でより大きなクエリのタイムアウトを指定することができます。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set)|A group of values to test for being `true`.|

|引数|型|定義と要件|
|--|--|--|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [Set](https://docs.fauna.com/fauna/current/api/fql/types#set)|「真」であるかどうかをテストする値のグループ。|

## [](#returns)Returns

A [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean) indicating whether all of the items in `values` are `true`.

values` のすべての項目が `true` であるかどうかを示す [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean) です。

## [](#examples)Examples

The following query uses `All` multiple times to demonstrate how the function evaluates several groups of values:

次のクエリはAll、関数がいくつかの値のグループを評価する方法を示すために複数回使用します。

```javascript
client.query([
  q.All([true, true, true]),
  q.All([false, true, true]),
  q.All([]),
])
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ true, false, true ]
```
