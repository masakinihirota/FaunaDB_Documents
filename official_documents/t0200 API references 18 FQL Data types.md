Data types | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/types?lang=javascript

# Data types

データ型

FQL uses an enhanced Javascript Object Notation (JSON) format for storing and communicating data. JSON is a human and machine-readable open standard that facilitates data interchange. All of JSON’s [scalar types](#scalar) are supported, including [](#number)Number, [String](#string), [Boolean](#boolean) values, as well as [Array](#array) and [Object](#object).

FQLでは、データの保存と通信に、拡張されたJavascript Object Notation（JSON）フォーマットを使用しています。JSONは、データ交換を容易にする、人間や機械が読めるオープンスタンダードです。JSONのすべての[スカラー型](#scalar)がサポートされており、[](#number)数字、[String](#string)、[Boolean](#boolean)の値や、[Array](#array)、[Object](#object)もサポートされています。

## [](#scalar)Scalar types

スカラータイプ

### [](#boolean)Boolean

ブール値

The boolean data type only stores `true` or `false` values. These can be directly compared for equality or inequality. They can also be compared to the boolean literal values of `true` and `false`.

booleanデータ型は，`true`または`false`の値のみを格納します。これらの値は直接、等値性や不等値性を比較することができます。また、ブーリアンリテラルの `true` と `false` の値と比較することもできます。

```json
{ my_boolean: true }
```

### [](#null)Null

Null is a special marker used to indicate that a data value does not exist. It is a representation of missing information, indicating a lack of a value. A lack of a value is not the same thing as a value of zero, in the same way that a lack of an answer is not the same thing as an answer of "no".

Nullとは、データの値が存在しないことを示すために使われる特別なマーカーです。これは、情報の欠落を表し、値がないことを示します。値が存在しないことは、値がゼロであることと同じではなく、答えがないことは「いいえ」という答えと同じではありません。

Null is a value that can be directly compared for application programmer simplicity.  
This means that `Null == Null` returns `true`.

Nullは、アプリケーションプログラマが簡単に使えるように、直接比較できる値です。 
つまり、`Null == Null` は `true` を返します。

```json
{ my_null: null }
```

### [](#number)Number

数

Numbers can be 64-bit signed two’s complement integers (long ints), or 64-bit double-precision floating point values (doubles); the representation is controlled, or influenced, by a [driver’s](https://docs.fauna.com/fauna/current/drivers/) host language.

数値は、64ビットの符号付き2の補数整数（long int）、または64ビットの倍精度浮動小数点値（double）にすることができます。表現は、ドライバーのホスト言語によって制御または影響を受け ます。

Valid numbers include 3, -27, 3.1415. Neither `infinity` nor `NaN` are allowed.

有効な数値には、3、-27、3.1415が含まれます。どちらinfinityもNaN許可されていません。

JavaScript does not distinguish between integer and floating point numbers as you might expect, storing numbers as floats internally, and treating them as integers in many contexts.

重要1
JavaScriptは、期待どおりに整数と浮動小数点数を区別せず、数値を内部的に浮動小数点数として格納し、多くのコンテキストで整数として扱います。

If your client applications involve JavaScript, or you are using the Web Shell or `fauna-shell` (which are both implement in JavaScript), and your queries depend on the distinction between integers and floats, be sure to use the conversion functions [`ToDouble`](https://docs.fauna.com/fauna/current/api/fql/functions/todouble) and [`ToInteger`](https://docs.fauna.com/fauna/current/api/fql/functions/tointeger) as necessary.

be sure to 動詞の原形
「必ず〜する」「きっと〜する」（命令形）

重要2
クライアントアプリケーションでJavaScriptを使用している場合や、Web Shellや`fauna-shell`（いずれもJavaScriptで実装されている）を使用していて、クエリが整数と浮動小数点の区別に依存している場合は、必要に応じて変換関数[`ToDouble`](https://docs.fauna.com/fauna/current/api/fql/functions/todouble)や[`ToInteger`](https://docs.fauna.com/fauna/current/api/fql/functions/tointeger)を必ず使用してください。

Functions that operate on numbers:

数値を操作する関数：

[`Abs`](https://docs.fauna.com/fauna/current/api/fql/functions/abs)

Returns the absolute value of a number.

数値の絶対値を返します。

[`Acos`](https://docs.fauna.com/fauna/current/api/fql/functions/acos)

Returns the arc cosine of a number.

数値のアークコサインを返します。

[`Add`](https://docs.fauna.com/fauna/current/api/fql/functions/add)

Returns the sum of one or more numbers.

1つ以上の数値の合計を返します。

[`Asin`](https://docs.fauna.com/fauna/current/api/fql/functions/asin)

Returns the arc sine of a number.

数値のアークサインを返します。

[`Atan`](https://docs.fauna.com/fauna/current/api/fql/functions/atan)

Returns the arc tangent of a number.

数値のアークタンジェントを返します。

[`BitAnd`](https://docs.fauna.com/fauna/current/api/fql/functions/bitand)

Returns the bitwise AND of one or more numbers.

1つ以上の数値のビットごとのANDを返します。

[`BitNot`](https://docs.fauna.com/fauna/current/api/fql/functions/bitnot)

Returns the bitwise AND of one or more numbers.

1つ以上の数値のビットごとのANDを返します。

[`BitOr`](https://docs.fauna.com/fauna/current/api/fql/functions/bitor)

Returns the bitwise OR of one or more numbers.

1つ以上の数値のビットごとのORを返します。

[`BitXor`](https://docs.fauna.com/fauna/current/api/fql/functions/bitxor)

Returns the bitwise exclusive-OR of one or more numbers.

1つ以上の数値のビット単位の排他的論理和を返します。

[`Ceil`](https://docs.fauna.com/fauna/current/api/fql/functions/ceil)

Returns an integer that is greater than, or equal to, a number.

数値以上の整数を返します。

[`Cos`](https://docs.fauna.com/fauna/current/api/fql/functions/cos)

Returns the cosine of a number.

数値のコサインを返します。

[`Cosh`](https://docs.fauna.com/fauna/current/api/fql/functions/cosh)

Returns the hyperbolic cosine of a number.

数値の双曲線余弦を返します。

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

配列またはセット内のアイテムをカウントします。

[`Degrees`](https://docs.fauna.com/fauna/current/api/fql/functions/degrees)

Converts a number from radians to degrees.

数値をラジアンから度に変換します。

[`Divide`](https://docs.fauna.com/fauna/current/api/fql/functions/divide)

Returns the quotient of two or more numbers.

2つ以上の数値の商を返します。

[`Exp`](https://docs.fauna.com/fauna/current/api/fql/functions/exp)

Returns _e_ raised to the power of a number.

eを数値の累乗で返します。

[`Floor`](https://docs.fauna.com/fauna/current/api/fql/functions/floor)

Returns an integer that is less than, or equal to, a number.

数値以下の整数を返します。

[`Hypot`](https://docs.fauna.com/fauna/current/api/fql/functions/hypot)

Returns the length of a hypotenuse of a right triangle, given the lengths of the other two sides.

他の2つの辺の長さを指定して、直角三角形の斜辺の長さを返します。

[`Ln`](https://docs.fauna.com/fauna/current/api/fql/functions/ln)

Returns the natural logarithm (base _e_) of a number.

数値の自然対数（基数e）を返します。

[`Log`](https://docs.fauna.com/fauna/current/api/fql/functions/log)

Returns the natural logarithm (base 10) of a number.

数値の自然対数（基数10）を返します。

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

数値のリストで最大の値を返します。

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

配列またはセット内のアイテムの平均値を返します。

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

数値のリストの中で最小の値を返します。

[`Modulo`](https://docs.fauna.com/fauna/current/api/fql/functions/modulo)

Returns the remainder after dividing a list of numbers.

数値のリストを除算した後の余りを返します。

[`Multiply`](https://docs.fauna.com/fauna/current/api/fql/functions/multiply)

Returns the product of a list of numbers.

数値のリストの積を返します。

[`Pow`](https://docs.fauna.com/fauna/current/api/fql/functions/pow)

Returns the value of a number raised to an exponent.

指数に累乗された数値の値を返します。

[`Radians`](https://docs.fauna.com/fauna/current/api/fql/functions/radians)

Converts a number from degrees to radians.

数値を度からラジアンに変換します。

[`Round`](https://docs.fauna.com/fauna/current/api/fql/functions/round)

Returns the integer that is closest to a number.

数値に最も近い整数を返します。

[`Sign`](https://docs.fauna.com/fauna/current/api/fql/functions/sign)

Returns 1, 0, or -1 to indicate the sign of a number.

数値の符号を示すために、1、0、または-1を返します。

[`Sin`](https://docs.fauna.com/fauna/current/api/fql/functions/sin)

Returns the sine of a number.

数値の正弦を返します。

[`Sinh`](https://docs.fauna.com/fauna/current/api/fql/functions/sinh)

Returns the hyperbolic sine of a number.

数値の双曲線正弦を返します。

[`Sqrt`](https://docs.fauna.com/fauna/current/api/fql/functions/sqrt)

Returns the square root of a number.

数値の平方根を返します。

[`Subtract`](https://docs.fauna.com/fauna/current/api/fql/functions/subtract)

Returns the difference of a list of numbers.

数値のリストの差を返します。

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

配列またはセット内のアイテムを合計します。

[`Tan`](https://docs.fauna.com/fauna/current/api/fql/functions/tan)

Returns the tangent of a number.

数値のタンジェントを返します。

[`Tanh`](https://docs.fauna.com/fauna/current/api/fql/functions/tanh)

Returns the hyperbolic tangent of a number.

数値の双曲線正接を返します。

[`Trunc`](https://docs.fauna.com/fauna/current/api/fql/functions/trunc)

Truncates a number to the specified decimal places.

数値を指定された小数点以下の桁数に切り捨てます。

### [](#string)String

文字列

String data types store any letters, numbers, whitespaces, and/or symbols in a fixed order.

文字列データ型は、文字、数字、空白、記号を固定された順序で格納します。

FQL accepts and communicates strings as [UTF-8](http://unicode.org/glossary/#UTF_8) encoded strings. 

FQLでは、文字列を[UTF-8](http://unicode.org/glossary/#UTF_8)でエンコードされた文字列として受け入れ、通信します。

> encode
1〈情報などを〉暗号［記号］化する，コード化する（⇔decode）
1a《言語学》…を（外国語で）言い換える，翻訳する
2《コンピュ》〈データなどを〉符号化する，エンコードする
3《生化学》〈遺伝子が〉〈たんぱく質を〉エンコードする，コード化する



For string functions, any arguments or returned values which utilize offsets and lengths operate using [code points](http://unicode.org/glossary/#code_point).

utilize

【他動】～を利用する、活用する、役立たせる

offsets
位置を基準点からの距離で表したもの
オフセットとは、埋め合わせ（る）、相殺する（もの）、補う、補正（する）、補正値、代償、分派などの意味を持つ英単語。ITの分野では、何かの位置を指し示す際に、基準となる位置からの差（距離、ズレ、相対位置）を表す値のことをオフセットということが多い。

> code points 
Code Point. (1) Any value in the Unicode codespace; that is, the range of integers from 0 to 10FFFF16. (See definition D10 in Section 3.4, Characters and Encoding.) Not all code points are assigned to encoded characters. See code point type. (2) A value, or position, for a character, in any coded character set.

> コードポイント。(1) Unicodeコードスペース内の任意の値、つまり0から10FFFF16までの整数の範囲。(すべてのコードポイントがエンコードされた文字に割り当てられるわけではない。コードポイントタイプを参照。(2) 符号化された文字セットにおける、文字の値または位置。

文字列関数では、オフセットや長さを利用する引数や戻り値は、[コードポイント](http://unicode.org/glossary/#code_point)を使って操作します。





Functions that operate on strings:

文字列を操作する関数：

[`Casefold`](https://docs.fauna.com/fauna/current/api/fql/functions/casefold)

Converts a string into a case-normalized string.

文字列を大文字と小文字が正規化された文字列に変換します。

[`Concat`](https://docs.fauna.com/fauna/current/api/fql/functions/concat)

Combines a list of strings into a single string.

文字列のリストを1つの文字列に結合します。

[`ContainsStr`](https://docs.fauna.com/fauna/current/api/fql/functions/containsstr)

Tests whether a string contains a specific string.

文字列に特定の文字列が含まれているかどうかをテストします。

[`ContainsStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/containsstrregex)

Tests whether a string contains a specific pattern.

文字列に特定のパターンが含まれているかどうかをテストします。

[`EndsWith`](https://docs.fauna.com/fauna/current/api/fql/functions/endswith)

Tests whether a string ends with a specific string.

文字列が特定の文字列で終わるかどうかをテストします。

[`FindStr`](https://docs.fauna.com/fauna/current/api/fql/functions/findstr)

Searches for a string within a string.

文字列内の文字列を検索します。

[`FindStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/findstrregex)

Searches for a regex pattern within a string.

文字列内の正規表現パターンを検索します。

[`Format`](https://docs.fauna.com/fauna/current/api/fql/functions/format)

Formats arguments as a string according to a string of format specifiers.

フォーマット指定子の文字列に従って、引数を文字列としてフォーマットします。

[`LTrim`](https://docs.fauna.com/fauna/current/api/fql/functions/ltrim)

Removes all whitespace from the start of a string.

文字列の先頭からすべての空白を削除します。

[`Length`](https://docs.fauna.com/fauna/current/api/fql/functions/length)

Returns the length in codepoints of a string.

文字列のコードポイントで長さを返します。

[`LowerCase`](https://docs.fauna.com/fauna/current/api/fql/functions/lowercase)

Converts a string to all lowercase.

文字列をすべて小文字に変換します。

[`RTrim`](https://docs.fauna.com/fauna/current/api/fql/functions/rtrim)

Removes all whitespace from the end of a string.

文字列の末尾からすべての空白を削除します。

[`RegexEscape`](https://docs.fauna.com/fauna/current/api/fql/functions/regexescape)

Creates a regular expression that matches the input string verbatim.

入力文字列に逐語的に一致する正規表現を作成します。

[`Repeat`](https://docs.fauna.com/fauna/current/api/fql/functions/repeat)

Creates a new string by repeating a string multiple times.

文字列を複数回繰り返して、新しい文字列を作成します。

[`ReplaceStr`](https://docs.fauna.com/fauna/current/api/fql/functions/replacestr)

Replaces a portion of a string with another string.

文字列の一部を別の文字列に置き換えます。

[`ReplaceStrRegex`](https://docs.fauna.com/fauna/current/api/fql/functions/replacestrregex)

Replaces a pattern in a string with another string.

文字列内のパターンを別の文字列に置き換えます。

[`Space`](https://docs.fauna.com/fauna/current/api/fql/functions/space)

Creates a whitespace string of the specified size.

指定されたサイズの空白文字列を作成します。

[`StartsWith`](https://docs.fauna.com/fauna/current/api/fql/functions/startswith)

Tests whether a string starts with a specific string.

文字列が特定の文字列で始まるかどうかをテストします。

[`SubString`](https://docs.fauna.com/fauna/current/api/fql/functions/substring)

Returns a portion of a string.

文字列の一部を返します。

[`TitleCase`](https://docs.fauna.com/fauna/current/api/fql/functions/titlecase)

Converts a string to use TitleCase.

TitleCaseを使用するように文字列を変換します。

[`Trim`](https://docs.fauna.com/fauna/current/api/fql/functions/trim)

Removes all whitespace from the start and end of a string.

文字列の最初と最後からすべての空白を削除します。

[`UpperCase`](https://docs.fauna.com/fauna/current/api/fql/functions/uppercase)

Converts a string to all uppercase.

文字列をすべて大文字に変換します。

### [](#literal)Literal

リテラル

A literal is a constant value for a given data type. [Boolean](#boolean), [](#number)Number, [String](#string), and [Null](#null) all evaluate to their associated type:

リテラルとは、指定されたデータ型に対する一定の値のことです。Boolean](#boolean)、[](#number)Number、[String](#string)、[Null](#null)は、すべて関連するデータ型で評価されます。

true, false   // Boolean
1, 2          // Number
3.4, 1.2e10   // Number
"a", "b"      // String
null          // Null

### [](#array)Array

配列

An Array is a data structure that contains a group of elements. When an Array is used in FQL, it evaluates to its contents.

配列は、要素のグループを含むデータ構造です。配列がFQLで使用される場合、その内容を評価します。

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

Functions that operate on arrays:

配列を操作する関数：

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

提供されたすべての値が真であるかどうかをテストします。

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

提供された値のいずれかが真であるかどうかをテストします。

[`Append`](https://docs.fauna.com/fauna/current/api/fql/functions/append)

Adds items to end of array.

配列の最後にアイテムを追加します。

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

配列またはセット内のアイテムをカウントします。

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns an array of items in one array that are missing from additional arrays.

追加の配列から欠落している1つの配列内のアイテムの配列を返します。

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns an array of the distinct items within multiple arrays.

複数の配列内の個別のアイテムの配列を返します。

[`Drop`](https://docs.fauna.com/fauna/current/api/fql/functions/drop)

Removes items from start of array.

配列の先頭からアイテムを削除します。

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from array.

配列から特定のアイテムをフェッチします。

[`Foreach`](https://docs.fauna.com/fauna/current/api/fql/functions/foreach)

Iterates over array items.

配列アイテムを繰り返し処理します。

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns an array of the items that exist in all arrays.

すべての配列に存在するアイテムの配列を返します。

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

配列またはセットが空かどうかをテストします。

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

配列またはセットにアイテムが含まれているかどうかをテストします。

[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)

Applies a function to all array items.

すべての配列項目に関数を適用します。

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

数値のリストで最大の値を返します。

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

配列またはセット内のアイテムの平均値を返します。

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

数値のリストの中で最小の値を返します。

[`Prepend`](https://docs.fauna.com/fauna/current/api/fql/functions/prepend)

Adds items to start of array.

配列の先頭に項目を追加します。

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

ラムダ関数を使用して、配列を縮小するか、結果に設定します。

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in an array.

配列内のアイテムの順序を逆にします。

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

ドキュメントから特定のフィールド値を取得します。

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

配列またはセット内のアイテムを合計します。

[`Take`](https://docs.fauna.com/fauna/current/api/fql/functions/take)

Fetches items from start of array.

配列の先頭からアイテムをフェッチします。

[`ToObject`](https://docs.fauna.com/fauna/current/api/fql/functions/toobject)

Converts an array to an object.

配列をオブジェクトに変換します。

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns an array that combines the items in multiple arrays.

複数の配列の項目を組み合わせた配列を返します。

### [](#object)Object

オブジェクト

The Object type represents a JSON-like object, where its contents are a collection of key/value pairs. The keys must be strings and the values must be valid FQL data types. The value expressions are evaluated sequentially in the order that they were specified, left to right. Objects evaluate to their contents:

Objectタイプは、JSONのようなオブジェクトを表し、その内容はキーと値のペアのコレクションです。キーは文字列である必要があり、値は有効なFQLデータ型である必要があります。値式は、指定された順序で左から右に順番に評価されます。オブジェクトはその内容を評価します。

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

Functions that operate on objects:

オブジェクトを操作する関数：

[`Merge`](https://docs.fauna.com/fauna/current/api/fql/functions/merge)

Merge two objects into one, with an optional resolver lambda.

オプションのリゾルバーラムダを使用して、2つのオブジェクトを1つにマージします。

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

ドキュメントから特定のフィールド値を取得します。

[`ToArray`](https://docs.fauna.com/fauna/current/api/fql/functions/toarray)

Converts an object to an array.

オブジェクトを配列に変換します。

## [](#special-types)Special types

特殊タイプ

In addition to the basic types, FQL supports the following types beyond those native to JSON:

基本的なタイプに加えて、FQLはJSONにネイティブなタイプ以外に次のタイプをサポートします。

### [](#byte)Byte

The Bytes type denotes a Base64-encoded string representing a byte array.

Bytesタイプは、バイト配列を表すBase64でエンコードされた文字列を示します。

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

### [](#date)Date

日付

The Date type denotes a date, with no associated time zone.

日付タイプは、タイムゾーンが関連付けられていない日付を示します。

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

Functions that operate on times or dates:

時間または日付で動作する関数：

[`Date`](https://docs.fauna.com/fauna/current/api/fql/functions/date)

Converts an ISO-8601 string into a Date.

ISO-8601文字列を日付に変換します。

[`DayOfMonth`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofmonth)

Returns the day of the month from a timestamp.

タイムスタンプから日を返します。

[`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek)

Returns the day of the week from a timestamp.

タイムスタンプから曜日を返します。

[`DayOfYear`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofyear)

Returns the day of the year from a timestamp.

タイムスタンプから年の日を返します。

[`Epoch`](https://docs.fauna.com/fauna/current/api/fql/functions/epoch)

Creates a timestamp from an offset since 1970-01-01 in seconds, milliseconds, microseconds, or nanoseconds.

1970-01-01以降のオフセットからタイムスタンプを秒、ミリ秒、マイクロ秒、またはナノ秒で作成します。

[`Hour`](https://docs.fauna.com/fauna/current/api/fql/functions/hour)

Returns the hour from a timestamp.

タイムスタンプから時間を返します。

[`Minute`](https://docs.fauna.com/fauna/current/api/fql/functions/minute)

Returns the minute from a timestamp.

タイムスタンプから分を返します。

[`Month`](https://docs.fauna.com/fauna/current/api/fql/functions/month)

Returns the month from a timestamp.

タイムスタンプから月を返します。

[`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now)

Returns a timestamp representing the current transaction time.

現在のトランザクション時間を表すタイムスタンプを返します。

[`Second`](https://docs.fauna.com/fauna/current/api/fql/functions/second)

Returns the second from a timestamp.

タイムスタンプから秒を返します。

[`Time`](https://docs.fauna.com/fauna/current/api/fql/functions/time)

Converts `now`, or an ISO-8601 string, into a timestamp.

now、またはISO-8601文字列をタイムスタンプに変換します。

[`TimeAdd`](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd)

Adds an offset to a provided timestamp/date.

指定されたタイムスタンプ/日付にオフセットを追加します。

[`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff)

Returns the difference between two timestamps/dates, in specified units.

2つのタイムスタンプ/日付の差を指定された単位で返します。

[`TimeSubtract`](https://docs.fauna.com/fauna/current/api/fql/functions/timesubtract)

Subtracts an offset from a provided timestamp/date.

指定されたタイムスタンプ/日付からオフセットを減算します。

[`Year`](https://docs.fauna.com/fauna/current/api/fql/functions/year)

Returns the year from a timestamp.

タイムスタンプから年を返します。

### [](#page)Page

A `Page` contains an array of results and other _decorated_ elements. In some cases the entire result set may not fit into the array, so other fields (the cursor fields) allow you to walk the results set in blocks (like pages in a book). The cursor fields retrieve blocks of results before or after the current page of results. When Pages are passed to functions that accept arrays, only the array element of the Page is examined or transformed. Other elements of the Page, such as the cursor, remain unaffected and are passed directly through to the output.

AにPageは、一連の結果とその他の装飾された要素が含まれています。結果セット全体が配列に収まらない場合があるため、他のフィールド（カーソルフィールド）を使用すると、結果セットをブロック（本のページなど）で歩くことができます。カーソルフィールドは、結果の現在のページの前後の結果のブロックを取得します。ページが配列を受け入れる関数に渡されると、ページの配列要素のみが検査または変換されます。カーソルなどのページの他の要素は影響を受けず、出力に直接渡されます。

|Field|Type|Description|
|--|--|--|
|`data`|[Array](#array)|The elements in the page.|
|`after`|[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)|The cursor for the next page, inclusive. Optional.|
|`before`|[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)|The cursor for the previous page, exclusive. Optional.|

|Field|Type|Description|
|--|--|--|
|`data`|[Array](#array)|ページ内の要素。|
|`after`|[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)|次のページのカーソル。オプション。|
|`before`|[Cursor](https://docs.fauna.com/fauna/current/api/fql/functions/paginate#cursor)|前のページのカーソル、排他的。オプション。|

Functions that operate on pages:

ページ上で動作する関数：

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

提供されたすべての値が真であるかどうかをテストします。

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

提供された値のいずれかが真であるかどうかをテストします。

[`Append`](https://docs.fauna.com/fauna/current/api/fql/functions/append)

Adds items to end of array.

配列の最後にアイテムを追加します。

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

配列またはセット内のアイテムをカウントします。

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns an array of items in one array that are missing from additional arrays.

追加の配列から欠落している1つの配列内のアイテムの配列を返します。

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns an array of the distinct items within multiple arrays.

複数の配列内の個別のアイテムの配列を返します。

[`Drop`](https://docs.fauna.com/fauna/current/api/fql/functions/drop)

Removes items from start of array.

配列の先頭からアイテムを削除します。

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from array.

配列から特定のアイテムをフェッチします。

[`Foreach`](https://docs.fauna.com/fauna/current/api/fql/functions/foreach)

Iterates over array items.

配列アイテムを繰り返し処理します。

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns an array of the items that exist in all arrays.

すべての配列に存在するアイテムの配列を返します。

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

配列またはセットが空かどうかをテストします。

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

配列またはセットにアイテムが含まれているかどうかをテストします。

[`Map`](https://docs.fauna.com/fauna/current/api/fql/functions/map)

Applies a function to all array items.

すべての配列項目に関数を適用します。

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

数値のリストで最大の値を返します。

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

配列またはセット内のアイテムの平均値を返します。

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

数値のリストの中で最小の値を返します。

[`Prepend`](https://docs.fauna.com/fauna/current/api/fql/functions/prepend)

Adds items to start of array.

配列の先頭に項目を追加します。

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

ラムダ関数を使用して、配列を縮小するか、結果に設定します。

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in an array.

配列内のアイテムの順序を逆にします。

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

ドキュメントから特定のフィールド値を取得します。

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

配列またはセット内のアイテムを合計します。

[`Take`](https://docs.fauna.com/fauna/current/api/fql/functions/take)

Fetches items from start of array.

配列の先頭からアイテムをフェッチします。

[`ToObject`](https://docs.fauna.com/fauna/current/api/fql/functions/toobject)

Converts an array to an object.

配列をオブジェクトに変換します。

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns an array that combines the items in multiple arrays.

複数の配列の項目を組み合わせた配列を返します。

### [](#query)Query

クエリ

The Query type denotes a query expression object, and represents any valid FQL query expression.

クエリタイプはクエリ式オブジェクトを示し、有効なFQLクエリ式を表します。





### [](#ref)Reference

参照

The Reference type (or simply Ref) denotes a resource reference for a document in a particular database.

Referenceタイプ（または単にRef）は、特定のデータベース内のドキュメントのリソース参照を表します。

Each Reference is a compound value, composed of:

各Referenceは複合的な値で、以下のように構成されています。

-   a reference to the collection containing the document: either a user-defined collection, or a system schema collection, such as [`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)

- ドキュメントを含むコレクションへの参照：ユーザー定義のコレクションか、[`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)のようなシステムスキーマのコレクションのいずれか。


-   a document ID: a string-encoded 64-bit integer

ドキュメントID：文字列でエンコードされた64ビット整数

Together, the collection reference and the document ID refer to a distinct document: no two documents in a database can share the same reference.

データベース内の2つのドキュメントが同じリファレンスを共有することはありません。

For example:

例えば：

```fql
Ref(Collection("users"), "12345")
```

When creating a document, if you do not specify a document ID (by using the [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) function), a synthetic document ID is generated. Synthetic document ID generation is based on the [Snowflake ID algorithm](https://en.wikipedia.org/wiki/Snowflake_ID).

synthetic
合成の、人工の、模造の

ドキュメントを作成する際に、ドキュメントIDを指定しない場合（[`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref)関数を使用する場合）、合成ドキュメントIDが生成されます。合成文書IDの生成は、[Snowflake ID algorithm](https://en.wikipedia.org/wiki/Snowflake_ID)に基づいています。



References may be extracted from documents, or constructed using the [`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection), [`Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database), [`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function), [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex), or [`Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role) functions, or the general-purpose [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) function.

リファレンスは、ドキュメントから抽出したり、[`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection)、[`Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database)、[`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function)、[`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex)、[`Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role)の各関数や、汎用の[`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref)の各関数を使って構築することができます。



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

### [](#set)Set

The Set type denotes a set identifier. A set is a group of tuples, typically representing resources or index `terms`, that are in a specific order.

セットするtypeはセット識別子を示します。セットはterms、特定の順序にあるタプルのグループであり、通常はリソースまたはインデックスを表します。

Unlike other special types, a Set cannot be declared or created using FQL syntax: a Set is created or accessed via FQL functions.

他の特殊なタイプとは異なり、 セットする FQL構文を使用して宣言または作成することはできません。 セットする FQL関数を介して作成またはアクセスされます。

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

Functions that operate on sets:

セットを操作する関数：

[`All`](https://docs.fauna.com/fauna/current/api/fql/functions/all)

Tests whether all of the provided values are true.

提供されたすべての値が真であるかどうかをテストします。

[`Any`](https://docs.fauna.com/fauna/current/api/fql/functions/any)

Tests whether any of the provided values are true.

提供された値のいずれかが真であるかどうかをテストします。

[`Count`](https://docs.fauna.com/fauna/current/api/fql/functions/count)

Counts the items in an array or set.

配列またはセット内のアイテムをカウントします。

[`Difference`](https://docs.fauna.com/fauna/current/api/fql/functions/difference)

Returns the set of items in one set that are missing from additional sets.

追加のセットから欠落している1つのセット内のアイテムのセットを返します。

[`Distinct`](https://docs.fauna.com/fauna/current/api/fql/functions/distinct)

Returns the set of distinct items within a set.

セット内の個別のアイテムのセットを返します。

[`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)

Returns the set of events describing the history of a set or document.

セットまたはドキュメントの履歴を説明するイベントのセットを返します。

[`Filter`](https://docs.fauna.com/fauna/current/api/fql/functions/filter)

Fetches specific items from a set.

セットから特定のアイテムを取得します。

[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)

Returns the set of items that exist in all sets.

すべてのセットに存在するアイテムのセットを返します。

[`IsEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isempty)

Tests whether an array or set is empty.

配列またはセットが空かどうかをテストします。

[`IsNonEmpty`](https://docs.fauna.com/fauna/current/api/fql/functions/isnonempty)

Tests whether an array or set contains items.

配列またはセットにアイテムが含まれているかどうかをテストします。

[`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join)

Combines the items in a set with set’s indexed values.

セット内のアイテムをセットのインデックス値と組み合わせます。

[`Match`](https://docs.fauna.com/fauna/current/api/fql/functions/match)

Returns the set of items that match search terms.

検索語に一致するアイテムのセットを返します。

[`Max`](https://docs.fauna.com/fauna/current/api/fql/functions/max)

Returns the largest value in a list of numbers.

数値のリストで最大の値を返します。

[`Mean`](https://docs.fauna.com/fauna/current/api/fql/functions/mean)

Returns the average value of the items in an array or set.

配列またはセット内のアイテムの平均値を返します。

[`Min`](https://docs.fauna.com/fauna/current/api/fql/functions/min)

Returns the smallest value in a list of numbers.

数値のリストの中で最小の値を返します。

[`Range`](https://docs.fauna.com/fauna/current/api/fql/functions/range)

Returns a subset of a set, in the specified range.

指定された範囲内のセットのサブセットを返します。

[`Reduce`](https://docs.fauna.com/fauna/current/api/fql/functions/reduce)

Reduce an array or set to a result via a lambda function.

ラムダ関数を使用して、配列を縮小するか、結果に設定します。

[`Reverse`](https://docs.fauna.com/fauna/current/api/fql/functions/reverse)

Reverses the order of the items in a set.

セット内のアイテムの順序を逆にします。

[`Singleton`](https://docs.fauna.com/fauna/current/api/fql/functions/singleton)

Returns a single-item set containing the provided document reference.

指定されたドキュメント参照を含む単一アイテムセットを返します。

[`Sum`](https://docs.fauna.com/fauna/current/api/fql/functions/sum)

Sums the items in an array or set.

配列またはセット内のアイテムを合計します。

[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)

Returns a set that combines the items in multiple sets.

複数のセットのアイテムを組み合わせたセットを返します。

### [](#timestamp)Timestamp

タイムスタンプ

The Timestamp type stores an instant in time expressed as a calendar date and time of day in UTC.

タイムスタンプタイプは、UTCでのカレンダーの日付と時刻として表される時刻を格納します。

A Timestamp can safely store nanosecond precision, but be careful as many operating system clocks provide only microsecond precision.

タイムスタンプはナノ秒の精度を安全に保存できますが、多くのオペレーティングシステムのクロックはマイクロ秒の精度しか提供しないので注意してください。

Timestamps may be inserted with offsets, but are converted to UTC; the offset component is lost.

タイムスタンプはオフセット付きで挿入できますが、UTCに変換されます。オフセット成分は失われます。

A Timestamp must be within the range `-999999999-01-01T00:00:00Z` - `9999-12-31T23:59:59.999999999Z`.

タイムスタンプは、`-999999-01-01T00:00:00Z` ～ `9999-12-31T23:59:59.99999999Z` の範囲内でなければなりません。

A document’s `ts` field represents the most recent event that modified the document.

ドキュメントのtsフィールドは、ドキュメントを変更した最新のイベントを表します。

A document’s `ts` is a timestamp, but it is not a Timestamp type. `ts` is a [Long](#long) expressing the number of UNIX microseconds since UNIX epoch.

重要
ドキュメントの `ts` はタイムスタンプですが、Timestamp タイプではありません。ts`はUNIXエポックからのUNIXマイクロ秒の数を表す[Long](#long)である。

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

Functions that operate on times or dates:

時間または日付で動作する関数：

[`Date`](https://docs.fauna.com/fauna/current/api/fql/functions/date)

Converts an ISO-8601 string into a Date.

ISO-8601文字列を日付に変換します。

[`DayOfMonth`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofmonth)

Returns the day of the month from a timestamp.

タイムスタンプから日を返します。

[`DayOfWeek`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofweek)

Returns the day of the week from a timestamp.

タイムスタンプから曜日を返します。

[`DayOfYear`](https://docs.fauna.com/fauna/current/api/fql/functions/dayofyear)

Returns the day of the year from a timestamp.

タイムスタンプから年の日を返します。

[`Epoch`](https://docs.fauna.com/fauna/current/api/fql/functions/epoch)

Creates a timestamp from an offset since 1970-01-01 in seconds, milliseconds, microseconds, or nanoseconds.

1970-01-01以降のオフセットからタイムスタンプを秒、ミリ秒、マイクロ秒、またはナノ秒で作成します。

[`Hour`](https://docs.fauna.com/fauna/current/api/fql/functions/hour)

Returns the hour from a timestamp.

タイムスタンプから時間を返します。

[`Minute`](https://docs.fauna.com/fauna/current/api/fql/functions/minute)

Returns the minute from a timestamp.

タイムスタンプから分を返します。

[`Month`](https://docs.fauna.com/fauna/current/api/fql/functions/month)

Returns the month from a timestamp.

タイムスタンプから月を返します。

[`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now)

Returns a timestamp representing the current transaction time.

現在のトランザクション時間を表すタイムスタンプを返します。

[`Second`](https://docs.fauna.com/fauna/current/api/fql/functions/second)

Returns the second from a timestamp.

タイムスタンプから秒を返します。

[`Time`](https://docs.fauna.com/fauna/current/api/fql/functions/time)

Converts `now`, or an ISO-8601 string, into a timestamp.

now、またはISO-8601文字列をタイムスタンプに変換します。

[`TimeAdd`](https://docs.fauna.com/fauna/current/api/fql/functions/timeadd)

Adds an offset to a provided timestamp/date.

指定されたタイムスタンプ/日付にオフセットを追加します。

[`TimeDiff`](https://docs.fauna.com/fauna/current/api/fql/functions/timediff)

Returns the difference between two timestamps/dates, in specified units.

2つのタイムスタンプ/日付の差を指定された単位で返します。

[`TimeSubtract`](https://docs.fauna.com/fauna/current/api/fql/functions/timesubtract)

Subtracts an offset from a provided timestamp/date.

指定されたタイムスタンプ/日付からオフセットを減算します。

[`Year`](https://docs.fauna.com/fauna/current/api/fql/functions/year)

Returns the year from a timestamp.

タイムスタンプから年を返します。

## [](#events)Events

イベント

Strictly speaking, events aren’t types; they are objects that capture the temporal history of documents by tracking all create, update, and delete operations, as snapshots, over a document’s timeline. However, they have a common structure:

厳密に言えば、イベントはタイプではありません。これらは、ドキュメントのタイムライン上でスナップショットとしてすべての作成、更新、および削除操作を追跡することにより、ドキュメントの時間履歴をキャプチャするオブジェクトです。ただし、それらには共通の構造があります。

### [](#document-events)Document events

|Field|Value|Description|
|--|--|--|
|`ref`|[Reference](#ref)|The reference to the document.|
|`action`|[String](#string)|Either "create","update" or "delete".|
|`ts`|[\[long\]](#long)|An integer value representing a UNIX timestamp, with microsecond resolution, at which the event occurred.|
|`data`|[Object](#object)|Varies based on the action.|

|Field|Value|説明|
|--|--|--|
|`ref`|[Reference](#ref)|ドキュメントへの参照。|
|`action`|[String](#string)|「作成」、「更新」、「削除」のいずれか。|
|`ts`|[\[long\]](#long)|イベントが発生した、マイクロ秒の解像度のUNIXタイムスタンプを表す整数値。|
|`data`|[Object](#object)|アクションによって異なります。|

### [](#set-events)Set events

セットする イベント

Set events are represented by an object returned when paginating through an index.

セットする イベントは、インデックスを介してページ付けするときに返されるオブジェクトによって表されます。

|Field|Value|Description|
|--|--|--|
|`ref`|[Reference](#ref)|The reference to the document.|
|`action`|[String](#string)|Either `add` or `remove`.|
|`ts`|[\[long\]](#long)|An integer value representing a UNIX timestamp, with microsecond resolution, at which the event occurred.|
|`data`|[Object](#object)|Exactly as defined by the index’s `terms` field.|

|Field|Value|説明|
|--|--|--|
|`ref`|[Reference](#ref)|ドキュメントへの参照。|
|`action`|[String](#string)|どちらかaddまたはremove。|
|`ts`|[\[long\]](#long)|イベントが発生した、マイクロ秒の解像度のUNIXタイムスタンプを表す整数値。|
|`data`|[Object](#object)|インデックスのtermsフィールドで定義されているとおりです。|

## [](#precedence)Precedence

優先順位

Types have an order of precedence. When comparing values of different types, they are ranked in the following order, from least to greatest.

タイプには優先順位があります。異なるタイプの値を比較する場合、それらは最小から最大の順にランク付けされます。

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

1. 数値（整数と小数：0.5 <1 <1.5 <2）
2. バイト
3. ストリング
4. 配列（文字列のように字句的に順序付けられます）
5. オブジェクト（文字列のように字句的に順序付けられます）
6. 参照
7. タイムスタンプ
8. 日付
9. ブール値（false <true）
10. ヌル
