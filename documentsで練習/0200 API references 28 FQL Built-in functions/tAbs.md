Abs | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/abs?lang=javascript

# `Abs`

```javascript
Abs( value )
```

## [](#description)Description

The `Abs` function is used to get the absolute value of a number.

このAbs関数は、数値の絶対値を取得するために使用されます。

## [](#parameters)Parameters

Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|Number|Take the absolute value of this argument.|

|引数|型|定義と要件|
|--|--|--|
|`value`|Number|この引数の絶対値を取る。|

## [](#returns)Returns

A number which is the absolute value of a numeric input argument.

## [](#examples)Examples

The following query returns the absolute value of -100:

```javascript
client.query(
  q.Abs(-100)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
100
```