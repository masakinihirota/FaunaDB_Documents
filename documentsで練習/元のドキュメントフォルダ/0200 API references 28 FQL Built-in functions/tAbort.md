Abort | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/abort?lang=javascript

Abort

JAVASCRIPT

Abort( message )
Description
The Abort function terminates the current transaction and augments the returned error with the associated message. Any modifications to data or schema in the aborted transaction are ignored, even if this modification took place before the abort function was executed.

このAbort関数は現在のトランザクションを終了し、返されたエラーを関連するメッセージで補強します。アボート関数が実行される前にこの変更が行われた場合でも、アボートされたトランザクション内のデータまたはスキーマへの変更はすべて無視されます。

Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|message|String|An abort message.|

|引数|型|定義と要件|
|--|--|--|
|message|String|中止メッセージ。|

Returns
An error is returned with the associated abort message.

関連する中止メッセージとともにエラーが返されます。

Examples
The following query is a single transaction with three statements. The first statement creates a collection, the second statement adds an document to the collection, and the third statement aborts the transaction. Due to the transaction being terminated by the Abort call, neither the creation of the collection nor the addition of the document is present in the database.

次のクエリは、3つのステートメントを持つ単一のトランザクションです。最初のステートメントはコレクションを作成し、2番目のステートメントはドキュメントをコレクションに追加し、3番目のステートメントはトランザクションを中止します。Abort 呼び出しによってトランザクションが終了したため、コレクションの作成もドキュメントの追加もデータベースに存在しません。

```JAVASCRIPT
client.query([
  q.CreateCollection({ name: 'cars' }),
  q.Now(),
  q.Abort('Reset Transaction'),
])
.then((ret) => console.log(ret))
.catch((err) => console.error(
  'Error: [%s] %s: %s',
  err.name,
  err.message,
  err.errors()[0].description,
))

Error: [BadRequest] transaction aborted: Reset Transaction
```