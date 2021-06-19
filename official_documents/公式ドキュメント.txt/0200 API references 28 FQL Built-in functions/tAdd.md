Add | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/add?lang=javascript

# `Add`

```javascript
Add( value_1, value_2, ... )
```

## [](#description)Description

The `Add` function returns the sum of its numeric arguments. It can take a single value or a list of values. Providing a single number returns the number.

Add`関数は，数値の引数の合計を返します。この関数は単一の値または値のリストを取ることができます。単一の数値を与えると、その数値が返されます。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|Number|One or more numbers to sum.|

|引数|型|定義と要件|
|--|--|--|
|`value`|Number|合計する1つまたは複数の数字|

## [](#returns)Returns

A number which is the sum of all values.

すべての値の合計である数値。

## [](#examples)Examples

The following query returns the sum of 100 and 10:

次のクエリは、100と10の合計を返します。

```javascript
client.query(
  q.Add(100, 10)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
110
```

