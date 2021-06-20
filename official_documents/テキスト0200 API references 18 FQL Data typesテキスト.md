Data types | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript

JSONのすべてのスカラー型がサポートされています。

ブール値
数値
文字列
配列
オブジェクト

ブール値
{ my_boolean: true }

Null 
データ値が存在しないことを示すために
使用される特別なマーカーです。
これは、
欠落している情報の表現であり、
値がないことを示しています。

{ my_null: null }

数値
long int
64 ビットの符号付き 2 の補数整数
または
double
64 ビットの倍精度浮動小数点値

重要

JavaScriptは、整数と浮動小数点数を区別せず、
数値を内部的に浮動小数点数として格納し、
多くのコンテキストで整数として扱います。

クライアントアプリケーションに
JavaScriptが含まれている場合、
またはWebシェルまたは
fauna-shell(どちらもJavaScriptで実装されている)
を使用しており、
クエリが整数と浮動小数点数の区別に依存している場合は、
必要に応じて

変換関数
ToDouble
と
ToInteger
を必ず使用してください。

数値を操作する関数:

Abs			数値の絶対値を返します。
Acos		数値のアーク コサインを返します。
Add			1 つ以上の数値の合計を返します。
Asin		数値のアークサインを返します。
Atan		数値のアークタンジェントを返します。
BitAnd		1 つ以上の数値のビットごとの AND を返します。
BitNot		1 つ以上の数値のビットごとの AND を返します。
BitOr		1 つ以上の数値のビットごとの OR を返します。
BitXor		1 つ以上の数値のビットごとの排他的論理和を返します。
Ceil			数値以上の整数を返します。
Cos			数値の余弦を返します。
Cosh		数値の双曲線余弦を返します。
Count		配列またはセット内のアイテムをカウントします。
Degrees	数値をラジアンから度に変換します。
Divide		2 つ以上の数値の商を返します。
Exp			eをべき乗して返します。
Floor		数値以下の整数を返します。
Hypot		他の 2 辺の長さを指定して、直角三角形の斜辺の長さを返します。
Ln			数値の自然対数 (底e ) を返します。
Log			数値の自然対数 (10 を底とする) を返します。
Max		数値のリスト内の最大値を返します。
Mean		配列またはセット内のアイテムの平均値を返します。
Min			数値のリストの最小値を返します。
Modulo		数値のリストを除算した余りを返します。
Multiply		数値のリストの積を返します。
Pow		指数で累乗した数値を返します。
Radians		数値を度からラジアンに変換します。
Round		数値に最も近い整数を返します。
Sign		数値の符号を示す 1、0、または -1 を返します。
Sin			数値のサインを返します。
Sinh		数値の双曲線正弦を返します。
Sqrt		数値の平方根を返します。
Subtract	数値のリストの差を返します。
Sum		配列またはセット内の項目を合計します。
Tan			数値のタンジェントを返します。
Tanh		数値の双曲線正接を返します。
Trunc		指定された小数点以下の桁数で数値を切り捨てます。

文字列
UTF-8 でエンコードされた文字列

文字列関数の場合、
オフセットと長さを利用する引数または戻り値は、
コードポイントを使用して動作します。

Glossary of Unicode Terms
Glossary
http://unicode.org/glossary/#code_point

Code Point.
(1)
Any value in the Unicode codespace;
that is,
the range of integers from 0 to 10FFFF16.
(See definition D10 in Section 3.4,
Characters and Encoding.) Not all code points are assigned to encoded characters.
See code point type.

(2)
A value,
or position,
for a character,
in any coded character set.

コードポイント。
(1)
Unicodeコードスペース内の任意の値、
つまり0から10FFFF16までの整数の範囲。
すべてのコードポイントがエンコードされた文字に
割り当てられるわけではない。
コードポイントタイプを参照。
(2)
符号化された文字セットにおける、
文字の値または位置。

Code Point Type.
Any of the seven fundamental classes of code points in the standard: Graphic,
Format,
Control,
Private-Use,
Surrogate,
Noncharacter,
Reserved.

コードポイントタイプ。
標準規格のコードポイントの7つの基本クラスのいずれか。
Graphic（グラフィック）
Format（フォーマット）
Control（コントロール）
Private-Use（プライベートユース）
Surrogate（サロゲート）
Noncharacter（ノンキャラクター）
Reserved（リザーブ）
。

文字列を操作する関数:

Casefold		文字列を大文字と小文字を区別した文字列に変換します。
Concat			文字列のリストを 1 つの文字列に結合します。
ContainsStr		文字列に特定の文字列が含まれているかどうかをテストします。
ContainsStrRegex	文字列に特定のパターンが含まれているかどうかをテストします。
EndsWith		文字列が特定の文字列で終わるかどうかをテストします。
FindStr			文字列内の文字列を検索します。
FindStrRegex	文字列内の正規表現パターンを検索します。
Format			フォーマット指定子の文字列に従って、引数を文字列としてフォーマットします。
LTrim			文字列の先頭からすべての空白を削除します。
Length			文字列の長さをコードポイントで返します。
LowerCase		文字列をすべて小文字に変換します。
RTrim			文字列の末尾からすべての空白を削除します。
RegexEscape	入力文字列に完全に一致する正規表現を作成します。
Repeat			文字列を複数回繰り返すことにより、新しい文字列を作成します。
ReplaceStr		文字列の一部を別の文字列に置き換えます。
ReplaceStrRegex	文字列内のパターンを別の文字列に置き換えます。
Space			指定されたサイズの空白文字列を作成します。
StartsWith		文字列が特定の文字列で始まるかどうかをテストします。
SubString		文字列の一部を返します。
TitleCase		TitleCase を使用するように文字列を変換します。
Trim			文字列の最初と最後からすべての空白を削除します。
UpperCase		文字列をすべて大文字に変換します。

