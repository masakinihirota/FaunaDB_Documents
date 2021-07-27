目次

動物相
API リファレンス
FQL
組み込み関数
Join
Join

シェル

Join( source, target )
説明
この Join 関数は、source セットのタプルを target。と結合し ます。target 次のいずれかになります。

インデックスリファレンス。

source セットのタプルが反復される、との暗黙の Match 呼び出しはに対して各タプルのために作られ target たインデックスの terms。結果の和集合が返されます。

Lambda 機能。

source セットのタプルを繰り返すと、関数に渡されます。この関数は、各タプルの処理方法を決定します。結果の和集合が返されます。

Lambda 関数がでなければならない、純粋な、すなわち、それは、任意の読み取りや書き込みを加えることはできません。

いずれの場合も、source セットのタプルがの数とタイプと一致しない場合、target エラーが発生します。

パラメーター
口論 タイプ 定義と要件
source

参照を設定

結合操作のソースセット 参照。

target

インデックス参照または Lambda 関数

インデックス参照して参加する source セット ・リファレンス、または Lambda 結合操作を実行する方法を決定する機能。

戻り値
結合操作の結果を結合するための参照の設定 。

例
The following query joins the "spellbooks" documents for a specific owner with the "spells_by_spellbook" index, which reports the spells for each spellbook, answering the question "what spells can this owner cast?":

SHELL

Map(
Paginate(
Join(
Match(
Index('spellbooks_by_owner'),
Ref(Collection('characters'), '181388642114077184')
),
Index('spells_by_spellbook'),
)
),
Lambda("ref", Get(Var("ref")))
)
{
data: [
{
ref: Ref(Collection("spells"), "181388642046968320"),
ts: 1626225336060000,
data: {
name: 'Fire Beak',
element: [ 'air', 'fire' ],
spellbook: Ref(Collection("spellbooks"), "181388642139243008")
}
},
{
ref: Ref(Collection("spells"), "181388642071085568"),
ts: 1626225336060000,
data: {
name: "Water Dragon's Claw",
element: [ 'water', 'fire' ],
spellbook: Ref(Collection("spellbooks"), "181388642139243008")
}
}
]
}
The following query joins the "spellbooks" documents for a specific owner with a Lambda function, which performs the equivalent "spells_by_spellbook" lookup as the previous query example:

SHELL

Paginate(
Join(
Match(
Index('products_by_store'),
Ref(Collection('stores'), '301'),
),
Lambda(
['name', 'description', 'price'],
Match(Index('inventory_by_product'), Var('name'))
)
)
)
{
data: [
[
1000,
'Conventional Hass, 4ct bag',
Ref(Collection("products"), "204")
],
[ 1000, 'Conventional, 1 ct', Ref(Collection("products"), "205") ],
[ 100, 'Organic, 1 bunch', Ref(Collection("products"), "208") ],
[ 50, 'Organic, 16 oz bag', Ref(Collection("products"), "206") ],
[
30,
'Conventional, 16 oz bag',
Ref(Collection("products"), "207")
]
]
}
The following query uses the Lambda variant of Join to answer the question "What are the inventory levels for the products in a particular store?".

This question cannot be directly answered using the index variant of Join because the "products_by_store" index returns each product’s name, description, and price, and the "inventory_by_product" index uses only the product’s name in its terms definition (a mismatch in tuple sizes). The Lambda function calls Match with just the name value to resolve the mismatch:

SHELL

Paginate(
Join(
Match(
Index('products_by_store'),
Ref(Collection('stores'), '301'),
),
Lambda(
['name', 'description', 'price'],
Match(Index('inventory_by_product'), Var('name'))
)
)
)
{
data: [
[
1000,
'Conventional Hass, 4ct bag',
Ref(Collection("products"), "204")
],
[ 1000, 'Conventional, 1 ct', Ref(Collection("products"), "205") ],
[ 100, 'Organic, 1 bunch', Ref(Collection("products"), "208") ],
[ 50, 'Organic, 16 oz bag', Ref(Collection("products"), "206") ],
[
30,
'Conventional, 16 oz bag',
Ref(Collection("products"), "207")
]
]
}
The run time of Join is dependent on the number of elements in the underlying set or page — it’s linear, or O(n). For very large sets or pages, executing Join might result in a query timeout error, or "width" error.

クエリの「幅」エラーの場合、基になるセットまたはページには 10 万を超えるアイテムが含まれます。これは、などの集合関数を使用する場合に発生する可能性があります。この場合 Difference、Join 評価する集合を生成するために 10 万を超える項目を考慮する必要があります。これを解決するには、を使用 Paginate してセットまたはページサイズを制限します。

たとえば、次の代わりに：

シェル

Join(
Difference(
Match(Index("Index1"), "term1"),
Match(Index("Index2"), "term2")
),
Index("Index3")
)
使用する：

シェル

Join(
Paginate(
Difference(
Match(Index("Index1"), "term1"),
Match(Index("Index2"), "term2")
),
{ size: 10000 }
),
Index("Index3")
)
これは、正しい結果に到達するためにセット全体を評価する必要がある場合、結果をページングする必要があることを意味し Paginate ます。

クエリタイムアウトエラーの場合、使用しているドライバを介して、より大きなクエリタイムアウトを指定できます 。

この記事は役に立ちましたか？

番号 はい
IsToken
KeyFromSecret
Copyright©2018–2021 Fauna、Inc。
ドキュメントをダウンロード
利用規約 プライバシーポリシー ？↑
