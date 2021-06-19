Acos | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/acos?lang=javascript

# `Acos`

```javascript
Acos( value )
```

## [](#description)Description

The `Acos` function is a trigonometric function which calculates ratios of the lengths of the sides of right triangles. `Acos` returns the arc cosine of a number.

`Acos`関数は三角関数で、直角三角形の辺の長さの比を計算します。`Acos`は数値のアークコサインを返す。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|The [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) whose arc cosine should be returned.|

|引数|型|定義と要件|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|arc cosineを返すべき[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)を指定します。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the arc cosine of `value`.

「値」のアークコサインである「数」(https://docs.fauna.com/fauna/current/api/fql/types#number)です。

## [](#examples)Examples

The following query returns the arc cosine of 0.5:

次のクエリは、0.5のアークコサインを返します。

```javascript
client.query(
  q.Acos(0.5)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
1.0471975511965979
```

