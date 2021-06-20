Bindings | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/indexes/bindings

# Bindings

バインディング

An index _binding_ is a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function that computes the value for a field in a document while the document is being indexed. Once defined, the binding can be applied to the index’s `terms` field, which allows you to search for computed values, or to the index’s `value` field, which allows you to return computed values for index matches.

インデックスの _binding_ は [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) 関数で、ドキュメントがインデックス化されている間に、ドキュメント内のフィールドの値を計算します。いったん定義されると、バインディングはインデックスの `terms` フィールドに適用することができ、これによって計算された値を検索することができます。また、インデックスの `value` フィールドに適用することができ、これによってインデックスのマッチに対して計算された値を返すことができます。

For example, the documents that we are indexing might include a timestamp. We might want to be able to search for documents by date, or we might want to return the day of week for index matches.

例えば、インデックスを作成しているドキュメントにタイムスタンプが含まれているとします。ドキュメントを日付で検索できるようにしたい場合や、インデックスのマッチに対して曜日を返したい場合などがあります。

Bindings must be _pure_ Lambda functions: they are not allowed to perform reads or writes. They are provided with a copy of the document to be indexed and must perform their operation on the document’s values.

バインディングは純粋なLambda関数でなければならず、読み取りや書き込みを行うことはできません。これらの関数は、インデックス化されるドキュメントのコピーを提供され、ドキュメントの値に対して操作を行わなければなりません。

Functions that **cannot** be used in bindings include:

バインディングで**使えない**関数には、次のようなものがあります。

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

This tutorial demonstrates how to:

このチュートリアルでは、以下の方法を紹介しています。

