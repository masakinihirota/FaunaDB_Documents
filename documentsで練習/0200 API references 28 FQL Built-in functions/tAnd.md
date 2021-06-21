And | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/and?lang=javascript

# `And`

```javascript
And(value_1, value_2, ...)
```

## [](#description)Description

The `And` function computes the conjunction of a list of boolean values, returning `true` if all elements are "true", and `false` otherwise.

`And`関数は、ブール値のリストの接続を計算し、すべての要素が "true "であれば`true`を、そうでなければ`false`を返します。

Prior to version 3.0.0, all items in the `value` list were evaluated. With version 3.0.0, evaluation is short-circuited when a `false` value is encountered. For example, a collection is no longer created with this query:

バージョン3.0.0より前のバージョンでは、`value`リストのすべての項目が評価されました。バージョン3.0.0では、`false`の値に遭遇したときに、評価は短絡的に行われます。例えば、このクエリではコレクションは作成されません。

shell

```shell
And(false, CreateCollection({ name: "test" }))
```

`And` does not support parameters that include objects, arrays, pages, sets, or expressions. The similar [`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all) function supports arrays, pages, and sets.

`And`は、オブジェクト、配列、ページ、セット、または式を含むパラメータをサポートしていません。類似の[All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)関数は、配列、ページ、セットをサポートしています。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|One or more [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean) values.|

|Argument|Type|Definition and Requirements|
|--|--|--|
|`value`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|1つまたは複数の[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)値。|

## [](#returns)Returns

A [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean) value.

ブール値

## [](#examples)Examples

The following query returns `false` because the last argument is "false":

false最後の引数が「false」であるため、次のクエリが返されます。

```javascript
client.query(
  q.And(true, true, false)
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
false
```