リテラル
true, false   // Boolean
1, 2          // Number
3.4, 1.2e10   // Number
"a", "b"      // String
null          // Null

配列
client.query(
  [1, 2, q.Concat(['Hen ', 'Wen'])]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
[ 1, 2, 'Hen Wen' ]

配列を操作する関数:
All			提供されたすべての値が true であるかどうかをテストします。
Any			提供された値のいずれかが true かどうかをテストします。
Append		配列の最後に項目を追加します。
Count		配列またはセット内のアイテムをカウントします。
Difference	追加の配列にない項目の配列を 1 つの配列で返します。
Distinct		複数の配列内の個別の項目の配列を返します。
Drop		配列の先頭から項目を削除します。
Filter		配列から特定のアイテムを取得します。
Foreach	配列アイテムを反復します。
Intersection		すべての配列に存在するアイテムの配列を返します。
IsEmpty	配列またはセットが空かどうかをテストします。
IsNonEmpty		配列またはセットに項目が含まれているかどうかをテストします。
Map		すべての配列項目に関数を適用します。
Max		数値のリスト内の最大値を返します。
Mean		配列またはセット内のアイテムの平均値を返します。
Min			数値のリストの最小値を返します。
Prepend	配列の先頭に項目を追加します。
Reduce		配列を縮小するか、ラムダ関数を介して結果に設定します。
Reverse	配列内の項目の順序を逆にします。
Select		ドキュメントから特定のフィールド値を取得します。
Sum		配列またはセット内の項目を合計します。
Take		配列の先頭から項目を取得します。
ToObject	配列をオブジェクトに変換します。
Union		複数の配列の項目を組み合わせた配列を返します。

オブジェクト

client.query(
  { name: 'Hen Wen', age: q.Add(100, 10) }
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
{ name: 'Hen Wen', age: 110 }

キーと値のペアのコレクションです。
キーは文字列である必要があります。
値は有効な FQL データ型である必要があります。

オブジェクトを操作する関数:

Merge		オプションのリゾルバー ラムダを使用して、
			2 つのオブジェクトを 1 つにマージします。
Select		ドキュメントから特定のフィールド値を取得します。
ToArray	オブジェクトを配列に変換します。

特殊なタイプ

バイト
client.query(
  new Uint8Array([0x1, 0x2, 0x3])
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Bytes("AQID")

日付

関連付けられたタイム ゾーンを持たない日付

client.query(
  q.Date('1970-01-01')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Date("1970-01-01")

時間または日付を操作する関数:
Date			ISO-8601 文字列を日付に変換します。
DayOfMonth	タイムスタンプから日を返します。
DayOfWeek		タイムスタンプから曜日を返します。
DayOfYear		タイムスタンプから年間通算日を返します。
Epoch			1970-01-01 以降のオフセットからタイムスタンプを作成します (秒、ミリ秒、マイクロ秒、またはナノ秒)。
Hour			タイムスタンプから時間を返します。
Minute			タイムスタンプから分を返します。
Month			タイムスタンプから月を返します。
Now			現在のトランザクション時間を表すタイムスタンプを返します。
Second			タイムスタンプから秒を返します。
Time			nowまたは ISO-8601 文字列をタイムスタンプに変換します。
TimeAdd		提供されたタイムスタンプ/日付にオフセットを追加します。
TimeDiff		指定された単位で、2 つのタイムスタンプ/日付の差を返します。
TimeSubtract	提供されたタイムスタンプ/日付からオフセットを減算します。
Year			タイムスタンプから年を返します。

ページ
AにPageは、
結果とその他の装飾された要素の配列が含まれます。
結果セット全体が配列に収まらない場合があるため、
他のフィールド(カーソルフィールド)
を使用すると、
結果セットをブロック(本のページのように)
でウォークできます。
カーソルフィールドは、
結果の現在のページの前または後の結果のブロックを取得します。
配列を受け入れる関数にページが渡されると、
ページの配列要素のみが検査または変換されます。
カーソルなどのページの他の要素は影響を受けず、
出力に直接渡されます。

フィールド	タイプ		説明
data		アレイ		ページ内の要素。
after		カーソル	次のページを含むカーソル。オプション。
before		カーソル	前のページのカーソル、排他的。オプション。

ページ上で動作する関数:
All			提供されたすべての値が true であるかどうかをテストします。
Any			提供された値のいずれかが true かどうかをテストします。
Append		配列の最後に項目を追加します。
Count		配列またはセット内のアイテムをカウントします。
Difference	追加の配列にない項目の配列を 1 つの配列で返します。
Distinct		複数の配列内の個別の項目の配列を返します。
Drop		配列の先頭から項目を削除します。
Filter		配列から特定のアイテムを取得します。
Foreach	配列アイテムを反復します。
Intersection		すべての配列に存在するアイテムの配列を返します。
IsEmpty	配列またはセットが空かどうかをテストします。
IsNonEmpty		配列またはセットに項目が含まれているかどうかをテストします。
Map		すべての配列項目に関数を適用します。
Max		数値のリスト内の最大値を返します。
Mean		配列またはセット内のアイテムの平均値を返します。
Min			数値のリストの最小値を返します。
Prepend	配列の先頭に項目を追加します。
Reduce		配列を縮小するか、ラムダ関数を介して結果に設定します。
Reverse	配列内の項目の順序を逆にします。
Select		ドキュメントから特定のフィールド値を取得します。
Sum		配列またはセット内の項目を合計します。
Take		配列の先頭から項目を取得します。
ToObject	配列をオブジェクトに変換します。
Union		複数の配列の項目を組み合わせた配列を返します。

クエリ
クエリ タイプはクエリ式オブジェクトを表し、有効な FQL クエリ式を表します。

参照
参照 type (または単に Ref) は、
特定のデータベース内のドキュメントのリソース参照を示します。

各参照 は、次のもので構成される複合値です

ドキュメントを含むコレクションへの参照: 
ユーザー定義のコレクション、
または次のようなシステムスキーマコレクションのいずれかTokens

ドキュメント ID: 文字列でエンコードされた 64 ビット整数

コレクション参照とドキュメントIDは一緒に、
別個のドキュメントを参照します。
データベース内の2つのドキュメントが同じ参照を共有することはできません。

例
Ref(Collection("users"), "12345")

文書作成時に文書IDを指定しない（Ref関数を使用）
場合は、
合成文書IDが生成されます。
合成ドキュメントIDの生成は、
SnowflakeIDアルゴリズムに基づいています。

参照は、
ドキュメントから抽出された、
または使用して構築することができるCollection、
Database、
Function、
Index、
もしくはRole機能、
または汎用Ref機能。

client.query(
  q.Select('ref', q.Get(q.Collection('spells')))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Collection("spells")

client.query(
  q.Ref(q.Collection('spells'), '1')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Ref(Collection("spells"), "1")

セットする
はセットするtypeはセット識別子を示します。
セットはタプルのグループであり、
通常termsは特定の順序でリソースまたはインデックスを表します。

他の特殊なタイプとは異なり、
セットするFQL構文を使用して宣言または作成することはできません。
セットするFQL関数を介して作成またはアクセスされます。

client.query(
  q.Match(q.Index('spells_by_element'), 'fire')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Match(Index("spells_by_element"), "fire")

集合を操作する関数:
All				提供されたすべての値が true であるかどうかをテストします。
Any				提供された値のいずれかが true かどうかをテストします。
Count			配列またはセット内のアイテムをカウントします。
Difference		追加のセットにないアイテムのセットを 1 つのセットに返します。
Distinct			セット内の異なるアイテムのセットを返します。
Events			セットまたはドキュメントの履歴を説明する一連のイベントを返します。
Filter			セットから特定のアイテムを取得します。
Intersection		すべてのセットに存在するアイテムのセットを返します。
IsEmpty		配列またはセットが空かどうかをテストします。
IsNonEmpty		配列またはセットに項目が含まれているかどうかをテストします。
Join			セット内のアイテムをセットのインデックス値と組み合わせます。
Match			検索語に一致するアイテムのセットを返します。
Max			数値のリスト内の最大値を返します。
Mean			配列またはセット内のアイテムの平均値を返します。
Min				数値のリストの最小値を返します。
Range			指定された範囲内のセットのサブセットを返します。
Reduce			配列を縮小するか、ラムダ関数を介して結果に設定します。
Reverse		セット内のアイテムの順序を逆にします。
Singleton		セットの最初のアイテムを含むセットを返します。
Sum			配列またはセット内の項目を合計します。
Union			複数のセットのアイテムを組み合わせたセットを返します。

タイムスタンプ

Timestampタイプ(通常はと書かれますts)は、
UTCのカレンダーの日付と時刻として表される時刻を格納します。

タイムスタンプはナノ秒の精度を安全に保存できますが、
多くのオペレーティングシステムクロックは
マイクロ秒の精度しか提供しないので注意してください。

タイムスタンプはオフセット付きで挿入できますが、
UTCに変換されます。
オフセットコンポーネントが失われます。

タイムスタンプは-999999999-01-01T00:00:00Z-の
範囲内である必要があります9999-12-31T23:59:59.999999999Z。

ドキュメントのtsフィールドは、
ドキュメントを変更した最新のイベントを表します。

client.query(
  q.Time('1970-01-01T00:00:00Z')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))

実行結果
Time("1970-01-01T00:00:00Z")

時間または日付を操作する関数:
Date			ISO-8601 文字列を日付に変換します。
DayOfMonth	タイムスタンプから日を返します。
DayOfWeek		タイムスタンプから曜日を返します。
DayOfYear		タイムスタンプから年間通算日を返します。
Epoch			1970-01-01 以降のオフセットからタイムスタンプを作成します (秒、ミリ秒、マイクロ秒、またはナノ秒)。
Hour			タイムスタンプから時間を返します。
Minute			タイムスタンプから分を返します。
Month			タイムスタンプから月を返します。
Now			現在のトランザクション時間を表すタイムスタンプを返します。
Second			タイムスタンプから秒を返します。
Time			nowまたは ISO-8601 文字列をタイムスタンプに変換します。
TimeAdd		提供されたタイムスタンプ/日付にオフセットを追加します。
TimeDiff		指定された単位で、2 つのタイムスタンプ/日付の差を返します。
TimeSubtract	提供されたタイムスタンプ/日付からオフセットを減算します。
Year			タイムスタンプから年を返します。

イベント

厳密に言えば、
イベントは型ではありません。
これらは、
すべての作成、
更新、
および削除操作をドキュメントの
タイムライン上でスナップショットとして追跡することにより、
ドキュメントの一時的な履歴をキャプチャするオブジェクトです。
ただし、
それらには共通の構造があります。

資料 イベント
フィールド	値				説明
ref			参照			ドキュメントへの参照。
action		ストリング		「作成」、「更新」または「削除」のいずれかです。
ts			数				イベントが発生した UNIX タイムスタンプをマイクロ秒単位で表す整数値。
data		オブジェクト		アクションによって異なります。

セットする イベント
セットする イベントは、
インデックスを介してページ付けするときに返されるオブジェクトによって表されます。

フィールド		値				説明
ref				参照			ドキュメントへの参照。
action			ストリング		どちらかaddまたはremove。
ts				タイムスタンプ	イベントが発生した UNIX タイムスタンプを
								マイクロ秒単位で表す整数値。
data			オブジェクト		インデックスのtermsフィールドで
								定義されているとおりです。

優先順位
タイプには優先順位があります。異なるタイプの値を比較する場合、それらは次の順序で、最小から最大へとランク付けされます。

数値(整数と小数: 0.5 < 1 < 1.5 < 2)
バイト
ストリング
配列(文字列のように字句的に並べられたもの)
オブジェクト(文字列のように、レキシカルに並べられたもの)
参照
タイムスタンプ
日付
ブール(偽 < 真)
ヌル

優先順位
タイプには優先順位があります。異なるタイプの値を比較する場合、それらは次の順序で、最小から最大へとランク付けされます。

1	数値(整数と小数: 0.5 < 1 < 1.5 < 2)
2	バイト
3	ストリング
4	配列(文字列のように字句的に並べられたもの)
5	オブジェクト(文字列のように、レキシカルに並べられたもの)
6	参照
7	タイムスタンプ
8	日付
9	ブール(偽 < 真)
10	ヌル

●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●

# Data types

FQL uses an enhanced Javascript Object Notation (JSON) format for storing and communicating data. JSON is a human and machine-readable open standard that facilitates data interchange. All of JSON’s [scalar types](#scalar) are supported, including [](#number)Number, [String](#string), [Boolean](#boolean) values, as well as [Array](#array) and [Object](#object).

## [](#scalar)Scalar types

### [](#boolean)Boolean

The boolean data type only stores `true` or `false` values. These can be directly compared for equality or inequality. They can also be compared to the boolean literal values of `true` and `false`.

```json
{ my_boolean: true }
```

### [](#null)Null

Null is a special marker used to indicate that a data value does not exist. It is a representation of missing information, indicating a lack of a value. A lack of a value is not the same thing as a value of zero, in the same way that a lack of an answer is not the same thing as an answer of "no".

Null is a value that can be directly compared for application programmer simplicity.  
This means that `Null == Null` returns `true`.

```json
{ my_null: null }
```

### [](#number)Number

Numbers can be 64-bit signed two’s complement integers (long ints), or 64-bit double-precision floating point values (doubles); the representation is controlled, or influenced, by a [driver’s](https://docs.fauna.com/fauna/current/drivers/) host language.

Valid numbers include 3, -27, 3.1415. Neither `infinity` nor `NaN` are allowed.

JavaScript does not distinguish between integer and floating point numbers as you might expect, storing numbers as floats internally, and treating them as integers in many contexts.

If your client applications involve JavaScript, or you are using the Web Shell or `fauna-shell` (which are both implement in JavaScript), and your queries depend on the distinction between integers and floats, be sure to use the conversion functions [`ToDouble`](https://docs.fauna.com/fauna/current/api/fql/functions/todouble) and [`ToInteger`](https://docs.fauna.com/fauna/current/api/fql/functions/tointeger) as necessary.

Functions that operate on numbers:

[`Abs`](https://docs.fauna.com/fauna/current/api/fql/functions/abs)

Returns the absolute value of a number.

[`Acos`](https://docs.fauna.com/fauna/current/api/fql/functions/acos)

Returns the arc cosine of a number.

[`Add`](https://docs.fauna.com/fauna/current/api/fql/functions/add)

Returns the sum of one or more numbers.

[`Asin`](https://docs.fauna.com/fauna/current/api/fql/functions/asin)

Returns the arc sine of a number.

[`Atan`](https://docs.fauna.com/fauna/current/api/fql/functions/atan)

Returns the arc tangent of a number.

[`BitAnd`](https://docs.fauna.com/fauna/current/api/fql/functions/bitand)

Returns the bitwise AND of one or more numbers.

[`BitNot`](https://docs.fauna.com/fauna/current/api/fql/functions/bitnot)

Returns the bitwise AND of one or more numbers.

[`BitOr`](https://docs.fauna.com/fauna/current/api/fql/functions/bitor)

Returns the bitwise OR of one or more numbers.

[`BitXor`](https://docs.fauna.com/fauna/current/api/fql/functions/bitxor)

Returns the bitwise exclusive-OR of one or more numbers.

[`Ceil`](https://docs.fauna.com/fauna/current/api/fql/functions/ceil)

Returns an integer that is greater than, or equal to, a number.

[`Cos`](https://docs.fauna.com/fauna/current/api/fql/functions/cos)

Returns the cosine of a number.

[`Cosh`](https://docs.fauna.com/fauna/current/api/fql/functions/cosh)

Returns the hyperbolic cosine of a number.

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

[`Degrees`](https://docs.fauna.com/fauna/current/api/fql/functions/degrees)

Converts a number from radians to degrees.

[`Divide`](https://docs.fauna.com/fauna/current/api/fql/functions/divide)

Returns the quotient of two or more numbers.

[`Exp`](https://docs.fauna.com/fauna/current/api/fql/functions/exp)

Returns _e_ raised to the power of a number.

[`Floor`](https://docs.fauna.com/fauna/current/api/fql/functions/floor)

Returns an integer that is less than, or equal to, a number.

[`Hypot`](https://docs.fauna.com/fauna/current/api/fql/functions/hypot)

Returns the length of a hypotenuse of a right triangle, given the lengths of the other two sides.

[`Ln`](https://docs.fauna.com/fauna/current/api/fql/functions/ln)

Returns the natural logarithm (base _e_) of a number.

[`Log`](https://docs.fauna.com/fauna/current/api/fql/functions/log)

Returns the natural logarithm (base 10) of a number.

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

[`Modulo`](https://docs.fauna.com/fauna/current/api/fql/functions/modulo)

Returns the remainder after dividing a list of numbers.

[`Multiply`](https://docs.fauna.com/fauna/current/api/fql/functions/multiply)

Returns the product of a list of numbers.

[`Pow`](https://docs.fauna.com/fauna/current/api/fql/functions/pow)

Returns the value of a number raised to an exponent.

[`Radians`](https://docs.fauna.com/fauna/current/api/fql/functions/radians)

Converts a number from degrees to radians.

[`Round`](https://docs.fauna.com/fauna/current/api/fql/functions/round)

Returns the integer that is closest to a number.

[`Sign`](https://docs.fauna.com/fauna/current/api/fql/functions/sign)

Returns 1, 0, or -1 to indicate the sign of a number.

[`Sin`](https://docs.fauna.com/fauna/current/api/fql/functions/sin)

Returns the sine of a number.

[`Sinh`](https://docs.fauna.com/fauna/current/api/fql/functions/sinh)

Returns the hyperbolic sine of a number.

[`Sqrt`](https://docs.fauna.com/fauna/current/api/fql/functions/sqrt)

Returns the square root of a number.

[`Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract)

Returns the difference of a list of numbers.

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

[`Tan`](https://docs.fauna.com/fauna/current/api/fql/functions/tan)

Returns the tangent of a number.

[`Tanh`](https://docs.fauna.com/fauna/current/api/fql/functions/tanh)

Returns the hyperbolic tangent of a number.

[`Trunc`](https://docs.fauna.com/fauna/current/api/fql/functions/trunc)

Truncates a number to the specified decimal places.

### [](#string)String

String data types store any letters, numbers, whitespaces, and/or symbols in a fixed order.

FQL accepts and communicates strings as [UTF-8](http://unicode.org/glossary/#UTF_8) encoded strings. For string functions, any arguments or returned values which utilize offsets and lengths operate using [code points](http://unicode.org/glossary/#code_point).

Functions that operate on strings:

[`Casefold`](https://docs.fauna.com/fauna/current/api/fql/functions/casefold)

Converts a string into a case-normalized string.

[`Concat`](https://docs.fauna.com/fauna/current/api/fql/functions/concat)

Combines a list of strings into a single string.

[`ContainsStr`](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr)

Tests whether a string contains a specific string.

[`ContainsStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/containsstrregex)

Tests whether a string contains a specific pattern.

[`EndsWith`](https://docs.fauna.com/fauna/current/api/fql/functions/endswith)

Tests whether a string ends with a specific string.

[`FindStr`](https://docs.fauna.com/fauna/current/api/fql/functions/findstr)

Searches for a string within a string.

[`FindStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/findstrregex)

Searches for a regex pattern within a string.

[`Format`](https://docs.fauna.com/fauna/current/api/fql/functions/format)

Formats arguments as a string according to a string of format specifiers.

[`LTrim`](https://docs.fauna.com/fauna/current/api/fql/functions/ltrim)

Removes all whitespace from the start of a string.

[`Length`](https://docs.fauna.com/fauna/current/api/fql/functions/length)

Returns the length in codepoints of a string.

[`LowerCase`](https://docs.fauna.com/fauna/current/api/fql/functions/lowercase)

Converts a string to all lowercase.

[`RTrim`](https://docs.fauna.com/fauna/current/api/fql/functions/rtrim)

Removes all whitespace from the end of a string.

[`RegexEscape`](https://docs.fauna.com/fauna/current/api/fql/functions/regexescape)

Creates a regular expression that matches the input string verbatim.

[`Repeat`](https://docs.fauna.com/fauna/current/api/fql/functions/repeat)

Creates a new string by repeating a string multiple times.

[`ReplaceStr`](https://docs.fauna.com/fauna/current/api/fql/functions/replacestr)

Replaces a portion of a string with another string.

[`ReplaceStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/replacestrregex)

Replaces a pattern in a string with another string.

[`Space`](https://docs.fauna.com/fauna/current/api/fql/functions/space)

Creates a whitespace string of the specified size.

[`StartsWith`](https://docs.fauna.com/fauna/current/api/fql/functions/startswith)

Tests whether a string starts with a specific string.

[`SubString`](https://docs.fauna.com/fauna/current/api/fql/functions/substring)

Returns a portion of a string.

[`TitleCase`](https://docs.fauna.com/fauna/current/api/fql/functions/titlecase)

Converts a string to use TitleCase.

[`Trim`](https://docs.fauna.com/fauna/current/api/fql/functions/trim)

Removes all whitespace from the start and end of a string.

[`UpperCase`](https://docs.fauna.com/fauna/current/api/fql/functions/uppercase)

Converts a string to all uppercase.

### [](#literal)Literal

A literal is a constant value for a given data type. [Boolean](#boolean), [](#number)Number, [String](#string), and [Null](#null) all evaluate to their associated type:

true, false   // Boolean
1, 2          // Number
3.4, 1.2e10   // Number
"a", "b"      // String
null          // Null

### [](#array)Array

An Array is a data structure that contains a group of elements. When an Array is used in FQL, it evaluates to its contents.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Arr(1, 2, Concat(Arr("Hen ", "Wen")))
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
Arr(LongV(1), LongV(2), StringV(Hen Wen))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.go "Download example")

```go
result, err := client.Query(
f.Arr{
1, 2, f.Concat(f.Arr{"Hen ", "Wen"}),
})

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
[1 2 Hen Wen]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.java "Download example")

```java
System.out.println(
    client.query(
        Arr(
            Value(1),
            Value(2),
            Concat(Arr(Value("Hen "), Value("Wen")))
        )
    ).get());
```

```none
[1, 2, "Hen Wen"]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.js "Download example")

```javascript
client.query(
  [1, 2, q.Concat(['Hen ', 'Wen'])]
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
[ 1, 2, 'Hen Wen' ]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.py "Download example")

```python
result = client.query(
  [1, 2, q.concat(["Hen ", "Wen"])]
)
print(result)
```

```none
[ 1, 2, "Hen Wen" ]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/array.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Arr(1, 2, Concat(Arr("Hen ", "Wen")))),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
[ 1, 2, "Hen Wen" ]
```

Functions that operate on arrays:

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

[`Append`](https://docs.fauna.com/fauna/current/api/fql/functions/append)

Adds items to end of array.

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns an array of items in one array that are missing from additional arrays.

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns an array of the distinct items within multiple arrays.

[`Drop`](https://docs.fauna.com/fauna/current/api/fql/functions/drop)

Removes items from start of array.

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from array.

[`Foreach`](https://docs.fauna.com/fauna/current/api/fql/functions/foreach)

Iterates over array items.

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns an array of the items that exist in all arrays.

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)

Applies a function to all array items.

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

[`Prepend`](https://docs.fauna.com/fauna/current/api/fql/functions/prepend)

Adds items to start of array.

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in an array.

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

[`Take`](https://docs.fauna.com/fauna/current/api/fql/functions/take)

Fetches items from start of array.

[`ToObject`](https://docs.fauna.com/fauna/current/api/fql/functions/toobject)

Converts an array to an object.

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns an array that combines the items in multiple arrays.

### [](#object)Object

The Object type represents a JSON-like object, where its contents are a collection of key/value pairs. The keys must be strings and the values must be valid FQL data types. The value expressions are evaluated sequentially in the order that they were specified, left to right. Objects evaluate to their contents:

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Obj("name", "Hen Wen", "age", Add(100, 10))
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
ObjectV(name: StringV(Hen Wen),age: LongV(110))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.go "Download example")

```go
result, err := client.Query(
f.Obj{"name": "Hen Wen", "age": f.Add(100, 10)})

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
map[age:110 name:Hen Wen]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.java "Download example")

```java
System.out.println(
    client.query(
        Obj(
            "name", Value("Hen Wen"),
            "age", Add(Value(100), Value(10))
        )
    ).get());
```

```none
{name: "Hen Wen", age: 110}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.js "Download example")

```javascript
client.query(
  { name: 'Hen Wen', age: q.Add(100, 10) }
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ name: 'Hen Wen', age: 110 }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.py "Download example")

```python
result = client.query(
  {
    "name": "Hen Wen",
    "age": q.add(100, 10)
  }
)
print(result)
```

```none
{ "name": "Hen Wen", "age": 110 }
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/object.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Obj("name" -> "Hen Wen", "age" -> Add(100, 10))),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
{ "name": "Hen Wen", "age": 110 }
```

Functions that operate on objects:

[`Merge`](https://docs.fauna.com/fauna/current/api/fql/functions/merge)

Merge two objects into one, with an optional resolver lambda.

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

[`ToArray`](https://docs.fauna.com/fauna/current/api/fql/functions/toarray)

Converts an object to an array.

## [](#special-types)Special types

In addition to the basic types, FQL supports the following types beyond those native to JSON:

### [](#byte)Byte

The Bytes type denotes a Base64-encoded string representing a byte array.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        new byte[] { 0x1, 0x2, 0x3 }
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
BytesV(0x01, 0x02, 0x03)
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.go "Download example")

```go
result, err := client.Query(
f.BytesV{0x1, 0x2, 0x3})

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
[1 2 3]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.java "Download example")

```java
System.out.println(
    client.query(
        Value(new byte[]{ 0x1, 0x2, 0x3 })
    ).get());
```

```none
[0x01 0x02 0x03]
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.js "Download example")

```javascript
client.query(
  new Uint8Array([0x1, 0x2, 0x3])
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Bytes("AQID")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.py "Download example")

```python
result = client.query(
  bytearray(b'\x01\x02\x03')
)
print(result)
```

```none
bytearray(b'\x01\x02\x03')
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/bytes.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Array[Byte](0x1, 0x2, 0x3)),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
[0x01 0x02 0x03]
```

### [](#date)Date

The Date type denotes a date, with no associated time zone.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Date("1970-01-01")
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
FaunaDate(1970-01-01 12:00:00 AM)
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.go "Download example")

```go
result, err := client.Query(
f.Date("1970-01-01"))

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
{0 62135596800 <nil>}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.java "Download example")

```java
System.out.println(
    client.query(
        Date(Value("1970-01-01"))
    ).get());
```

```none
1970-01-01
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.js "Download example")

```javascript
client.query(
  q.Date('1970-01-01')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Date("1970-01-01")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.py "Download example")

```python
result = client.query(
  q.date("1970-01-01")
)
print(result)
```

```none
1970-01-01
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/date.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Date("1970-01-01")),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
1970-01-01
```

Functions that operate on times or dates:

[`Date`](https://docs.fauna.com/fauna/current/api/fql/functions/date)

Converts an ISO-8601 string into a Date.

[`DayOfMonth`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofmonth)

Returns the day of the month from a timestamp.

[`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek)

Returns the day of the week from a timestamp.

[`DayOfYear`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofyear)

Returns the day of the year from a timestamp.

[`Epoch`](https://docs.fauna.com/fauna/current/api/fql/functions/epoch)

Creates a timestamp from an offset since 1970-01-01 in seconds, milliseconds, microseconds, or nanoseconds.

[`Hour`](https://docs.fauna.com/fauna/current/api/fql/functions/hour)

Returns the hour from a timestamp.

[`Minute`](https://docs.fauna.com/fauna/current/api/fql/functions/minute)

Returns the minute from a timestamp.

[`Month`](https://docs.fauna.com/fauna/current/api/fql/functions/month)

Returns the month from a timestamp.

[`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now)

Returns a timestamp representing the current transaction time.

[`Second`](https://docs.fauna.com/fauna/current/api/fql/functions/second)

Returns the second from a timestamp.

[`Time`](https://docs.fauna.com/fauna/current/api/fql/functions/time)

Converts `now`, or an ISO-8601 string, into a timestamp.

[`TimeAdd`](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd)

Adds an offset to a provided timestamp/date.

[`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff)

Returns the difference between two timestamps/dates, in specified units.

[`TimeSubtract`](https://docs.fauna.com/fauna/current/api/fql/functions/timesubtract)

Subtracts an offset from a provided timestamp/date.

[`Year`](https://docs.fauna.com/fauna/current/api/fql/functions/year)

Returns the year from a timestamp.

### [](#page)Page

A `Page` contains an array of results and other _decorated_ elements. In some cases the entire result set may not fit into the array, so other fields (the cursor fields) allow you to walk the results set in blocks (like pages in a book). The cursor fields retrieve blocks of results before or after the current page of results. When Pages are passed to functions that accept arrays, only the array element of the Page is examined or transformed. Other elements of the Page, such as the cursor, remain unaffected and are passed directly through to the output.

  

Field

Type

Description

`data`

[Array](#array)

The elements in the page.

`after`

[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)

The cursor for the next page, inclusive. Optional.

`before`

[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)

The cursor for the previous page, exclusive. Optional.

Functions that operate on pages:

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

[`Append`](https://docs.fauna.com/fauna/current/api/fql/functions/append)

Adds items to end of array.

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns an array of items in one array that are missing from additional arrays.

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns an array of the distinct items within multiple arrays.

[`Drop`](https://docs.fauna.com/fauna/current/api/fql/functions/drop)

Removes items from start of array.

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from array.

[`Foreach`](https://docs.fauna.com/fauna/current/api/fql/functions/foreach)

Iterates over array items.

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns an array of the items that exist in all arrays.

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)

Applies a function to all array items.

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

[`Prepend`](https://docs.fauna.com/fauna/current/api/fql/functions/prepend)

Adds items to start of array.

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in an array.

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

[`Take`](https://docs.fauna.com/fauna/current/api/fql/functions/take)

Fetches items from start of array.

[`ToObject`](https://docs.fauna.com/fauna/current/api/fql/functions/toobject)

Converts an array to an object.

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns an array that combines the items in multiple arrays.

### [](#query)Query

The Query type denotes a query expression object, and represents any valid FQL query expression.

### [](#ref)Reference

The Reference type (or simply Ref) denotes a resource reference for a document in a particular database.

Each Reference is a compound value, composed of:

-   a reference to the collection containing the document: either a user-defined collection, or a system schema collection, such as [`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)
    
-   a document ID: a string-encoded 64-bit integer
    

Together, the collection reference and the document ID refer to a distinct document: no two documents in a database can share the same reference.

For example:

shell

```fql
Ref(Collection("users"), "12345")
```

When creating a document, if you do not specify a document ID (by using the [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) function), a synthetic document ID is generated. Synthetic document ID generation is based on the [Snowflake ID algorithm](https://en.wikipedia.org/wiki/Snowflake_ID).

References may be extracted from documents, or constructed using the [`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection), [`Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database), [`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function), [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex), or [`Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role) functions, or the general-purpose [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) function.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Select("ref", Get(Collection("spells")))
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
RefV(id = "spells", collection = RefV(id = "collections"))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.go "Download example")

```go
result, err := client.Query(
f.Select("ref", f.Get(f.Collection("spells"))))

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
{spells 0xc00008e300 0xc00008e300 <nil>}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.java "Download example")

```java
System.out.println(
    client.query(
        Select(Value("ref"), Get(Collection("spells")))
    ).get());
```

```none
ref(id = "spells", collection = ref(id = "collections"))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.js "Download example")

```javascript
client.query(
  q.Select('ref', q.Get(q.Collection('spells')))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Collection("spells")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.py "Download example")

```python
result = client.query(
  q.select("ref", q.get(q.collection("spells")))
)
print(result)
```

```none
Ref(id=spells, collection=Ref(id=collections))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_ref_extract.scala "Download example")

```scala
try {
  println(Await.result(
  client.query(
    Select("ref", Get(Collection("spells")))
  ),
  5.seconds
))} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
ref(id = "spells", collection = ref(id = "collections"))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Ref(Collection("spells"), "1")
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
RefV(id = "1", collection = RefV(id = "spells", collection = RefV(id = "collections")))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.go "Download example")

```go
result, err := client.Query(
f.Ref(f.Collection("spells"), "1"))

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
{1 0xc000164150 0xc000164150 <nil>}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.java "Download example")

```java
System.out.println(
    client.query(
        Ref(Collection("spells"), Value(1))
    ).get());
```

```none
ref(id = "1", collection = ref(id = "spells", collection = ref(id = "collections")))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.js "Download example")

```javascript
client.query(
  q.Ref(q.Collection('spells'), '1')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Ref(Collection("spells"), "1")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.py "Download example")

```python
result = client.query(
  q.ref(q.collection("spells"), "1")
)
print(result)
```

```none
Ref(id=1, collection=Ref(id=spells, collection=Ref(id=collections)))
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/special_types_mkref.scala "Download example")

```scala
try {
  println(Await.result(
  client.query(
    Ref(Collection("spells"), "1")
  ),
  5.seconds
))} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
ref(
  id = "1",
  collection = ref(
    id = "spells",
    collection = ref(
      id = "collections"
    )
  )
)
```

### [](#set)Set

The Set type denotes a set identifier. A set is a group of tuples, typically representing resources or index `terms`, that are in a specific order.

Unlike other special types, a Set cannot be declared or created using FQL syntax: a Set is created or accessed via FQL functions.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Match(Index("spells_by_element"), "fire")
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
SetRefV(System.Collections.Generic.Dictionary`2[System.String,FaunaDB.Types.Value])
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.go "Download example")

```go
result, err := client.Query(
f.MatchTerm(f.Index("spells_by_element"), "fire"))

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
{map[match:{spells_by_element 0xc0000bf290 0xc0000bf290 <nil>} terms:fire]}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.java "Download example")

```java
System.out.println(
    client.query(
        Match(
            Index("spells_by_element"),
            Value("fire")
        )
    ).get());
```

```none
{@set = {match: ref(id = "spells_by_element", collection = ref(id = "indexes")), terms: "fire"}}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.js "Download example")

```javascript
client.query(
  q.Match(q.Index('spells_by_element'), 'fire')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Match(Index("spells_by_element"), "fire")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.py "Download example")

```python
result = client.query(
  q.match(q.index("spells_by_element"), "fire")
)
print(result)
```

```none
SetRef({'match': Ref(id=spells_by_element, collection=Ref(id=indexes)), 'terms': 'fire'})
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/set.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Match(Index("spells_by_element"), "fire")),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
{
  @set = {
    match: ref(
      id = "spells_by_element",
      collection = ref(id = "indexes")
    ),
    terms: "fire"
  }
}
```

Functions that operate on sets:

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

Returns a set containing the first item of a set.

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns a set that combines the items in multiple sets.

### [](#timestamp)Timestamp

The Timestamp type (usually written as `ts`) stores an instant in time expressed as a calendar date and time of day in UTC.

A Timestamp can safely store nanosecond precision, but be careful as many operating system clocks provide only microsecond precision.

Timestamps may be inserted with offsets, but are converted to UTC; the offset component is lost.

A Timestamp must be within the range `-999999999-01-01T00:00:00Z` - `9999-12-31T23:59:59.999999999Z`.

A document’s `ts` field represents the most recent event that modified the document.

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.cs "Download example")

```csharp
try
{
    Value result = await client.Query(
        Time("1970-01-01T00:00:00Z")
    );
    Console.WriteLine(result);
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}
```

```none
FaunaTime(1970-01-01T00:00:00Z)
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.go "Download example")

```go
result, err := client.Query(
f.Time("1970-01-01T00:00:00Z"))

if err != nil {
fmt.Fprintln(os.Stderr, err)
} else {
fmt.Println(result)
}
```

```none
{0 62135596800 <nil>}
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.java "Download example")

```java
System.out.println(
    client.query(
        Time(Value("1970-01-01T00:00:00Z"))
    ).get());
```

```none
1970-01-01T00:00:00Z
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.js "Download example")

```javascript
client.query(
  q.Time('1970-01-01T00:00:00Z')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
Time("1970-01-01T00:00:00Z")
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.py "Download example")

```python
result = client.query(
  q.time("1970-01-01T00:00:00Z")
)
print(result)
```

```none
FaunaTime('1970-01-01T00:00:00Z')
```

C#GOJAVAJAVASCRIPTPYTHONSCALA

[](https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript#ref../_attachments/types/ts.scala "Download example")

```scala
try {
  println(Await.result(
    client.query(Time("1970-01-01T00:00:00Z")),
    5.seconds
  ))
} catch {
  case unknown: Throwable => println("Error: " + unknown.getMessage())
}
```

```none
1970-01-01T00:00:00Z
```

Functions that operate on times or dates:

[`Date`](https://docs.fauna.com/fauna/current/api/fql/functions/date)

Converts an ISO-8601 string into a Date.

[`DayOfMonth`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofmonth)

Returns the day of the month from a timestamp.

[`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek)

Returns the day of the week from a timestamp.

[`DayOfYear`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofyear)

Returns the day of the year from a timestamp.

[`Epoch`](https://docs.fauna.com/fauna/current/api/fql/functions/epoch)

Creates a timestamp from an offset since 1970-01-01 in seconds, milliseconds, microseconds, or nanoseconds.

[`Hour`](https://docs.fauna.com/fauna/current/api/fql/functions/hour)

Returns the hour from a timestamp.

[`Minute`](https://docs.fauna.com/fauna/current/api/fql/functions/minute)

Returns the minute from a timestamp.

[`Month`](https://docs.fauna.com/fauna/current/api/fql/functions/month)

Returns the month from a timestamp.

[`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now)

Returns a timestamp representing the current transaction time.

[`Second`](https://docs.fauna.com/fauna/current/api/fql/functions/second)

Returns the second from a timestamp.

[`Time`](https://docs.fauna.com/fauna/current/api/fql/functions/time)

Converts `now`, or an ISO-8601 string, into a timestamp.

[`TimeAdd`](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd)

Adds an offset to a provided timestamp/date.

[`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff)

Returns the difference between two timestamps/dates, in specified units.

[`TimeSubtract`](https://docs.fauna.com/fauna/current/api/fql/functions/timesubtract)

Subtracts an offset from a provided timestamp/date.

[`Year`](https://docs.fauna.com/fauna/current/api/fql/functions/year)

Returns the year from a timestamp.

## [](#events)Events

Strictly speaking, events aren’t types; they are objects that capture the temporal history of documents by tracking all create, update, and delete operations, as snapshots, over a document’s timeline. However, they have a common structure:

### [](#document-events)Document events

  

Field

Value

Description

`ref`

[Reference](#ref)

The reference to the document.

`action`

[String](#string)

Either "create","update" or "delete".

`ts`

[](#number)Number

An integer value representing a UNIX timestamp, with microsecond resolution, at which the event occurred.

`data`

[Object](#object)

Varies based on the action.

### [](#set-events)Set events

Set events are represented by an object returned when paginating through an index.

  

Field

Value

Description

`ref`

[Reference](#ref)

The reference to the document.

`action`

[String](#string)

Either `add` or `remove`.

`ts`

[Timestamp](#timestamp)

An integer value representing a UNIX timestamp, with microsecond resolution, at which the event occurred.

`data`

[Object](#object)

Exactly as defined by the index’s `terms` field.

## [](#precedence)Precedence

Types have an order of precedence. When comparing values of different types, they are ranked in the following order, from least to greatest.

1.  [Number](#number) (integers and decimals: 0.5 < 1 < 1.5 < 2)
    
2.  [Byte](#byte)
    
3.  [String](#string)
    
4.  [Array](#array) (ordered lexically, like strings)
    
5.  [Object](#object) (ordered lexically, like strings)
    
6.  [Reference](#ref)
    
7.  [Timestamp](#timestamp)
    
8.  [Date](#date)
    
9.  [Boolean](#boolean) (false < true)
    
10.  [Null](#null)
    

Was this article helpful?

●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●

