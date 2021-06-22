Indexes | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/indexes?lang=javascript

# Indexes

Indexes allow for the organization and retrieval of documents by attributes other than their [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). They act as a lookup table that improves the performance of finding documents: instead of reading every single document to find the one(s) that you are interested in, you query an index to find those documents.

インデックスは、[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)以外の属性によって文書を整理し、検索することを可能にするものです。興味のある文書を見つけるためにすべての文書を読むのではなく、インデックスを照会してそれらの文書を見つけるのです。

インデックスを使用すると、参照以外の属性でドキュメントを整理および取得できます。これらは、ドキュメント検索のパフォーマンスを向上させるルックアップテーブルとして機能します。すべてのドキュメントを読み取って目的のドキュメントを検索する代わりに、インデックスをクエリしてそれらのドキュメントを検索します。

See [Limits](https://docs.fauna.com/fauna/current/api/limits) for details on concurrent index builds and transaction limits.

注意
参照してください制限同時インデックスの詳細については、構築し、取引限度額。

When you create an index, you specify its `source`, which is one or more collections of documents. Once the index is active, any query that creates, updates, or deletes a document in the `source` collection(s) causes the index to be updated.

インデックスを作成する際には，1つまたは複数のドキュメントのコレクションである「ソース」を指定します．インデックスが有効になると、`source`コレクション内のドキュメントを作成、更新、あるいは削除したクエリは、インデックスを更新することになります。

インデックスを作成するときsourceは、ドキュメントの1つ以上のコレクションであるインデックスを指定します。インデックスがアクティブになると、sourceコレクション内のドキュメントを作成、更新、または削除するクエリによって、インデックスが更新されます。

An index can specify `terms`: these are zero or more values from indexed documents that help you to find specific documents. `terms` are comparable to `column=value` predicates in an SQL `WHERE` clause. For example, if your documents contain a `name` field, you can specify `terms` to include that field, and then you can find all of the documents that match a specific `name`. When an index has one or more `terms`, the index is partitioned by the `terms`, allowing Fauna to efficiently scale indexes.

インデックスでは，`terms`を指定することができます．これは，インデックス化されたドキュメントからの0個以上の値で，特定のドキュメントを探すのに役立ちます．これは、インデックス化されたドキュメントに含まれる0個以上の値で、特定のドキュメントを探すのに役立ちます。 `terms` は、SQLの `WHERE` 句における `column=value` 述語に相当します。例えば、文書に `name` フィールドが含まれている場合、`terms` を指定してそのフィールドを含めれば、特定の `name` に一致するすべての文書を検索することができます。インデックスが1つ以上の`terms`を持つ場合、インデックスは`terms`によって分割されるので、Faunaはインデックスを効率的に拡張することができます。

An index can specify `values`: these are zero or more values returned for each index entry that matches the `terms` when you query the index. `values` are comparable to the SQL `SELECT` clause. `values` are also how indexes are sorted: each field value in `values` is sorted lexically according to the field’s type, and the order can be inverted by specifying `reverse`. Each index entry records the [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) of each document involved in the index. When no `values` are specified, the index returns the Reference for each matching index entry. When one or more `values` are specified, only those values are returned.

インデックスでは，`values`を指定することができます．これは，インデックスを検索したときに，`terms`にマッチする各インデックスエントリに対して返されるゼロ個以上の値です．値`は，SQLの`SELECT`句に相当します．values`はインデックスのソート方法でもあります。`values`の各フィールド値は、フィールドの型に応じて辞書的にソートされ、`reverse`を指定することで順序を反転させることができます。各インデックスエントリには、そのインデックスに含まれる各文書の[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)が記録されています。値`が指定されていない場合には、インデックスはマッチする各インデックスエントリの[Reference]を返します。1つ以上の `値` が指定された場合には，それらの値のみが返されます。

An index with no `terms` and `values` specified is known as a _collection index_: searching for specific documents is not possible, and all documents within the collection are included in the result set, and are sorted by their reference in ascending order.

特定の文書を検索することはできず、コレクション内のすべての文書が結果セットに含まれ、その参照元で昇順にソートされます。

なしtermsでvalues指定されたインデックスは、コレクションインデックスと呼ばれ ます。特定のドキュメントを検索することはできません。コレクション内のすべてのドキュメントが結果セットに含まれ、参照によって昇順で並べ替えられます。

You can specify that an index is `unique`. This means that, for the defined `terms` and `values`, the index contains only one entry for a document having those specific `terms` and `values`. As a result, creating or updating a document to have the same `terms` and `values` as an existing document would cause an error.

インデックスが `unique` であることを指定することができます。これは、定義された `terms` と `values` に対して、インデックスはそれらの特定の `terms` と `values` を持つドキュメントのエントリを一つだけ含むことを意味しています。その結果、既存のドキュメントと同じ `terms` と `values` を持つドキュメントを作成したり更新したりするとエラーになります。

Fauna indexes can also specify _bindings_, which are [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) functions that you can use to compute fields in the `terms` or `values`. For example, if your documents store a timestamp, and you want to search for documents by year, you could write a binding that converts the timestamp to a year and include the computed year as one of the `terms`. Similarly, if you want to report the month of a document, you could write a binding that converts the timestamp to a month, and include the computed month as one of the `values`.

Fauna インデックスでは、_bindings_ を指定することもできます。これは [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) 関数で、`terms` や `values` のフィールドを計算するのに使用できます。たとえば、ドキュメントにタイムスタンプが格納されていて、ドキュメントを年で検索したい場合、タイムスタンプを年に変換するバインディングを書いて、計算された年を `terms` のひとつとして含めることができます。同様に、ドキュメントの月を報告したい場合には、タイムスタンプを月に変換し、計算された月を`値`の一つとして含めるバインディングを書くことができます。

For background, a [Set](https://docs.fauna.com/fauna/current/api/fql/sets) is a sorted group of immutable data from a collection. An Index is a group of sets within a collection. Indexes are defined as documents within the system _indexes_ collection.

背景として、[Set](https://docs.fauna.com/fauna/current/api/fql/sets)は、コレクションからの不変のデータのソートされたグループです。インデックスは、コレクション内のセットのグループです。インデックスは、システム_indexes_コレクション内のドキュメントとして定義されます。

This section covers the following topics:

このセクションでは、次のトピックについて説明します。

-   [Example index](#example)
-   [Index fields](#fields)
    -   [Source objects](#source)
    -   [Binding objects](#binding)
    -   [Term objects](#term)
    -   [Value objects](#value)
-   [Creating indexes](#creation)
-   [Modifying index documents](#modifications)
-   [Reading indexes](#read)
-   [Ordering](#order)

- インデックスの例
- インデックスフィールド
	- ソースオブジェクト
	- オブジェクトのバインド
	- 用語オブジェクト
	- 値オブジェクト
- インデックスの作成
- インデックスドキュメントの変更
- インデックスの読み取り
- 注文

## [](#example)Example index

インデックスの例

The simplest index is called a "collection" index; it has no [`terms`](#term) or [`values`](#value) defined. This means that the index includes all documents with no search terms, and that the index returns the [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) to each indexed document. Such an index can be created with just a `name` and a `source` collection:

最も単純なインデックスは「コレクション」インデックスと呼ばれ、[`terms`](#term)や[`values`](#value)が定義されていません。これは、インデックスが検索用語を持たないすべてのドキュメントを含み、インデックスされた各ドキュメントに[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を返すことを意味します。このようなインデックスは、`name`と`source`のコレクションだけで作成することができます。

```javascript
client.query(
  q.CreateIndex({
    name: 'new-index',
    source: q.Collection('spells'),
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("new-index"),
  ts: 1591996190530000,
  active: true,
  serialized: true,
  name: 'new-index',
  source: Collection("spells"),
  partitions: 8
}
```

## [](#fields)Index fields

インデックスフィールド

|Field Name|Field Type|Definition and Requirements|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The logical name of the index. Cannot be `events`, `sets`, `self`, `documents`, or `_`.|
|`source`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) or [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|A Collection reference, or an array of one or more [source objects](#source) describing source collections and (optional) binding fields.|
|`terms`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|Optional - An array of [Term objects](#term) describing the fields that should be searchable. Indexed terms can be used to search for field values, via the [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function. The default is an empty Array.|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|Optional - An array of [Value objects](#value) describing the fields that should be reported in search results. The default is an empty Array. When no `values` fields are defined, search results report the indexed document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref).|
|`unique`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|Optional - If `true`, maintains a unique constraint on combined `terms` and `values`. The default is `false`.|
|`serialized`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|Optional - If `true`, writes to this index are _serialized_ with concurrent reads and writes. The default is `true`.|
|`permissions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - Indicates who is allowed to read the index. The default is everyone can read the index.|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|Optional - This is user-defined metadata for the index. It is provided for the developer to store information at the index level. The default is an empty object having no data.|

|Field Name|Field Type|定義と要件|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|インデックスの論理名です。elevents`, `sets`, `self`, `documents`, `_` は使用できません。|
|`source`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) or [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|コレクションの参照、またはソースコレクションと（オプションの）バインディングフィールドを記述した1つまたは複数の[ソースオブジェクト](#source)の配列です。|
|`terms`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|オプション - 検索対象となるフィールドを記述した[Termオブジェクト](#term)の配列です。インデックス化された用語は、[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)関数を使って、フィールドの値を検索することができます。デフォルトでは、空の配列です。|
|`values`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)|オプション - 検索結果で報告されるべきフィールドを記述した[Valueオブジェクト](#value)の配列です。デフォルトは空の配列です。Value`フィールドが定義されていない場合、検索結果はインデックス化されたドキュメントの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref).|を報告します。|
|`unique`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|オプション - `true` の場合、`terms` と `values` を組み合わせたものに対して、一意の制約を維持します。デフォルトは `false` です。|
|`serialized`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|オプション - `true` の場合、このインデックスへの書き込みは、読み取りと書き込みの同時進行で_シリアル化されます。デフォルトは`true`です。|
|`permissions`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション - 誰がインデックスを読むことができるかを示します。デフォルトでは、すべての人がインデックスを読むことができます。|
|`data`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|オプション - これは、インデックスに対するユーザー定義のメタデータです。開発者がインデックスレベルの情報を保存するために提供されます。デフォルトでは、データを持たない空のオブジェクトとなります。|

The length of the field values specified for the `terms` or `values` fields must not exceed 32k bytes. The maximum size of an index entry, which is comprised of the `terms` and `values` content (and some overhead to distinguish multiple fields), must not exceed 64k bytes. If an index entry is too large, the query that created/updated the index entry fails.

警告
フィールド`terms`や`values`に指定するフィールド値の長さは32kバイトを超えてはいけません。インデックスエントリの最大サイズは、`terms`と`values`の内容（および複数のフィールドを区別するための若干のオーバーヘッド）で構成され、64kバイトを超えてはなりません。インデックスエントリのサイズが大きすぎると、そのインデックスエントリを作成/更新したクエリは失敗します。

### [](#source)Source objects

ソースオブジェクト

Source objects describe the source collection of index entries and, optionally, bindings. A binding must be a pure [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function that emits values to be used as a term and/or value.

ソースオブジェクトは、インデックスエントリのソースコレクションと、オプションでバインディングを記述します。バインディングはLambda、用語や値として使用される値を出力する純粋関数である必要があります。

An index cannot be created in the same transaction that creates its source collection(s).

重要
ソースコレクションを作成するのと同じトランザクションでインデックスを作成することはできません。

The `collection` field can be a single collection reference or set of references. Documents within collections matching the `collection` field apply the associated bindings to be used in the index’s terms or values. A collection reference can only exist in one source object. If the `collection` field is a wildcard (`_`), the index evaluates all collections. Bindings associated with a wildcard are only used if the collection is not matched by any other source object.

`collection`フィールドには、単一のコレクション参照、または一連の参照を指定できます。`コレクション`フィールドにマッチするコレクション内のドキュメントは、関連するバインディングを適用して、インデックスの用語や値に使用します。コレクションの参照は、1つのソースオブジェクトにしか存在できません。`コレクション`フィールドがワイルドカード(`_`)の場合、インデックスはすべてのコレクションを評価します。ワイルドカードに関連するバインディングは、コレクションが他のソース・オブジェクトでマッチしない場合にのみ使用されます。

|Field|Type|Definition and Requirements|
|--|--|--|
|`collection`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|The collection or collections to be indexed, or a wildcard (`_`).|
|`fields`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|An object mapping a binding’s name to a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function.|

|Field|Type|定義と要件|
|--|--|--|
|`collection`|[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)|インデックスを作成する1つまたは複数のコレクション、またはワイルドカード（_）。|
|`fields`|[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)|バインディングの名前を[Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)関数にマッピングするオブジェクトです。|

The following examples demonstrates the structure of a source object, which includes an example [binding object](#binding):

次の例は、ソースオブジェクトの構造を示しています。これには、バインディングオブジェクトの例が含まれています。

```javascript
client.query({
  source: {
    collection: q.Collection('collection'),
    fields: {
      binding1: q.Query(
        q.Lambda(
          'document',
          q.Select(['data', 'field'], q.Var('document'))
        )
      ),
    },
  },
})
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  source: {
    collection: Collection("collection"),
    fields: {
      binding1: Query(Lambda("document", Select(["data", "field"], Var("document"))))
    }
  }
}
```

### [](#binding)Binding objects

オブジェクトのバインド

A binding object contains field names bound to pure, single-argument Lambda functions. The function must take the document to be indexed and emit either a single scalar value or an array of scalar values. Binding functions are not permitted to perform reads or writes.

バインディングオブジェクトには、純粋な単一引数のLambda関数にバインドされたフィールド名が含まれています。この関数は、インデックスを作成するドキュメントを取得し、単一のスカラー値またはスカラー値の配列を出力する必要があります。バインディング関数は、読み取りまたは書き込みを実行することを許可されていません。

Functions that **cannot** be used in bindings include:

バインディングで使用できない関数は次のとおりです。

-   [`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)
-   [`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)
-   [`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)
-   [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)
-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)
-   [`CreateClass`](https://docs.fauna.com/fauna/current/api/fql/functions/createclass)
-   [`CreateCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection)
-   [`CreateDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/createdatabase)
-   [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)
-   [`CreateIndex`](https://docs.fauna.com/fauna/current/api/fql/functions/createindex)
-   [`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)
-   [`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole)
-   [`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)
-   [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)
-   [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity)
-   [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)
-   [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity)
-   [`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)
-   [`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)
-   [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
-   [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
-   [`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)
-   [`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)
-   [`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)
-   [`MoveDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/movedatabase)
-   [`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid)
-   [`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now)
-   [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)
-   [`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)
-   [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)
-   [`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace)
-   [`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)
-   [`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)

```javascript
client.query({
  binding1: q.Query(
    q.Lambda('document', q.Select(['data', 'field'], q.Var('document')))
  ),
})
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ binding1:
   Query(Lambda("document", Select(["data", "field"], Var("document")))) }
```

### [](#term)Term objects

用語オブジェクト

Term objects describe the fields whose values are used to search for entries in the index.

用語オブジェクトは、インデックス内のエントリの検索に値が使用されるフィールドを記述します。

When a term field is missing from an indexed document, the field’s value in the index is `null`.

インデックス付きドキュメントに用語フィールドがない場合、インデックス内のフィールドの値はnullです。

If no term objects are defined, passing term values to [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) is not required. The resulting set contains all documents within the source collection.

用語オブジェクトが定義されていない場合、用語値をに渡すMatch必要はありません。結果のセットには、ソースコレクション内のすべてのドキュメントが含まれます。

When a term field is an array, one index entry per array item is created, which makes it easy to search for any one of the array’s items.

用語フィールドが配列の場合、配列アイテムごとに1つのインデックスエントリが作成されます。これにより、配列のアイテムのいずれかを簡単に検索できます。

A value can be from a `field` in the document or a `binding` defined by the source object.

値はfield、ドキュメント内のから、またはbindingソースオブジェクトによって定義されたものにすることができます。

|Field|Type|Definition|
|--|--|--|
|`field`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The field name path (the list of field names required to access a specific field nested within the document structure) or field name within the document to be indexed.|
|`binding`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The name of a binding from a source object.|

|Field|Type|定義|
|--|--|--|
|`field`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [String](https://docs.fauna.com/fauna/current/api/fql/types#string)|フィールド名のパス（ドキュメント構造内にネストされた特定のフィールドにアクセスするために必要なフィールド名のリスト）、またはインデックス対象のドキュメント内のフィールド名。|
|`binding`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|ソースオブジェクトからのバインディングの名前。|

The following example demonstrates an index’s `terms` field definition with two term objects, the first specifies a binding, the second specifies a document field:

次の例は、terms2つの用語オブジェクトを使用したインデックスのフィールド定義を示しています。1つ目はバインディングを指定し、2つ目はドキュメントフィールドを指定します。

```javascript
client.query({
  terms: [
    { binding: 'binding1' },
    { field: ['data', 'field'] },
  ],
})
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  terms: [ { binding: 'binding1' }, { field: [ 'data', 'field' ] } ]
}
```

### [](#value)Value objects

値オブジェクト

Value objects describe the fields whose values should be used to sort the index, and whose values should be reported in query results. By default, indexes have no `values` defined, and return the references of indexed documents.

値オブジェクトは、インデックスの並べ替えに値を使用する必要があり、クエリ結果で値を報告する必要があるフィールドを記述します。デフォルトでは、インデックスにはvalues定義がなく、インデックス付きドキュメントの参照を返します。

A value can be from a `field` in the document, or a `binding` function defined in a [Source objects](#source).

値はfield、ドキュメント内のから、またはSourceオブジェクトでbinding定義された関数から取得できます。

|Field|Type|Definition|
|--|--|--|
|`field`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The field name path (the list of field names required to access a specific field nested within the document structure) or field name within the document to be indexed.|
|`binding`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The name of a binding from a [Source objects](#source).|
|`reverse`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|Whether this field’s value should sort reversed. Defaults to `false`.|

|Field|Type|定義|
|--|--|--|
|`field`|[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) or [String](https://docs.fauna.com/fauna/current/api/fql/types#string)|フィールド名のパス（ドキュメント構造内にネストされた特定のフィールドにアクセスするために必要なフィールド名のリスト）またはインデックスを作成するドキュメント内のフィールド名。|
|`binding`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|ソースオブジェクト](#source)からのバインディングの名前です。|
|`reverse`|[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)|このフィールドの値を反転してソートするかどうかを指定します。デフォルトは `false` です。|

The document’s reference also appears in `before` and `after` cursors when paging through an index with the [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function, even if the reference is not included as a `values` field. Pagination always uses the indexed document’s reference to stabilize pagination.

注意
ドキュメントのリファレンスは、リファレンスが `values` フィールドとして含まれていない場合でも、[Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) 関数でインデックスをページングする際に `before` と `after` のカーソルに表示されます。ページネーションでは、インデックス化されたドキュメントの参照を常に使用して、ページネーションを安定させます。

Any of a document’s fields may be indexed. The value of `field` in a [Term](#term) or [Value](#value) object indicates the position within a document for a field. For example, the field `ref` refers to the top-level `ref` field. The field `["data", "address", "street"]` refers to the `street` field contained in an `address` object within the document’s `data` object.

ドキュメントのどのフィールドにもインデックスを付けることができます。Term](#term)や[Value](#value)オブジェクトの`field`の値は、ドキュメント内でのフィールドの位置を示します。例えば、フィールド `ref` は、トップレベルの `ref` フィールドを指します。フィールド `["data", "address", "street"]` は、ドキュメントの `data` オブジェクト内の `address` オブジェクトに含まれる `street` フィールドを指します。

The following example demonstrates an index’s `values` field definition with two term objects, the first specifies a binding, the second specifies a document field that should be sorted in reverse:

次の例では、インデックスの `values` フィールドの定義を、2つの用語オブジェクトで示しています。

次の例は、values2つの用語オブジェクトを使用したインデックスのフィールド定義を示しています。1つ目はバインディングを指定し、2つ目は逆に並べ替える必要があるドキュメントフィールドを指定します。

```javascript
client.query({
  values: [
    { binding: 'binding1' },
    { field: ['data', 'field'], reverse: true },
  ],
})
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  values: [
    { binding: 'binding1' },
    { field: [ 'data', 'field' ], reverse: true }
  ]
}
```

## [](#creation)Creating indexes

インデックスの作成

When an index is added, it is immediately available for reads, but returns incomplete results until it is built. Fauna builds the index asynchronously by scanning over relevant documents. Upon completion, the index’s `active` field is set to `true`.

インデックスが追加されると、すぐに読み取りに使用できますが、作成されるまで不完全な結果を返します。Faunaは、関連するドキュメントをスキャンすることにより、非同期でインデックスを作成します。完了すると、インデックスのactiveフィールドはに設定されtrueます。

An index cannot be created and read in the same transaction.

重要
同じトランザクションでインデックスを作成して読み取ることはできません。

When an index is created, documents are immediately indexed if the associated collection contains up to 128 events (which include document creation, updates, and deletions). When an index contains all of a collection’s documents, including each document’s events, it is an "active" index.

注意1
インデックスが作成されると、関連付けられたコレクションに最大128のイベント（ドキュメントの作成、更新、削除を含む）が含まれている場合、ドキュメントはすぐにインデックスに登録されます。インデックスに、各ドキュメントのイベントを含むコレクションのすべてのドキュメントが含まれている場合、それは「アクティブな」インデックスです。

For collections with more than 128 events (which include document creation, updates, and deletions), or those that use a wildcard in their [`source`](#source) definition, indexing is handled by a background task, and you may have to wait a short period before the index returns values. Until the indexing task is complete, the index is an "inactive" index.

注意2
128を超えるイベント（ドキュメントの作成、更新、削除を含む）を含むコレクション、またはsource定義にワイルドカードを使用するコレクションの場合 、インデックス作成はバックグラウンドタスクによって処理されるため、インデックスが返されるまでに少し待つ必要があります。値。インデックス作成タスクが完了するまで、インデックスは「非アクティブ」インデックスです。

To check whether an index is "active", run the following query (replacing `index_name` with the name of the index that you want to check):

注意3
インデックスが「アクティブ」であるかどうかを確認するには、次のクエリを実行します（index_name確認するインデックスの名前に置き換えます）。

shell

```fql
Select("active", Get(Index("index_name")))
```

If you see `true` in the output, the index is "active" and is ready for your queries. Otherwise, you should wait and check again later, until `true` appears in the output.

注意4
出力に `true` が表示されていれば、インデックスは「アクティブ」であり、クエリの準備ができています。そうでない場合は、出力に `true` が表示されるまで待って、後でもう一度確認する必要があります。

The following query creates an index for the collection "spells" with the name "new-index":

次のクエリは、「new-index」という名前のコレクション「spells」のインデックスを作成します。

```javascript
client.query(
  q.CreateIndex({
    name: 'new-index',
    source: q.Collection('spells'),
  })
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: Index("new-index"),
  ts: 1591996190530000,
  active: true,
  serialized: true,
  name: 'new-index',
  source: Collection("spells"),
  partitions: 8
}
```

## [](#modifications)Modifying index documents

インデックスドキュメントの変更

It is possible to rename an index by updating its `name` field. Renaming an index changes its Reference, but preserves inbound References to the index. Index data is not rebuilt.

nameフィールドを更新することで、インデックスの名前を変更できます。インデックスの名前を変更すると、参照、ただし、インデックスへのインバウンド参照は保持されます。インデックスデータは再構築されません。

An index’s `terms` and `values` fields may not be changed. If you require such a change, the existing index must be deleted and a new one created using the new definitions for `terms` and/or \`values.

インデックスtermsとvaluesフィールドは変更できません。このような変更が必要な場合は、既存のインデックスを削除し、terms値や値の新しい定義を使用して新しいインデックスを作成する必要があります。

If you update the `unique` field, existing duplicate items are not removed from the index.

uniqueフィールドを更新しても、既存の重複アイテムはインデックスから削除されません。

When an index is deleted, it becomes inaccessible, and its data is deleted asynchronously.

インデックスが削除されると、インデックスにアクセスできなくなり、そのデータは非同期的に削除されます。

## [](#read)Reading indexes

インデックスの読み取り

Entries in an index have zero or more [_terms_](#term), and zero or more [_values_](#value).

インデックスのエントリには、0個以上の用語と0個以上の 値があります。

Entries are partitioned into sets by their defined `terms` fields, which is a strategy to improve index performance. Within each set, entries are sorted by their defined `values` fields.

エントリは、定義されたtermsフィールドによってセットに分割されます。これは、インデックスのパフォーマンスを向上させるための戦略です。各セット内で、エントリは定義されたvaluesフィールドでソートされます。

The [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function is used to refer to a set of entries within an index:

このMatch関数は、インデックス内の一連のエントリを参照するために使用されます。

```javascript
client.query(
  q.Match(
    q.Index('spells_by_element_and_name'),
    ['fire', 'Fire Beak'],
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element_and_name"), ["fire", "Fire Beak"])
```

If the index is configured to index multiple terms (also called a _compound index_), `Match` should be passed an [Array](https://docs.fauna.com/fauna/current/api/fql/types#array) having the required number of term values:

インデックスが複数の用語をインデックスするように設定されている場合（_compound index_とも呼ばれる）、`Match`には必要な数の用語値を持つ[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)を渡す必要があります。

```javascript
client.query(
  q.Match(
    q.Index('spells_by_element_and_name'),
    ['fire', 'Fire Beak'],
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element_and_name"), ["fire", "Fire Beak"])
```

Or conversely, if the index is configured with no terms, then only the index Reference needs be provided:

また逆に、インデックスが用語なしで構成されている場合は、インデックスReferenceのみを提供する必要があります。

```javascript
client.query(
  q.Match(q.Index('all_stores'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("all_stores"))
```

Index terms are always scalar values, and `Match` interprets Arrays as tuples. For single-term indexes, the following expressions are equivalent:

インデックス用語は常にスカラー値であり、Match配列をタプルとして解釈します。単一用語インデックスの場合、次の式は同等です。

```javascript
client.query(
  q.Match(
    q.Index('spells_by_element_and_name'),
    ['fire', 'Fire Beak'],
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element_and_name"), ["fire", "Fire Beak"])
```

```javascript
client.query(
  q.Match(q.Index('spells_by_element'), ['fire'])
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element"), "fire")
```

## [](#order)Ordering

注文

Results from indexes are sorted lexically according to their type. The primary sort is based on the first field defined in the index’s `values` field. Results are sub-sorted according to each subsequent `values` field (if any), in turn.

インデックスからの結果は、タイプに従って字句的にソートされます。プライマリソートは、インデックスのvaluesフィールドで定義された最初のフィールドに基づいてい ます。結果は、後続の各valuesフィールド（存在する場合）に従って 順番にサブソートされます。

インデックスからの結果は、そのタイプに応じてレキシカルにソートされます。主なソートは、インデックスの `values` フィールドで定義された最初のフィールドに基づいて行われます。結果は、それに続く各 `values` フィールド（もしあれば）に基づいて、順にサブソートされます。

[String](https://docs.fauna.com/fauna/current/api/fql/types#string)s and [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s sort using their natural order, while [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)s and [Object](https://docs.fauna.com/fauna/current/api/fql/types#object)s sort according to their contents. For example, `{ "name": "Hen Wen" }` appears after `{ }`, and `{ "age": 110 }`.

文字列](https://docs.fauna.com/fauna/current/api/fql/types#string)と[数字](https://docs.fauna.com/fauna/current/api/fql/types#number)は自然な順序でソートされ、[配列](https://docs.fauna.com/fauna/current/api/fql/types#array)と[オブジェクト](https://docs.fauna.com/fauna/current/api/fql/types#object)はその内容に応じてソートされます。例えば、`{ "name": "Hen Wen" }` は `{ }` の後に表示され、`{ "age": 110 }`.

When no `values` fields are defined, the index is sorted by each indexed document’s reference.

valuesフィールドが定義されていない場合、インデックスはインデックス付きドキュメントの参照ごとに並べ替えられます。

Documents may have different types of field values in the same field, or a document may be missing a field entirely. An index sorts values in this order: [Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s, [String](https://docs.fauna.com/fauna/current/api/fql/types#string)s, [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s, [Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)s, [Date](https://docs.fauna.com/fauna/current/api/fql/types#date)s, [Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)s, [Null](https://docs.fauna.com/fauna/current/api/fql/types#null)s. Note that [Object](https://docs.fauna.com/fauna/current/api/fql/types#object)s and [Array](https://docs.fauna.com/fauna/current/api/fql/types#array)s are not indexed, although the fields of an object can be indexed.

ドキュメントでは、同じフィールドに異なるタイプのフィールド値が含まれていたり、ドキュメントではフィールドが完全に欠けていたりすることがあります。インデックスは、次の順序で値をソートします。Number](https://docs.fauna.com/fauna/current/api/fql/types#number)s、[String](https://docs.fauna.com/fauna/current/api/fql/types#string)s、[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s、[Timestamp](https://docs.fauna.com/fauna/current/api/fql/types#timestamp)s、[Date](https://docs.fauna.com/fauna/current/api/fql/types#date)s、[Boolean](https://docs.fauna.com/fauna/current/api/fql/types#boolean)s、[Null](https://docs.fauna.com/fauna/current/api/fql/types#null)sです。なお、[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)sおよび[Array](https://docs.fauna.com/fauna/current/api/fql/types#array)sにはインデックスを付けることはできませんが、オブジェクトのフィールドにはインデックスを付けることができます。

The default sort order may be reversed on a per-field basis using the `reverse` flag in the index configuration.

デフォルトのソート順はreverse、インデックス構成のフラグを使用して、フィールドごとに逆にすることが できます。