-   [Create and use a binding](#create)
-   [Search for empty fields](#empty)

This tutorial assumes that you have successfully [prepared](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation) your database by creating the necessary collections and documents.

このチュートリアルでは、必要なコレクションやドキュメントを作成し、データベースの[準備](https://docs.fauna.com/fauna/current/tutorials/indexes/#preparation)が完了していることを前提としています。

Let’s get started!

では、早速始めましょう。

## [](#create)Create and use a binding

バインディングの作成と使用

An index’s `source` field defines one or more collections that should be indexed. It is also used to define zero or more fields that have associated binding functions. The binding functions compute the value for the specified field while the document is being indexed.

インデックスの`source`フィールドでは、インデックスを作成する1つ以上のコレクションを定義します。このフィールドは、関連するバインディング関数を持つ0個以上のフィールドを定義するためにも使われます。バインディング関数は、ドキュメントがインデックス化されている間に、指定されたフィールドの値を計算します。

Once a binding is defined, it must be used at least once in either the index’s `terms` or `values` fields, or an error occurs: a binding definition without use would cause unnecessary computation.

いったんバインディングが定義されると、インデックスの `terms` や `values` フィールドのいずれかで少なくとも一度は使われなければならず、そうでなければエラーになります。

Let’s create an index for the `People` collection (that we [created previously](https://docs.fauna.com/fauna/current/tutorials/indexes/)) that specifies a binding function. Our binding function calculates the "rolodex letter" for each person, which is the first letter of their last name.

それでは、（以前に作成した）`People`コレクションに対して、バインディング関数を指定したインデックスを作成してみましょう（https://docs.fauna.com/fauna/current/tutorials/indexes/）。このバインディング関数は、各人の「名簿の文字」を計算しますが、それは名字の最初の文字です。

shell

```shell
CreateIndex({
  name: "people_by_rolodex",
  source: {
    collection: Collection("People"),
    fields: {
      rolodex: Query(
        Lambda(
          "doc",
          SubString(Select(["data", "last"], Var("doc")), 0, 1)
        )
      )
    }
  },
  terms: [ { binding: "rolodex" }],
  values: [
    { binding: "rolodex" },
    { field: ["data", "last"] },
    { field: ["ref"] }
  ]
})
```

The highlights of this query:

このクエリのハイライトです。

-   The index is called `people_by_rolodex`.
-   The `source` field specifies that:
    -   Documents within the `People` collection should be indexed.
    -   The field `rolodex` (which does not have to exist in any document in the collection) has a Lambda function,
    -   The [`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query) function defers execution of the Lambda function until a document needs to be indexed.
    -   The Lambda function itself accepts the current document as a variable called `doc`. Then it returns the first letter of the document’s `last` field using the [`SubString`](https://docs.fauna.com/fauna/current/api/fql/functions/substring) function. The [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function is used to extract the `last` field from the document.
-   The `terms` field specifies that the `rolodex` binding’s result is to be used for searching this index.
-   The `values` field specifies that the `rolodex` binding’s result is to be included for index matches, along with the document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref).

---

- このインデックスは `people_by_rolodex` と呼ばれています。
- source`フィールドでは以下のように指定します。
    - コレクション `People` 内のドキュメントをインデックス化します。
    - フィールド `rolodex` (コレクション内のどのドキュメントにも存在する必要はありません) にはラムダ関数があります。
    - [`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)関数は、ドキュメントのインデックス化が必要になるまで、ラムダ関数の実行を延期します。
    - ラムダ関数自体は、現在のドキュメントを `doc` という変数として受け取ります。そして、[`SubString`](https://docs.fauna.com/fauna/current/api/fql/functions/substring)関数を使って、ドキュメントの`last`フィールドの最初の文字を返します。Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)関数は，ドキュメントから `last` フィールドを抽出するために使用されます．
- terms` フィールドは、`rolodex` バインディングの結果をこのインデックスの検索に使用することを指定します。
- values` フィールドは、`rolodex` バインディングの結果を、ドキュメントの [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) と一緒に、インデックスのマッチに含めることを指定します。

When you run this query, the output should be similar to:

このクエリを実行すると、以下のような出力が得られるはずです。

```javascript
{ ref: Index("people_by_rolodex"),
  ts: 1580948872710000,
  active: true,
  serialized: true,
  name: 'people_by_rolodex',
  source:
   { collection: Collection("People"),
     fields:
      { rolodex:
         Query(Lambda("doc", Substring(Select(["data", "last"], Var("doc")), 0, 1))) } },
  terms: [ { binding: 'rolodex' } ],
  values:
   [ { binding: 'rolodex' },
     { field: [ 'data', 'last' ] },
     { field: [ 'ref' ] } ],
  partitions: 1 }
```

Now we can find people by their "rolodex letter". Copy the following query, paste it into the Shell, and run it:

これで、「ロロデックス・レター」で人を探せるようになりました。以下のクエリをコピーしてシェルに貼り付け、実行してみてください。

shell

```shell
Paginate(Match(Index("people_by_rolodex"), "C"))
```

The output should be similar to:

出力は以下のようになります。

```javascript
{
  data: [
    ["C", "Cook", Ref(Collection("People"), "239535822978682381")],
    ["C", "Cook", Ref(Collection("People"), "239535822978684429")]
  ]
}
```

## [](#empty)Search for empty fields

空のフィールドの検索

One specific use of bindings that you might find to be very useful is to locate empty fields. Fauna does not store empty fields, and you cannot directly use `null` with the [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function.

バインディングの具体的な使い方として、空のフィールドを探すのに非常に便利だと思われます。Fauna は空のフィールドを保存しませんので、[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) 関数で `null` を直接使うことはできません。

For example, with the following index:

たとえば、次のようなインデックスがあるとします。

shell

```shell
CreateIndex({
  name: "people_by_letter",
  source: Collection("People"),
  terms: [ { field: ["data", "letter"] } ]
})
```

We can search for people by letter:

文字で人を検索することができます。

shell

```shell
Paginate(Match(Index("people_by_letter"), "A"))
```

```javascript
{ data: [ Ref(Collection("People"), "240166254282805769") ] }
```

However, we cannot search for empty values using this index:

ただし、このインデックスを使って空の値を検索することはできません。

shell

```shell
Paginate(Match(Index("people_by_letter"), null))
```

```javascript
{ data: [] }
```

Why does this happen? When we pass `null` to the [`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match) function, the query compares the indexed field values to `null`. A field that is not set has no value at all, whereas `null` is a value: the two don’t match. Alternately, if we do not pass a value to `Match`, there is an empty comparison value to compare with the index’s `terms` fields. Since none of the indexed entries is lacking a `terms` field, none of the indexed entries matches the empty comparison value.

なぜこのようなことが起こるのでしょうか。[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)関数に`null`を渡すと、クエリはインデックス化されたフィールドの値と`null`を比較します。設定されていないフィールドには何の値もありませんが，`null` には値があるので，両者は一致しません．あるいは、`Match` に値を渡さない場合は、インデックスの `terms` フィールドと比較する比較値は空になります。インデックス化されたエントリの中に `terms` フィールドがないものはないので、空の比較値にマッチするものはありません。

Instead, we can create a binding that tells us when a field is unset:

代わりに、フィールドが設定されていないときに教えてくれるバインディングを作成することができます。

shell

```shell
CreateIndex({
  name: "people_by_null_letter",
  source: [{
    collection: Collection("People"),
    fields: {
      null_letter: Query(
        Lambda(
          "doc",
          Equals(Select(["data", "letter"], Var("doc"), null), null)
        )
      )
    }
  }],
  terms: [ {binding: "null_letter"} ],
})
```

The highlights for this query:

このクエリのハイライトです。

-   The index is named `people_by_null_letter`.
-   The `source` is the `People` collection.
-   A binding for the field `null_letter` is defined.
-   The binding function:
    -   Accepts the indexed document in the `doc` variable.
    -   Uses the [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) function to pull out the `letter` field, and to use `null` as the default value is the field is unset.
    -   Uses the [`Equals`](https://docs.fauna.com/fauna/current/api/fql/functions/equals) function to compare the value of the `letter` field with `null`. The result of calling this function is the implicit return value for the binding function, and that value is either `true` or `false`.
-   The `terms` field specifies the binding function’s return value as a search term.

---

- インデックスの名前は `people_by_null_letter` です。
- ソース "は `People` コレクションです。
- フィールド `null_letter` に対するバインディングが定義されています。
- バインディング関数は
    - インデックス付きのドキュメントを `doc` 変数で受け取ります。
    - Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) 関数を使用して `letter` フィールドを取り出し、フィールドが設定されていない場合には `null` をデフォルト値として使用します。
    - Equals`](https://docs.fauna.com/fauna/current/api/fql/functions/equals)関数を使用して、`letter`フィールドの値と`null`を比較します。この関数を呼び出した結果は、バインディング関数の暗黙の戻り値となり、その値は `true` か `false` のどちらかです。
- また，`terms`フィールドでは，バインディング関数の戻り値を検索語として指定します．

With this index in place, we can now search for `People` documents that have unset `letter` fields:

このインデックスができたことで、設定されていない `letter` フィールドを持つ `People` ドキュメントを検索できるようになりました。

shell

```shell
Map(
  Paginate(Match(Index("people_by_null_letter"), true)),
  Lambda("X", Get(Var("X")))
)
```

```javascript
{
  data: [
    {
      ref: Ref(Collection("People"), "240166254282803721"),
      ts: 1580867425600000,
      data: {
        first: "Leslie",
        last: "Lamport",
        degrees: ["BS", "MA", "PhD"]
      }
    }
  ]
}
```

## [](#conclusion)Conclusion

結論

This tutorial has demonstrated how to define and use index bindings, which helps us achieve specific kinds of search results.

このチュートリアルでは、特定の種類の検索結果を得るためのインデックスバインディングの定義と使用方法について説明しました。

## [](#next-steps)Next steps

-   [Pagination](https://docs.fauna.com/fauna/current/tutorials/indexes/pagination)
-   [Sort](https://docs.fauna.com/fauna/current/tutorials/indexes/sort)
-   [Search](https://docs.fauna.com/fauna/current/tutorials/indexes/search)
-   [Search and sort](https://docs.fauna.com/fauna/current/tutorials/indexes/search_and_sort)

## [](#related-topics)Related topics

-   [Indexes](https://docs.fauna.com/fauna/current/api/fql/indexes)

