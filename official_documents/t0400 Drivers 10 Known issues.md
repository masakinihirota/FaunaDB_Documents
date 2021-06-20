Known issues | Fauna Documentation
https://docs.fauna.com/fauna/current/drivers/known_issues

# Known issues

既知の問題

## [](#aws-lambda-connections)AWS Lambda connections

AWS Lambdaコネクション

This section describes an issue, and a workaround for Fauna client code running in an AWS Lambda function.

このセクションでは、AWS Lambda 関数内で実行される Fauna クライアントコードの問題点とその回避策について説明します。

When an AWS Lambda function executes, the execution context is maintained for a short period in anticipation of new requests. If no new request is received in that period, the context is _frozen_, which stores the current state of the execution context.

AWS Lambda 関数が実行されると、新しいリクエストを期待して実行コンテキストが短期間維持されます。その期間に新しいリクエストが来なければ、コンテキストは_frozen_され、実行コンテキストの現在の状態が保存されます。

When a subsequent request comes in, AWS Lambda can choose to _thaw_ the execution context to service the request, instead of starting the function from scratch. Thawed contexts behave (mostly) like they were never frozen. See [AWS Lambda Execution Context](https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html) for details.

後続のリクエストが来ると、AWS Lambdaは、関数をゼロから開始する代わりに、リクエストを処理するために実行コンテキストを_解凍_することを選択できます。解凍されたコンテキストは、（ほとんど）凍結されなかったように動作します。詳細は[AWS Lambda Execution Context](https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html)を参照してください。

The key point is that when an execution context is frozen, the initialization code has already been run. When the execution context is thawed, execution resumes in the Lambda function’s handler code; initialization code is not re-executed.

重要な点は、実行コンテキストが凍結されているとき、初期化コードはすでに実行されているということです。実行コンテキストが解凍されると、Lambda関数のハンドラコードで実行が再開され、初期化コードは再実行されません。

Fauna driver connection objects maintain at least one internal socket connection. Socket connections automatically close after a certain period when no traffic is exchanged. So, if your Lambda function is frozen for long enough, its internal socket becomes invalid. When an execution context is thawed later on, your Lambda function could receive `ECONNRESET` errors.

Fauna ドライバの接続オブジェクトは、少なくとも 1 つの内部ソケット接続を維持します。ソケット接続は、トラフィックがやり取りされない一定期間が経過すると自動的に閉じます。そのため、Lambda関数が長時間凍結されると、その内部ソケットは無効になります。後で実行コンテキストが解凍されたときに、Lambda関数が`ECONNRESET`エラーを受け取る可能性があります。

We recommend that you create your client connection object within your handler functions so that you have a fresh connection object for each thawed context. All Fauna connections are light-weight HTTP connections, with HTTP KeepAlive enabled by default, so there is no performance advantage to creating client connection objects outside of your handlers.

実行コンテキストが解凍されるたびに新鮮な接続オブジェクトを持つように、ハンドラ関数内でクライアント接続オブジェクトを作成することをお勧めします。Fauna の接続はすべて軽量の HTTP 接続で、デフォルトで HTTP KeepAlive が有効になっているため、ハンドラーの外でクライアント接続オブジェクトを作成してもパフォーマンス上のメリットはありません。

