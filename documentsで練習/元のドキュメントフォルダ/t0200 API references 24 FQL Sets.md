Sets | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/sets?lang=javascript

# Sets

セット

Sets are sorted groups of tuples. An index derives sets from documents within the collections in its source. As documents are created, modified, and deleted, sets are updated to reflect their documents' current state.

セットは、タプルのソートされたグループです。インデックスは、ソース内のコレクション内のドキュメントからセットを派生させます。ドキュメントが作成、変更、および削除されると、セットはドキュメントの現在の状態を反映するように更新されます。

Indexes are groups of sets, each of which has a natural key; a tuple of zero or more _terms_. The `Match` query function constructs a _set ref_ to identify a set for a given tuple of terms within an index:

インデックスはセットのグループであり、各セットは自然のキー（0個以上の _term_ のタプル）を持っています。問い合わせ関数 `Match` は、インデックス内の指定された用語のタプルに対応するセットを特定するために _set ref_ を構築します。

```javascript
client.query(
  q.Match(q.Index('spells_by_element'), 'water')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element"), "water")
```

Set refs are unique according to their structure: Two set refs with the same structure refer to the same set within a database. Query functions such as `Union`, `Intersection`, and `Join` allow the construction of more complex logical set identifiers:

セット参照は、その構造に応じて固有のものです。同じ構造を持つ2つのセットリフは，データベース内の同じセットを参照します．`ユニオン`、`インターセクション`、`ジョイン`といった問い合わせ関数を使うと、より複雑な論理集合の識別子を作成することができます。

```javascript
client.query(
  q.Intersection(
    q.Match(q.Index('spells_by_element'), 'water'),
    q.Match(q.Index('spells_by_element'), 'fire'),
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Intersection(Match(Index("spells_by_element"), "water"), Match(Index("spells_by_element"), "fire"))
```

The `Paginate` function is used to retrieve the tuples of a set. The Page object returned by `Paginate` contains an array of tuples and cursors for moving forward or backward within the set.

集合のタプルを取り出すには、`Paginate`関数を用いる。`Paginate`が返すPageオブジェクトには、タプルの配列と、セット内を前後に移動するためのカーソルが含まれます。

|Field|Type|Definition and Requirements|
|--|--|--|
|`data`|Array|The elements in the page.|
|`after`|Cursor|The cursor for the next page, inclusive. Optional.|
|`before`|Cursor|The cursor for the previous page, exclusive. Optional.|

|Field|Type|定義と要件|
|--|--|--|
|`data`|Array|ページ内の要素。|
|`after`|Cursor|次のページのカーソル。オプション。|
|`before`|Cursor|前のページのカーソル、排他的。オプション。|

Pages can be further manipulated using collection-oriented functions such as `Map` and `Filter`, or individual elements can be extracted using `select`.

ページは `Map` や `Filter` といったコレクション指向の関数を使ってさらに操作することができますし、`select` を使って個々の要素を抽出することもできます。

## [](#functions-that-operate-on-sets)Functions that operate on sets

セットを操作する関数

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns the set of items in one set that are missing from additional sets.

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns the set of distinct items within a set.

[`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)

Returns the set of events describing the history of a set or document.

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from a set.

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns the set of items that exist in all sets.

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

[`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join)

Combines the items in a set with set’s indexed values.

[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)

Returns the set of items that match search terms.

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

[`Range`](https://docs.fauna.com/fauna/current/api/fql/functions/range)

Returns a subset of a set, in the specified range.

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in a set.

[`Singleton`](https://docs.fauna.com/fauna/current/api/fql/functions/singleton)

Returns a single-item set containing the provided document reference.

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns a set that combines the items in multiple sets.

|関数|説明|
|--|--|
|All|提供されたすべての値が真であるかどうかをテストします。|
|Any|提供された値のいずれかが真であるかどうかをテストします。|
|Count|配列またはセット内のアイテムをカウントします。|
|Difference|追加のセットから欠落している1つのセット内のアイテムのセットを返します。|
|Distinct|セット内の個別のアイテムのセットを返します。|
|Events|セットまたはドキュメントの履歴を説明するイベントのセットを返します。|
|Filter|セットから特定のアイテムを取得します。|
|Intersection|すべてのセットに存在するアイテムのセットを返します。|
|IsEmpty|配列またはセットが空かどうかをテストします。|
|IsNonEmpty|配列またはセットにアイテムが含まれているかどうかをテストします。|
|Join|セット内のアイテムをセットのインデックス値と組み合わせます。|
|Match|検索語に一致するアイテムのセットを返します。|
|Max|数値のリストで最大の値を返します。|
|Mean|配列またはセット内のアイテムの平均値を返します。|
|Min|数値のリストの中で最小の値を返します。|
|Range|指定された範囲内のセットのサブセットを返します。|
|Reduce|ラムダ関数を使用して、配列を縮小するか、結果に設定します。|
|Reverse|セット内のアイテムの順序を逆にします。|
|Singleton|指定されたドキュメント参照を含む単一アイテムセットを返します。|
|Sum|配列またはセット内のアイテムを合計します。|
|Union|複数のセットのアイテムを組み合わせたセットを返します。|

