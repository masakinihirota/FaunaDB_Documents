At | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/at?lang=javascript






# `At`

```javascript
At( timestamp, expression )
```

## [](#description)Description

The `At` function executes a temporal query, a query which examines the data in the past. The `timestamp` parameter determines the data available for viewing by creating a virtual snapshot of the data which was current at that date and time. All reads from the associated `expression` is then executed on that virtual snapshot. In contrast, all write operations must be executed at the current time. Attempting a write operation at any other time produces an error.

`At`関数はテンポラリクエリ、つまり、過去のデータを調べるクエリを実行します。`timestamp`パラメータは、その日時に最新のデータの仮想スナップショットを作成することで、閲覧可能なデータを決定します。そして、関連付けられた `expression` からのすべての読み取りは、その仮想スナップショット上で実行されます。対照的に、すべての書き込み操作は、現在の時刻に実行されなければなりません。他の時間に書き込み操作を行おうとすると、エラーが発生します。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`timestamp`|[Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)|The timestamp of the virtual snapshot of the data.|
|`expression`|FQL expression|The FQL statement to be executed.|



|Argument|Type|Definition and Requirements|
|--|--|--|
|`timestamp`|[Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)|データの仮想スナップショットのタイムスタンプ。|
|`expression`|FQL expression|実行されるFQL文です。|



## [](#returns)Returns

The result of the evaluation of `expression` at the given timestamp.

与えられたタイムスタンプで `expression` を評価した結果です。


## [](#examples)Examples

The following query creates a snapshot of the data to read at "1970-01-01" and retrieves all collections that existed on that date:

次のクエリは、「1970-01-01」で読み取るデータのスナップショットを作成し、その日に存在したすべてのコレクションを取得します。


```javascript
client.query(
  q.At(
    q.Time('1970-01-01T00:00:00Z'),
    q.Paginate(q.Collections()),
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ data: [] }
```

