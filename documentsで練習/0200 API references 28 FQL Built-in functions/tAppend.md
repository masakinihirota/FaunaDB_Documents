Append | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/append?lang=javascript

# `Append`

```javascript
Append( elems, base )
```

## [](#description)Description

The `Append` function creates a new array that is the result of combining the base Array followed by the `elems`. This is a specialized function, and only works with arrays and not pages.

`Append`関数は、ベースとなる配列に `elems` を加えたものを組み合わせて、新しい配列を作成します。これは特殊な関数で、配列でのみ動作し、ページでは動作しません。

## [](#parameters)Parameters

  
|Argument|Type|Definition and Requirements|
|--|--|--|
|`base`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|The base array.|
|`elems`|[Value](https://docs.fauna.com/fauna/current/api/fql/types) or [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of [Value](https://docs.fauna.com/fauna/current/api/fql/types)s|The elements to add to the end of the base array.|

|引数|型|定義と要件|
|--|--|--|
|`base`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|基本配列。|
|`elems`|[Value](https://docs.fauna.com/fauna/current/api/fql/types) or [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of [Value](https://docs.fauna.com/fauna/current/api/fql/types)s|ベース配列の最後に追加する要素。|

## [](#returns)Returns

A new [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) containing both the `base` array followed by the `elems`.

新しい[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)には、`base`の配列とそれに続く`elems`の配列が含まれます。

## [](#examples)Examples

The following example creates a new array containing the `base` array’s values, (1, 2, 3), followed by the `elems` array’s values, (4, 5, 6).

次の例では，`base`配列の値(1, 2, 3)と，`elems`配列の値(4, 5, 6)を含む新しい配列を作成しています．

```javascript
client.query(
  q.Append([4, 5, 6], [1, 2, 3])
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ 1, 2, 3, 4, 5, 6 ]
```

