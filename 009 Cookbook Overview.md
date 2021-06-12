# 概要

これは、
[データベース](#database)
[キー](#key)
[コレクション](#collection)
[ユーザー定義関数](#udf)
[インデックス](#index)
など、さまざまなFaunaクエリを示す例のクックブックです。



## [](#database)データベース

データベース定義の読み取りまたは書き込みには、管理キーが必要です。

### [](#database-create)データベースを作成する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
var adminClient = new FaunaClient(secret: adminKey);

adminClient.Query(CreateDatabase(Obj("name", "annuvin")));
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "create_database": { "object": { "name": "annuvin" } } }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "databases/annuvin" },
    "class": { "@ref": "databases" },
    "ts": 1520223296616581,
    "name": "annuvin"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
adminClient := f.NewFaunaClient(adminKey)

result, _ := adminClient.Query(f.CreateDatabase(f.Obj{"name": "annuvin"}))

fmt.Println(result)
```

```none
map[ref:{annuvin 0xc4200f6f60 <nil>} ts:1520223296616581 name:annuvin]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
FaunaClient adminClient = FaunaClient.builder()
  .withSecret(adminKey)
  .build();

System.out.println(
        adminClient.query(CreateDatabase(Obj("name", Value("annuvin")))
        ).get());
```

```none
{
  ref: ref(id = "annuvin", collection = ref(id = "databases")),
  ts: 1527628862798548,
  name: "annuvin"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
var adminClient = new faunadb.Client({
  secret: adminKey,
});

adminClient
  .query(q.CreateDatabase({ name: "annuvin" }))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=annuvin, collection=Ref(id=databases)),
  ts: 1520223296616581,
  name: 'annuvin' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient = FaunaClient(secret=adminKey)

adminClient.query(q.create_database({"name": "annuvin"}))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client = Fauna::Client.new(secret: adminKey)

$admin_client.query do
  create_database name: 'annuvin'
end
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
val adminClient = FaunaClient(secret = adminKey)

adminClient.query(CreateDatabase(Obj("name" -> "annuvin")))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
let adminClient = FaunaDB.Client(secret: adminKey)

adminClient.query(CreateDatabase(Obj("name" => "annuvin")))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

### [](#database-paginate)すべてのデータベースにページを追加

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Paginate(Ref("databases")));
```

```none
{
  "data": [
    { "@ref": "databases/prydain" },
    { "@ref": "databases/caledonia" },
    { "@ref": "databases/annuvin" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "paginate": { "@ref": "databases" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      { "@ref": "databases/prydain" },
      { "@ref": "databases/caledonia" },
      { "@ref": "databases/annuvin" }
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Paginate(f.Ref("databases")))

fmt.Println(result)
```

```none
map[data:[{prydain 0xc4200e1360 <nil>} {caledonia 0xc4200e14a0 <nil>} {annuvin 0xc4200e1600 <nil>}]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
        adminClient.query(Paginate(Ref("databases")))
        .get());
```

```none
{
  data: [
    ref(id = "prydain", collection = ref(id = "databases")),
    ref(id = "caledonia", collection = ref(id = "databases")),
    ref(id = "annuvin", collection = ref(id = "databases"))
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient.query(q.Paginate(q.Databases())).then((ret) => console.log(ret));
```

```none
{ data:
   [ Ref(id=prydain, collection=Ref(id=databases)),
     Ref(id=caledonia, collection=Ref(id=databases)),
     Ref(id=annuvin, collection=Ref(id=databases)) ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.paginate(Ref("databases")))
```

```none
{
  "data": [
    { "@ref": "databases/prydain" },
    { "@ref": "databases/caledonia" },
    { "@ref": "databases/annuvin" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  paginate ref('databases')
end
```

```none
{
  "data": [
    { "@ref": "databases/prydain" },
    { "@ref": "databases/caledonia" },
    { "@ref": "databases/annuvin" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Paginate(Ref("databases")))
```

```none
{
  "data": [
    { "@ref": "databases/prydain" },
    { "@ref": "databases/caledonia" },
    { "@ref": "databases/annuvin" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(Paginate(Ref("databases")))
```

```none
{
  "data": [
    { "@ref": "databases/prydain" },
    { "@ref": "databases/caledonia" },
    { "@ref": "databases/annuvin" }
  ]
}
```

### [](#database-get)データベースを取得する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Get(Database("annuvin")));
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "get": { "database": "annuvin" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "databases/annuvin" },
    "class": { "@ref": "databases" },
    "ts": 1520223296616581,
    "name": "annuvin"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Get(f.Database("annuvin")))

fmt.Println(result)
```

```none
map[ref:{annuvin 0xc420118a80 <nil>} ts:1520223296616581 name:annuvin]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
        adminClient.query(Get(Database("annuvin")))
        .get());
```

```none
{
  ref: ref(id = "annuvin", collection = ref(id = "databases")),
  ts: 1527869789382310,
  name: "annuvin"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient.query(q.Get(q.Database("annuvin"))).then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=annuvin, collection=Ref(id=databases)),
  ts: 1520223296616581,
  name: 'annuvin' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.get(q.database("annuvin")))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  get database('annuvin')
end
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Get(Database("annuvin")))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(Get(Database("annuvin")))
```

```none
{
  "ref": { "@ref": "databases/annuvin" },
  "class": { "@ref": "databases" },
  "ts": 1520223296616581,
  "name": "annuvin"
}
```

### [](#database-rename)データベースの名前を変更する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(
  Update(Database("annuvin"), Obj("name", "llyr")));
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296736896,
  "name": "llyr"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{
          "update": { "database": "annuvin" },
          "params": { "object": { "name": "llyr" } }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "databases/llyr" },
    "class": { "@ref": "databases" },
    "ts": 1520223296736896,
    "name": "llyr"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(
    f.Update(f.Database("annuvin"), f.Obj{"name": "llyr"}),
)

fmt.Println(result)
```

```none
map[ref:{llyr 0xc42014ee20 <nil>} ts:1520223296736896 name:llyr]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
      adminClient.query(
         Update(Database(Value("annuvin")), Obj("name", Value("llyr"))))
      .get());
```

```none
{
  ref: ref(id = "llyr", collection = ref(id = "databases")),
  ts: 1527628862910072,
  name: "llyr"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient
  .query(q.Update(q.Database("annuvin"), { name: "llyr" }))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=llyr, collection=Ref(id=databases)),
  ts: 1520223296736896,
  name: 'llyr' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(
  q.update(q.database("annuvin"), {"name": "llyr"}))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296736896,
  "name": "llyr"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  update database('annuvin'), name: 'llyr'
end
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296736896,
  "name": "llyr"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(
  Update(Database("annuvin"), Obj("name" -> "llyr")))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296736896,
  "name": "llyr"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(
    Update(
        ref: Database("annuvin"),
        to: Obj("name" => "llyr")
    )
)
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296736896,
  "name": "llyr"
}
```

### [](#database-annotate)データベースに注釈を付ける

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(
  Update(Database("llyr"), Obj("data", Obj("env", "test"))));
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{
          "update": { "database": "llyr" },
          "params": { "object": { "data": { "object": { "env": "test" } } } }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "databases/llyr" },
    "class": { "@ref": "databases" },
    "ts": 1520223296774224,
    "name": "llyr",
    "data": { "env": "test" }
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(
    f.Update(
        f.Database("llyr"),
        f.Obj{"data": f.Obj{"env": "test"}},
    ),
)

fmt.Println(result)
```

```none
map[ref:{llyr 0xc420141660 <nil>} ts:1520223296774224 name:llyr data:map[env:test]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
      adminClient.query(
         Update(
            Database(Value("llyr")),
            Obj("data", Obj("env", Value("test")))
         )
      )
      .get());
```

```none
{
  ref: ref(id = "llyr", collection = ref(id = "databases")),
  ts: 1527628862969290,
  name: "llyr",
  data: {env: "test"}
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient
  .query(q.Update(q.Database("llyr"), { data: { env: "test" } }))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=llyr, collection=Ref(id=databases)),
  ts: 1527631840251296,
  name: 'llyr',
  data: { env: 'test' } }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(
  q.update(q.database("llyr"), {"data": {"env": "test"}}))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  update database('llyr'), data: { env: 'test' }
end
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(
  Update(Database("llyr"), Obj("data" -> Obj("env" -> "test"))))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(
    Update(
        ref: Database("llyr"),
        to: Obj("data" => Obj("env" => "test"))
    )
)
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

### [](#database-delete)データベースを削除する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Delete(Database("llyr")));
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "delete": { "database": "llyr" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "databases/llyr" },
    "class": { "@ref": "databases" },
    "ts": 1520223296774224,
    "name": "llyr",
    "data": { "env": "test" }
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Delete(f.Database("llyr")))

fmt.Println(result)
```

```none
map[ref:{llyr 0xc420119300 <nil>} ts:1520223296774224 name:llyr data:map[env:test]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
     adminClient.query(Delete(Database(Value("llyr"))))
     .get());
```

```none
{
  ref: ref(id = "llyr", collection = ref(id = "databases")),
  ts: 1527628862969290,
  name: "llyr",
  data: {env: "test"}
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient.query(q.Delete(q.Database("llyr"))).then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=llyr, collection=Ref(id=databases)),
  ts: 1527631840251296,
  name: 'llyr',
  data: { env: 'test' } }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.delete(q.database("llyr")))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  delete database('llyr')
end
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Delete(Database("llyr")))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(Delete(ref: Database("llyr")))
```

```none
{
  "ref": { "@ref": "databases/llyr" },
  "class": { "@ref": "databases" },
  "ts": 1520223296774224,
  "name": "llyr",
  "data": { "env": "test" }
}
```

## [](#key)キー

キーの読み取りまたは書き込みには、管理キーが必要です。

### [](#key-create)キーを作成する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
var adminClient = new FaunaClient(secret: adminKey);

adminClient.Query(
  CreateKey(
    Obj("database", Database("caledonia"), "role", "server")));
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{
          "create_key": {
            "object": {
              "database": { "database": "caledonia" },
              "role": "server"
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "keys/192900703888343552" },
    "class": { "@ref": "keys" },
    "ts": 1520223296908587,
    "database": { "@ref": "databases/caledonia" },
    "role": "server",
    "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
    "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
adminClient := f.NewFaunaClient(adminKey)

result, _ := adminClient.Query(
    f.CreateKey(
        f.Obj{"database": f.Database("caledonia"), "role": "server"},
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{192900703888343552 0xc4200e1c80 <nil>}
  ts:1520223296908587
  database:{caledonia 0xc4200e1e20 <nil>}
  role:server
  secret:fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j
  hashed_secret:$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
FaunaClient adminClient = FaunaClient.builder()
  .withSecret(adminKey)
  .build();

System.out.println(
    adminClient.query(
      CreateKey(
        Obj(
          "database", Database(Value("caledonia")),
          "role", Value("server")
        )
      )
    )
    .get());
```

```none
{
  ref: ref(id = "200673528521949696", collection = ref(id = "keys")),
  ts: 1527636040123044,
  database: ref(id = "caledonia", collection = ref(id = "databases")),
  role: "server",
  secret: "fnAC6lgM9NACAOCQemdRxGyeMykaG3ZhxIBGtv3l",
  hashed_secret: "$2a$05$mVYDsiIfEBfXgZYqZvocSuy4J45wqwyY8Dh.V4eRasETNEV01ovJS"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
var adminClient = new faunadb.Client({
  secret: adminKey,
});

adminClient
  .query(
    q.CreateKey({
      database: q.Database("caledonia"),
      role: "server",
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=200669511526908416, collection=Ref(id=keys)),
  ts: 1527632209151020,
  database: Ref(id=caledonia, collection=Ref(id=databases)),
  role: 'server',
  secret: 'fnACyOvbh9ACAOtRQDQSefokn4iuMf9zn_FakPAx',
  hashed_secret: '$2a$05$dszFRic/tkKzsG0rrUj3Fu7.nSoYuJL7BdnHXepx4XTzfcWtVEZRC' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient = FaunaClient(secret=adminKey)

adminClient.query(
  q.create_key(
    {"database": q.database("caledonia"), "role": "server"}
  ))
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client = Fauna::Client.new(secret: adminKey)

$admin_client.query do
  create_key database: database('caledonia'), role: 'server'
end
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
val adminClient = FaunaClient(secret = adminKey)

adminClient.query(
  CreateKey(
    Obj("database" -> Database("caledonia"), "role" -> "server")))
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
let adminClient = FaunaDB.Client(secret: adminKey)

adminClient.query(
    CreateKey(
        Obj(
            "database" => Database("caledonia"),
            "role" => "server"
        )
    )
)
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "secret": "fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

### [](#key-paginate)すべてのキーにページ番号を付ける

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Paginate(Ref("keys")));
```

```none
{
  "data": [
    { "@ref": "keys/192900703858983424" },
    { "@ref": "keys/192900703888343552" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "paginate": { "@ref": "keys" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      { "@ref": "keys/192900703858983424" },
      { "@ref": "keys/192900703888343552" }
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Paginate(f.Keys()))

fmt.Println(result)
```

```none
map[data:[{192900703858983424 0xc4201beb80 <nil>} {192900703888343552 0xc4201becc0 <nil>}]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(adminClient.query(Paginate((Ref("keys")))).get());
```

```none
{
  data: [
    ref(id = "200647741322297856", collection = ref(id = "keys")),
    ref(id = "200673528521949696", collection = ref(id = "keys"))
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient.query(q.Paginate(q.Keys())).then((ret) => console.log(ret));
```

```none
{ data:
   [ Ref(id=192900703858983424, collection=Ref(id=keys)),
     Ref(id=192900703888343552, collection=Ref(id=keys)) ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.paginate(Ref("keys")))
```

```none
{
  "data": [
    { "@ref": "keys/192900703858983424" },
    { "@ref": "keys/192900703888343552" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  paginate ref('keys')
end
```

```none
{
  "data": [
    { "@ref": "keys/192900703858983424" },
    { "@ref": "keys/192900703888343552" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Paginate(Ref("keys")))
```

```none
{
  "data": [
    { "@ref": "keys/192900703858983424" },
    { "@ref": "keys/192900703888343552" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(Paginate(Ref("keys")))
```

```none
{
  "data": [
    { "@ref": "keys/192900703858983424" },
    { "@ref": "keys/192900703888343552" }
  ]
}
```

### [](#key-get)鍵を入手

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Get(Ref(Keys(), "192900703888343552")));
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "get": { "@ref": "keys/192900703888343552" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "keys/192900703888343552" },
    "class": { "@ref": "keys" },
    "ts": 1520223296908587,
    "database": { "@ref": "databases/caledonia" },
    "role": "server",
    "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Get(f.RefCollection(f.Keys(), "192900703888343552")))

fmt.Println(result)
```

```none
map[
  ref:{192900703888343552 0xc420119560 <nil>}
  ts:1520223296908587
  database:{caledonia 0xc420119700 <nil>}
  role:server
  hashed_secret:$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
 adminClient.query(
   Get(Ref(keys(),"192900703888343552))
 ).get());
```

```none
{
  ref: ref(id = "192900703888343552", collection = ref(id = "keys")),
  ts: 1527636039961513,
  database: ref(id = "caledonia", collection = ref(id = "databases")),
  role: "server",
  hashed_secret: "$2a$05$mVYDsiIfEBfXgZYqZvocSuy4J45wqwyY8Dh.V4eRasETNEV01ovJS"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient
  .query(q.Get(q.Ref(q.Keys(), "192900703888343552")))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=192900703888343552, collection=Ref(id=keys)),
  ts: 1527632209151020,
  database: Ref(id=caledonia, collection=Ref(id=databases)),
  role: 'server',
  hashed_secret: '$2a$05$dszFRic/tkKzsG0rrUj3Fu7.nSoYuJL7BdnHXepx4XTzfcWtVEZRC' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.get(q.ref(q.keys(), "192900703888343552")))
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  get ref(keys(), '192900703888343552')
end
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Get(Ref(Keys(), "192900703888343552")))
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(Get(Ref(Keys(), "192900703888343552")))
```

```none
{
  "ref": { "@ref": "keys/192900703888343552" },
  "class": { "@ref": "keys" },
  "ts": 1520223296908587,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$5pGW0Td0qoLZbHJJVls0AOyq4PMbSsrMxejGPaEZpYGhFUx/HHQui"
}
```

### [](#key-delete)キーを削除する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
adminClient.Query(Delete(Ref(Keys(), "192900703858983424")));
```

```none
{
  "ref": { "@ref": "keys/192900703858983424" },
  "class": { "@ref": "keys" },
  "ts": 1520223296878348,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIq8BACAHNB8hzHWDxMpcYiQkJgPKtZGtIn: \
    -d '{ "delete": { "@ref": "keys/192900703858983424" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "keys/192900703858983424" },
    "class": { "@ref": "keys" },
    "ts": 1520223296878348,
    "database": { "@ref": "databases/caledonia" },
    "role": "server",
    "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := adminClient.Query(f.Delete(f.RefCollection(f.Keys(), "192900703858983424")))

fmt.Println(result)
```

```none
map[
  ref:{192900703858983424 0xc42010dd00 <nil>}
  ts:1520223296878348
  database:{caledonia 0xc42010dea0 <nil>}
  role:server
  hashed_secret:$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  adminClient.query(
    Delete((keys(), "192900703858983424"))
  ).get());
```

```none
{
  ref: ref(id = "192900703858983424", collection = ref(id = "keys")),
  ts: 1527636039961513,
  database: ref(id = "caledonia", collection = ref(id = "databases")),
  role: "server",
  hashed_secret: "$2a$05$mVYDsiIfEBfXgZYqZvocSuy4J45wqwyY8Dh.V4eRasETNEV01ovJS"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
adminClient
  .query(q.Delete(q.Ref(q.Keys(), "192900703858983424")))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=192900703858983424, collection=Ref(id=keys)),
  ts: 1527632209151020,
  database: Ref(id=caledonia, collection=Ref(id=databases)),
  role: 'server',
  hashed_secret: '$2a$05$dszFRic/tkKzsG0rrUj3Fu7.nSoYuJL7BdnHXepx4XTzfcWtVEZRC' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
adminClient.query(q.delete(Ref(Keys(), "192900703858983424")))
```

```none
{
  "ref": { "@ref": "keys/192900703858983424" },
  "class": { "@ref": "keys" },
  "ts": 1520223296878348,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$admin_client.query do
  delete ref(keys(), '192900703858983424')
end
```

```none
{
  "ref": { "@ref": "keys/192900703858983424" },
  "class": { "@ref": "keys" },
  "ts": 1520223296878348,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
adminClient.query(Delete(Ref(Keys(), "192900703858983424")))
```

```none
{
  "ref": { "@ref": "keys/192900703858983424" },
  "class": { "@ref": "keys" },
  "ts": 1520223296878348,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
adminClient.query(
    Delete(ref: Ref(Keys(), "192900703858983424"))
)
```

```none
{
  "ref": { "@ref": "keys/192900703858983424" },
  "class": { "@ref": "keys" },
  "ts": 1520223296878348,
  "database": { "@ref": "databases/caledonia" },
  "role": "server",
  "hashed_secret": "$2a$05$63Xx8dWefALiC3K0qtJnLutmx2lKbv8MnEGky6fyTp/l.bbYYMRhy"
}
```

## [](#collection)コレクション

コレクションの読み取りまたは書き込みには、サーバー キーが必要です。

### [](#collection-create)コレクションを作成する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(CreateCollection(Obj("name", "spells")));
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "create_collection": { "object": { "name": "spells" } } }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "classes/spells" },
    "class": { "@ref": "classes" },
    "ts": 1520223297210738,
    "history_days": 30,
    "name": "spells"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.CreateCollection(f.Obj{"name": "spells"}))

fmt.Println(result)
```

```none
map[ref:{spells 0xc42010d9a0 <nil>} ts:1520223297210738 history_days:30 name:spells]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(CreateCollection(Obj("name", Value("spells"))))
    .get());
```

```none
{
  ref: ref(id = "spells", collection = ref(id = "collections")),
  ts: 1536604018339083,
  history_days: 30,
  name: "spells"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.CreateCollection({ name: "spells" }))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells, collection=Ref(id=collections))
  ts: 1520223297210738,
  history_days: 30,
  name: 'spells' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.create_collection({"name": "spells"}))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create_collection name: 'spells'
end
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(CreateCollection(Obj("name" -> "spells")))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(CreateCollection(Obj("name" => "spells")))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

### [](#collection-paginate)すべてのコレクションにページ番号を付ける

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Paginate(Ref("collections")));
```

```none
{
  "data": [
    { "@ref": "classes/decrepit_huts" },
    { "@ref": "classes/spellbooks" },
    { "@ref": "classes/characters" },
    { "@ref": "classes/spells" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "paginate": { "@ref": "classes" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      { "@ref": "classes/decrepit_huts" },
      { "@ref": "classes/spellbooks" },
      { "@ref": "classes/characters" },
      { "@ref": "classes/spells" }
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Paginate(f.Collections()))

fmt.Println(result)
```

```none
map[data:[
  {decrepit_huts 0xc420118200 <nil>}
  {spellbooks 0xc420118340 <nil>}
  {characters 0xc4201184a0 <nil>}
  {spells 0xc4201185e0 <nil>}
]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(client.query(Paginate(Ref("collections"))).get());
```

```none
{ data: [
  ref(id = "decrepit_huts", collection = ref(id = "collections")),
  ref(id = "spellbooks", collection = ref(id = "collections")),
  ref(id = "characters", collection = ref(id = "collections")),
  ref(id = "spells", collection = ref(id = "collections"))
]}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client.query(q.Paginate(q.Collections())).then((ret) => console.log(ret));
```

```none
{ data:
   [ Ref(id=decrepit_huts, collection=Ref(id=collections)),
     Ref(id=spellbooks, collection=Ref(id=collections)),
     Ref(id=characters, collection=Ref(id=collections)),
     Ref(id=spells, collection=Ref(id=collections)) ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.paginate(Ref("collections")))
```

```none
{
  "data": [
    { "@ref": "classes/decrepit_huts" },
    { "@ref": "classes/spellbooks" },
    { "@ref": "classes/characters" },
    { "@ref": "classes/spells" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate ref('collections')
end
```

```none
{
  "data": [
    { "@ref": "classes/decrepit_huts" },
    { "@ref": "classes/spellbooks" },
    { "@ref": "classes/characters" },
    { "@ref": "classes/spells" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Paginate(Ref("collections")))
```

```none
{
  "data": [
    { "@ref": "classes/decrepit_huts" },
    { "@ref": "classes/spellbooks" },
    { "@ref": "classes/characters" },
    { "@ref": "classes/spells" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Paginate(Ref("collections")))
```

```none
{
  "data": [
    { "@ref": "classes/decrepit_huts" },
    { "@ref": "classes/spellbooks" },
    { "@ref": "classes/characters" },
    { "@ref": "classes/spells" }
  ]
}
```

### [](#collection-get)コレクションを取得する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Get(Collection("spells")));
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "get": { "collection": "spells" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "classes/spells" },
    "class": { "@ref": "classes" },
    "ts": 1520223297210738,
    "history_days": 30,
    "name": "spells"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Get(f.Collection("spells")))

fmt.Println(result)
```

```none
map[ref:{spells 0xc4201e8080 <nil>} ts:1520223297210738 history_days:30 name:spells]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
   client.query(Get(Collection(Value("spells"))))
   .get());
```

```none
{
  ref: ref(id = "spells", collection = ref(id = "collections")),
  ts: 1536271845615375,
  history_days: 30,
  name: "spells"
 }
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client.query(q.Get(q.Collection("spells"))).then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells, collection=Ref(id=collections))
  ts: 1520223297210738,
  history_days: 30,
  name: 'spells' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.get(q.collection("spells")))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  get collection_('spells')
end
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Get(Collection("spells")))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Get(Collection("spells")))
```

```none
{
  "ref": { "@ref": "classes/spells" },
  "class": { "@ref": "classes" },
  "ts": 1520223297210738,
  "history_days": 30,
  "name": "spells"
}
```

### [](#collection-rename)コレクションの名前を変更する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Update(
    Collection("decrepit_huts"),
    Obj("name", "dilapidated_huts")));
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "update": { "collection": "decrepit_huts" },
          "params": { "object": { "name": "dilapidated_huts" } }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "classes/dilapidated_huts" },
    "class": { "@ref": "classes" },
    "ts": 1520223297276685,
    "history_days": 30,
    "name": "dilapidated_huts"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Update(
        f.Collection("decrepit_huts"),
        f.Obj{"name": "dilapidated_huts"},
    ),
)

fmt.Println(result)
```

```none
map[ref:{dilapidated_huts 0xc4201d43e0 <nil>} ts:1520223297276685 history_days:30 name:dilapidated_huts]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
        client.query(
          Update(
            Collection(Value("decrepit_huts")),
            Obj("name", Value("dilapidated_huts"))
          )
        ).get());
```

```none
{
   ref: ref(id = "dilapidated_huts", collection = ref(id = "collections")),
   ts: 1527714658200596,
   history_days: 30,
   name: "dilapidated_huts"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Update(q.Collection("decrepit_huts"), { name: "dilapidated_huts" }))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=dilapidated_huts, collection=Ref(id=collections)),
  ts: 1520223297276685,
  history_days: 30,
  name: 'dilapidated_huts' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.update(
    q.collection("decrepit_huts"),
    {"name": "dilapidated_huts"}
  ))
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  update collection_('decrepit_huts'), name: 'dilapidated_huts'
end
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Update(
    Collection("decrepit_huts"),
    Obj("name" -> "dilapidated_huts")))
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Update(
        ref: Collection("decrepit_huts"),
        to: Obj("name" => "dilapidated_huts")
    )
)
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

### [](#collection-delete)コレクションを削除する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Delete(Collection("dilapidated_huts")));
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "delete": { "collection": "dilapidated_huts" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "classes/dilapidated_huts" },
    "class": { "@ref": "classes" },
    "ts": 1520223297276685,
    "history_days": 30,
    "name": "dilapidated_huts"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Delete(f.Collection("dilapidated_huts")))

fmt.Println(result)
```

```none
map[ref:{dilapidated_huts 0xc4201d6940 <nil>} ts:1520223297276685 history_days:30 name:dilapidated_huts]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  client.query(Delete(Collection(Value("dilapidated_huts"))))
  .get());
```

```none
{
  ref: ref(id = "magical_creatures", collection = ref(id = "collections")),
  ts: 1536603582490368,
  history_days: 30,
  name: "dilapidated_huts"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Delete(q.Collection("dilapidated_huts")))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=dilapidated_huts, collection=Ref(id=collections)),
  ts: 1520223297276685,
  history_days: 30,
  name: 'dilapidated_huts' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.delete(q.collection("dilapidated_huts")))
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  delete collection_('dilapidated_huts')
end
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Delete(Collection("dilapidated_huts")))
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Delete(ref: Collection("dilapidated_huts")))
```

```none
{
  "ref": { "@ref": "classes/dilapidated_huts" },
  "class": { "@ref": "classes" },
  "ts": 1520223297276685,
  "history_days": 30,
  "name": "dilapidated_huts"
}
```

### [](#collection-create-document)コレクションにドキュメントを作成する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Create(
    Collection("spells"),
    Obj(
      "data", Obj("name", "Fire Beak", "element", Arr("air", "fire"))
    )));
```

```none
{
  "ref": { "@ref": "classes/spells/192900707573039616" },
  "class": { "@ref": "classes/spells" },
  "ts": 1520223300419731,
  "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create": { "collection": "spells" },
          "params": {
            "object": {
              "data": {
                "object": { "name": "Fire Beak", "element": [ "air", "fire" ] }
              }
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "classes/spells/192900707573039616" },
    "class": { "@ref": "classes/spells" },
    "ts": 1520223300419731,
    "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Create(
        f.Collection("spells"),
        f.Obj{
            "data": f.Obj{"name": "Fire Beak", "element": f.Arr{"air", "fire"}},
        },
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{192900707573039616 0xc4201e6600 <nil>}
  ts:1520223300419731
  data:map[name:Fire Beak element:[air fire]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
      Create(
        Collection(Value("spells")),
        Obj( "data",
           Obj(
              "name", Value("Fire Beak"),
              "element", Arr(Value("air"), Value("fire"))
           )
        )
      )
    ).get());
```

```none
{
  ref: ref(id = "181388642046968320", collection = ref(id = "spells", collection = ref(id = "collections"))),
  ts: 1536604015999279,
  data: {name: "Fire Beak", element: ["air", "fire"]}
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Create(q.Collection("spells"), {
      data: {
        name: "Fire Beak",
        element: ["air", "fire"],
      },
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=200669801878651393, collection=Ref(id=spells, collection=Ref(id=collections))),
  ts: 1527632486061801,
  data: { name: 'Fire Beak', element: [ 'air', 'fire' ] } }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.create(
    q.collection("spells"),
    {"data": {"name": "Fire Beak", "element": ["air", "fire"]}}
  ))
```

```none
{
  "ref": { "@ref": "classes/spells/192900707573039616" },
  "class": { "@ref": "classes/spells" },
  "ts": 1520223300419731,
  "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create collection_('spells'),
         data: { name: 'Fire Beak', element: ['air', 'fire'] }
end
```

```none
{
  "ref": { "@ref": "classes/spells/192900707573039616" },
  "class": { "@ref": "classes/spells" },
  "ts": 1520223300419731,
  "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Create(
    Collection("spells"),
    Obj(
      "data" -> Obj("name" -> "Fire Beak", "element" -> Arr("air", "fire"))
    )))
```

```none
{
  "ref": { "@ref": "classes/spells/192900707573039616" },
  "class": { "@ref": "classes/spells" },
  "ts": 1520223300419731,
  "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Create(
        at: Collection("spells"),
        Obj(
            "data" => Obj(
                "name" => "Fire Beak",
                "element" => Arr("air", "fire")
            )
        )
    )
)
```

```none
{
  "ref": { "@ref": "classes/spells/192900707573039616" },
  "class": { "@ref": "classes/spells" },
  "ts": 1520223300419731,
  "data": { "name": "Fire Beak", "element": [ "air", "fire" ] }
}
```

## [](#udf)ユーザー定義関数

関数の作成と更新には次のものが必要です。

- 管理者またはサーバー キー。詳細については、[キー](https://docs.fauna.com/fauna/current/security/keys)と [アクセス許可](https://docs.fauna.com/fauna/current/security/permissions)を参照してください。
- [属性ベースのアクセス制御 (ABAC)](https://docs.fauna.com/fauna/current/security/abac)ロールで付与される、関数を作成/更新する権限 。

### [](#udf-create)ユーザー定義関数を作成する

作成者が新しいブログ投稿を作成できるようにする関数を作成しましょう。著者がタイトルと本文を提供できるように設定します。このようにして、投稿者は投稿ドキュメントに保存できるデータに制約を受けます。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "functions/create_entry" },
  "class": { "@ref": "functions" },
  "ts": 1520223330303720,
  "name": "create_entry",
  "body": {
    "@query": {
      "lambda": [ "title", "body" ],
      "expr": {
        "create": { "class": "posts" },
        "params": {
          "object": {
            "title": { "var": "title" },
            "body": { "var": "body" }
          }
        }
      }
    }
  },
  "permissions": { "call": "public" },
  "role": "server"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create_function": {
            "object": {
              "name": "create_entry",
              "body": {
                "query": {
                  "lambda": [ "title", "body" ],
                  "expr": {
                    "create": { "collection": "posts" },
                    "params": {
                      "object": {
                        "title": { "var": "title" },
                        "body": { "var": "body" }
                      }
                    }
                  }
                }
              },
              "permissions": { "object": { "call": "public" } },
              "role": "server"
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "functions/create_entry" },
    "class": { "@ref": "functions" },
    "ts": 1520223330303720,
    "name": "create_entry",
    "body": {
      "@query": {
        "lambda": [ "title", "body" ],
        "expr": {
          "create": { "class": "posts" },
          "params": {
            "object": {
              "title": { "var": "title" },
              "body": { "var": "body" }
            }
          }
        }
      }
    },
    "permissions": { "call": "public" },
    "role": "server"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.CreateFunction(f.Obj{
    "name": "create_entry",
    "permissions": f.Obj{"call": "public"},
    "role": "server",
    "body": f.Query(f.Lambda(
        f.Arr{"title", "body"},
        f.Create(f.Collection("posts"), f.Obj{
            "data": f.Obj{
                "title": f.Var("title"),
                "body": f.Var("body"),
            },
        }),
    )),
}))

fmt.Println(result)
```

```none
map[
  ref:{create_entry 0xc4201bb900 <nil>}
  ts:1520223330303720
  name:create_entry
  body:{[123 34 108 97 109 98 100 97 34 58 91 34 116 105 116 108 101 34 44 34 98 111 100 121 34 93 44 34 101 120 112 114 34 58 123 34 99 114 101 97 116 101 34 58 123 34 99 108 97 115 115 34 58 34 112 111 115 116 115 34 125 44 34 112 97 114 97 109 115 34 58 123 34 111 98 106 101 99 116 34 58 123 34 100 97 116 97 34 58 123 34 111 98 106 101 99 116 34 58 123 34 98 111 100 121 34 58 123 34 118 97 114 34 58 34 98 111 100 121 34 125 44 34 116 105 116 108 101 34 58 123 34 118 97 114 34 58 34 116 105 116 108 101 34 125 125 125 125 125 125 125]}
  permissions:map[call:public]
  role:server
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  client.query(
     CreateFunction(
        Obj(
           "name", Value("create_entry"),
           "body" , Query(
              Lambda(
                 Arr(Value("title"),Value("body")),
                 Create(
                    Collection("posts"),
                    Obj( "data", Obj("title", Var("title"),"body", Var("body")))
                 )
             )
           ),
           "permissions", Obj("call", Value("public")),
           "role", Value("server")
        )
     )
  ).get());
```

```none
{
  ref: ref(id = "create_entry", collection = ref(id = "functions")),
  ts: 1529338141262176,
  name: "create_entry",
  body: QueryV({
    lambda=[title, body],
    expr={create={collection=posts}, params={object={data={object={title={var=title}, body={var=body}}}}}}
  }),
  permissions: {call: "public"},
  role: "server"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.CreateFunction({
      name: "create_entry",
      body: q.Query(
        q.Lambda(
          ["title", "body"],
          q.Create(q.Collection("posts"), {
            data: {
              title: q.Var("title"),
              body: q.Var("body"),
            },
          })
        )
      ),
      permissions: { call: "public" },
      role: "server",
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=create_entry, collection=Ref(id=functions)),
  ts: 1527633126019327,
  name: 'create_entry',
  body: Query("[object Object]"),
  permissions: { call: 'public' },
  role: 'server' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "functions/create_entry" },
  "class": { "@ref": "functions" },
  "ts": 1520223330303720,
  "name": "create_entry",
  "body": {
    "@query": {
      "lambda": [ "title", "body" ],
      "expr": {
        "create": { "class": "posts" },
        "params": {
          "object": {
            "title": { "var": "title" },
            "body": { "var": "body" }
          }
        }
      }
    }
  },
  "permissions": { "call": "public" },
  "role": "server"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "functions/create_entry" },
  "class": { "@ref": "functions" },
  "ts": 1520223330303720,
  "name": "create_entry",
  "body": {
    "@query": {
      "lambda": [ "title", "body" ],
      "expr": {
        "create": { "class": "posts" },
        "params": {
          "object": {
            "title": { "var": "title" },
            "body": { "var": "body" }
          }
        }
      }
    }
  },
  "permissions": { "call": "public" },
  "role": "server"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "functions/create_entry" },
  "class": { "@ref": "functions" },
  "ts": 1520223330303720,
  "name": "create_entry",
  "body": {
    "@query": {
      "lambda": [ "title", "body" ],
      "expr": {
        "create": { "class": "posts" },
        "params": {
          "object": {
            "title": { "var": "title" },
            "body": { "var": "body" }
          }
        }
      }
    }
  },
  "permissions": { "call": "public" },
  "role": "server"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "functions/create_entry" },
  "class": { "@ref": "functions" },
  "ts": 1520223330303720,
  "name": "create_entry",
  "body": {
    "@query": {
      "lambda": [ "title", "body" ],
      "expr": {
        "create": { "class": "posts" },
        "params": {
          "object": {
            "title": { "var": "title" },
            "body": { "var": "body" }
          }
        }
      }
    }
  },
  "permissions": { "call": "public" },
  "role": "server"
}
```

### [](#udf-login-call)資格情報を作成し、ログインし、ユーザー定義関数を呼び出します

これで、新しい作成者を作成して、その資格情報を使用できます。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/authors/192900738957967872" },
  "class": { "@ref": "classes/authors" },
  "ts": 1520223330352930,
  "data": { "name": "Patty Smith" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create": { "collection": "authors" },
          "params": {
            "object": {
              "data": { "object": { "name": "Patty Smith" } },
              "credentials": { "object": { "password": "123456" } }
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "classes/authors/192900738957967872" },
    "class": { "@ref": "classes/authors" },
    "ts": 1520223330352930,
    "data": { "name": "Patty Smith" }
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Create(
    f.Collection("authors"),
    f.Obj{
        "data": f.Obj{"name": "Patty Smith"},
        "credentials": f.Obj{"password": "123456"},
    },
))

fmt.Println(result)
```

```none
map[ref:{192900738957967872 0xc4201ab040 <nil>} ts:1520223330352930 data:map[name:Patty Smith]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
        Create(
            Collection(Value("authors")),
            Obj(
                "data", Obj("name", Value("Patty Smith")),
                "credentials", Obj("password", Value("123456"))
            )
        )
    ).get());
```

```none
{
  ref: ref(id = "201420401501274624", collection = ref(id = "authors", collection = ref(id = "collections"))),
  ts: 1528348313700278,
  data: {
     name: "Patty Smith"
  }
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Create(q.Collection("authors"), {
      data: { name: "Patty Smith" },
      credentials: { password: "123456" },
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=192900738957967872, collection=Ref(id=authors, collection=Ref(id=collections))),
  ts: 1527633688652829,
  data: { name: 'Patty Smith' } }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/authors/192900738957967872" },
  "class": { "@ref": "classes/authors" },
  "ts": 1520223330352930,
  "data": { "name": "Patty Smith" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/authors/192900738957967872" },
  "class": { "@ref": "classes/authors" },
  "ts": 1520223330352930,
  "data": { "name": "Patty Smith" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/authors/192900738957967872" },
  "class": { "@ref": "classes/authors" },
  "ts": 1520223330352930,
  "data": { "name": "Patty Smith" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/authors/192900738957967872" },
  "class": { "@ref": "classes/authors" },
  "ts": 1520223330352930,
  "data": { "name": "Patty Smith" }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "tokens/192900739000959488" },
  "class": { "@ref": "tokens" },
  "ts": 1520223330375483,
  "instance": { "@ref": "classes/authors/192900738957967872" },
  "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "login": { "@ref": "classes/authors/192900738957967872" },
          "params": { "object": { "password": "123456" } }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "tokens/192900739000959488" },
    "class": { "@ref": "tokens" },
    "ts": 1520223330375483,
    "instance": { "@ref": "classes/authors/192900738957967872" },
    "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Login(
    f.RefCollection(f.Collection("authors"), "192900738957967872"),
    f.Obj{"password": "123456"},
))

fmt.Println(result)
```

```none
map[
  ref:{192900739000959488 0xc4201fe100 <nil>}
  ts:1520223330375483
  document:{192900738957967872 0xc4201fe380 <nil>}
  secret:fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
        Login(
            Ref(Collections("authors"), Value(201420401501274624L)),
            Obj("password", Value("123456"))
        )
    ).get());
```

```none
{
  ref: ref(id = "202129854841225728", collection = ref(id = "tokens")),
  ts: 1529024901104219,
  document: ref(id = "201420401501274624", collection = ref(id = "authors", collection = ref(id = "collections"))),
  secret: "fnECzhwINFACAAAAAAAAAAAARysJFAyxCh8fdSPiclj-lBeC-DQ"
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Login(q.Ref(q.Collection("authors"), "192900738957967872"), {
      password: "123456",
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=192900739000959488, collection=Ref(id=tokens)),
  ts: 1520223330375483,
  document: Ref(id=192900738957967872, collection=Ref(id=authors, collection=Ref(id=collections))),
  secret: 'fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg' }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "tokens/192900739000959488" },
  "class": { "@ref": "tokens" },
  "ts": 1520223330375483,
  "instance": { "@ref": "classes/authors/192900738957967872" },
  "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "tokens/192900739000959488" },
  "class": { "@ref": "tokens" },
  "ts": 1520223330375483,
  "instance": { "@ref": "classes/authors/192900738957967872" },
  "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "tokens/192900739000959488" },
  "class": { "@ref": "tokens" },
  "ts": 1520223330375483,
  "instance": { "@ref": "classes/authors/192900738957967872" },
  "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "tokens/192900739000959488" },
  "class": { "@ref": "tokens" },
  "ts": 1520223330375483,
  "instance": { "@ref": "classes/authors/192900738957967872" },
  "secret": "fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg"
}
```

`secret`フィールドの値は、作成したばかりの作成者を表す認証トークンです。後続のクエリが作成者として実行されるように、このシークレットを使用して新しいクライアント接続オブジェクトを作成する必要があります。詳細については、[ユーザー認証のチュートリアル](https://docs.fauna.com/fauna/current/tutorials/authentication/user)を参照してください。

次のクエリは、`create_entry`以前に作成した関数を呼び出します。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/posts/192900739108962816" },
  "class": { "@ref": "classes/posts" },
  "ts": 1520223330453871
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnECrVIzORACAAKtUir3AAIAq-5ZBLtxuAEhY0cju64xXi_HUhg: \
    -d '{
          "call": { "function": "create_entry" },
          "arguments": [ "First Post Title", "This is my first blog post!" ]
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "classes/posts/192900739108962816" },
    "class": { "@ref": "classes/posts" },
    "ts": 1520223330453871
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Call(
    f.Function("create_entry"),
    f.Arr{"First Post Title", "This is my first blog post!"},
))

fmt.Println(result)
```

```none
map[ref:{192900739108962816 0xc4201d3720 <nil>} ts:1520223330453871 data:map[title:First Post Title body:This is my first blog post!]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
     client.query(
        Call(
            Function("create_entry"),
            Arr(Value("First Post Title"),Value("this is my first blog post!"))
     )
).get());
```

```none
{
  ref: ref(id = "201474441226486272", collection = ref(id = "posts", collection = ref(id = "collections"))),
  ts: 1528399850000762,
  data: [
    title: "First Post Title",
    body: "this is my first blog post!"
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Call(q.Function("create_entry"), [
      "First Post Title",
      "This is my first blog post!",
    ])
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=192900739108962816, collection=Ref(id=posts, collection=Ref(id=collections))),
  ts: 1520223330453871,
  data:
   { title: 'First Post Title',
     body: 'This is my first blog post!' } }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/posts/192900739108962816" },
  "class": { "@ref": "classes/posts" },
  "ts": 1520223330453871
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
# Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/posts/192900739108962816" },
  "class": { "@ref": "classes/posts" },
  "ts": 1520223330453871
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/posts/192900739108962816" },
  "class": { "@ref": "classes/posts" },
  "ts": 1520223330453871
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
// Not available in this language yet.
```

```none
{
  "ref": { "@ref": "classes/posts/192900739108962816" },
  "class": { "@ref": "classes/posts" },
  "ts": 1520223330453871
}
```

## [](#index)索引

インデックスの作成と更新にはサーバー キーが必要です。

### [](#index-create)インデックスを作成する

すべての呪文の名前をリストするインデックスを作成しましょう:

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  CreateIndex(
    Obj(
      "name", "all_spell_names",
      "source", Collection("spells"),
      "values", Arr(Obj("field", Arr("data", "name")))
    )));
```

```none
{
  "ref": { "@ref": "indexes/all_spell_names" },
  "class": { "@ref": "indexes" },
  "ts": 1520223300947688,
  "active": false,
  "partitions": 8,
  "name": "all_spell_names",
  "source": { "@ref": "classes/spells" },
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create_index": {
            "object": {
              "name": "all_spell_names",
              "source": { "collection": "spells" },
              "values": [ { "object": { "field": [ "data", "name" ] } } ]
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "indexes/all_spell_names" },
    "class": { "@ref": "indexes" },
    "ts": 1520223300947688,
    "active": false,
    "partitions": 8,
    "name": "all_spell_names",
    "source": { "@ref": "classes/spells" },
    "values": [ { "field": [ "data", "name" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.CreateIndex(
        f.Obj{
            "name": "all_spell_names",
            "source": f.Collection("spells"),
            "values": f.Arr{f.Obj{"field": f.Arr{"data", "name"}}},
        },
    ),
)

fmt.Println(result)
```

```none
map[ref:{all_spell_names 0xc420365a00 <nil>} ts:1520223300947688 active:false partitions:8 name:all_spell_names source:{spells 0xc420365c60 <nil>} values:[map[field:[data name]]]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  client.query(
    CreateIndex(
      Obj(
         "name", Value("all_spell_names"),
         "source", Collection(Value("spells")),
         "values", Arr(Obj("field", Arr(Value("data"), Value("name"))))
      )))
      .get());
```

```none
{
  ref: ref(id = "all_spell_names", collection = ref(id = "indexes")),
  ts: 1536257513918009,
  active: false,
  partitions: 8,
  name: "all_spell_names",
  source: ref(id = "spells", collection = ref(id = "collections")),
  values: [{field: ["data", "name"]}]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.CreateIndex({
      name: "all_spell_names",
      source: q.Collection("spells"),
      values: [{ field: ["data", "name"] }],
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=all_spell_names, collection=Ref(id=indexes)),
  ts: 1527625252080602,
  active: false,
  partitions: 8,
  name: 'all_spell_names',
  source: Ref(id=spells, collection=Ref(id=collections)),
  values: [ { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.create_index(
    {
      "name": "all_spell_names",
      "source": q.collection("spells"),
      "values": [{"field": ["data", "name"]}]
    }
  ))
```

```none
{
  "ref": { "@ref": "indexes/all_spell_names" },
  "class": { "@ref": "indexes" },
  "ts": 1520223300947688,
  "active": false,
  "partitions": 8,
  "name": "all_spell_names",
  "source": { "@ref": "classes/spells" },
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create_index name: 'all_spell_names',
               source: collection_('spells'),
               values: [{ field: ['data', 'name'] }]
end
```

```none
{
  "ref": { "@ref": "indexes/all_spell_names" },
  "class": { "@ref": "indexes" },
  "ts": 1520223300947688,
  "active": false,
  "partitions": 8,
  "name": "all_spell_names",
  "source": { "@ref": "classes/spells" },
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  CreateIndex(
    Obj(
      "name" -> "all_spell_names",
      "source" -> Collection("spells"),
      "values" -> Arr(Obj("field" -> Arr("data", "name")))
    )))
```

```none
{
  "ref": { "@ref": "indexes/all_spell_names" },
  "class": { "@ref": "indexes" },
  "ts": 1520223300947688,
  "active": false,
  "partitions": 8,
  "name": "all_spell_names",
  "source": { "@ref": "classes/spells" },
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    CreateIndex(
        Obj(
            "name" => "all_spell_names",
            "source" => Collection("spells"),
            "values" => Arr(Obj("field" => Arr("data", "name")))
        )
    )
)
```

```none
{
  "ref": { "@ref": "indexes/all_spell_names" },
  "class": { "@ref": "indexes" },
  "ts": 1520223300947688,
  "active": false,
  "partitions": 8,
  "name": "all_spell_names",
  "source": { "@ref": "classes/spells" },
  "values": [ { "field": [ "data", "name" ] } ]
}
```

インデックスのエントリを見つけるために使用される用語を指定することもできます。この場合、要素によって呪文を見つけることができるインデックスを作成します。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  CreateIndex(
    Obj(
      "name", "spells_by_element_with_name",
      "source", Collection("spells"),
      "terms", Arr(Obj("field", Arr("data", "element"))),
      "values", Arr(Obj("field", Arr("data", "name")))
    )));
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223308546298,
  "active": false,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create_index": {
            "object": {
              "name": "spells_by_element_with_name",
              "source": { "collection": "spells" },
              "terms": [ { "object": { "field": [ "data", "element" ] } } ],
              "values": [ { "object": { "field": [ "data", "name" ] } } ]
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "indexes/spells_by_element_with_name" },
    "class": { "@ref": "indexes" },
    "ts": 1520223308546298,
    "active": false,
    "partitions": 1,
    "name": "spells_by_element_with_name",
    "source": { "@ref": "classes/spells" },
    "terms": [ { "field": [ "data", "element" ] } ],
    "values": [ { "field": [ "data", "name" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.CreateIndex(
        f.Obj{
            "name": "spells_by_element_with_name",
            "source": f.Collection("spells"),
            "terms": f.Arr{f.Obj{"field": f.Arr{"data", "element"}}},
            "values": f.Arr{f.Obj{"field": f.Arr{"data", "name"}}},
        },
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{spells_by_element_with_name 0xc420396b40 <nil>}
  ts:1520223308546298
  active:false
  partitions:1
  name:spells_by_element_with_name
  source:{spells 0xc420396da0 <nil>}
  terms:[map[field:[data element]]]
  values:[map[field:[data name]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
      CreateIndex(
        Obj(
            "name", Value("spells_by_element_with_name"),
            "source", Collection(Value("spells")),
            "terms", Arr(Obj("field", Arr(Value("data"), Value("element")))),
            "values", Arr(Obj("field", Arr(Value("data"), Value("name"))))
        )))
    .get());
```

```none
{
  ref: ref(id = "spells_by_element_with_name", collection = ref(id = "indexes")),
  ts: 1527714659590871,
  active: false,
  partitions: 1,
  name: "spells_by_element_with_name",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [ {field: ["data", "element"]} ],
  values: [ {field: ["data", "name"]} ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.CreateIndex({
      name: "spells_by_element_with_name",
      source: q.Collection("spells"),
      terms: [{ field: ["data", "element"] }],
      values: [{ field: ["data", "name"] }],
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells_by_element_with_name, collection=Ref(id=indexes)),
  ts: 1527625636424120,
  active: false,
  partitions: 1,
  name: 'spells_by_element_with_name',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array] } ],
  values: [ { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.create_index(
    {
      "name": "spells_by_element_with_name",
      "source": q.collection("spells"),
      "terms": [{"field": ["data", "element"]}],
      "values": [{"field": ["data", "name"]}]
    }
  ))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223308546298,
  "active": false,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create_index name: 'spells_by_element_with_name',
               source: collection_('spells'),
               terms: [{ field: ['data', 'element'] }],
               values: [{ field: ['data', 'name'] }]
end
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223308546298,
  "active": false,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  CreateIndex(
    Obj(
      "name" -> "spells_by_element_with_name",
      "source" -> Collection("spells"),
      "terms" -> Arr(Obj("field" -> Arr("data", "element"))),
      "values" -> Arr(Obj("field" -> Arr("data", "name")))
    )))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223308546298,
  "active": false,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    CreateIndex(
        Obj(
            "name" => "spells_by_element_with_name",
            "source" => Collection("spells"),
            "terms" => Arr(Obj("field" => Arr("data", "element"))),
            "values" => Arr(Obj("field" => Arr("data", "name")))
        )
    )
)
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223308546298,
  "active": false,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

インデックスは、結果の順序に影響する複数の値をカバーすることもできます。詳細については、[注文](#index-order-transform)セクションを参照してください。

`terms`または `values`フィールドに 指定するフィールド値の長さは、32k バイトを超えてはなりません。`terms`および`values` コンテンツ (および複数のフィールドを区別するためのオーバーヘッド) で構成されるインデックス エントリの最大サイズは、64k バイトを超えてはなりません。インデックス エントリが大きすぎる場合、インデックス エントリを作成/更新したクエリは失敗します。

これは、その要素でスペルを検索し、スペル名と の両方を取得できるインデックスの例です`ref`。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  CreateIndex(
    Obj(
      "name", "spells_with_ref_by_element_name",
      "source", Collection("spells"),
      "terms", Arr(Obj("field", Arr("data", "element"))),
      "values", Arr(
        Obj("field", Arr("data", "name")),
        Obj("field", Arr("ref"))
      )
    )));
```

```none
{
  "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309117205,
  "active": false,
  "partitions": 1,
  "name": "spells_with_ref_by_element_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create_index": {
            "object": {
              "name": "spells_with_ref_by_element_name",
              "source": { "collection": "spells" },
              "terms": [ { "object": { "field": [ "data", "element" ] } } ],
              "values": [
                { "object": { "field": [ "data", "name" ] } },
                { "object": { "field": [ "ref" ] } }
              ]
            }
          }
        }'
```

```none
HTTP/1.1 201 Created
{
  "resource": {
    "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
    "class": { "@ref": "indexes" },
    "ts": 1520223309117205,
    "active": false,
    "partitions": 1,
    "name": "spells_with_ref_by_element_name",
    "source": { "@ref": "classes/spells" },
    "terms": [ { "field": [ "data", "element" ] } ],
    "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.CreateIndex(
        f.Obj{
            "name": "spells_with_ref_by_element_name",
            "source": f.Collection("spells"),
            "terms": f.Arr{f.Obj{"field": f.Arr{"data", "element"}}},
            "values": f.Arr{
                f.Obj{"field": f.Arr{"data", "name"}},
                f.Obj{"field": f.Arr{"ref"}},
            },
        },
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{spells_with_ref_by_element_name 0xc4203d2260 <nil>}
  ts:1520223309117205
  active:false
  partitions:1
  name:spells_with_ref_by_element_name
  source:{spells 0xc4203d24c0 <nil>}
  terms:[map[field:[data element]]]
  values:[map[field:[data name]] map[field:[ref]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
      CreateIndex(
        Obj(
            "name", Value("spells_with_ref_by_element_name"),
            "source", Collection(Value("spells")),
            "terms", Arr(Obj("field", Arr(Value("data"), Value("element")))),
            "values", Arr(
            Obj("field", Arr(Value("data"), Value("name"))),
            Obj("field", Arr(Value("ref")))
          )
    )))
    .get());
```

```none
{
  ref: ref(id = "spells_with_ref_by_element_name", collection = ref(id = "indexes")),
  ts: 1527714659603218,
  active: false,
  partitions: 1,
  name: "spells_with_ref_by_element_name",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [{field: ["data", "element"]}],
  values: [
    {field: ["data", "name"]},
    {field: ["ref"]}
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.CreateIndex({
      name: "spells_with_ref_by_element_name",
      source: q.Collection("spells"),
      terms: [{ field: ["data", "element"] }],
      values: [{ field: ["data", "name"] }, { field: ["ref"] }],
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells_with_ref_by_element_name, collection=Ref(id=indexes)),
  ts: 1527625316880457,
  active: false,
  partitions: 1,
  name: 'spells_with_ref_by_element_name',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array] } ],
  values: [ { field: [Array] }, { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.create_index(
    {
      "name": "spells_with_ref_by_element_name",
      "source": q.collection("spells"),
      "terms": [{"field": ["data", "element"]}],
      "values": [{"field": ["data", "name"]}, {"field": ["ref"]}]
    }
  ))
```

```none
{
  "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309117205,
  "active": false,
  "partitions": 1,
  "name": "spells_with_ref_by_element_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create_index name: 'spells_with_ref_by_element_name',
               source: collection_('spells'),
               terms: [{ field: ['data', 'element'] }],
               values: [{ field: ['data', 'name'] }, { field: ['ref'] }]
end
```

```none
{
  "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309117205,
  "active": false,
  "partitions": 1,
  "name": "spells_with_ref_by_element_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  CreateIndex(
    Obj(
      "name" -> "spells_with_ref_by_element_name",
      "source" -> Collection("spells"),
      "terms" -> Arr(Obj("field" -> Arr("data", "element"))),
      "values" -> Arr(
        Obj("field" -> Arr("data", "name")),
        Obj("field" -> Arr("ref"))
      )
    )))
```

```none
{
  "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309117205,
  "active": false,
  "partitions": 1,
  "name": "spells_with_ref_by_element_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    CreateIndex(
        Obj(
            "name" => "spells_with_ref_by_element_name",
            "source" => Collection("spells"),
            "terms" => Arr(Obj("field" => Arr("data", "element"))),
            "values" => Arr(
                Obj("field" => Arr("data", "name")),
                Obj("field" => Arr("ref"))
            )
        )
    )
)
```

```none
{
  "ref": { "@ref": "indexes/spells_with_ref_by_element_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309117205,
  "active": false,
  "partitions": 1,
  "name": "spells_with_ref_by_element_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] }, { "field": [ "ref" ] } ]
}
```

### [](#index-paginate)すべてのインデックスにページ番号を付ける

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Paginate(Ref("indexes")));
```

```none
{
  "data": [
    { "@ref": "indexes/all_spells" },
    { "@ref": "indexes/spells_by_name" },
    { "@ref": "indexes/spells_by_element" },
    { "@ref": "indexes/spells_by_element_and_name" },
    { "@ref": "indexes/spellbooks_by_owner" },
    { "@ref": "indexes/spells_by_spellbook" },
    { "@ref": "indexes/all_spell_names" },
    { "@ref": "indexes/spells_by_element_with_name" },
    { "@ref": "indexes/spells_with_ref_by_element_name" },
    { "@ref": "indexes/latest_spells_by_element" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "paginate": { "@ref": "indexes" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      { "@ref": "indexes/all_spells" },
      { "@ref": "indexes/spells_by_name" },
      { "@ref": "indexes/spells_by_element" },
      { "@ref": "indexes/spells_by_element_and_name" },
      { "@ref": "indexes/spellbooks_by_owner" },
      { "@ref": "indexes/spells_by_spellbook" },
      { "@ref": "indexes/all_spell_names" },
      { "@ref": "indexes/spells_by_element_with_name" },
      { "@ref": "indexes/spells_with_ref_by_element_name" },
      { "@ref": "indexes/latest_spells_by_element" }
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Paginate(f.Ref("indexes")))

fmt.Println(result)
```

```none
map[data:[
  {all_spells 0xc4201fe5e0 <nil>}
  {spells_by_name 0xc4201fe720 <nil>}
  {spells_by_element 0xc4201fe880 <nil>}
  {spells_by_element_and_name 0xc4201fe9c0 <nil>}
  {spellbooks_by_owner 0xc4201feb00 <nil>}
  {spells_by_spellbook 0xc4201fec40 <nil>}
  {all_spell_names 0xc4201fed80 <nil>}
  {spells_by_element_with_name 0xc4201feec0 <nil>}
  {spells_with_ref_by_element_name 0xc4201ff000 <nil>}
  {latest_spells_by_element 0xc4201ff140 <nil>}
]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
     client.query(Paginate(Ref("indexes")))
     .get());
```

```none
{
  data: [
    ref(id = "all_spell_names", collection = ref(id = "indexes")),
    ref(id = "spellbooks_by_owner", collection = ref(id = "indexes")),
    ref(id = "spells_by_element", collection = ref(id = "indexes")),
    ref(id = "spells_by_spellbook", collection = ref(id = "indexes")),
    ref(id = "spells_by_element_with_name", collection = ref(id = "indexes")),
    ref(id = "spells_with_ref_by_element_name", collection = ref(id = "indexes")),
    ref(id = "latest_spells_by_element", collection = ref(id = "indexes")),
    ref(id = "elements_of_spells", collection = ref(id = "indexes"))
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client.query(q.Paginate(q.Indexes())).then((ret) => console.log(ret));
```

```none
{ data: [
    Ref(id=all_spells, collection=Ref(id=indexes)),
    Ref(id=spells_by_name, collection=Ref(id=indexes)),
    Ref(id=spells_by_element, collection=Ref(id=indexes)),
    Ref(id=spells_by_element_and_name, collection=Ref(id=indexes)),
    Ref(id=spellbooks_by_owner, collection=Ref(id=indexes)),
    Ref(id=spells_by_spellbook, collection=Ref(id=indexes)),
    Ref(id=all_spell_names, collection=Ref(id=indexes)),
    Ref(id=spells_by_element_with_name, collection=Ref(id=indexes)),
    Ref(id=spells_with_ref_by_element_name, collection=Ref(id=indexes)),
    Ref(id=latest_spells_by_element, collection=Ref(id=indexes)) ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.paginate(Ref("indexes")))
```

```none
{
  "data": [
    { "@ref": "indexes/all_spells" },
    { "@ref": "indexes/spells_by_name" },
    { "@ref": "indexes/spells_by_element" },
    { "@ref": "indexes/spells_by_element_and_name" },
    { "@ref": "indexes/spellbooks_by_owner" },
    { "@ref": "indexes/spells_by_spellbook" },
    { "@ref": "indexes/all_spell_names" },
    { "@ref": "indexes/spells_by_element_with_name" },
    { "@ref": "indexes/spells_with_ref_by_element_name" },
    { "@ref": "indexes/latest_spells_by_element" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate ref('indexes')
end
```

```none
{
  "data": [
    { "@ref": "indexes/all_spells" },
    { "@ref": "indexes/spells_by_name" },
    { "@ref": "indexes/spells_by_element" },
    { "@ref": "indexes/spells_by_element_and_name" },
    { "@ref": "indexes/spellbooks_by_owner" },
    { "@ref": "indexes/spells_by_spellbook" },
    { "@ref": "indexes/all_spell_names" },
    { "@ref": "indexes/spells_by_element_with_name" },
    { "@ref": "indexes/spells_with_ref_by_element_name" },
    { "@ref": "indexes/latest_spells_by_element" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Paginate(Ref("indexes")))
```

```none
{
  "data": [
    { "@ref": "indexes/all_spells" },
    { "@ref": "indexes/spells_by_name" },
    { "@ref": "indexes/spells_by_element" },
    { "@ref": "indexes/spells_by_element_and_name" },
    { "@ref": "indexes/spellbooks_by_owner" },
    { "@ref": "indexes/spells_by_spellbook" },
    { "@ref": "indexes/all_spell_names" },
    { "@ref": "indexes/spells_by_element_with_name" },
    { "@ref": "indexes/spells_with_ref_by_element_name" },
    { "@ref": "indexes/latest_spells_by_element" }
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Paginate(Ref("indexes")))
```

```none
{
  "data": [
    { "@ref": "indexes/all_spells" },
    { "@ref": "indexes/spells_by_name" },
    { "@ref": "indexes/spells_by_element" },
    { "@ref": "indexes/spells_by_element_and_name" },
    { "@ref": "indexes/spellbooks_by_owner" },
    { "@ref": "indexes/spells_by_spellbook" },
    { "@ref": "indexes/all_spell_names" },
    { "@ref": "indexes/spells_by_element_with_name" },
    { "@ref": "indexes/spells_with_ref_by_element_name" },
    { "@ref": "indexes/latest_spells_by_element" }
  ]
}
```

### [](#index-get)インデックスを取得する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Get(Index("spells_by_element_with_name")));
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309016000,
  "active": true,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "get": { "index": "spells_by_element_with_name" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "indexes/spells_by_element_with_name" },
    "class": { "@ref": "indexes" },
    "ts": 1520223309016000,
    "active": true,
    "partitions": 1,
    "name": "spells_by_element_with_name",
    "source": { "@ref": "classes/spells" },
    "terms": [ { "field": [ "data", "element" ] } ],
    "values": [ { "field": [ "data", "name" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Get(f.Index("spells_by_element_with_name")))

fmt.Println(result)
```

```none
map[
  ref:{spells_by_element_with_name 0xc4203c1300 <nil>}
  ts:1520223309016000
  active:true
  partitions:1
  name:spells_by_element_with_name
  source:{spells 0xc4203c1560 <nil>}
  values:[map[field:[data name]]]
  terms:[map[field:[data element]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
        client.query(Get(Index(Value("spells_by_element_with_name"))))
        .get());
```

```none
{
  ref: ref(id = "spells_by_element_with_name", collection = ref(id = "indexes")),
  ts: 1527714659590871,
  active: true,
  partitions: 1,
  name: "spells_by_element_with_name",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [ {field: ["data", "element"]} ],
  values: [ {field: ["data", "name"]} ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Get(q.Index("spells_by_element_with_name")))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells_by_element_with_name, collection=Ref(id=indexes)),
  ts: 1527625636424120,
  active: false,
  partitions: 1,
  name: 'spells_by_element_with_name',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array] } ],
  values: [ { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.get(q.index("spells_by_element_with_name")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309016000,
  "active": true,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  get index('spells_by_element_with_name')
end
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309016000,
  "active": true,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Get(Index("spells_by_element_with_name")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309016000,
  "active": true,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Get(Index("spells_by_element_with_name")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_element_with_name" },
  "class": { "@ref": "indexes" },
  "ts": 1520223309016000,
  "active": true,
  "partitions": 1,
  "name": "spells_by_element_with_name",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

### [](#index-query)インデックスをクエリする

`terms`フィールドを指定せずに作成さ`values`れたインデックスは、インデックス付きコレクションのすべてのインデックス付きを返し ます。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Paginate(Match(Index("all_spell_names"))));
```

```none
{
  "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "paginate": { "match": { "index": "all_spell_names" } } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Paginate(f.Match(f.Index("all_spell_names"))))

fmt.Println(result)
```

```none
map[data:[Fire Beak Hippo's Wallow Water Dragon's Claw]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  client.query(Paginate(Match(Index(Value("all_spell_names")))))
  .get());
```

```none
{
  data: ["Fire Beak", "Hippo's Wallow", "Water Dragon's Claw"]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Paginate(q.Match(q.Index("all_spell_names"))))
  .then((ret) => console.log(ret));
```

```none
{ data: [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.paginate(q.match(q.index("all_spell_names"))))
```

```none
{
  "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate match(index('all_spell_names'))
end
```

```none
{
  "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Paginate(Match(Index("all_spell_names"))))
```

```none
{
  "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Paginate(Match(index: Index("all_spell_names")))
)
```

```none
{
  "data": [ "Fire Beak", "Hippo's Wallow", "Water Dragon's Claw" ]
}
```

`terms`フィールドが定義されたインデックスの場合、エントリはインデックス用語を使用して検索されます。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Paginate(Match(Index("spells_by_element_with_name"), "fire")));
```

```none
{ "data": [ "Fire Beak", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "paginate": {
            "match": { "index": "spells_by_element_with_name" },
            "terms": "fire"
          }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": { "data": [ "Fire Beak", "Water Dragon's Claw" ] }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Paginate(
        f.MatchTerm(
            f.Index("spells_by_element_with_name"),
            "fire",
        ),
    ),
)

fmt.Println(result)
```

```none
map[data:[Fire Beak Water Dragon's Claw]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
       Paginate(
         Match(
           Index(Value("spells_by_element_with_name")),
           Value("fire")))
    ).get());
```

```none
{ data: ["Fire Beak", "Water Dragon's Claw"] }
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Paginate(q.Match(q.Index("spells_by_element_with_name"), "fire")))
  .then((ret) => console.log(ret));
```

```none
{ data: [ "Fire Beak", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.paginate(
    q.match(q.index("spells_by_element_with_name"), "fire")
  ))
```

```none
{ "data": [ "Fire Beak", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate match(index('spells_by_element_with_name'), 'fire')
end
```

```none
{ "data": [ "Fire Beak", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Paginate(Match(Index("spells_by_element_with_name"), "fire")))
```

```none
{ "data": [ "Fire Beak", "Water Dragon's Claw" ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Paginate(
        Match(
            index: Index("spells_by_element_with_name"),
            terms: "fire"
        )
    )
)
```

```none
{ "data": [ "Fire Beak", "Water Dragon's Claw" ] }
```

インデックスは、すべての値フィールド値を返します。ここでは`fire`、呪文名とその[参照の](https://docs.fauna.com/fauna/current/api/fql/types#ref)両方を返すインデックスを使用して、要素を持つすべての呪文を検索しています。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Paginate(
    Match(Index("spells_with_ref_by_element_name"), "fire")));
```

```none
{
  "data": [
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ],
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "paginate": {
            "match": { "index": "spells_with_ref_by_element_name" },
            "terms": "fire"
          }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      [
        "Fire Beak",
        { "@ref": "classes/spells/192900707573039616" }
      ],
      [
        "Water Dragon's Claw",
        { "@ref": "classes/spells/192900707595059712" }
      ]
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Paginate(
        f.MatchTerm(
            f.Index("spells_with_ref_by_element_name"),
            "fire",
        ),
    ),
)

fmt.Println(result)
```

```none
map[data:[[Fire Beak {192900707573039616 0xc420374e40 <nil>}] [Water Dragon's Claw {192900707595059712 0xc4203750c0 <nil>}]]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
   client.query(
     Paginate(
       Match(
         Index(Value("spells_with_ref_by_element_name")),
         Value("fire")
       )
     )
    ).get());
```

```none
{
  data: [
    [
      "Fire Beak",
      ref(id = "181388642046968320", collection = ref(id = "spells", collection = ref(id = "collections")))
    ],
    [
      "Water Dragon's Claw",
      ref(id = "181388642071085568", collection = ref(id = "spells", collection = ref(id = "collections")))
    ]
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Paginate(q.Match(q.Index("spells_with_ref_by_element_name"), "fire"))
  )
  .then((ret) => console.log(ret));
```

```none
{ data: [
    [ "Fire Beak",
      Ref(id=192900707573039616, collection=Ref(id=spells, collection=Ref(id=collections))) ],
    [ "Water Dragon's Claw",
      Ref(id=192900707595059712, collection=Ref(id=spells, collection=Ref(id=collections))) ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.paginate(
    q.match(q.index("spells_with_ref_by_element_name"), "fire")
  ))
```

```none
{
  "data": [
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ],
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate match(index('spells_with_ref_by_element_name'), 'fire')
end
```

```none
{
  "data": [
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ],
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Paginate(
    Match(Index("spells_with_ref_by_element_name"), "fire")))
```

```none
{
  "data": [
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ],
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Paginate(
        Match(
            index: Index("spells_with_ref_by_element_name"),
            terms: "fire"
        )
    )
)
```

```none
{
  "data": [
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ],
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ]
  ]
}
```

### [](#index-order-transform)順序付けと変換を伴うインデックス

更新された最新のスペルを返すインデックスを作成しましょう。これを行うために、各スペルの最終更新タイムスタンプで逆順に並べ替えられたインデックスを作成します。

要素ごとにスペルを見つけることができるように、このインデックスで用語を指定します。また`casefold`、インデックス内のエントリを小文字にする指定された用語への変換として関数を使用します。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  CreateIndex(
    Obj(
      "name", "latest_spells_by_element",
      "source", Collection("spells"),
      "terms", Arr(
        Obj("field", Arr("data", "element"), "transform", "casefold")
      ),
      "values", Arr(
        Obj("field", Arr("ts"), "reverse", true),
        Obj("field", Arr("data", "name")),
        Obj("field", Arr("ref"))
      )
    )));
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "create_index": {
            "object": {
              "name": "latest_spells_by_element",
              "source": { "collection": "spells" },
              "terms": [
                {
                  "object": {
                    "field": [ "data", "element" ],
                    "transform": "casefold"
                  }
                }
              ],
              "values": [
                { "object": { "field": [ "ts" ], "reverse": true } },
                { "object": { "field": [ "data", "name" ] } },
                { "object": { "field": [ "ref" ] } }
              ]
            }
          }
        }'
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.CreateIndex(
        f.Obj{
            "name": "latest_spells_by_element",
            "source": f.Collection("spells"),
            "terms": f.Arr{
                f.Obj{
                    "field": f.Arr{"data", "element"},
                    "transform": "casefold",
                },
            },
            "values": f.Arr{
                f.Obj{"field": f.Arr{"ts"}, "reverse": true},
                f.Obj{"field": f.Arr{"data", "name"}},
                f.Obj{"field": f.Arr{"ref"}},
            },
        },
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{latest_spells_by_element 0xc4201553e0 <nil>}
  name:latest_spells_by_element
  ts:1528319321952315
  active:false
  partitions:1
  source:{spells 0xc420155640 <nil>}
  terms:[map[field:[data element] transform:casefold]]
  values:[map[field:[ts] reverse:true] map[field:[data name]] map[field:[ref]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
  client.query(
    CreateIndex(
      Obj(
        "name", Value("latest_spells_by_element"),
        "source", Collection(Value("spells")),
        "terms", Arr(
          Obj(
          "field", Arr(Value("data"), Value("element")),
          "transform", Value("casefold")
          )
        ),
        "values", Arr(
          Obj("field", Arr(Value("ts")), "reverse", Value(true)),
          Obj("field", Arr(Value("data"), Value("name"))),
          Obj("field", Arr(Value("ref")))
        )
      )
    )
  ).get());
```

```none
{
  ref: ref(id = "latest_spells_by_element", collection = ref(id = "indexes")),
  ts: 1529022834916476,
  active: false,
  partitions: 1,
  name: "latest_spells_by_element",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [{
    field: ["data", "element"],
    transform: "casefold"
  }],
  values: [
    {field: ["ts"], reverse: true},
    {field: ["data", "name"]},
    {field: ["ref"]}
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.CreateIndex({
      name: "latest_spells_by_element",
      source: q.Collection("spells"),
      terms: [{ field: ["data", "element"], transform: "casefold" }],
      values: [
        { field: ["ts"], reverse: true },
        { field: ["data", "name"] },
        { field: ["ref"] },
      ],
    })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=latest_spells_by_element, collection=Ref(id=indexes)),
  ts: 1527625370644230,
  active: false,
  partitions: 1,
  name: 'latest_spells_by_element',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array], transform: 'casefold' } ],
  values:
   [ { field: [Array], reverse: true },
     { field: [Array] },
     { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.create_index(
    {
      "name": "latest_spells_by_element",
      "source": q.collection("spells"),
      "terms": [{"field": ["data", "element"], "transform": "casefold"}],
      "values": [
        {"field": ["ts"], "reverse": True},
        {"field": ["data", "name"]},
        {"field": ["ref"]}
      ]
    }
  ))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  create_index name: 'latest_spells_by_element',
               source: collection_('spells'),
               terms: [{ field: ['data', 'element'], transform: 'casefold' }],
               values: [
                 { field: ['ts'], reverse: true },
                 { field: ['data', 'name'] },
                 { field: ['ref'] }
               ]
end
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  CreateIndex(
    Obj(
      "name" -> "latest_spells_by_element",
      "source" -> Collection("spells"),
      "terms" -> Arr(
        Obj(
          "field" -> Arr("data", "element"),
          "transform" -> "casefold"
        )
      ),
      "values" -> Arr(
        Obj("field" -> Arr("ts"), "reverse" -> true),
        Obj("field" -> Arr("data", "name")),
        Obj("field" -> Arr("ref"))
      )
    )))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    CreateIndex(
        Obj(
            "name" => "latest_spells_by_element",
            "source" => Collection("spells"),
            "terms" => Arr(
                Obj(
                    "field" => Arr("data", "element"),
                    "transform" => "casefold"
                )
            ),
            "values" => Arr(
                Obj("field" => Arr("ts"), "reverse" => true),
                Obj("field" => Arr("data", "name")),
                Obj("field" => Arr("ref"))
            )
        )
    )
)
```

インデックスをクエリする場合、`casefold`関数を使用してクエリ用語を小文字に変換できます。で`casefold`構成されたインデックスへのクエリで使用すると、`casefold`基本的に大文字と小文字が区別されないクエリになります。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Paginate(
    Match(Index("latest_spells_by_element"), Casefold("FIRE"))));
```

```none
{
  "data": [
    [
      1520223300442183,
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      1520223300419731,
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "paginate": {
            "match": { "index": "latest_spells_by_element" },
            "terms": { "casefold": "FIRE" }
          }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      [
        1520223300442183,
        "Water Dragon's Claw",
        { "@ref": "classes/spells/192900707595059712" }
      ],
      [
        1520223300419731,
        "Fire Beak",
        { "@ref": "classes/spells/192900707573039616" }
      ]
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Paginate(
        f.MatchTerm(
            f.Index("latest_spells_by_element"),
            f.Casefold("FIRE"),
        ),
    ),
)

fmt.Println(result)
```

```none
map[data:[
  [1520223300442183 Water Dragon's Claw {192900707595059712 0xc4202e4ce0 <nil>}]
  [1520223300419731 Fire Beak {192900707573039616 0xc4202e4f80 <nil>}]
]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
      Paginate(
        Match(
          Index(Value("latest_spells_by_element")),
          Casefold(Value("FIRE")))))
        .get());
```

```none
{
  data: [
    [
      1527719986560591,
      "Fire Beak",
      ref(id = "181388642046968320", collection = ref(id = "spells", collection = ref(id = "collections")))
    ],
    [
      1527719986495363,
      "Water Dragon's Claw",
      ref(id = "181388642071085568", collection = ref(id = "spells", collection = ref(id = "collections")))
    ]
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Paginate(q.Match(q.Index("latest_spells_by_element"), q.Casefold("FIRE")))
  )
  .then((ret) => console.log(ret));
```

```none
{ data:
   [ [ 1520223300442183,
       "Water Dragon's Claw",
       Ref(id=192900707595059712, collection=Ref(id=spells, collection=Ref(id=collections))) ],
   [ [ 1520223300419731
       "Fire Beak",
       Ref(id=192900707573039616, collection=Ref(id=spells, collection=Ref(id=collections))) ] ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.paginate(
    q.match(
      q.index("latest_spells_by_element"),
      q.casefold("FIRE")
    )
  ))
```

```none
{
  "data": [
    [
      1520223300442183,
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      1520223300419731,
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  paginate match(index('latest_spells_by_element'), casefold('FIRE'))
end
```

```none
{
  "data": [
    [
      1520223300442183,
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      1520223300419731,
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Paginate(
    Match(Index("latest_spells_by_element"), Casefold("FIRE"))))
```

```none
{
  "data": [
    [
      1520223300442183,
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      1520223300419731,
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Paginate(
        Match(
            index: Index("latest_spells_by_element"),
            terms: Casefold("FIRE")
        )
    )
)
```

```none
{
  "data": [
    [
      1520223300442183,
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      1520223300419731,
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

ソートを容易にするためにタイムスタンプがインデックスに追加されているため、クエリがタイムスタンプ値をアプリケーション層に返す必要がない場合があります。その場合、`map`関数を使用して、必要なフィールドのみを抽出することができます。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Map(
    Paginate(
      Match(Index("latest_spells_by_element"), Casefold("FIRE"))),
    Lambda(
      Arr("_", "name", "ref"),
      Arr(Var("name"), Var("ref")))));
```

```none
{
  "data": [
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "map": {
            "lambda": [ "_", "name", "ref" ],
            "expr": [ { "var": "name" }, { "var": "ref" } ]
          },
          "collection": {
            "paginate": {
              "match": { "index": "latest_spells_by_element" },
              "terms": { "casefold": "FIRE" }
            }
          }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "data": [
      [
        "Water Dragon's Claw",
        { "@ref": "classes/spells/192900707595059712" }
      ],
      [
        "Fire Beak",
        { "@ref": "classes/spells/192900707573039616" }
      ]
    ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Map(
        f.Paginate(
            f.MatchTerm(
                f.Index("latest_spells_by_element"),
                f.Casefold("FIRE"),
            ),
        ),
        f.Lambda(
            f.Arr{"_", "name", "ref"},
            f.Arr{f.Var("name"), f.Var("ref")},
        ),
    ),
)

fmt.Println(result)
```

```none
map[data:[
  [Water Dragon's Claw {192900707595059712 0xc4201fc680 <nil>}]
  [Fire Beak {192900707573039616 0xc4201fc900 <nil>}]
]]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
    client.query(
      Map(
        Paginate(
            Match(
              Index(Value("latest_spells_by_element")),
              Casefold(Value("FIRE")))),
        Lambda(
          Arr(Value("_"), Value("name"), Value("ref")),
          Arr(Var("name"), Var("ref")))))
        .get());
```

```none
{
  data: [
    [
      "Fire Beak",
      ref(id = "181388642046968320", collection = ref(id = "spells", collection = ref(id = "collections")))
    ],
    [
      "Water Dragon's Claw",
      ref(id = "181388642071085568", collection = ref(id = "spells", collection = ref(id = "collections")))
    ]
  ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Map(
      q.Paginate(
        q.Match(q.Index("latest_spells_by_element"), q.Casefold("FIRE"))
      ),
      q.Lambda(["_", "name", "ref"], [q.Var("name"), q.Var("ref")])
    )
  )
  .then((ret) => console.log(ret));
```

```none
{ data:
   [ [ "Water Dragon's Claw",
       Ref(id=192900707595059712, collection=Ref(id=spells, collection=Ref(id=collections))) ],
     [ "Fire Beak",
       Ref(id=192900707573039616, collection=Ref(id=spells, collection=Ref(id=collections))) ] ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.map_(
    q.lambda_(
      ["_", "name", "ref"],
      [q.var("name"), q.var("ref")]
    ),
    q.paginate(
      q.match(
        q.index("latest_spells_by_element"),
        q.casefold("FIRE")
      )
    )
  ))
```

```none
{
  "data": [
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  map paginate(match(index('latest_spells_by_element'), casefold('FIRE'))),
      lambda_expr(['_', 'name', 'ref'], [var('name'), var('ref')])
end
```

```none
{
  "data": [
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Map(
    Paginate(
      Match(Index("latest_spells_by_element"), Casefold("FIRE"))),
    Lambda { (_, name, ref) => Arr(name, ref) }))
```

```none
{
  "data": [
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Map(
        collection: Paginate(
            Match(
                index: Index("latest_spells_by_element"),
                terms: Casefold("FIRE")
            )
        ),
        to: Lambda(
            vars: "_", "name", "ref"
            in: Arr(Var("name"), Var("ref"))
        )
    )
)
```

```none
{
  "data": [
    [
      "Water Dragon's Claw",
      { "@ref": "classes/spells/192900707595059712" }
    ],
    [
      "Fire Beak",
      { "@ref": "classes/spells/192900707573039616" }
    ]
  ]
}
```

### [](#update-an-index)索引を更新する

形状を変更する方法でインデックスを更新することは許可されていません。これは、ソースまたは用語を変更しないことを意味します。ただし、インデックスの名前やその一意性は変更できます。`unique` フィールドを更新しても、既存の重複アイテムはインデックスから削除されません。

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(
  Update(
    Index("spells_by_element_with_name"),
    Obj("name", "spells_by_kind")));
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{
          "update": { "index": "spells_by_element_with_name" },
          "params": { "object": { "name": "spells_by_kind" } }
        }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "indexes/spells_by_kind" },
    "class": { "@ref": "indexes" },
    "ts": 1520223330123219,
    "active": true,
    "partitions": 1,
    "name": "spells_by_kind",
    "source": { "@ref": "classes/spells" },
    "terms": [ { "field": [ "data", "element" ] } ],
    "values": [ { "field": [ "data", "name" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(
    f.Update(
        f.Index("spells_by_element_with_name"),
        f.Obj{"name": "spells_by_kind"},
    ),
)

fmt.Println(result)
```

```none
map[
  ref:{spells_by_kind 0xc4201ff520 <nil>}
  ts:1520223330123219
  active:true
  partitions:1
  name:spells_by_kind
  source:{spells 0xc4201ff780 <nil>}
  terms:[map[field:[data element]]]
  values:[map[field:[data name]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(
   client.query(
     Update(
      Index(Value("spells_by_element_with_name")),
      Obj("name", Value("spells_by_kind"))
     )
   )
.get());
```

```none
{
  ref: ref(id = "spells_by_kind", collection = ref(id = "indexes")),
  ts: 1527720046964825,
  active: true,
  partitions: 1,
  name: "spells_by_kind",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [ {field: ["data", "element"]} ],
  values: [ {field: ["data", "name"]} ]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(
    q.Update(q.Index("spells_by_element_with_name"), { name: "spells_by_kind" })
  )
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells_by_kind, collection=Ref(id=indexes)),
  ts: 1527630282459547,
  active: true,
  partitions: 1,
  name: 'spells_by_kind',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array] } ],
  values: [ { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(
  q.update(
    q.index("spells_by_element_with_name"),
    {"name": "spells_by_kind"}
  ))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  update index('spells_by_element_with_name'),
         name: 'spells_by_kind'
end
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(
  Update(
    Index("spells_by_element_with_name"),
    Obj("name" -> "spells_by_kind")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(
    Update(
        ref: Index("spells_by_element_with_name"),
        to: Obj("name" => "spells_by_kind")
    )
)
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

### [](#index-delete)インデックスを削除する

C#GOJAVAJAVASCRIPTPYTHONSCALA

```csharp
client.Query(Delete(Index("spells_by_kind")));
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```curl
curl https://db.fauna.com/ \
    -u fnACrVIrDDACAFiX3FN4PhwADpl7dtPRhWObP08j: \
    -d '{ "delete": { "index": "spells_by_kind" } }'
```

```none
HTTP/1.1 200 OK
{
  "resource": {
    "ref": { "@ref": "indexes/spells_by_kind" },
    "class": { "@ref": "indexes" },
    "ts": 1520223330123219,
    "active": true,
    "partitions": 1,
    "name": "spells_by_kind",
    "source": { "@ref": "classes/spells" },
    "terms": [ { "field": [ "data", "element" ] } ],
    "values": [ { "field": [ "data", "name" ] } ]
  }
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```go
result, _ := client.Query(f.Delete(f.Index("spells_by_kind")))

fmt.Println(result)
```

```none
map[
  ref:{spells_by_kind 0xc4201f3240 <nil>}
  ts:1520223330123219
  active:true
  partitions:1
  name:spells_by_kind
  source:{spells 0xc4201f34a0 <nil>}
  terms:[map[field:[data element]]]
  values:[map[field:[data name]]]
]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```java
System.out.println(client.query(
    Delete(Index(Value("spells_by_kind")))).get());
```

```none
{
  ref: ref(id = "spells_by_kind", collection = ref(id = "indexes")),
  ts: 1527720046964825,
  active: true,
  partitions: 1,
  name: "spells_by_kind",
  source: ref(id = "spells", collection = ref(id = "collections")),
  terms: [ {field: ["data", "element"]} ],
  values: [{field: ["data", "name"]}]
}
```

C#行くジャバジャバスクリプトパイソンスカラ

```javascript
client
  .query(q.Delete(q.Index("spells_by_kind")))
  .then((ret) => console.log(ret));
```

```none
{ ref: Ref(id=spells_by_kind, collection=Ref(id=indexes)),
  ts: 1527625346513000,
  active: true,
  partitions: 1,
  name: 'spells_by_kind',
  source: Ref(id=spells, collection=Ref(id=collections)),
  terms: [ { field: [Array] } ],
  values: [ { field: [Array] }, { field: [Array] } ] }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```python
client.query(q.delete(q.index("spells_by_kind")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```ruby
$client.query do
  delete index('spells_by_kind')
end
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```scala
client.query(Delete(Index("spells_by_kind")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

```swift
client.query(Delete(ref: Index("spells_by_kind")))
```

```none
{
  "ref": { "@ref": "indexes/spells_by_kind" },
  "class": { "@ref": "indexes" },
  "ts": 1520223330123219,
  "active": true,
  "partitions": 1,
  "name": "spells_by_kind",
  "source": { "@ref": "classes/spells" },
  "terms": [ { "field": [ "data", "element" ] } ],
  "values": [ { "field": [ "data", "name" ] } ]
}
```

この記事は役に立ちましたか？
