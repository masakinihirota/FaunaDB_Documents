Limits | Fauna Documentation
https://docs.fauna.com/fauna/current/api/limits

# Limits

Fauna is a shared, globally-accessible database service. To optimize query performance and share resources in a fair manner, the following limits are in place:

Faunaは、グローバルにアクセス可能な共有データベースサービスです。クエリのパフォーマンスを最適化し、リソースを公平に共有するために、以下の制限が設けられています。

|Constraint|Limit|
|--|--|
|Document size|8MB/document|
|Query size|16MB/query|
|Transaction size|16MB/transaction|
|GraphQL schema size|10MB|
|[Compute operations](https://docs.fauna.com/fauna/current/concepts/billing#compute)|12,000/transaction|
|Default query execution time (when no timeout is specified)|2 minutes|
|Maximum query execution time (even when timeout is specified)|10 minutes|
|Concurrent index builds|24 per account (not per database) <br>Index builds, for collections with more than 128 documents, are handled by a background task. The limit prevents an excessive number of indexes that must be built simultaneously.<br>Whenever the limit would be exceeded, an HTTP 429 error occurs and the transaction is aborted.|

|Constraint|Limit|
|--|--|
|Document size|8MB/document|
|Query size|16MB/query|
|Transaction size|16MB/transaction|
|GraphQL schema size|10MB|
|[Compute operations](https://docs.fauna.com/fauna/current/concepts/billing#compute)|12,000/transaction|
|Default query execution time (when no timeout is specified)|2 minutes|
|Maximum query execution time (even when timeout is specified)|10 minutes|
|Concurrent index builds|アカウントごとに24個（データベースごとではありません）<br>128個以上のドキュメントを持つコレクションのインデックス構築は、バックグラウンドタスクで処理されます。<br>この制限を超えると、HTTP 429エラーが発生し、トランザクションが中断されます。|

As a document database, Fauna is not currently a good storage solution for arbitrary binary blob data, such as images, PDFs, etc.

注意
ドキュメントデータベースとして、Faunaは現在、画像やPDFなどの任意のバイナリブロブデータの適切なストレージソリューションではありません。

