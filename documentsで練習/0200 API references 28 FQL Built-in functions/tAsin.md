Asin | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/asin?lang=javascript

# `Asin`

```javascript
Asin( value )
```

## [](#description)Description

The `Asin` function is a trigonometric function which calculates ratios of the lengths of the sides of right triangles. `Asin` returns the arc sine of a number.

`Asin`関数は三角関数で、直角三角形の辺の長さの比を計算します。`Asin`は数値のアークサインを返します。

## [](#parameters)Parameters

  
|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|The [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) whose arc sine should be returned.|

|引数|型|定義と要件|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|アークサインを返すべき[数](https://docs.fauna.com/fauna/current/api/fql/types#number)です。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the arc sine of `value`.

`値`のアークサインである[数](https://docs.fauna.com/fauna/current/api/fql/types#number)です。

## [](#examples)Examples

The following query returns the arc sine of 0.5:

次のクエリは、0.5のアークサインを返します。

```javascript
client.query(
  q.Asin(0.5)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
0.5235987755982989
```
