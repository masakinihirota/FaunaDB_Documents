疑問

---

FaunaはどんなタイプのDBか？
NoSQLです。
（リレーショナルも行けるらしい？意味不明）


---

multi-tenant database
マルチテナント 

同じシステムやサービスを複数の互いに無関係な利用者間が共同で利用する方式

つまりFaunaDBは誰もが同じエンドポイントを使って
アクセスしているということ・・・
本当だろうか？？？

たしかにGraphQLのエンドポイントは
https://graphql.fauna.com/graphql
https://graphql.fauna.com/import

の２つだけ
全員がこのエンドポイントを使っているのだから
そう解釈していいのだろうか？




---

リレーショナル・データベースと
Fauna・データベースの用語の違いは？

|リレーショナル・データベース|Fauna・データベース|
| ---- | ---- |
|スキーマ|データベース|
|テーブル|コレクション|
|行|ドキュメント|
|インデックス/マテリアライズドビュー|インデックス|



---

Faunaのデータベースとは
Faunaにはデータベース内にデータベースを作ることが可能
それを子データベースと言う。
child database
区別するために上位のデータベースを
親データベースと呼ぶ。

親データベース＞子データベース＞コレクション＞Indexes＞row


---

プログラムでCreateDatabaseと命令があるが、
これは子データベースを作るための命令。


---

FQL と GraphQLの違いは？
・・・
ほぼ同じことができるらしい（未確認）

FQL は学習したほうがいい？
・・・
（公式ではしたほうがいいと書いてあった）

---

SQLとは違うのか？
全く違う。

---

Faunaでのキーとは？
数字を揃えてチェーンを開けるタイプのキー
ダイヤル錠
データにアクセスする許可を与える文字列
現実世界の部屋の扉に書けるキー
パーミッション
たとえば、電話番号の情報にアクセスするには
adminキー（管理者キー）か電話番号へのアクセスへのアクセスを許可するキーを発行する必要がある。
キーはサーバー側にのみあり、クライアント側にはない。（クライアント側は廃止された。）

---

SQLでのキーとは？
実体集合の個々の実体を一意（ユニーク）に識別できる属性、
もしくは属性の組合せな小さいもの




---

FQLのインデックスとは
リレーショナルデータベースで言うところの主キーです。
このインデックスはユニークにできます。

作成例

```shell
CreateIndex({
  name:   "dept_by_deptno",
  source: Collection("dept"),
  terms:  [{ field: [ "data", "deptno" ] }],
  unique: true
})
```


---

Endpoints

データベース内と外を繋ぐ箇所。
データの出入り口
逆に言えばここ以外からデータベース内にアクセスできない。

---

Paginate

一般的には
１ページに表示する情報を全て取得する。

１ページ分の情報量は事前に決めておく

---

cursoring

カーソリングとは
取得した結果を複数のページに分割して、
それらのページ間を前後に移動するための方法を用意することです。

Paginateとは、よくセットで使われます。



---

stanza

節、連


---

子データベースを作るとき
secretで警告が出る

```
var adminClient = new faunadb.Client({ secret: process.env.FAUNA_ADMIN_KEY });
```

警告
型 'string | undefined' を型 'string' に割り当てることはできません。
  型 'undefined' を型 'string' に割り当てることはできません。ts(2322)
(property) ClientConfig.secret: string

解決方法
as string を追加する。

```
var adminClient = new faunadb.Client({
  secret: process.env.FAUNA_ADMIN_KEY as string,
});

adminClient.query(
  q.CreateDatabase({ name: 'my_app' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```




---

CreateKey

例

```
    q.CreateKey({
      database: q.Database("my_app"),
      role: "server",
    })
```

```
{
  ref: Ref(Keys(), "302397385342976520"),
  ts: 1624647469860000,
  database: Database("my_app"),
  role: 'server',
  secret: 'fnAE*********************************wQMb',
  hashed_secret: '$2*******************************************************PW'
}
```


CreateKeyは実行ごとに新しいキーが生成される
tsはタイムスタンプ

作られるのは role: 'server' つまりServerkey

キーは子データベース単位で作られる。
secret はその作成されたキーのキー文字列にあたる。

hashed_secret:
キーのハッシュ化された認証シークレットです。
謎？？？
使い方がわからない

作られたキーはFaunaダッシュボード側では管理されていない。
（左のSecurityからは見当たらなかった。）


const admin_key = process.env.FAUNA_ADMIN_KEY as string;

var adminClient = new faunadb.Client({
  secret: admin_key,
});

adminClient
  .query(
    q.CreateKey({
      database: q.Database("my_app"),
      role: "server",
      data:{
        name:'testnamekey'
      }
    })
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error("Error: %s", err));


名前をつけるとき
data:{
  name:'testkey'
}
をつける。

---





---





---





---





---





---





---





---





---





---





---





---





---





---







