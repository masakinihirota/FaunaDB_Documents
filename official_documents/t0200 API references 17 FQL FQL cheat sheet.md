FQL cheat sheet | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/cheat_sheet

# FQL cheat sheet

FQLチートシート

The page provides a quick reference to all of the Fauna Query Language functions, group by their major functionality:

このページでは、主な機能ごとにグループ化された、すべてのFaunaクエリ言語機能へのクイックリファレンスを提供しています。

Array

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

Authentication

[`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)

Returns the ref for an AccessProvider.

AccessProviderの参照を返します。

[`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)

Returns an array of refs for all AccessProviders.

すべてのAccessProviderの参照の配列を返します。

[`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)

Create an AccessProvider.

AccessProviderを作成します。

[`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)

Create a key.

キーを作成します。

[`Credentials`](https://docs.fauna.com/fauna/current/api/fql/functions/credentials)

Provides a reference to the internal credentials collection.

内部資格情報コレクションへの参照を提供します。

[`CurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/currentidentity)

Fetches the current identity’s auth token.

現在のIDの認証トークンを取得します。

[`CurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/currenttoken)

Returns a reference to the current authentication key/token/JWT.

現在の認証キー/トークン/ JWTへの参照を返します。

[`HasCurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrenttoken)

Checks whether the current client has an active key/token/JWT.

現在のクライアントにアクティブなキー/トークン/ JWTがあるかどうかを確認します。

[`HasCurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrentidentity)

Checks whether the current client has credentials.

現在のクライアントに資格情報があるかどうかを確認します。

[`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)

Verifies an identity’s credentials.

IDの資格情報を確認します。

[`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)

Retrieves a key based on its secret.

シークレットに基づいてキーを取得します。

[`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys)

Retrieves the keys associated with the specified database.

指定されたデータベースに関連付けられているキーを取得します。

[`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)

Creates an auth token for an identity.

IDの認証トークンを作成します。

[`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)

Logs out of the current (or all) sessions.

現在の（またはすべての）セッションからログアウトします。

[`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)

Provides a reference to the internal tokens collection.

内部トークンコレクションへの参照を提供します。

Basic

基本

[`At`](https://docs.fauna.com/fauna/current/api/fql/functions/at)

Retrieves documents at or before a timestamp.

タイムスタンプ以前のドキュメントを取得します。

[`Call`](https://docs.fauna.com/fauna/current/api/fql/functions/call)

Executes a user-defined function.

ユーザー定義関数を実行します。

[`Do`](https://docs.fauna.com/fauna/current/api/fql/functions/do)

Executes expressions in order.

式を順番に実行します。

[`If`](https://docs.fauna.com/fauna/current/api/fql/functions/if)

Evaluates an expression.

式を評価します。

[`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda)

Executes an anonymous function.

匿名関数を実行します。

[`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let)

Defines a variable’s value.

変数の値を定義します。

[`Var`](https://docs.fauna.com/fauna/current/api/fql/functions/var)

Uses a variable’s value.

変数の値を使用します。

Conversion

[`ToArray`](https://docs.fauna.com/fauna/current/api/fql/functions/toarray)

Converts an object to an array.

オブジェクトを配列に変換します。

[`ToDate`](https://docs.fauna.com/fauna/current/api/fql/functions/todate)

Converts a value to a date.

値を日付に変換します。

[`ToDouble`](https://docs.fauna.com/fauna/current/api/fql/functions/todouble)

Converts a value to a double-precision, floating-point number.

値を倍精度の浮動小数点数に変換します。

[`ToInteger`](https://docs.fauna.com/fauna/current/api/fql/functions/tointeger)

Converts a value to a decimal integer number.

値を10進整数に変換します。

[`ToMicros`](https://docs.fauna.com/fauna/current/api/fql/functions/tomicros)

Converts a value to the number of microseconds since Unix epoch.

値をUnixエポック以降のマイクロ秒数に変換します。

[`ToMillis`](https://docs.fauna.com/fauna/current/api/fql/functions/tomillis)

Converts a value to the number of milliseconds since Unix epoch.

値をUnixエポックからのミリ秒数に変換します。

[`ToNumber`](https://docs.fauna.com/fauna/current/api/fql/functions/tonumber)

Converts a value to a number.

値を数値に変換します。

[`ToObject`](https://docs.fauna.com/fauna/current/api/fql/functions/toobject)

Converts an array to an object.

配列をオブジェクトに変換します。

[`ToSeconds`](https://docs.fauna.com/fauna/current/api/fql/functions/toseconds)

Converts a value to the number of seconds since Unix epoch.

値をUnixエポックからの秒数に変換します。

[`ToString`](https://docs.fauna.com/fauna/current/api/fql/functions/tostring)

Converts a value to a string.

値を文字列に変換します。

[`ToTime`](https://docs.fauna.com/fauna/current/api/fql/functions/totime)

Converts a value to a timestamp.

値をタイムスタンプに変換します。

Logical

論理的

[`And`](https://docs.fauna.com/fauna/current/api/fql/functions/and)

Returns true if all values are true.

すべての値がtrueの場合、trueを返します。

[`ContainsField`](https://docs.fauna.com/fauna/current/api/fql/functions/containsfield)

Returns true when a specific field is found in a document.

ドキュメントで特定のフィールドが見つかった場合にtrueを返します。

[`ContainsPath`](https://docs.fauna.com/fauna/current/api/fql/functions/containspath)

Returns true when a document contains a value at the specified path.

ドキュメントに指定されたパスに値が含まれている場合にtrueを返します。

[`ContainsValue`](https://docs.fauna.com/fauna/current/api/fql/functions/containsvalue)

Returns true when a specific value is found in a document.

ドキュメントで特定の値が見つかった場合にtrueを返します。

[`Equals`](https://docs.fauna.com/fauna/current/api/fql/functions/equals)

Returns true of all values are equivalent.

すべての値が同等である場合にtrueを返します。

[`Exists`](https://docs.fauna.com/fauna/current/api/fql/functions/exists)

Returns true if a document has an event at a specific time.

ドキュメントに特定の時間にイベントがある場合はtrueを返します。

[`GT`](https://docs.fauna.com/fauna/current/api/fql/functions/gt)

Returns true if each value is greater than all following values.

各値が後続のすべての値より大きい場合はtrueを返します。

[`GTE`](https://docs.fauna.com/fauna/current/api/fql/functions/gte)

Returns true if each value is greater than, or equal to, all following values.

各値が後続のすべての値以上の場合にtrueを返します。

[`LT`](https://docs.fauna.com/fauna/current/api/fql/functions/lt)

Returns true if each value is less than all following values.

各値が後続のすべての値よりも小さい場合はtrueを返します。

[`LTE`](https://docs.fauna.com/fauna/current/api/fql/functions/lte)

Returns true if each value is less than, or equal to, all following values.

各値が後続のすべての値以下の場合にtrueを返します。

[`Not`](https://docs.fauna.com/fauna/current/api/fql/functions/not)

Returns the opposite of a boolean expression.

ブール式の反対を返します。

[`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or)

Returns true if any value is true.

いずれかの値がtrueの場合、trueを返します。

Math

数学

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

Miscellaneous

その他

[`Abort`](https://docs.fauna.com/fauna/current/api/fql/functions/abort)

Terminates the current transaction.

現在のトランザクションを終了します。

[`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection)

Returns the ref for a collection.

コレクションの参照を返します。

[`Collections`](https://docs.fauna.com/fauna/current/api/fql/functions/collections)

Returns an array of refs of all collections.

すべてのコレクションの参照の配列を返します。

[`Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database)

Returns the ref for a database.

データベースの参照を返します。

[`Databases`](https://docs.fauna.com/fauna/current/api/fql/functions/databases)

Returns an array of refs of all databases.

すべてのデータベースの参照の配列を返します。

[`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents)

Returns the set of documents within a collection.

コレクション内のドキュメントのセットを返します。

[`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function)

Returns the ref for a user-defined function.

ユーザー定義関数の参照を返します。

[`Functions`](https://docs.fauna.com/fauna/current/api/fql/functions/functions)

Returns an array of refs of all user-defined functions.

すべてのユーザー定義関数の参照の配列を返します。

[`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex)

Returns the ref for an index.

インデックスの参照を返します。

[`Indexes`](https://docs.fauna.com/fauna/current/api/fql/functions/indexes)

Returns an array of refs for all indexes.

すべてのインデックスの参照の配列を返します。

[`MoveDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/movedatabase)

Moves a database into another, parent database.

データベースを別の親データベースに移動します。

[`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid)

Generates a unique 64-bit number, to use as a document ID.

ドキュメントIDとして使用する一意の64ビット番号を生成します。

[`Query`](https://docs.fauna.com/fauna/current/api/fql/functions/query)

Defers execution of a Lambda function.

Lambda関数の実行を延期します。

[`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref)

Returns the reference to a specific document in a collection.

コレクション内の特定のドキュメントへの参照を返します。

[`Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role)

Returns the ref for a user-defined role.

ユーザー定義のロールの参照を返します。

[`Roles`](https://docs.fauna.com/fauna/current/api/fql/functions/roles)

Returns an array of refs of all user-defined roles.

すべてのユーザー定義ロールの参照の配列を返します。

Object

オブジェクト

[`Merge`](https://docs.fauna.com/fauna/current/api/fql/functions/merge)

Merge two objects into one, with an optional resolver lambda.

オプションのリゾルバーラムダを使用して、2つのオブジェクトを1つにマージします。

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

ドキュメントから特定のフィールド値を取得します。

[`ToArray`](https://docs.fauna.com/fauna/current/api/fql/functions/toarray)

オブジェクトを配列に変換します。

Converts an object to an array.

Read

読む

[`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get)

Retrieves the document for the specified reference.

指定された参照のドキュメントを取得します。

[`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)

Retrieves a key based on its secret.

シークレットに基づいてキーを取得します。

[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)

Returns a subset of query results.

クエリ結果のサブセットを返します。

[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select)

Retrieves a specific field value from a document.

ドキュメントから特定のフィールド値を取得します。

Set

セット

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

String

ストリング

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

Temporality

テンポラリティ

[`Events`](https://docs.fauna.com/fauna/current/api/fql/functions/events)

Returns the set of events describing the history of a set or document.

セットまたはドキュメントの履歴を説明するイベントのセットを返します。

[`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)

Add an event to a document’s history.

ドキュメントの履歴にイベントを追加します。

[`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)

Remove an event from a document’s history.

ドキュメントの履歴からイベントを削除します。

Time and Date

日時

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

Type checks

タイプチェック

[`IsArray`](https://docs.fauna.com/fauna/current/api/fql/functions/isarray)

Tests whether a value is an array.

値が配列であるかどうかをテストします。

[`IsBoolean`](https://docs.fauna.com/fauna/current/api/fql/functions/isboolean)

Tests whether a value is a boolean.

値がブール値であるかどうかをテストします。

[`IsBytes`](https://docs.fauna.com/fauna/current/api/fql/functions/isbytes)

Tests whether a value is a group of bytes.

値がバイトのグループであるかどうかをテストします。

[`IsCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/iscollection)

Tests whether a value is a collection ref.

値がコレクション参照であるかどうかをテストします。

[`IsCredentials`](https://docs.fauna.com/fauna/current/api/fql/functions/iscredentials)

Tests whether a value is a credentials object.

値が資格情報オブジェクトであるかどうかをテストします。

[`IsDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/isdatabase)

Tests whether a value is a database ref.

値がデータベース参照であるかどうかをテストします。

[`IsDate`](https://docs.fauna.com/fauna/current/api/fql/functions/isdate)

Tests whether a value is a date.

値が日付であるかどうかをテストします。

[`IsDoc`](https://docs.fauna.com/fauna/current/api/fql/functions/isdoc)

Tests whether a value is a document.

値がドキュメントであるかどうかをテストします。

[`IsDouble`](https://docs.fauna.com/fauna/current/api/fql/functions/isdouble)

Tests whether a value is a double-precision, floating point number.

値が倍精度の浮動小数点数であるかどうかをテストします。

[`IsFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/isfunction)

Tests whether a value is a function.

値が関数であるかどうかをテストします。

[`IsIndex`](https://docs.fauna.com/fauna/current/api/fql/functions/isindex)

Tests whether a value is an index ref.

値がインデックス参照であるかどうかをテストします。

[`IsInteger`](https://docs.fauna.com/fauna/current/api/fql/functions/isinteger)

Tests whether a value is an integer number.

値が整数であるかどうかをテストします。

[`IsKey`](https://docs.fauna.com/fauna/current/api/fql/functions/iskey)

Tests whether a value is a key ref.

値がキー参照であるかどうかをテストします。

[`IsLambda`](https://docs.fauna.com/fauna/current/api/fql/functions/islambda)

Tests whether a value is a Lambda function.

値がLambda関数であるかどうかをテストします。

[`IsNull`](https://docs.fauna.com/fauna/current/api/fql/functions/isnull)

Tests whether a value is `null`.

値がであるかどうかをテストしますnull。

[`IsNumber`](https://docs.fauna.com/fauna/current/api/fql/functions/isnumber)

Tests whether a value is numeric, which includes integers and doubles.

値が整数であるかどうかをテストします。これには整数と倍精度浮動小数点数が含まれます。

[`IsObject`](https://docs.fauna.com/fauna/current/api/fql/functions/isobject)

Tests whether a value is an object.

値がオブジェクトであるかどうかをテストします。

[`IsRef`](https://docs.fauna.com/fauna/current/api/fql/functions/isref)

Tests whether a value is a reference.

値が参照であるかどうかをテストします。

[`IsRole`](https://docs.fauna.com/fauna/current/api/fql/functions/isrole)

Tests whether a value is a role.

値がロールであるかどうかをテストします。

[`IsSet`](https://docs.fauna.com/fauna/current/api/fql/functions/isset)

Tests whether a value is a set.

値がセットであるかどうかをテストします。

[`IsString`](https://docs.fauna.com/fauna/current/api/fql/functions/isstring)

Tests whether a value is a string.

値が文字列であるかどうかをテストします。

[`IsTimestamp`](https://docs.fauna.com/fauna/current/api/fql/functions/istimestamp)

Tests whether a value is a timestamp.

値がタイムスタンプであるかどうかをテストします。

[`IsToken`](https://docs.fauna.com/fauna/current/api/fql/functions/istoken)

Tests whether a value is a token ref.

値がトークン参照であるかどうかをテストします。

Write

書く

[`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)

Create a document in a collection.

コレクションにドキュメントを作成します。

[`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)

Create an AccessProvider.

AccessProviderを作成します。

[`CreateCollection`](https://docs.fauna.com/fauna/current/api/fql/functions/createcollection)

Create a collection.

コレクションを作成します。

[`CreateDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/createdatabase)

Create a database.

データベースを作成します。

[`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction)

Create a user-defined function.

ユーザー定義関数を作成します。

[`CreateIndex`](https://docs.fauna.com/fauna/current/api/fql/functions/createindex)

Create an index.

インデックスを作成します。

[`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)

Create a key.

キーを作成します。

[`CreateRole`](https://docs.fauna.com/fauna/current/api/fql/functions/createrole)

Create a user-defined role.

ユーザー定義の役割を作成します。

[`Delete`](https://docs.fauna.com/fauna/current/api/fql/functions/delete)

Remove a document, key, index, collection, or database.

ドキュメント、キー、インデックス、コレクション、またはデータベースを削除します。

[`Insert`](https://docs.fauna.com/fauna/current/api/fql/functions/insert)

Add an event to a document’s history.

ドキュメントの履歴にイベントを追加します。

[`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove)

Remove an event from a document’s history.

ドキュメントの履歴からイベントを削除します。

[`Replace`](https://docs.fauna.com/fauna/current/api/fql/functions/replace)

Replace an document with a new document.

ドキュメントを新しいドキュメントに置き換えます。

[`Update`](https://docs.fauna.com/fauna/current/api/fql/functions/update)

Revise specific fields within a document.

ドキュメント内の特定のフィールドを修正します。

