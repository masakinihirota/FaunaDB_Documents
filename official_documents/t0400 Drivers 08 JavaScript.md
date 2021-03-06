JavaScript driver | Fauna Documentation
https://docs.fauna.com/fauna/current/drivers/javascript

# JavaScript driver

The section describes Fauna’s open source JavaScript driver, which provides the resources required to interact with Fauna.

このセクションでは、Fauna との対話に必要なリソースを提供する、Fauna のオープンソース JavaScript ドライバについて説明します。

Current stable version

現在の安定バージョン

4.3.0

Repository

リポジトリ

[fauna/faunadb-js](https://github.com/fauna/faunadb-js)

## [](#supported-runtimes)Supported runtimes

サポートしているランタイム

This driver supports and is tested on:

このドライバーは以下をサポートし、テストされています。

-   Node.js

    -   LTS

    -   Stable

-   Chrome

-   Firefox

-   Safari

-   Internet Explorer 11

## [](#installation)Installation

インストール

### [](#node-js)Node.js

terminal

```bash
npm install --save faunadb
```

See [`faunadb` on NPM](https://npmjs.com/package/faunadb) for more information.

詳しくは[`faunadb` on NPM](https://npmjs.com/package/faunadb)を参照してください。

### [](#browsers)Browsers

Via CDN:

CDN経由で

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js"></script>
```

The minified version of the driver can also be used via CDN:

また、CDN経由で、ドライバーのminifiedバージョンを使用することもできます。

html

```html
<script src="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb-min.js"></script>
```

## [](#usage)Usage

使用法

### [](#requiring-the-driver)Requiring the driver

ドライバーの必要性

```javascript
var faunadb = require('faunadb'),
  q = faunadb.query
```

This is the recommended `require` stanza. The `faunadb.query` module contains all of the functions to create Fauna Query expressions.

これは、推奨される `require` スタンザです。faunadb.query` モジュールには、Fauna Query 式を作成するためのすべての関数が含まれています。

### [](#instantiating-a-client-and-issuing-queries)Instantiating a client and issuing queries

クライアントのインスタンス化とクエリの発行

```javascript
var client = new faunadb.Client({ secret: 'YOUR_FAUNADB_SECRET' })
```

Once the client has been instantiated, it can be used to issue queries. For example, to create an instance in an existing class named `test` with the data: `{ testField: 'testValue' }`:

クライアントのインスタンス化が完了したら、それを使ってクエリを発行することができます。例えば，`test`という名前の既存のクラスの中に，データを持つインスタンスを作成する場合，以下のようになります。`testField: 'testValue' }`:

```javascript
var createP = client.query(
  q.Create(
    q.Collection('test'),
    { data: { testField: 'testValue' } }
  )
)
```

All methods on `faunadb.Client` return [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). So, if we wanted to handle the Promise to access the `Ref` of the newly created instance:

`faunadb.Client`のすべてのメソッドは[ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を返します。つまり、新しく生成されたインスタンスの`Ref`にアクセスするために、Promiseを処理したいとします。

```javascript
createP.then(function(response) {
  console.log(response.ref); // Logs the ref to the console.
})
```

`response` is a JSON object containing the Fauna response. See the JSDocs for `faunadb.Client`.

By default, the client object executes queries using HTTP Keep-Alive requests, which means that the connection is held open longer than required to receive a query response. This behavior can reduce the connection overhead when your code needs to issue many queries.

デフォルトでは、クライアントオブジェクトは HTTP Keep-Alive リクエストを使用してクエリを実行します。これは、クエリのレスポンスを受信するために必要な時間よりも長く、接続を保持することを意味します。この動作は、コードが多くのクエリを発行する必要がある場合に、接続のオーバーヘッドを減らすことができます。

Should you ever need to disable keep-alive connections, you can do so in the client constructor’s options:

キープアライブ接続を無効にする必要がある場合は、クライアントコンストラクタのオプションで設定できます。

```javascript
var client = new faunadb.Client({
  secret: 'YOUR_FAUNADB_SECRET',
  keepAlive: false,
})
```

When `keepAlive` is set to `false`, each query that your code executes results in a separate HTTP connection to Fauna.

`keepAlive` が `false` に設定されていると、コードが実行する各クエリは Fauna への個別の HTTP 接続になります。

### [](#pagination-helpers)Pagination helpers

The driver contains helpers to provide a simpler API for consuming paged responses from Fauna. See the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) reference for a description of paged responses.

ドライバには、Fauna からのページングされたレスポンスを消費するための、よりシンプルな API を提供するヘルパーが含まれています。ページングされたレスポンスの説明については、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)のリファレンスを参照してください。

Using the helper to page over sets lets the driver manage cursors and pagination state. For example, `client.paginate`:

ヘルパーを使ってセットをページングすることで、ドライバはカーソルやページネーションの状態を管理することができます。例えば、`client.paginate`の場合。

```javascript
var helper = client.paginate(
  q.Match(
    q.Index('test_index'),
    'example-term'
  )
)
```

The return value, `helper`, is an instance of `PageHelper`. The `each` method executes a callback function on each consumed page.

戻り値の `helper` は、`PageHelper` のインスタンスです。each`メソッドは、消費された各ページでコールバック関数を実行します。

```javascript
helper.each(function(page) {
  // Logs the page's contents,
  // for example: [ Ref(Collection("test"), "1234"), ... ]
  console.log(page);
});
```

Note that `each` returns a `Promise<void>` that is fulfilled on the completion of pagination.

`each`は、ページネーションの完了時に満たされる `Promise<void>` を返すことに注意してください。

The pagination can be transformed server-side via the Fauna Query Language by using the `map` and `filter` functions.

ページ処理は、Fauna Query Language の `map` と `filter` 関数を使って、サーバーサイドで変換することができます。

For example, to retrieve the matched instances:

例えば、マッチしたインスタンスを取得するには、次のようにします。

```javascript
helper
  .map(function(ref) {
    return q.Get(ref)
  })
  .each(function(page) {
    console.log(page); // Logs the retrieved documents.
  })
```

[See the JSDocs](https://fauna.github.io/faunadb-js/PageHelper.html) for more information on the pagination helper.

ページネーションヘルパーの詳細については、[JSDocs](https://fauna.github.io/faunadb-js/PageHelper.html)を参照してください。

### [](#timeouts)Timeouts

タイムアウト

The client can be configured to handle timeouts in two different ways:

クライアントは、2つの異なる方法でタイムアウトを処理するように設定できます。

1.  Specify an HTTP timeout in seconds by adding a `timeout` field to the `options` block when instantiating the client.

1.  クライアントのインスタンス作成時に `options` ブロックに `timeout` フィールドを追加して、HTTP タイムアウトを秒単位で指定します。

When `timeout` is provided, the client waits the specified number of seconds before timing out, if it has yet to receive a response. When the period has elapsed, any subsequent response cannot be handled.

timeout`が指定されると、クライアントは指定された秒数だけ待ってから、まだレスポンスを受け取っていない場合はタイムアウトになります。この時間が経過すると、それ以降の応答は処理できなくなります。

2.  Specify a server query timeout:

2. サーバーのクエリのタイムアウトを指定する。

1.  by adding `queryTimeout` to the `options` block when instantiating the client, or

1. クライアントのインスタンスを作成する際に `options` ブロックに `queryTimeout` を追加する。

2.  by passing an object containing `queryTimeout` as the second parameter to the `.query` method.

2. `.queryTimeout` を含むオブジェクトを `.query` メソッドの 2 番目のパラメータとして渡す。

When a query timeout is provided, the server waits for the specified number of milliseconds before timing out, if it has yet to complete the current query. When the period has elapsed, the query fails and the server responds with an error.

クエリタイムアウトが指定されると、現在のクエリをまだ完了していない場合、サーバーは指定されたミリ秒数だけ待ってからタイムアウトします。この時間が経過すると、クエリは失敗し、サーバーはエラーで応答します。

For example:

例えば、以下のように。

```javascript
// Specify an HTTP timeout
const client = new faunadb.Client({
  secret: 'YOUR_FAUNADB_SECRET',
  timeout: 30,
})
```

```javascript
// Specify a query timeout during client instantiation
const client = new faunadb.Client({
  queryTimeout: 2000,
  secret: 'YOUR_FAUNADB_SECRET',
})
```

```javascript
// Specify a query timeout per query
client.query(
  q.Paginate(q.Collections()),
  { queryTimeout: 1 }
)
```

The `queryTimeout` passed to `.query()` take precedence over any `queryTimeout` specified during client instantiation.

`.query()`に渡された`queryTimeout`は、クライアントのインスタンス化の際に指定された`queryTimeout`よりも優先されます。

### [](#per-query-options)Per-query options

Some options (currently only `secret` and `queryTimeout`) can be overridden on a per-query basis:

クエリごとのオプション

```javascript
var createP = client.query(
  q.Create(
    q.Collection('test'),
    {
      data: { testField: 'testValue' }
    }
  ),
  { secret: 'YOUR_FAUNADB_SECRET' }
)
```

```javascript
var helper = client.paginate(
  q.Match(q.Index('test_index'), 'example-term'),
  null,
  { secret: 'YOUR_FAUNADB_SECRET', }
)
```

```javascript
var data = client.query(
  q.Paginate(q.Collections()),
  { queryTimeout: 100 }
)
```

## [](#code)Code

コード

The JavaScript driver includes no polyfills. Support for Internet Explorer 11 requires a `Promise` polyfill.

JavaScriptドライバーには、ポリフィルは含まれていません。Internet Explorer 11のサポートには、`Promise`のポリフィルが必要です。

## [](#streaming)Streaming

ストリーミング

This section demonstrates how to subscribe to document change events. To learn more, see [Streaming](https://docs.fauna.com/fauna/current/drivers/streaming).

このセクションでは、ドキュメントの変更イベントを購読する方法を説明します。詳しくは[ストリーミング](https://docs.fauna.com/fauna/current/drivers/streaming)をご覧ください。

The following example is an HTML page that uses the JavaScript driver and plain JavaScript to establish a stream on a document in the `Scores` collection, with document ID `1`.

次の例は、JavaScriptドライバとプレーンなJavaScriptを使って、`Scores`コレクションの文書IDが`1`の文書に対してストリームを確立するHTMLページです。

To make this example work:

この例を動かすには

1.  Replace `YOUR_FAUNA_SECRET` with the secret that you use to connect to Fauna.

YOUR_FAUNA_SECRET` を、Fauna への接続に使用するシークレットに置き換えます。

2.  Host the page in a web server.

ウェブサーバでこのページをホストする。

3.  Open the page in your browser.

ブラウザでページを開く。

html

```html
<html>
  <head>
    <style>
span.scores {
  font-family: monospace;
  white-space: pre;
}
    </style>
  </head>
  <body>
    <h1>Scores stream</h1>
    <p>
      Scores: <span class="scores"></span>
    </p>
  </body>

  <script src="https://cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb-min.js"></script>
  <script type="text/javascript">

var faunadb = window.faunadb
var q = faunadb.query

var client = new faunadb.Client({
  secret: 'YOUR_FAUNA_SECRET',
})

var docRef = q.Ref(q.Collection('Scores'), '1')

function report(e) {
  console.log(e)
  var data = ('action' in e)
    ? e["document"].data
    : e.data
  document.body.innerHTML += '<p><span class="scores">' +
    JSON.stringify(data) +
    '</span></p>'
}

var stream
const startStream = () => {
  stream = client.stream.document(docRef)
  .on('snapshot', snapshot => {
    report(snapshot)
  })
  .on('version', version => {
    report(version)
  })
  .on('error', error => {
    console.log('Error:', error)
    stream.close()
    setTimeout(startStream, 1000)
  })
  .start()
}

startStream()

  </script>
</html>
```

If the `docRef` example does not exist, the page reports an error to the browser’s console once per second, and attempts to stream the document again.

docRef` の例が存在しない場合、このページは 1 秒に 1 回、ブラウザのコンソールにエラーを報告し、ドキュメントのストリームを再度試みます。

You can use the Web Shell in the [Fauna Dashboard](https://dashboard.fauna.com/), or [`fauna-shell`](https://docs.fauna.com/fauna/current/integrations/shell/), to run the following queries to get the collection and document created:

Fauna Dashboard](https://dashboard.fauna.com/) の Web シェル、または [`fauna-shell`](https://docs.fauna.com/fauna/current/integrations/shell/) を使って以下のようなクエリを実行すると、コレクションとドキュメントが作成されます。

shell

```shell
CreateCollection({ name: "Scores" })
```

shell

```shell
Create(Ref(Collection("Scores"), "1"), { data: { scores: [1, 2, 3] }})
```

If you have the page open in your browser, you should see the contents of the `data` field from that document reported in the web page.

ブラウザでページを開いていれば、そのドキュメントの `data` フィールドの内容が Web ページに報告されているはずです。

At this point, the stream is setup. Any time that the document is updated or deleted, the stream receives an event reflecting the change and the web page reports the new state. For example:

この時点で、ストリームの設定は完了です。ドキュメントが更新されたり、削除されたりすると、ストリームはその変更を反映したイベントを受け取り、Webページは新しい状態を報告します。例えば、以下のようになります。

shell

```shell
Update(Ref(Collection("Scores"), "1"), { data: { scores: [5, 2, 3] }})
```

If you need to stop the stream without closing the browser tab, your client code can call `stream.close()`.

ブラウザのタブを閉じずにストリームを停止する必要がある場合は、クライアントのコードで `stream.close()` を呼び出すことができます。

## [](#next-steps)Next steps

次のステップ

-   Driver repository: [https://github.com/fauna/faunadb-js](https://github.com/fauna/faunadb-js)

- ドライバのリポジトリです。[https://github.com/fauna/faunadb-js](https://github.com/fauna/faunadb-js)

-   [View the reference JSDocs here](https://fauna.github.io/faunadb-js/).

- [参考となるJSDocsはこちら](https://fauna.github.io/faunadb-js/)。

-   [Streaming](https://docs.fauna.com/fauna/current/drivers/streaming)

- [ストリーミング](https://docs.fauna.com/fauna/current/drivers/streaming)

-   [Detailed developer documentation for streaming is available within the drive source](https://github.com/fauna/faunadb-js/blob/master/src/stream.js)

- [ストリーミングの詳細な開発者向けドキュメントは、ドライブソース内にあります](https://github.com/fauna/faunadb-js/blob/master/src/stream.js)

-   [AWS Lambda connections](https://docs.fauna.com/fauna/current/drivers/known_issues)

- [AWS Lambdaの接続](https://docs.fauna.com/fauna/current/drivers/known_issues)

-   For more information about the Fauna Query Language, consult our query language [reference documentation](https://docs.fauna.com/fauna/current/api/fql/).

- Fauna Query Languageの詳細については、問い合わせ言語[リファレンスドキュメント](https://docs.fauna.com/fauna/current/api/fql/)を参照してください。

