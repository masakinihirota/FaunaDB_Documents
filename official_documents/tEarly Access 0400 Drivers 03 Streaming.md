Streaming (early) | Fauna Documentation
https://docs.fauna.com/fauna/current/drivers/streaming

# Streaming

Streaming is a feature where client code can _subscribe_ to a document stored in a Fauna database and any changes to that document are immediately streamed to the client as event notifications. The primary intended use case is for immediate user interface updates based on activity in your Fauna database.

ストリーミングとは、クライアントコードがFaunaデータベースに保存されているドキュメントを「サブスクライブ」することで、そのドキュメントに変更があった場合、イベント通知として直ちにクライアントにストリーミングされる機能です。主な用途は、Faunaデータベースの活動に基づいてユーザーインターフェースを即時に更新することです。

Streaming is a much better alternative to the standard approach of polling. Polling occurs when client code repeatedly issues queries to the database at regular intervals to discover document updates. With pay-as-you-go pricing, polling is the much more expensive alternative, and your code is only aware of changes when query results are returned.

ストリーミングは、標準的な手法であるポーリングよりもはるかに優れた代替手段です。ポーリングとは、クライアントコードが一定の間隔でデータベースにクエリを繰り返し発行し、ドキュメントの更新を検出することです。従量課金制の場合、ポーリングの方がはるかにコストがかかりますが、コードはクエリの結果が返ってきたときに初めて変更を認識します。

**Polling**

