faunadb - npm
https://www.npmjs.com/package/faunadb

# FaunaDB Javascript Driver

FaunaDB Javascript ドライバ

A Javascript driver for [FaunaDB](https://fauna.com).

[FaunaDB](https://fauna.com)の Javascript ドライバ。

[View reference JSDocs here](https://fauna.github.io/faunadb-js).

[View reference JSDocs here](https://fauna.github.io/faunadb-js)を参照してください。

See the [FaunaDB Documentation](https://docs.fauna.com/) and [Tutorials](https://docs.fauna.com/fauna/current/tutorials/crud) for guides and a complete database [API reference](https://docs.fauna.com/fauna/current/api/fql/).

ガイドや完全なデータベースの [API リファレンス](https://docs.fauna.com/fauna/current/api/fql/) については、[FaunaDB Documentation](https://docs.fauna.com/) や [Tutorials](https://docs.fauna.com/fauna/current/tutorials/crud) を参照してください。

## [](#supported-runtimes)Supported Runtimes

## [](#supported-runtimes)サポートされるランタイム

This Driver supports and is tested on:

このドライバは以下をサポートし、テストされています。

-   Node.js
    -   LTS
    -   Stable
-   Chrome
-   Firefox
-   Safari
-   Internet Explorer 11

## [](#using-the-client)Using the Client

クライアントの使い方

### [](#installation)Installation

インストール

#### [](#nodejs)Node.js

`npm install --save faunadb`

or

`yarn add faunadb`

#### [](#browsers)Browsers

ブラウザー

Via CDN:

CDN経由の場合

```
<script src\="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js"\></script\>

```

The minified version of the driver can also be used via CDN:

また、CDN経由でもminified版のドライバーを利用することができます。

```
<script src\="//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb-min.js"\></script\>

```

### [](#use)Use

使用

The [tutorials](https://docs.fauna.com/fauna/current/tutorials/crud) in the FaunaDB documentation contain other driver-specific examples.

FaunaDB ドキュメントの [tutorials](https://docs.fauna.com/fauna/current/tutorials/crud) には、他のドライバー固有の例が記載されています。

#### [](#connecting-from-the-browser)Connecting from the browser

ブラウザからの接続

To get up and running quickly, below is a full example for connecting from the browser. Replace <your_key_here> with a database secret. You can get that by visiting your [FaunaDB Dashboard](https://dashboard.fauna.com/) , creating a new database, clicking on "Security" in the sidebar on the left, and then clicking "New Key". To learn more about keys, see [FaunaDB Key System](https://docs.fauna.com/fauna/current/security/keys.html).

すぐに実行できるように、以下にブラウザからの接続の完全な例を示します。<your_key_here> をデータベースシークレットに置き換えてください。これは、[FaunaDB Dashboard](https://dashboard.fauna.com/) にアクセスして、新しいデータベースを作成し、左のサイドバーにある「Security」をクリックして、「New Key」をクリックすることで取得できます。キーについての詳細は、[FaunaDB Key System](https://docs.fauna.com/fauna/current/security/keys.html)を参照してください。

```
<html\>
  <head\>
  </head\>
<body\>
  <h1\>Test</h1\>
</body\>
<script src\="https://cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js"\></script\>
<script type\="text/javascript"\>
  var faunadb = window.faunadb
  var q = faunadb.query
  var client = new faunadb.Client({
    secret: 'your\_key\_here',
    domain: 'db.fauna.com',
    scheme: 'https',
  })
  client.query(
    q.ToDate('2018-06-06')
  )
  .then(function (res) { console.log('Result:', res) })
  .catch(function (err) { console.log('Error:', err) })
</script\>
</html\>
```

#### [](#requiring-the-driver)Requiring the Driver

ドライバの必要性

```
var faunadb \= require('faunadb'),
  q \= faunadb.query
```

This is the recommended require stanza. The `faunadb.query` module contains all of the functions to create FaunaDB Query expressions.

これは推奨される require スタンザです。`faunadb.query` モジュールには、FaunaDB Query 式を作成するためのすべての関数が含まれています。

#### [](#instantiating-a-client-and-issuing-queries)Instantiating a Client and Issuing Queries

クライアントをインスタンス化してクエリを発行する

```
var client = new faunadb.Client({ secret: 'YOUR_FAUNADB_SECRET' })
```

Once the client has been instantiated, it can be used to issue queries. For example, to create an document in an existing collection named `test` with the data: `{ testField: 'testValue' }`:

クライアントがインスタンス化されると、それを使ってクエリを発行できるようになります。例えば，「test」という名前の既存のコレクションの中に，次のようなデータを持つドキュメントを作成します。`{testField: 'testValue' }`というデータを持つドキュメントを作成します。

```
var createP \= client.query(
  q.Create(q.Collection('test'), { data: { testField: 'testValue' } })
)
```

All methods on `faunadb.Client` return [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). So, if we wanted to handle the Promise to access the `Ref` of the newly created document:

`faunadb.Client`の全てのメソッドは[ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) を返します。そこで、新しく作成されたドキュメントの`Ref`にアクセスするためにPromiseを処理したいとします。

```
createP.then(function(response) {
  console.log(response.ref) // Would log the ref to console.
})
// コンソールにRefを記録します。
```

`response` is a JSON object containing the FaunaDB response. See the JSDocs for `faunadb.Client`.

`response` は、FaunaDB のレスポンスを含む JSON オブジェクトです。詳しくは `faunadb.Client` の JSDocs をご覧ください。

#### [](#pagination-helpers)Pagination Helpers

ページングヘルパー

This driver contains helpers to provide a simpler API for consuming paged responses from FaunaDB. See the [Paginate function reference](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) for a description of paged responses.

このドライバには、FaunaDB からのページングされたレスポンスを消費するためのよりシンプルな API を提供するヘルパーが含まれています。ページ化されたレスポンスの説明については、[Paginate関数リファレンス](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) を参照してください。

Using the helper to page over sets lets the driver handle cursoring and pagination state. For example, `client.paginate`:

セットをページングするためにヘルパーを使用すると、ドライバはカーソリングとページネーションの状態を扱うことができます。例えば、`client.paginate`です。

cursoring

？？？
ページ間を移動するための方法

```
var helper \= client.paginate(q.Match(q.Index('test\_index'), 'example-term'))
```

The return value, `helper`, is an instance of `PageHelper`. The `each` method will execute a callback function on each consumed page.

戻り値の `helper` は、`PageHelper` のインスタンスです。`each`メソッドは、消費された各ページでコールバック関数を実行します。

```
helper.each(function(page) {
  console.log(page) // Will log the page's contents, for example: \[ Ref("collections/test/1234"), ... \]
})
```

// Will log the page's contents, for example:

// ページの内容を記録します。

Note that `each` returns a `Promise<void>` that is fulfilled on the completion of pagination.

`each`は、ページ処理の完了時に満たされる`Promise<void>`を返すことに注意してください。

The pagination can be transformed server-side via the FaunaDB query language via the `map` and `filter` functions.

ページ処理は、FaunaDBのクエリ言語の`map`と`filter`関数を使って、サーバーサイドで変換することができます。

For example, to retrieve the matched documents:

たとえば、マッチしたドキュメントを取得するには、次のようにします。

```
helper
  .map(function(ref) {
    return q.Get(ref)
  })
  .each(function(page) {
    console.log(page) // Will now log the retrieved documents.
  })
```

// Will now log the retrieved documents.

// 取得したドキュメントを記録します。

[See the JSDocs](https://fauna.github.com/faunadb-js/PageHelper.html) for more information on the pagination helper.

ページネーション・ヘルパーの詳細については、[JSDocs](https://fauna.github.com/faunadb-js/PageHelper.html)を参照してください。

#### [](#timeouts)Timeouts

タイムアウト

The client can be configured to handle timeouts in two different ways:

クライアントは2つの異なる方法でタイムアウトを処理するように設定できます。

1.  Add a `timeout` field to the `options` block when instantiating the client
2.  By setting a `queryTimeout` on the client (or passing the value to the client's `.query()` method directly)

---

1. クライアントのインスタンスを作成する際に、`options` ブロックに `timeout` フィールドを追加する。
2. クライアントに `queryTimeout` を設定する (または、その値をクライアントの `.query()` メソッドに直接渡す)

The first option (i.e. `timeout`) represents a HTTP timeout on the client side. Defined in seconds, the client will wait the specified period before timing out if it has yet to receive a response.

最初のオプション（すなわち`timeout`）は、クライアント側のHTTPタイムアウトを表します。秒単位で指定すると、クライアントは指定された時間だけ待ってから、まだレスポンスを受け取っていない場合にタイムアウトします。

```
const client = new faunadb.Client({
  secret: 'YOUR_FAUNADB_SECRET',
  timeout: 100,
})
```

On the other hand, using the client's `queryTimeout` dictates how long FaunaDB will process the request on the server before timing out if it hasn't finished running the operation. This can be done in two different ways:

一方、クライアントの `queryTimeout` を使用すると、FaunaDB がサーバー上でリクエストを処理する時間を指定してから、操作の実行が完了していない場合にタイムアウトします。これには2つの方法があります。

```
// 1. Setting the value when instantiating a new client
const client \= new faunadb.Client({
  queryTimeout: 2000,
  secret: 'YOUR\_FAUNADB\_SECRET',
})

// 1.新しいクライアントのインスタンスを作成するときに値を設定する

// 2. Specifying the value per-query
var data \= client.query(q.Paginate(q.Collections()), {
  queryTimeout: 100,
})

// 2.クエリごとに値を指定する
```

**Note:** When passing a `queryTimeout` value to `client.query()` as part of the `options` object, it will take precendence over any value set on the client when instantiating it.

**注意** `options` オブジェクトの一部として `client.query()` に `queryTimeout` の値を渡す場合、インスタンス化する際にクライアント側で設定された値よりも優先されます。

#### [](#per-query-options)Per-query options

パークエリのオプション

Some options (currently only `secret` and `queryTimout`) can be overriden on a per-query basis:

いくつかのオプション（現在は `secret` と `queryTimout` のみ）は、クエリごとにオーバーライドすることができます。

```
var createP = client.query(
  q.Create(q.Collection('test'), { data: { testField: 'testValue' } }),
  { secret: 'YOUR_FAUNADB_SECRET' }
)

```

```
var helper = client.paginate(
  q.Match(q.Index('test_index'), 'example-term'),
  null,
  {
    secret: 'YOUR_FAUNADB_SECRET',
  }
)
```

```
var data \= client.query(q.Paginate(q.Collections()), {
  queryTimeout: 100,
})
```

#### [](#custom-fetch)Custom Fetch

カスタムフェッチ

To use a custom `fetch()` you just have to specify it in the configuration and make it compatible with the [standard Web API Specification of the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

カスタムの`fetch()`を使うには、設定でそれを指定して、[standard Web API Specification of the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)と互換性を持たせるだけです。

```
const customFetch \= require('./customFetch')
const client \= new faunadb.Client({
  secret: 'YOUR\_FAUNADB\_SECRET',
  fetch: customFetch,
})
```

#### [](#http2-session-idle-time-nodejs-only)HTTP/2 Session Idle Time (Node.js only)

HTTP/2 セッション アイドルタイム (Node.js only)

When running on the Node.js platform, the Fauna client uses [HTTP/2 multiplexing](https://stackoverflow.com/questions/36517829/what-does-multiplexing-mean-in-http-2) to reuse the same session for many simultaneous requests. After all open requests have been resolved, the client will keep the session open for a period of time (500ms by default) to be reused for any new requests.

Node.js プラットフォームで実行する場合、Fauna クライアントは [HTTP/2 multiplexing](https://stackoverflow.com/questions/36517829/what-does-multiplexing-mean-in-http-2) を使用して、同じセッションを多数の同時リクエストに再利用します。すべてのオープンなリクエストが解決された後、クライアントは一定期間(デフォルトでは500ms)セッションをオープンにしておき、新しいリクエストに再利用します。

The `http2SessionIdleTime` parameter may be used to control how long the HTTP/2 session remains open while the connection is idle. To save on the overhead of closing and re-opening the session, set `http2SessionIdleTime` to a longer time --- or even `Infinity`, to keep the session alive indefinitely.

`http2SessionIdleTime` パラメーターを使用して、接続がアイドル状態のときに HTTP/2 セッションを開いたままにする時間を制御することができます。セッションを閉じたり再開したりするオーバーヘッドを節約するために、`http2SessionIdleTime` をより長い時間に設定してください --- あるいは `Infinity` に設定して、セッションを無期限に存続させることもできます。

While an HTTP/2 session is alive, the client will hold the Node.js event loop open; this prevents the process from terminating. Call `Client#close` to manually close the session and allow the process to terminate. This is particularly important if `http2SessionIdleTime` is long or `Infinity`:

HTTP/2 セッションが存続している間、クライアントは Node.js のイベントループを開いたままにして、プロセスの終了を防ぎます。`クライアント#close`を呼び出して、手動でセッションを閉じ、プロセスが終了するようにします。これは `http2SessionIdleTime` が長いか `Infinity` の場合に特に重要です。

```
// sample.js (run it with "node sample.js" command)
const { Client, query: Q } \= require('faunadb')

// sample.js (node sample.jsコマンドで実行してください)

async function main() {
  const client \= new Client({
    secret: 'YOUR\_FAUNADB\_SECRET',
    http2SessionIdleTime: Infinity,
    //                    ^^^ Infinity or non-negative integer
  })
  const output \= await client.query(Q.Add(1, 1))

  console.log(output)

  client.close()
  //     ^^^ If it's not called then the process won't terminate
}

main().catch(console.error)
```

## [](#known-issues)Known issues

既知の問題

### [](#using-with-cloudflare-workers)Using with Cloudflare Workers

### [](#using-with-cloudflare-workers)クラウドフレアワーカーでの使用について

Cloudflare Workers have neither XMLHttpRequest nor fetch in the global scope. Therefore, the `cross-fetch` package is unable to inject its own `fetch()` function, and throws an error. The `fetch()` function is injected via a closure, so the workaround would be to pass the fetch objects when initiating the FaunaDB client config. Cloudflare Workers also doesn't support the use of an AbortController, which terminates requests as well as streams. Here is a workaround:

Cloudflare Workersは、グローバルスコープにXMLHttpRequestもfetchも持っていません。そのため、`cross-fetch`パッケージは自身の`fetch()`関数を注入することができず、エラーとなります。fetch()` 関数はクロージャ経由で注入されるため、回避策としては FaunaDB クライアントの設定を開始する際に fetch オブジェクトを渡す必要があります。また、Cloudflare Workers は、ストリームと同様にリクエストを終了させる AbortController の使用をサポートしていません。これを回避する方法を紹介します。

```
const c \= new faunadb.Client({
  secret: 'your secret',
  fetch: (url, params) \=> {
    const signal \= params.signal
    delete params.signal
    const abortPromise \= new Promise(resolve \=> {
      if (signal) {
        signal.onabort \= resolve
      }
    })
    return Promise.race(\[abortPromise, fetch(url, params)\])
  },
})
```

## [](#client-development)Client Development

クライアント開発

Run `yarn` to install dependencies.

`yarn`を実行して、依存ファイルをインストールします。

### [](#code)Code

コード

This project includes no polyfills. Support for Internet Explorer 11 requires a `Promise` polyfill.

このプロジェクトにはポリフィルは含まれていません。Internet Explorer 11 のサポートには、`Promise` のポリフィルが必要です。

### [](#testing)Testing

テスト

The driver tests need to connect to a FaunaDB so we recommend you setup one locally. The fast way is running a docker image like `docker run --rm --name faunadb -p 8443:8443 fauna/faunadb`.

ドライバのテストでは、FaunaDB に接続する必要があるので、ローカルに設置することをお勧めします。

`docker run --rm --name faunadb -p 8443:8443 fauna/faunadb` 

のように docker イメージを実行するのが手っ取り早い方法です。

After have the faunadb working on local you have to setup a set of env variables before run the tests. You can set them manually or use a `.env` file for this.

faunadb がローカルで動作するようになったら、テストを実行する前に一連の環境変数を設定する必要があります。手動で設定することもできますし、`.env` ファイルを使って設定することもできます。

```
FAUNA_DOMAIN=localhost
FAUNA_SCHEME=http
FAUNA_PORT=8443
FAUNA_ROOT_KEY=secret
AUTH_0_URI=https://{TENANT}.auth0.com/
AUTH_0_TOKEN=auth0 token
```

[Guide for Auth0](https://auth0.com/docs/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application)

-   `yarn test`: This will run tests against the current version of Node.js. [nvm](https://github.com/creationix/nvm) is useful for managing multiple versions of Node.js for testing.

- `yarn test`: これは、現在のバージョンのNode.jsに対してテストを実行します。[nvm](https://github.com/creationix/nvm)は、テスト用に複数のバージョンのNode.jsを管理するのに便利です。

Each test run will create a new database, and will attempt to clean it up when done. 

If the tests are cancelled, the test database will not get cleaned up. Therefore it is recommended to use a FaunaDB key scoped to an empty parent database created for this purpose, rather than your account's root key. 

This will make cleanup of test databases as easy as removing the parent database.

各テストの実行では、新しいデータベースが作成され、終了時にはクリーンアップが試みられます。テストがキャンセルされた場合、テスト用のデータベースはクリーンアップされません。

そのため、アカウントのルートキーではなく、この目的のために作成された空の親データベースにスコープされた FaunaDB キーを使用することをお勧めします。

これにより、親データベースを削除するのと同じくらい簡単にテストデータベースのクリーンアップができるようになります。

See the [FaunaDB Multitenancy Tutorial](https://docs.fauna.com/fauna/current/tutorials/multitenant) for more information about nested databases.

ネストしたデータベースの詳細については [FaunaDB Multitenancy Tutorial](https://docs.fauna.com/fauna/current/tutorials/multitenant) を参照してください。

Alternatively, tests can be run via a Docker container with `FAUNA_ROOT_KEY="your-cloud-secret" make docker-test` (an alternate Alpine-based NodeJS image can be provided via `RUNTIME_IMAGE`).

あるいは、`FAUNA_ROOT_KEY="your-cloud-secret" make docker-test` で Docker コンテナを使ってテストを実行することもできます (代替の Alpine ベースの NodeJS イメージを `RUNTIME_IMAGE` で提供できます)。

### [](#documentation)Documentation

ドキュメンテーション

-   `yarn doc` will generate JSDoc documentation for the project.

- `yarn doc` でプロジェクトの JSDoc ドキュメントを生成します。

### [](#previewing-upcoming-functionality)Previewing upcoming functionality

### [](#previewing-upcoming-functionality)リリース予定の機能をプレビューします。

If you want to preview unreleased features in your project, you can do so by installing this driver using one of the following methods.

リリースされていない機能をプロジェクトでプレビューしたい場合は、以下のいずれかの方法でこのドライバーをインストールすることで実現できます。

#### [](#1-using-a-git-url)1\. Using a git URL

#### 1. git URLの使用

Normally, you would install the latest release of this package using `npm install --save faunadb` or `yarn add faunadb`. To access our latest features, you will need to define this dependency [by using a git URL](https://docs.npmjs.com/files/package.json#dependencies).

通常は、`npm install -save faunadb` や `yarn add faunadb` を使って、このパッケージの最新リリースをインストールします。最新の機能を利用するには、この依存関係を[git URLを使って]定義する必要があります(https://docs.npmjs.com/files/package.json#dependencies)。

1.  Open your `package.json` file

1.  package.json "ファイルを開きます。

2.  If you have already installed this driver, you should see the following in your list of dependencies. If not, add it.

2. すでにこのドライバをインストールしている場合は、依存関係のリストに以下の項目が表示されているはずです。もしそうでなければ、追加してください。

```
"faunadb": "^2.14.1"
```

3.  Instead of using a version from the npm registry, we'll want to point our `package.json` to the `master` branch of our GitHub repo. To do that, change the `^2.4.1` to `fauna/faunadb-js#master`.

3.  npm レジストリのバージョンを使うのではなく、GitHub リポジトリの `master` ブランチを `package.json` に指定したいと思います。そのためには、`^2.4.1` を `fauna/faunadb-js#master` に変更します。

```
"faunadb": "fauna/faunadb-js#master"
```

4.  Update your `node_modules` by running `npm install` or `yarn`

4. `npm install` または `yarn` を実行して、`node_modules` を更新する。

#### [](#2-using-npm-pack)2\. Using `npm pack`

#### 2. npm pack`を使う

1.  Clone this repo to your local system

1.  このレポをローカルシステムにクローンします。

```
git clone https://github.com/fauna/faunadb-js.git
```

2.  Navigate to the cloned repo and open the `package.json`

2.  クローンされたリポジトリに移動し、`package.json` を開きます。

```
cd faunadb-js
code package.json
```

3.  Change the `version` to be semantic. For example, `3.0.0-beta`.

3. `version` を意味のあるものに変更します。例えば、`3.0.0-beta`のようにします。

4.  Run `npm pack`. This creates a tarball at the root of your project directory which represents the image sent to the NPM registry when publishing.

4. `npm pack` を実行します。これにより、プロジェクトディレクトリのルートに、公開時にNPMレジストリに送信されるイメージを表すtarballが作成されます。

5.  In another project, you can now install the beta from the local image you just created by running:

5. 別のプロジェクトで、先ほど作成したローカルイメージからベータ版をインストールするには、次のように実行します。

```
npm install /path/to/tarball
```

## [](#license)License

ライセンス

Copyright 2021 [Fauna, Inc.](https://fauna.com/)

Licensed under the Mozilla Public License, Version 2.0 (the "License"); you may not use this software except in compliance with the License. You may obtain a copy of the License at

このソフトウェアは、Mozilla Public License, Version 2.0 (以下、「ライセンス」)に基づいてライセンスされています。このライセンスに準拠しない限り、このソフトウェアを使用することはできません。本ソフトウェアは、ライセンスに準拠していない限り使用できません。

[http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

本契約に基づいて配布されるソフトウェアは、適用法で義務付けられている場合や書面で合意されている場合を除き、明示的または黙示的を問わず、いかなる種類の保証も条件もなく、「そのまま」の状態で配布されます。本契約に基づく許可と制限を規定する特定の言語については、本契約を参照してください。

