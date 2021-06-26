BitXor | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/bitxor?lang=javascript

# `BitXor

```javascript
BitXor( value_1, [ value_2, ... ] )
```

```shell
BitXor( value_1, [ value_2, ... ] )
```

## [](#description)Description

The `BitXor` function returns the bit in the result if the bit exists in only one argument. The arguments must be numbers, and the fractional portion is truncated before the XOR operation is applied. The result is the bitwise exclusive OR of all of the arguments.

`BitXor`関数は、ビットが1つの引数にしか存在しない場合に、結果のビットを返します。引数は数字でなければならず、XOR演算を行う前に端数部分は切り捨てられます。結果は、すべての引数のビットごとの排他的論理和となります。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|List of [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s|One or more numbers to bitwise exclusive OR.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[数値](https://docs.fauna.com/fauna/current/api/fql/types#number)のリスト|1つ以上の数値をビットごとに排他的論理和します。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the bitwise exclusive OR of all supplied `value`s.

与えられたすべての `value` のビットごとの排他的論理和である [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) を返します。

## [](#examples)Examples

The following query executes an array of independent bitwise exclusive OR operations and returns results in the result array. The result array position matches the position in the execution array.

以下のクエリは、独立したビット単位の排他的論理和の配列を実行し、結果配列に結果を返します。結果配列の位置は、実行配列の位置と一致します。

```javascript
client.query(
  [
    q.BitXor(7),
    q.BitXor(0, 0),
    q.BitXor(1, 0),
    q.BitXor(1, 1),
    q.BitXor(6, 3),
  ]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ 7, 0, 1, 0, 5 ]
```

```shell
[
  BitXor(7),
  BitXor(0, 0),
  BitXor(1, 0),
  BitXor(1, 1),
  BitXor(6, 3),
]
```

```none
[ 7, 0, 1, 0, 5 ]
```