![A sequence diagram demonstrating the communications during database polling](https://docs.fauna.com/fauna/current/drivers/streaming_images/diagram-polling.svg)

**Streaming**

![A sequence diagram demonstrating the communications during database streaming](https://docs.fauna.com/fauna/current/drivers/streaming_images/diagram-streaming.svg)

The polling diagram demonstrates that the client has to execute many more queries in order to discover when a document has been updated. For a streaming client, the subscription happens once and events are automatically broadcast to the client whenever the subscribed document is updated.

ポーリングダイアグラムでは、ドキュメントがいつ更新されたかを発見するために、クライアントがさらに多くのクエリを実行しなければならないことを示しています。ストリーミング・クライアントの場合、購読は一度行われ、購読したドキュメントが更新されるたびにイベントが自動的にクライアントにブロードキャストされます。

There is a cost in compute operations to hold a stream open. See [Billing](https://docs.fauna.com/fauna/current/concepts/billing) for details.

注意
ストリームをオープンにしておくためには、計算機操作によるコストがかかります。詳しくは[Billing](https://docs.fauna.com/fauna/current/concepts/billing)をご覧ください。

Streaming works with HTTP/1.x, but HTTP/2 is much more efficient so use that if your client environment supports it.

ヒント
ストリーミングはHTTP/1.xで動作しますが、HTTP/2の方がはるかに効率的なので、クライアント環境がサポートしている場合はそちらを使用してください。

## [](#events)Events

Fauna streaming uses a protocol inspired by HTTP [Server-Sent Events (SSE)](https://en.wikipedia.org/wiki/Server-sent_events). Fauna streams events for a subscribed document to the client, keeping the connection open (where possible) to minimize transmission delays. Client event handling (in supported drivers) is similar to [WebSockets](https://en.wikipedia.org/wiki/WebSocket), however streams are unidirectional: the client cannot send events to the server via the stream.

Faunaのストリーミングは、HTTP [Server-Sent Events (SSE)](https://en.wikipedia.org/wiki/Server-sent_events)にヒントを得たプロトコルを使用している。Fauna は、受信したドキュメントのイベントをクライアントにストリームし、可能な限り接続を維持して伝送の遅延を最小限に抑える。クライアントのイベント処理は [WebSockets](https://en.wikipedia.org/wiki/WebSocket)に似ていますが、ストリームは一方通行です。クライアントはストリームを介してサーバーにイベントを送信することはできません。

Similar to the SSE protocol, events are communicated over a text-based channel. Each event is formatted as a single-line JSON object. Unlike SSE, Fauna adds an additional line ending, `\r\n`, to delimit payloads, which helps with JSON parsing when network middleware splits the event payload into multiple packets.

SSEプロトコルと同様に、イベントはテキストベースのチャンネルで通信されます。各イベントは、一行のJSONオブジェクトとしてフォーマットされます。SSEとは異なり、Faunaではペイロードを区切るために、行末に``r\n`を追加しています。これは、ネットワークミドルウェアがイベントのペイロードを複数のパケットに分割する際に、JSONの解析を助けるためです。

Here is an example event, with the JSON formatted for easy identification of the structure:

以下はイベントの例で、構造がわかりやすいようにJSONがフォーマットされています。

```json
{
    "type": "version",
    "txn": 1614043435980000,
    "event": {
        "action": "update",
        "document": {
            "data": {
                "score": 12
            },
            "ref": {
                "@ref": {
                    "collection": {
                        "@ref": {
                            "collection": {
                                "@ref": {
                                    "id": "collections"
                                }
                            },
                            "id": "Status"
                        }
                    },
                    "id": "1"
                }
            },
            "ts": 1614043435980000
        }
    }
}
```

The outermost structure is a "metadata" wrapper for the event, which contains the fields:

一番外側の構造は、イベントの「メタデータ」ラッパーで、フィールドを含んでいます。

-   `type`: the type of event payload. One of:

type：イベントペイロードのタイプ。の一つ：

    -   `start`: An event marking the start of the stream. Use the `txn` field as the stream’s starting timestamp.

start：ストリームの開始をマークするイベント。このtxnフィールドをストリームの開始タイムスタンプとして使用します。

    -   `version`: An event containing information about a given document.

version：特定のドキュメントに関する情報を含むイベント。

    -   `error`: An event in response to an error with the stream.

error：ストリームのエラーに応答するイベント。

    -   `history_rewrite`: An event containing information about a historical change, such as when the subscribed document’s history is revised.

history_rewrite：サブスクライブされたドキュメントの履歴が改訂されたときなど、履歴の変更に関する情報を含むイベント。

-   `txn`: the timestamp of the transaction emitting the event.

txn：イベントを発行するトランザクションのタイムスタンプ。

-   `event`: an object describing the particular event.

event：特定のイベントを説明するオブジェクト。

The `event` object contains the fields:

eventオブジェクトは、フィールドが含まれています。

-   `action`: the type of event. One of:

action：イベントのタイプ。の一つ：

    -   `create`: Occurs when a document is created.

create：ドキュメントが作成されたときに発生します。

    -   `update`: Occurs when an existing document is updated.

update：既存のドキュメントが更新されたときに発生します。

    -   `delete`: Occurs when an existing document is deleted.

delete：既存のドキュメントが削除されたときに発生します。

    -   `add`: Occurs when a document is added to a set.

add：ドキュメントがセットに追加されたときに発生します。

    -   `remove`: Occurs when a document is removed from a set.

remove：ドキュメントがセットから削除されたときに発生します。

-   `document`: An object containing the subscribed document’s details. For `update` events, only the modified fields are included.

document：サブスクライブされたドキュメントの詳細を含むオブジェクト。以下のためupdateのイベント、変更されたフィールドのみが含まれています。

    The `document`'s `ts` field is the document’s timestamp expressed as a [Long](https://docs.fauna.com/fauna/current/api/fql/types#long). It is often the same as the event wrapper’s `txn` field, but it is not guaranteed to be identical.

注意
フィールドには、のように表現文書のタイムスタンプである ロング。多くの場合、イベントラッパーのフィールドと同じですが、同一であるとは限りません。documenttstxn

The methods to respond to events differ in each driver that supports streaming:

イベントに応答する方法は、ストリーミングをサポートするドライバーごとに異なります。

-   [JavaScript](https://docs.fauna.com/fauna/current/drivers/javascript#streaming)

-   [JVM (Java, Scala)](https://docs.fauna.com/fauna/current/drivers/jvm#document-streaming)

## [](#tips)Tips

-   Avoid running a query to fetch a document and then establishing a stream. Multiple events may have modified the document prior to stream startup, which can lead to inaccurate representation of the document data in your application.

クエリを実行してドキュメントをフェッチしてからストリームを確立することは避けてください。複数のイベントがストリームの開始前にドキュメントを変更した可能性があり、アプリケーションでのドキュメントデータの不正確な表現につながる可能性があります。

    For the JavaScript driver, you can use the `document` helper, which takes care of this problem for you.

JavaScriptドライバーの場合はdocument、この問題を処理するヘルパーを使用できます。

## [](#limitations)Limitations

制限事項

For the initial release of streaming, the following limitation exist:

ストリーミングの初期リリースには、次の制限があります。

-   Active stream count:

アクティブなストリーム数：

    -   Only 100 simultaneous streams per browser. Browsers manage the number of concurrent HTTP2 streams using a hard-coded limit. No matter how many windows or tabs are open, you cannot exceed 100 streams simultaneously.

ブラウザごとに100の同時ストリームのみ。ブラウザは、ハードコードされた制限を使用して、同時HTTP2ストリームの数を管理します。開いているウィンドウまたはタブの数に関係なく、同時に100ストリームを超えることはできません。

    -   Using a driver that supports streaming (currently, the [JavaScript](https://docs.fauna.com/fauna/current/drivers/javascript) and [JVM](https://docs.fauna.com/fauna/current/drivers/jvm) drivers), you can have more than 100 streams active at once by creating additional connection objects: each connection supports up to 100 streams.

ストリーミングをサポートするドライバー（現在、 JavaScriptおよびJVMドライバー）を使用すると、追加の接続オブジェクトを作成することで、一度に100を超えるストリームをアクティブにすることができます。各接続は最大100のストリームをサポートします。

    -   There may be other limits based on each host language’s HTTP2 implementation but we have not encountered those yet.

各ホスト言語のHTTP2実装に基づいて他の制限があるかもしれませんが、まだそれらに遭遇していません。

-   Node.js clients are not currently supported.

Node.jsクライアントは現在サポートされていません。

    Node.js' HTTP/2 implementation has an issue that currently prevents stream disconnections (and possibly other error conditions) from being reported correctly — no error event is triggered in these situations, so your client would wait for stream events that can never arrive.

Node.jsのHTTP / 2実装には、現在、ストリームの切断（および場合によっては他のエラー状態）が正しく報告されないという問題があります。これらの状況ではエラーイベントがトリガーされないため、クライアントは到着できないストリームイベントを待機します。

-   A stream can be established only to a single user-created document. It is not currently possible to stream a schema document, such as for a collection, or index/set.

ストリームは、ユーザーが作成した単一のドキュメントに対してのみ確立できます。現在、コレクションやインデックス/セットなどのスキーマドキュメントをストリーミングすることはできません。

-   A stream only reports events to the fields and values within a document’s `data` field.

ストリームは、ドキュメントのdataフィールド内のフィールドと値にのみイベントを報告します。

-   No support for GraphQL subscriptions is available.

サポートなし GraphQL サブスクリプションが利用可能です。

-   Driver support is currently limited. See the [JavaScript](https://docs.fauna.com/fauna/current/drivers/javascript#streaming) and [JVM](https://docs.fauna.com/fauna/current/drivers/jvm#document-streaming) driver pages for example client code.

ドライバーのサポートは現在制限されています。クライアントコードの例については、JavaScriptおよび JVMドライバーのページを参照してください 。

