Overview | Fauna Documentation
https://docs.fauna.com/fauna/current/cookbook/?lang=javascript

# Overview

This is a cookbook of examples that demonstrate various Fauna queries, including [Databases](#database), [Keys](#key), [Collections](#collection), [User-defined functions](#udf), and [Indexes](#index).

データベース](#database)、[キー](#key)、[コレクション](#collection)、[ユーザー定義関数](#udf)、[インデックス](#index)など、さまざまなFaunaのクエリを実演する例のクックブックです。

## [](#database)Databases

Reading or writing database definitions requires an admin key.

データベースの定義を読み書きするには、adminキーが必要です。

### [](#database-create)Create a database

```javascript
adminClient.query(
  q.CreateDatabase({ name: 'annuvin' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("annuvin"),
  ts: 1622573508720000,
  name: 'annuvin',
  global_id: 'yoiji573cydyy'
}
```

Paginate all databases

```javascript
adminClient.query(
  q.Paginate(q.Databases())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [ Database("prydain"), Database("child_db"), Database("annuvin") ]
}
```

Get a database

```javascript
adminClient.query(
  q.Get(q.Database('annuvin'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("annuvin"),
  ts: 1622573508720000,
  name: 'annuvin',
  global_id: 'yoiji573cydyy'
}
```

Rename a database

```javascript
adminClient.query(
  q.Update(q.Database('annuvin'), { name: 'llyr' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("llyr"),
  ts: 1622573509460000,
  name: 'llyr',
  global_id: 'yoiji573cydyy'
}
```

Annotate a database

```javascript
adminClient.query(
  q.Update(q.Database('llyr'), { data: { env: 'test' } })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("llyr"),
  ts: 1622573509680000,
  name: 'llyr',
  data: { env: 'test' },
  global_id: 'yoiji573cydyy'
}
```

Delete a database

```javascript
adminClient.query(
  q.Delete(q.Database('llyr'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Database("llyr"),
  ts: 1622573509680000,
  name: 'llyr',
  data: { env: 'test' },
  global_id: 'yoiji573cydyy'
}
```

Keys
Reading or writing keys requires an admin key.

キーの読み取りまたは書き込みには、管理者キーが必要です。

Create a key
This example creates a key with a custom document ID, to make it easy to refer to in subsequent examples.

この例では、後続の例で簡単に参照できるように、カスタムドキュメントIDを使用してキーを作成します。

```javascript
adminClient.query(
  q.Create(
    q.Ref(q.Keys(), '10'),
    {
      database: q.Database('prydain'),
      role: 'server',
    }
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "10"),
  ts: 1622570210270000,
  database: Database("prydain"),
  role: 'server',
  secret: 'fnAAAAAAAAAACoN0A5ubTm47tR91JxqPlwT_-CbI',
  hashed_secret: '$2a$05$QdVl/iiY6zuLarg4UkuWsujjtfj246d4lyglOLBmcsunpTm6M.d8i'
}
```

Normally, keys would be created like this:

通常、キーは次のように作成されます。

```javascript
adminClient.query(
  q.CreateKey({
    database: q.Database('prydain'),
    role: 'server',
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "300219221209514496"),
  ts: 1622570210570000,
  database: Database("prydain"),
  role: 'server',
  secret: 'fnAEKpfKgvACAO2iHElhrfX4kI-1tqzFsF1vnp7G',
  hashed_secret: '$2a$05$4q2pVlw6K73s5/HJXXEF9uqFlvOXAL6DDxhSgaG7fs69Iao9JS0t.'
}
```

Paginate all keys

すべてのキーにページを移動します

```javascript
adminClient.query(
  q.Paginate(q.Keys())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    Ref(Keys(), "1"),
    Ref(Keys(), "2"),
    Ref(Keys(), "10"),
    Ref(Keys(), "300219221209514496")
  ]
}
```

Get a key

```javascript
adminClient.query(
  q.Get(q.Ref(q.Keys(), '10'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "10"),
  ts: 1622570210270000,
  database: Database("prydain"),
  role: 'server',
  hashed_secret: '$2a$05$QdVl/iiY6zuLarg4UkuWsujjtfj246d4lyglOLBmcsunpTm6M.d8i'
}
```

Delete a key

```javascript
adminClient.query(
  q.Delete(q.Ref(q.Keys(), '10'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Keys(), "10"),
  ts: 1622570210270000,
  database: Database("prydain"),
  role: 'server',
  hashed_secret: '$2a$05$QdVl/iiY6zuLarg4UkuWsujjtfj246d4lyglOLBmcsunpTm6M.d8i'
}
```

## [](#collection)Collections

Reading or writing collections requires a server key.

コレクションの読み取りまたは書き込みには、サーバーキーが必要です。

### [](#collection-create)Create a collection

```javascript
client.query(
  q.CreateCollection({ name: 'huts' })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Collection("huts"),
  ts: 1622573894320000,
  history_days: 30,
  name: 'huts'
}
```

### [](#collection-paginate)Paginate all collections

```javascript
client.query(
  q.Paginate(q.Collections())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    Collection("Letters"),
    Collection("People"),
    Collection("characters"),
    Collection("customers"),
    Collection("decrepit_huts"),
    Collection("magical_creatures"),
    Collection("orders"),
    Collection("posts"),
    Collection("products"),
    Collection("spellbooks"),
    Collection("spells"),
    Collection("stores"),
    Collection("users"),
    Collection("huts")
  ]
}
```

### [](#collection-get)Get a collection

```javascript
client.query(
  q.Get(q.Collection('huts'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Collection("huts"),
  ts: 1622573894320000,
  history_days: 30,
  name: 'huts'
}
```

### [](#collection-rename)Rename a collection

```javascript
client.query(
  q.Update(
    q.Collection('huts'),
    { name: 'dilapidated_huts' },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Collection("dilapidated_huts"),
  ts: 1622573895370000,
  history_days: 30,
  name: 'dilapidated_huts'
}
```

### [](#collection-create-document)Create a document in a collection

```javascript
client.query(
  q.Create(
    q.Collection('dilapidated_huts'),
    { data: { material: 'straw' } }
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("dilapidated_huts"), "300223085354680832"),
  ts: 1622573895720000,
  data: { material: 'straw' }
}
```

### [](#collection-delete)Delete a collection

```javascript
client.query(
  q.Delete(q.Collection('dilapidated_huts'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Collection("dilapidated_huts"),
  ts: 1622573895370000,
  history_days: 30,
  name: 'dilapidated_huts'
}
```

## [](#udf)User-defined functions

Creating and updating a function requires one of:

関数の作成と更新には、次のいずれかが必要です。

-   An admin or server key. See [Keys](https://docs.fauna.com/fauna/current/security/keys) and [Permissions](https://docs.fauna.com/fauna/current/security/permissions) for details.

管理者またはサーバーキー。詳細については、キーと アクセス許可を参照してください。

-   The privilege to create/update a function, granted in an [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) role.

属性ベースのアクセス制御（ABAC）の役割で付与される、機能を作成/更新するための特権 。

### [](#udf-create)Create a user-defined function

Let’s create a function to allow our authors to create new blog posts. We’ll set it up to allow the author to provide a title and body. This way authors are constrained by what data they can store on a post document.

著者が新しいブログ投稿を作成できるようにする関数を作成しましょう。著者がタイトルと本文を提供できるように設定します。このように、作成者は投稿ドキュメントに保存できるデータによって制約を受けます。

```javascript
client.query(
  q.CreateFunction({
    name: 'create_post',
    body: q.Query(
      q.Lambda(
        ['title', 'body'],
        q.Create(
          q.Collection('posts'),
          {
            data: {
              title: q.Var('title'),
              body: q.Var('body'),
            },
          },
        ),
      )
    ),
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Function("create_post"),
  ts: 1622572663690000,
  name: 'create_post',
  body: Query(Lambda(["title", "body"], Create(Collection("posts"), {"data": {"title": Var("title"), "body": Var("body")}})))
}
```

### [](#udf-paginate)Paginate all functions

```javascript
client.query(
  q.Paginate(q.Functions())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    Function("increment"),
    Function("double"),
    Function("submit_order"),
    Function("create_post")
  ]
}
```

### [](#udf-get)Get a function

```javascript
client.query(
  q.Get(q.Function('create_post'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Function("create_post"),
  ts: 1622572663690000,
  name: 'create_post',
  body: Query(Lambda(["title", "body"], Create(Collection("posts"), {"data": {"title": Var("title"), "body": Var("body")}})))
}
```

### [](#udf-call)Call a function

```javascript
client.query(
  q.Call(
    q.Function('create_post'),
    [ 'First Post Title', 'This is my first blog post!' ],
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Ref(Collection("posts"), "300221794335326720"),
  ts: 1622572664480000,
  data: { title: 'First Post Title', body: 'This is my first blog post!' }
}
```

### [](#udf-update)Update a function

```javascript
client.query(
  q.Update(
    q.Function('create_post'),
    {
      body: q.Query(
        q.Lambda(
          ['title', 'body', 'author'],
          q.Create(
            q.Collection('posts'),
            {
              data: {
                title: q.Var('title'),
                body: q.Var('body'),
                author: q.Var('author'),
              },
            }
          )
        )
      ),
    }
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Function("create_post"),
  ts: 1622572664750000,
  name: 'create_post',
  body: Query(Lambda(["title", "body", "author"], Create(Collection("posts"), {"data": {"title": Var("title"), "body": Var("body"), "author": Var("author")}})))
}
```

### [](#udf-delete)Delete a function

```javascript
client.query(
  q.Delete(q.Function('create_post'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Function("create_post"),
  ts: 1622572664750000,
  name: 'create_post',
  body: Query(Lambda(["title", "body", "author"], Create(Collection("posts"), {"data": {"title": Var("title"), "body": Var("body"), "author": Var("author")}})))
}
```

## [](#index)Indexes

Creating and updating an index requires a server key.

インデックスの作成と更新にはサーバーキーが必要です。

### [](#index-create)Create an index

Let’s create an index to list all spells' names:

すべての呪文の名前を一覧表示するインデックスを作成しましょう。

```javascript
client.query(
  q.CreateIndex({
    name: 'all_spell_names',
    source: q.Collection('spells'),
    values: [
      { field: ['data', 'name'] },
    ],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("all_spell_names"),
  ts: 1622571681790000,
  active: true,
  serialized: true,
  name: 'all_spell_names',
  source: Collection("spells"),
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 8
}
```

It’s also possible to specify the terms that are going to be used to locate entries on the index. In this case, we’ll create an index that allow us to find spells by their elements:

インデックス上のエントリを見つけるために使用される用語を指定することもできます。この場合、要素ごとに呪文を見つけることができるインデックスを作成します。

```javascript
client.query(
  q.CreateIndex({
    name: 'spells_by_element_with_name',
    source: q.Collection('spells'),
    terms: [
      { field: ['data', 'element'] },
    ],
    values: [
      { field: ['data', 'name'] },
    ],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("spells_by_element_with_name"),
  ts: 1622571682090000,
  active: true,
  serialized: true,
  name: 'spells_by_element_with_name',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ] } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}
```

Indexes can also cover multiple values, which affect the order of their results. See the [ordering](#index-order-transform) section for more information.

インデックスは、結果の順序に影響を与える複数の値をカバーすることもできます。詳細については、注文のセクションを参照してください。

The length of the field values specified for the `terms` or `values` fields must not exceed 32k bytes. The maximum size of an index entry, which is comprised of the `terms` and `values` content (and some overhead to distinguish multiple fields), must not exceed 64k bytes. If an index entry is too large, the query that created/updated the index entry fails.

警告
termsまたは valuesフィールドに 指定されたフィールド値の長さは、32kバイトを超えてはなりません。termsとvalues コンテンツ（および複数のフィールドを区別するためのオーバーヘッド）で構成されるインデックスエントリの最大サイズは、64kバイトを超えてはなりません。インデックスエントリが大きすぎると、インデックスエントリを作成/更新したクエリは失敗します。

Here is an example of an index that allows you to search for a spell by its element and get back both the spell name and [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref):

これは、要素で呪文を検索し、呪文名と参照の両方を取得できるインデックスの例です。

```javascript
client.query(
  q.CreateIndex({
    name: 'spells_by_element_with_name_and_ref',
    source: q.Collection('spells'),
    terms: [
      { field: ['data', 'element'] },
    ],
    values: [
      { field: ['data', 'name'] },
      { field: ['ref'] },
    ],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("spells_by_element_with_name_and_ref"),
  ts: 1622571682370000,
  active: true,
  serialized: true,
  name: 'spells_by_element_with_name_and_ref',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ] } ],
  values: [ { field: [ 'data', 'name' ] }, { field: [ 'ref' ] } ],
  partitions: 1
}
```

### [](#index-paginate)Paginate all indexes

```javascript
client.query(
  q.Paginate(q.Indexes())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    Index("spells_by_element"),
    Index("spellbooks_by_owner"),
    Index("spells_by_spellbook"),
    Index("spells_by_element_and_name"),
    Index("elements_of_spells"),
    Index("letters"),
    Index("people_by_age_first"),
    Index("people_by_last_first"),
    Index("users_by_email"),
    Index("products_by_customer"),
    Index("products_by_store"),
    Index("inventory_by_product"),
    Index("products_by_prices_high_to_low"),
    Index("products_by_prices_low_to_high"),
    Index("all_customers"),
    Index("all_orders"),
    Index("all_products"),
    Index("all_stores"),
    Index("all_spell_names"),
    Index("spells_by_element_with_name"),
    Index("spells_by_element_with_name_and_ref")
  ]
}
```

### [](#index-get)Get an index

```javascript
client.query(
  q.Get(q.Index('spells_by_element_with_name'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("spells_by_element_with_name"),
  ts: 1622571682090000,
  active: true,
  serialized: true,
  name: 'spells_by_element_with_name',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ] } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}
```

### [](#index-query)Query an index

Indexes created without specifying the `terms` field return all indexed `values` on the indexed collection.

termsフィールドを指定せずに作成さvaluesれたインデックスは、インデックス付きコレクションでインデックス付けされたすべてを返します。

```javascript
client.query(
  q.Paginate(q.Match(q.Index('all_spell_names')))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    'Fire Beak',
    "Hippo's Wallow",
    "Mountain's Thunder",
    "Water Dragon's Claw"
  ]
}
```

For indexes where the `terms` field was defined, entries are located using the indexed terms.

termsフィールドが定義されたインデックスの場合、エントリはインデックス付きの用語を使用して検索されます。

```javascript
client.query(
  q.Paginate(
    q.Match(
      q.Index('spells_by_element_with_name'),
      'fire'
    )
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ data: [ 'Fire Beak', "Water Dragon's Claw" ] }
```

Indexes return all their values field values. Here we’re searching for all of the spells with element `fire`, using an index that returns both the spell name and its [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref):

インデックスは、すべての値フィールド値を返します。ここではfire、呪文名とその参照の両方を返すインデックスを使用して、要素を持つすべての呪文を検索しています。

```javascript
client.query(
  q.Paginate(
    q.Match(
      q.Index('spells_by_element_with_name_and_ref'),
      'fire'
    )
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    [ 'Fire Beak', Ref(Collection("spells"), "181388642046968320") ],
    [
      "Water Dragon's Claw",
      Ref(Collection("spells"), "181388642071085568")
    ]
  ]
}
```

### [](#index-order-transform)Indexes with ordering and transformations

Let’s create an index to return the latest spells updated. To do this we will create an index which is sorted reversely by each spell’s last updated timestamp.

更新された最新の呪文を返すためのインデックスを作成しましょう。これを行うために、各スペルの最後に更新されたタイムスタンプによって逆にソートされるインデックスを作成します。

We’ll specify terms on this index so we can find spells by element. We’ll also use the `casefold` function as a transformation to the specified term which will make the entries lowercase in the index.

要素ごとに呪文を見つけることができるように、このインデックスで用語を指定します。また、このcasefold関数を指定された用語への変換として使用し、インデックス内のエントリを小文字にします。

```javascript
client.query(
  q.CreateIndex({
    name: 'latest_spells_by_element',
    source: q.Collection('spells'),
    terms: [
      { field: ['data', 'element'], transform: 'casefold' },
    ],
    values: [
      { field: ['ts'], reverse: true },
      { field: ['data', 'name'] },
      { field: ['ref'] },
    ],
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("latest_spells_by_element"),
  ts: 1622571684900000,
  active: true,
  serialized: true,
  name: 'latest_spells_by_element',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ], transform: 'casefold' } ],
  values: [
    { field: [ 'ts' ], reverse: true },
    { field: [ 'data', 'name' ] },
    { field: [ 'ref' ] }
  ],
  partitions: 1
}
```

When querying the index, you can use the `casefold` function to convert the query terms to lowercase. Using `casefold` in a query to an index configured with `casefold` essentially makes a case-insensitive query.

インデックスをクエリするときは、このcasefold関数を使用してクエリ用語を小文字に変換できます。でcasefold構成されたインデックスへのクエリで使用すると、casefold基本的に大文字と小文字を区別しないクエリが作成されます。

```javascript
client.query(
  q.Paginate(
    q.Match(
      q.Index('latest_spells_by_element'),
      q.Casefold('FIRE'),
    )
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    [
      1622571680650000,
      'Fire Beak',
      Ref(Collection("spells"), "181388642046968320")
    ],
    [
      1622571680650000,
      "Water Dragon's Claw",
      Ref(Collection("spells"), "181388642071085568")
    ]
  ]
}
```

Since the document’s timestamp was added to the index to facilitate sorting, it might not be required for the query to return timestamp values to the application layer. In that case, it’s possible to use the `map` function to extract only the desired fields.

ドキュメントのタイムスタンプは並べ替えを容易にするためにインデックスに追加されたため、クエリがタイムスタンプ値をアプリケーション層に返す必要がない場合があります。その場合、map関数を使用して目的のフィールドのみを抽出することができ ます。

```javascript
client.query(
  q.Map(
    q.Paginate(
      q.Match(
        q.Index('latest_spells_by_element'),
        q.Casefold('FIRE'),
      )
    ),
    q.Lambda(
      ['_', 'name', 'ref'],
      [q.Var('name'), q.Var('ref')]
    ),
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  data: [
    [ 'Fire Beak', Ref(Collection("spells"), "181388642046968320") ],
    [
      "Water Dragon's Claw",
      Ref(Collection("spells"), "181388642071085568")
    ]
  ]
}
```

### [](#update-an-index)Update an index

It is disallowed to update an index in a way that changes its shape. This means no changing the source or the terms. You can, however, change the name of an index or its uniqueness. If you update the `unique` field, it does not remove existing duplicated items from the index.

インデックスの形状を変更する方法でインデックスを更新することは許可されていません。これは、ソースや用語を変更しないことを意味します。ただし、インデックスの名前またはその一意性は変更できます。unique フィールドを更新しても、既存の重複アイテムはインデックスから削除されません。

```javascript
client.query(
  q.Update(
    q.Index('spells_by_element_with_name'),
    { name: 'spells_by_kind' },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("spells_by_kind"),
  ts: 1622571686420000,
  active: true,
  serialized: true,
  name: 'spells_by_kind',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ] } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}
```

### [](#index-delete)Delete an index

インデックスを削除する

```javascript
client.query(
  q.Delete(q.Index('spells_by_kind'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("spells_by_kind"),
  ts: 1622571686420000,
  active: true,
  serialized: true,
  name: 'spells_by_kind',
  source: Collection("spells"),
  terms: [ { field: [ 'data', 'element' ] } ],
  values: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}
```
