BitAnd | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/bitand?lang=shell

# `BitAnd

```javascript
BitAnd( value_1, [ value_2, ... ] )
```

```shell
BitAnd( value_1, [ value_2, ... ] )
```

## [](#description)Description

The `BitAnd` function returns the bit to the result if the bit exists in all numbers. The arguments must be numbers, and fractional values are truncated before the operation is applied. The result is the bitwise AND of all the arguments.

`BitAnd`関数は、すべての数値にビットが存在する場合、そのビットを結果に返します。引数は数字でなければならず、小数の値は演算を適用する前に切り捨てられます。結果は全ての引数のビットごとのANDである。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|List of [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s|One or more [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s to bitwise AND.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)sのリスト|1つ以上の[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)sをビットごとにANDする。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the bitwise AND of all supplied `value`s.

与えられたすべての `value` をビットごとに AND した [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) です。

## [](#examples)Examples

The following query executes an array of independent bitwise AND operations and returns the answer in the result array. The result array position matches the position in the execution array.

以下のクエリは、独立したビットワイズAND演算の配列を実行し、結果配列に答えを返します。結果配列の位置は、実行配列の位置と一致します。

```javascript
client.query(
  [
    q.BitAnd(7),
    q.BitAnd(0, 0),
    q.BitAnd(1, 0),
    q.BitAnd(1, 1),
    q.BitAnd(7, 3),
  ]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ 7, 0, 0, 1, 3 ]
```

```shell
[
  BitAnd(7),
  BitAnd(0, 0),
  BitAnd(1, 0),
  BitAnd(1, 1),
  BitAnd(7, 3),
]
```

```none
[ 7, 0, 0, 1, 3 ]
```

