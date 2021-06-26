BitNot | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/bitnot?lang=javascript

# `BitNot

```javascript
BitNot( value )
```

```shell
BitNot( value )
```

## [](#description)Description

The `BitNot` function returns the [Two’s Complement](https://en.wikipedia.org/wiki/Two%27s_complement) of a number. The argument must be a number, and fractional values are truncated before the operation is applied.

`BitNot`関数は数値の[Two's Complement](https://en.wikipedia.org/wiki/Two%27s_complement)を返します。引数は数値でなければならず、演算を適用する前に小数点以下の値は切り捨てられます。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|A single value to take the two’s complement.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|2の補数を取るための単一の値。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the two’s complement of the `value`.

## [](#examples)Examples

The following query executes an array of independent bitwise NOT operations and returns results in the result array. The result array position matches the position in the execution array.

次のクエリは、独立したビットワイズ NOT 演算の配列を実行し、結果配列に結果を返します。結果配列の位置は、実行配列の位置と一致しています。

```javascript
client.query(
  [
    q.BitNot(0),
    q.BitNot(1),
    q.BitNot(7),
  ]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ -1, -2, -8 ]
```

```shell
[
  BitNot(0),
  BitNot(1),
  BitNot(7),
]
```

```none
[ -1, -2, -8 ]
```

