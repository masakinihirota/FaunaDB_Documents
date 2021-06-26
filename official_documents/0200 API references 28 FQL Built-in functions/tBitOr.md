BitOr | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/bitor?lang=javascript

# `BitOr

```javascript
BitOr( value_1, [ value_2, ... ] )
```

```shell
BitOr( value_1, [ value_2, ... ] )
```

## [](#description)Description

The `BitOr` function returns the bit in the result if the bit exists in any argument. The arguments must be numbers, and the fractional portion is truncated before the or operation is applied. The result is the bitwise OR of all the arguments.

`BitOr`関数は、いずれかの引数にビットが存在する場合、そのビットを結果に返します。引数は数字でなければならず、or演算を適用する前に端数部分は切り捨てられます。結果は、すべての引数のビットごとのORです。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|List of [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s|One or more numbers to bitwise OR.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s のリスト|1つまたは複数の数字をビットごとにORします。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the bitwise OR of all supplied `value`s.

## [](#examples)Examples

The following query executes an array of independent bitwise OR operations and returns results in the result array. The result array position matches the position in the execution array.

以下のクエリは、独立したビットワイズOR演算の配列を実行し、結果配列に結果を返します。結果配列の位置は、実行配列の位置と一致します。

```javascript
client.query(
  [
    q.BitOr(7),
    q.BitOr(0, 0),
    q.BitOr(1, 0),
    q.BitOr(1, 1),
    q.BitOr(6, 3),
  ]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ 7, 0, 1, 1, 7 ]
```

```shell
[
  BitOr(7),
  BitOr(0, 0),
  BitOr(1, 0),
  BitOr(1, 1),
  BitOr(6, 3),
]
```

```none
[ 7, 0, 1, 1, 7 ]
```

