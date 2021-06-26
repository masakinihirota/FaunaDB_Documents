Atan | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/atan?lang=javascript

# `Atan`

```javascript
Atan( value )
```

```shell
Atan( value )
```

## [](#description)Description

The `Atan` function is a trigonometric function which calculates ratios of the lengths of the sides of right triangles. `Atan` returns the arc tangent of a number.

`Atan`関数は三角関数で、直角三角形の辺の長さの比を計算します。`Atan`は数値のアークタンジェントを返します。

## [](#parameters)Parameters

パラメータ

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|The [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) whose arc tangent should be returned.|

---

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)|アークタンジェントが返されるべき[Number](https://docs.fauna.com/fauna/current/api/fql/types#number)です。|

## [](#returns)Returns

A [Number](https://docs.fauna.com/fauna/current/api/fql/types#number) which is the arc tangent of `value`.

## [](#examples)Examples

The following query returns the arc tangent of 0.5:

```javascript
client.query(
  q.Atan(0.5)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
0.4636476090008061
```

```shell
Atan(0.5)
```

```none
0.4636476090008061
```

