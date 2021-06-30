# Temporal database

# 時間軸のデータベース

Database that stores information relating to past, present and future time

過去・現在・未来の時間に関する情報を格納するデータベース

A **temporal database** stores data relating to time instances. It offers temporal data types and stores information relating to past, present and future time. Temporal databases could be uni-temporal, bi-temporal or tri-temporal.

**時間データベース**は、時間インスタンスに関連するデータを格納します。時間的なデータタイプを提供し、過去、現在、未来の時間に関連する情報を保存します。時間データベースは一時間、二時間、三時間のいずれかである。

More specifically the temporal aspects usually include [valid time](https://en.wikipedia.org/wiki/Valid_time), [transaction time](https://en.wikipedia.org/wiki/Transaction_time "Transaction time") or [decision time](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "Decision time (page does not exist)").

より具体的には、時間的側面は通常、[有効時間](https://en.wikipedia.org/wiki/Valid_time)、[取引時間](https://en.wikipedia.org/wiki/Transaction_time "取引時間")または[決定時間](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "決定時間(ページが存在しない)")を含む。

-   **Valid time** is the time period during which a fact is true in the real world.
-   **Transaction time** is the time at which a fact was recorded in the database.
-   **Decision time** is the time at which the decision was made about the fact.

- 有効時間**とは、ある事実が現実の世界で真実である期間のことです。
- トランザクションタイム**は、事実がデータベースに記録された時間です。
- **決定時刻** は、その事実について決定がなされた時刻である。

## Contents

-   [1 Uni-Temporal](#Uni-Temporal)
-   [2 Bi-Temporal](#Bi-Temporal)
-   [3 Tri-Temporal](#Tri-Temporal)
-   [4 Features](#Features)
-   [5 History](#History)
-   [6 Example](#Example)
    -   [6.1 Using a non-temporal database](#Using_a_non-temporal_database)
    -   [6.2 Using a single axis: valid time or transaction time](https://en.wikipedia.org/wiki/Temporal_database#Using_a_single_axis:_valid_time_or_transaction_time)
    -   [6.3 Using two axes: valid time and transaction time](https://en.wikipedia.org/wiki/Temporal_database#Using_two_axes:_valid_time_and_transaction_time)
    -   [6.4 Using three axes: valid time, decision time, and transaction time](https://en.wikipedia.org/wiki/Temporal_database#Using_three_axes:_valid_time,_decision_time,_and_transaction_time)
-   [7 Bitemporal Modelling](#Bitemporal_Modelling)
-   [8 Schema evolution](#Schema_evolution)
-   [9 Implementations in notable products](#Implementations_in_notable_products)
    -   [9.1 Alternatives](#Alternatives)
-   [10 Further reading](#Further_reading)
-   [11 See also](#See_also)
-   [12 References](#References)
-   [13 External links](#External_links)

## 内容

-   [1 ユニテンポラル](#Uni-Temporal)
-   [2 バイテンポラル](#Bi-Temporal)
-   [3 トライテンポラル](#Tri-Temporal)
-   [4 特徴](#Features)
-   [5 歴史](#History)
-   [6 例](#Example)
    -   [6.1 非時制データベースの使用](#Using_a_non-temporal_database)
    -   [6.2 単一軸の使用：有効時間またはトランザクション時間](https://en.wikipedia.org/wiki/Temporal_database#Using_a_single_axis:_valid_time_or_transaction_time)
    -   [6.3 2つの軸を使用：有効時間とトランザクション時間](https://en.wikipedia.org/wiki/Temporal_database#Using_two_axes:_valid_time_and_transaction_time)
    -   [6.4 3つの軸を使用：有効時間、決定時間、およびトランザクション時間](https://en.wikipedia.org/wiki/Temporal_database#Using_three_axes:_valid_time,_decision_time,_and_transaction_time)
-   [7 バイテンポラルモデリング](#Bitemporal_Modelling)
-   [8 スキーマの進化](#Schema_evolution)
-   [9 注目すべき製品の実装](#Implementations_in_notable_products)
    -   [9.1 代替案](#Alternatives)
-   [10 参考文献](#Further_reading)
-   [11 も参照してください](#See_also)
-   [12 参考文献](#References)


## Uni-Temporal\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=1 "Edit section: Uni-Temporal")\]

A uni-temporal database has one axis of time, either the validity range or the system time range.

一時間性データベースは、時間の軸が有効範囲かシステム時間範囲のどちらか一つです。

ユニテンポラルデータベースには、有効範囲またはシステム時間範囲のいずれかの1つの時間軸があります。

## Bi-Temporal\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=2 "Edit section: Bi-Temporal")\]

A bi-temporal database has two axis of time:

Bi-Temporalデータベースは、2つの時間軸を持ちます。
バイテンポラルデータベースには、次の2つの時間軸があります。

-   valid time
-   transaction time or decision time

- 有効時間
- トランザクション時間または決定時間

## Tri-Temporal\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=3 "Edit section: Tri-Temporal")\]

A tri-temporal database has three axes of time:

Tri-Temporalデータベースは3つの時間軸を持つ。

-   valid time
-   transaction time
-   decision time

- 有効時間
- 取引時間
- 決定時間

This approach introduces additional complexities.

このアプローチは、さらなる複雑さをもたらします。

Temporal databases are in contrast to [current databases](https://en.wikipedia.org/wiki/Current_database "Current database") (not to be confused with currently available databases), which store only facts which are believed to be true at the current time.

時間型データベースは、現在の時点で真実であると信じられている事実のみを保存する[現在のデータベース](https://en.wikipedia.org/wiki/Current_database "現在のデータベース")とは対照的である(現在利用可能なデータベースと混同しないように)。

## Features\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=4 "Edit section: Features")\]

## Features\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=4 "Edit section: 特徴」をご覧ください。]

Temporal databases support managing and accessing temporal data by providing one or more of the following features:[\[1\]](#cite_note-SQL2011-1)[\[2\]](#cite_note-DB2-2)

Temporal Databaseは、以下のような1つ以上の機能を提供することで、時間データの管理とアクセスをサポートします。

-   A time period datatype, including the ability to represent time periods with no end (infinity or forever)
-   The ability to define valid and transaction time period attributes and bitemporal relations
-   System-maintained transaction time
-   Temporal [primary keys](https://en.wikipedia.org/wiki/Primary_keys "Primary keys"), including non-overlapping period constraints
-   Temporal constraints, including non-overlapping uniqueness and [referential integrity](https://en.wikipedia.org/wiki/Referential_integrity "Referential integrity")
-   Update and deletion of temporal records with automatic splitting and coalescing of time periods
-   Temporal queries at current time, time points in the past or future, or over durations
-   Predicates for querying time periods, often based on [Allen’s interval relations](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra#Relations "Allen's interval algebra")

- 終わりのない期間（無限または永遠）を表現する機能を含む、期間データタイプ。
- 有効時間帯、トランザクション時間帯の属性およびビット時間関係を定義する機能
- システムが保持するトランザクション時間
- 重複しない期間の制約を含む、時間的[主キー](https://en.wikipedia.org/wiki/Primary_keys "主キー")
- 重複しない一意性および[参照整合性]（https://en.wikipedia.org/wiki/Referential_integrity "Referential Integrity"）を含む時間的な制約
- 期間の自動分割・合体による時間的レコードの更新・削除
- 現在の時間、過去や未来の時点、または期間を対象とした時間的な問い合わせ
- 時間帯を照会するための述語、多くは[Allenの間隔関係]に基づいている(https://en.wikipedia.org/wiki/Allen%27s_interval_algebra#Relations "Allenの間隔代数")

## History\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=5 "Edit section: History")\]

With the development of SQL and its attendant use in real-life applications, database users realized that when they added date columns to key fields, some issues arose. For example, if a table has a primary key and some attributes, adding a date to the primary key to track historical changes can lead to creation of more rows than intended. Deletes must also be handled differently when rows are tracked in this way. In 1992, this issue was recognized but standard database theory was not yet up to resolving this issue, and neither was the then-newly formalized standard.

SQLが開発され、実際のアプリケーションで使用されるようになると、データベースユーザーは、キーフィールドに日付列を追加すると、いくつかの問題が発生することに気づきました。
例えば、テーブルに主キーといくつかの属性がある場合、過去の変更を追跡するために主キーに日付を追加すると、意図した以上の行が作成されてしまいます。また、このような方法で行を追跡する場合、削除の処理も異なるものにしなければなりません。1992年当時、この問題は認識されていましたが、標準的なデータベース理論はまだこの問題を解決するまでには至っておらず、当時新たに形式化された規格もありませんでした。

[Richard Snodgrass](https://en.wikipedia.org/wiki/Richard_Snodgrass "Richard Snodgrass") proposed in 1992 that temporal extensions to SQL be developed by the temporal database community. In response to this proposal, a committee was formed to design extensions to the 1992 edition of the SQL standard (ANSI X3.135.-1992 and ISO/IEC 9075:1992); those extensions, known as TSQL2, were developed during 1993 by this committee.[\[3\]](#cite_note-snodgrass9-3) In late 1993, Snodgrass presented this work to the group responsible for the American National Standard for Database Language SQL, ANSI Technical Committee X3H2 (now known as NCITS H2). The preliminary language specification appeared in the March 1994 ACM SIGMOD Record. Based on responses to that specification, changes were made to the language, and the definitive version of the TSQL2 Language Specification was published in September, 1994[\[4\]](#cite_note-4)

[Richard Snodgrass](https://en.wikipedia.org/wiki/Richard_Snodgrass "Richard Snodgrass")は、1992年にSQLの時間的拡張を時間的データベースコミュニティで開発することを提案しました。この提案を受けて、1992年版のSQL標準（ANSI X3.135.-1992およびISO/IEC 9075:1992）の拡張を設計するための委員会が結成され、TSQL2として知られるこれらの拡張は、この委員会によって1993年に開発されました[˶‾᷄ -̫ ‾᷅˵]（#cite_notesnodgrass9-3）1993年後半、Snodgrassはこの作業を、データベース言語の米国国家標準SQLを担当するグループであるANSI Technical Committee X3H2（現在はNCITS H2）に提出しました。そして、1994年3月のACM SIGMOD Recordに予備的な言語仕様が掲載されました。この仕様書に対する反応をもとに言語の変更が行われ、1994年9月に最終版のTSQL2言語仕様書が発行された(#cite_note-4)

An attempt was made to incorporate parts of TSQL2 into the new SQL standard [SQL:1999](https://en.wikipedia.org/wiki/SQL:1999 "SQL:1999"), called SQL3. Parts of TSQL2 were included in a new substandard of SQL3, ISO/IEC 9075-7, called SQL/Temporal.[\[3\]](#cite_note-snodgrass9-3) The TSQL2 approach was heavily criticized by [Chris Date](https://en.wikipedia.org/wiki/Chris_Date "Chris Date") and [Hugh Darwen](https://en.wikipedia.org/wiki/Hugh_Darwen "Hugh Darwen").[\[5\]](#cite_note-5) The ISO project responsible for temporal support was canceled near the end of 2001.

TSQL2の一部をSQL3と呼ばれる新しいSQL規格[SQL:1999](https://en.wikipedia.org/wiki/SQL:1999 "SQL:1999")に取り入れる試みがなされた。TSQL2の一部はSQL3の新しいサブスタンダードであるISO/IEC 9075-7のSQL/Temporalに含まれている。[˶‾᷄ -̫ ‾᷅˵](#cite_notes-nodgrass9-3) TSQL2のアプローチは[Chris Date](https://en.wikipedia.org/wiki/Chris_Date "Chris Date")と[Hugh Darwen](https://en.wikipedia.org/wiki/Hugh_Darwen "Hugh Darwen")によって激しく批判された。[˶‾᷅˵](#cite_notes-5) 時間的サポートを担当するISOプロジェクトは2001年末に中止された。

As of December 2011, ISO/IEC 9075, Database Language [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011") Part 2: SQL/Foundation included clauses in table definitions to define "application-time period tables" ([valid time](https://en.wikipedia.org/wiki/Valid_time "Valid time") tables), "system-versioned tables" ([transaction time](https://en.wikipedia.org/wiki/Transaction_time "Transaction time") tables) and "system-versioned application-time period tables" ([bitemporal](https://en.wikipedia.org/wiki/Bitemporal "Bitemporal") tables). A substantive difference between the TSQL2 proposal and what was adopted in SQL:2011 is that there are no hidden columns in the SQL:2011 treatment, nor does it have a new data type for intervals; instead two date or timestamp columns can be bound together using a `PERIOD FOR` declaration. Another difference is replacement of the controversial (prefix) statement modifiers from TSQL2 with a set of temporal predicates.[\[1\]](#cite_note-SQL2011-1)

2011年12月現在、ISO/IEC 9075, Database Language [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011") Part 2: SQL/Foundationでは、テーブル定義の中に、「アプリケーション時間帯テーブル」([valid time](https://en.wikipedia.org/wiki/Valid_time "Valid time") tables)、「システムバージョンテーブル」([transaction time](https://en.wikipedia.org/wiki/Transaction_time "Transaction time") tables)、「システムバージョンのアプリケーション時間帯テーブル」([bitemporal](https://en.wikipedia.org/wiki/Bitemporal "Bitemporal") tables)を定義する条項が含まれています。TSQL2の提案とSQL:2011で採用されたものとの実質的な違いは、SQL:2011の処理には隠し列がなく、間隔を表す新しいデータ型もありません。その代わりに、2つの日付またはタイムスタンプ列は、`PERIOD FOR`宣言を使用して結合することができます。もう1つの違いは、TSQL2で問題となっていたステートメント修飾子（プレフィックス）が、時間的述語のセットに置き換えられていることです。

Other features of [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011") standard related to temporal databases are automatic time period splitting, temporal primary keys, temporal referential integrity, temporal predicates with [Allen's interval algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra "Allen's interval algebra") and time-sliced and sequenced queries.

[SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011")規格のテンポラルデータベースに関するその他の特徴は、自動時間帯分割、テンポラル主キー、テンポラル参照整合性、[Allen's interval algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra "Allen's interval algebra")を使用したテンポラル述語、時間を分割した順序付きのクエリです。

## Example\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=6 "Edit section: Example")\]

For illustration, consider the following short biography of a fictional man, John Doe:

例として、次のような架空の男性、ジョン・ドウの略歴を考えてみましょう。

John Doe was born on April 3, 1975 in the Kids Hospital of Medicine County, as son of Jack Doe and Jane Doe who lived in Smallville. Jack Doe proudly registered the birth of his first-born on April 4, 1975 at the Smallville City Hall. John grew up as a joyful boy, turned out to be a brilliant student and graduated with honors in 1993. After graduation, he went to live on his own in Bigtown. Although he moved out on August 26, 1994, he forgot to register the change of address officially. It was only at the turn of the seasons that his mother reminded him that he had to register, which he did a few days later on December 27, 1994. Although John had a promising future, his story ends tragically. John Doe was accidentally hit by a truck on April 1, 2001. The coroner reported his date of death on the very same day.

John Doe
名無しの権兵衛

ジョン・ドウは、スモールビルに住むジャック・ドウとジェーン・ドウの息子として、1975年4月3日にメディスン・カウンティのキッズ・ホスピタルで生まれました。ジャック・ドウは、1975年4月4日にスモールビル市役所で堂々と長男の出生届を出した。喜びに満ちた少年として育ったジョンは、優秀な学生となり、1993年に優秀な成績で卒業した。卒業後は、ビッグタウンで一人暮らしを始めた。1994年8月26日に引っ越しをしたのだが、住所変更の手続きを忘れていた。季節の変わり目に母親に言われて、数日後の12月27日に登録を済ませた。将来を嘱望されていたジョンだが、彼の物語は悲劇的な結末を迎える。2001年4月1日、ジョン・ドウは誤ってトラックに轢かれてしまったのである。検視官はその日のうちに彼の死亡日を報告しました。

### Using a non-temporal database\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=7 "Edit section: Using a non-temporal database")\]

非時空間データベースの利用

To store the life of John Doe in a current (non-temporal) database we use a table _Person (Name, Address)_. (In order to simplify _Name_ is defined as the [primary key](https://en.wikipedia.org/wiki/Primary_key "Primary key") of _Person_.)

John Doe の人生を現在の (非一時的な) データベースに保存するには、_Person (Name, Address)_ というテーブルを使用します (簡単にするために、_Name_ は _Person_ の [primary key](https://en.wikipedia.org/wiki/Primary_key "Primary key") として定義されます)。

John's father officially reported his birth on April 4, 1975. On this date a Smallville official inserted the following entry in the database: `Person(John Doe, Smallville)`. Note that the date itself is not stored in the database.

ジョンの父親は、1975年4月4日にジョンの誕生を公式に報告しました。この日、スモールビルの関係者は、データベースに次のようなエントリを挿入した。Person(John Doe, Smallville)`. なお、この日付自体はデータベースに保存されていない。

After graduation, John moves out, but forgets to register his new address. John's entry in the database is not changed until December 27, 1994, when he finally reports it. A Bigtown official updates his address in the database. The _Person_ table now contains `Person(John Doe, Bigtown)`. Note that the information of John living in Smallville has been overwritten, so it is no longer possible to retrieve that information from the database. An official accessing the database on December 28, 1994 would be told that John lives in Bigtown. More technically: if a database administrator ran the query `SELECT ADDRESS FROM PERSON WHERE NAME='John Doe'` on December 26, 1994, the result would be `Smallville`. Running the same query 2 days later would result in `Bigtown`.

卒業後、Johnは引っ越しをしましたが、新しい住所を登録するのを忘れてしまいました。1994年12月27日にようやく報告されるまで、ジョンのデータベースへの登録は変更されない。ビッグタウンの職員がデータベースの住所を更新しました。これで_Person_テーブルには`Person(John Doe, Bigtown)`が入りました。なお、ジョンがスモールビルに住んでいるという情報は上書きされているので、データベースからその情報を取り出すことはできなくなっています。1994年12月28日にデータベースにアクセスした職員は、ジョンがビッグタウンに住んでいることを知ることになる。もっと厳密に言うと、データベース管理者が1994年12月26日に「SELECT ADDRESS FROM PERSON WHERE NAME='John Doe'`」というクエリを実行した場合、結果は「Smallville」となります。2日後に同じクエリを実行すると、結果は「ビッグタウン」となる。

Until his death, the database would state that he lived in Bigtown. On April 1, 2001, the coroner deletes the John Doe entry from the database. After this, running the above query would return no result at all.

彼が亡くなるまで、データベースは彼がビッグタウンに住んでいたことを示していた。2001年4月1日に検視官がデータベースからJohn Doeの項目を削除します。これ以降、上記のクエリを実行しても、結果は全く得られません。

---

Date

Real world event

Database Action

What the database shows

April 3, 1975

John is born

Nothing

There is no person called John Doe

April 4, 1975

John's father officially reports John's birth

Inserted:Person(John Doe, Smallville)

John Doe lives in Smallville

August 26, 1994

After graduation, John moves to Bigtown, but forgets to register his new address

Nothing

John Doe lives in Smallville

December 26, 1994

Nothing

Nothing

John Doe lives in Smallville

December 27, 1994

John registers his new address

Updated:Person(John Doe, Bigtown)

John Doe lives in Bigtown

April 1, 2001

John dies

Deleted:Person(John Doe)

There is no person called John Doe

### Using a single axis: valid time or transaction time\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=8 "Edit section: Using a single axis: valid time or transaction time")\]

Main article: [Valid time](https://en.wikipedia.org/wiki/Valid_time "Valid time")

[Valid time](https://en.wikipedia.org/wiki/Valid_time "Valid time") is the time for which a fact is true in the real world. A valid time period may be in the past, span the current time, or occur in the future.

[有効時間](https://en.wikipedia.org/wiki/Valid_time "Valid time")とは、ある事実が現実世界で真となる時間のことである。有効な時間は、過去にあったり、現在の時間にあったり、未来にあったりします。

For the example above, to record valid time, the _Person_ table has two fields added, _Valid-From_ and _Valid-To_. These specify the period when a person's address is valid in the real world. On April 4, 1975 John's father registered his son's birth. An official then inserts a new entry into the database stating that John lives in Smallville from April 3. Note that although the data was inserted on the 4th, the database states that the information is valid since the 3rd. The official does not yet know if or when John will move to another place, so the _Valid-To_ field is set to [infinity](https://en.wikipedia.org/wiki/Infinity "Infinity") (∞). The entry in the database is:

上の例では、有効期限を記録するために、_Person_テーブルに_Valid-From_と_Valid-To_という2つのフィールドを追加しています。これらは、ある人物の住所が現実世界で有効な期間を指定するものです。1975年4月4日、ジョンの父親は息子の出生を登録した。その後、職員が「ジョンは4月3日からスモールビルに住んでいる」という新しいエントリーをデータベースに挿入する。なお、データが挿入されたのは4日ですが、データベースには3日からの情報が有効であると記載されています。関係者は、ジョンがいつ別の場所に移動するかをまだ知らないので、_Valid-To_フィールドは[infinity](https://en.wikipedia.org/wiki/Infinity "Infinity") (∞)に設定されています。データベースに登録されている項目は

Person(John Doe, Smallville, 3-Apr-1975, ∞).

On December 27, 1994 John reports his new address in Bigtown where he has been living since August 26, 1994. A new database entry is made to record this fact:

1994年12月27日、ジョンは1994年8月26日から住んでいるビッグタウンの新住所を報告する。この事実を記録するために、新しいデータベース・エントリーが作られる。

Person(John Doe, Bigtown, 26-Aug-1994, ∞).

The original entry `Person (John Doe, Smallville, 3-Apr-1975, ∞)` is not deleted, but has the _Valid-To_ attribute updated to reflect that it is now known that John stopped living in Smallville on August 26, 1994. The database now contains two entries for John Doe

オリジナルのエントリー`Person (John Doe, Smallville, 3-Apr-1975, ∞)`は削除されず、_Valid-To_属性が更新され、ジョンが1994年8月26日にスモールビルに住むのをやめたことがわかったことが反映されています。これでデータベースにはJohn Doeに関する2つのエントリーが含まれることになります。

Person(John Doe, Smallville, 3-Apr-1975, 26-Aug-1994).
Person(John Doe, Bigtown, 26-Aug-1994, ∞).

When John dies his current entry in the database is updated stating that John does not live in Bigtown any longer. The database now looks like this

Person(John Doe, Smallville, 3-Apr-1975, 26-Aug-1994).
Person(John Doe, Bigtown, 26-Aug-1994, 1-Apr-2001).

### Using two axes: valid time and transaction time\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=9 "Edit section: Using two axes: valid time and transaction time")\]

Main article: [Transaction time](https://en.wikipedia.org/wiki/Transaction_time "Transaction time")

[Transaction time](https://en.wikipedia.org/wiki/Transaction_time "Transaction time") records the time period during which a database entry is accepted as correct. This enables queries that show the state of the database at a given time. Transaction time periods can only occur in the past or up to the current time. In a transaction time table, records are never deleted. Only new records can be inserted, and existing ones updated by setting their transaction end time to show that they are no longer current.

[トランザクションタイム](https://en.wikipedia.org/wiki/Transaction_time "Transaction time")は、データベースのエントリが正しいと認められる期間を記録します。これにより、特定の時間におけるデータベースの状態を示すクエリが可能になります。トランザクション時間の期間は、過去または現在の時間までにしか発生しません。トランザクション時間表では、レコードは決して削除されません。新しいレコードのみが挿入され、既存のレコードはトランザクション終了時間を設定して最新ではないことを示すことで更新されます。

To enable transaction time in the example above, two more fields are added to the Person table: _Transaction-From_ and _Transaction-To_. _Transaction-From_ is the time a transaction was made, and _Transaction-To_ is the time that the transaction was superseded (which may be infinity if it has not yet been superseded). This makes the table into a [bitemporal table](#Bitemporal_relations).

上記の例でトランザクションタイムを有効にするには、Personテーブルに2つのフィールドを追加します。_Transaction-From_と_Transaction-To_です。Transaction-From_はトランザクションが行われた時間で、_Transaction-To_はそのトランザクションが上書きされた時間です（まだ上書きされていない場合は無限大になる可能性があります）。これにより、このテーブルは[bitemporal table](#Bitemporal_relations)となります。

What happens if the person's address as stored in the database is incorrect? Suppose an official accidentally entered the wrong address or date? Or, suppose the person lied about their address for some reason. Upon discovery of the error, the officials update the database to correct the information recorded.

データベースに保存されている人物の住所が間違っていた場合はどうなりますか？役人が誤って住所や日付を入力してしまったとしたら？あるいは、その人が何らかの理由で住所を偽っていたとします。誤りを発見した職員は、データベースを更新して記録された情報を修正する。

For example, from 1-Jun-1995 to 3-Sep-2000, John Doe moved to Beachy. But to avoid paying Beachy's exorbitant residence tax, he never reported it to the authorities. Later during a tax investigation, it is discovered on 2-Feb-2001 that he was in fact in Beachy during those dates. To record this fact, the existing entry about John living in Bigtown must be split into two separate records, and a new record inserted recording his residence in Beachy. The database would then appear as follows:

例えば、1995年6月1日から2000年9月3日まで、John DoeはBeachyに引っ越しました。しかし、ビーチーの法外な住民税の支払いを避けるために、彼は当局に報告しなかった。その後の税務調査で、2001年2月2日に、これらの日程で実際にビーチーに滞在していたことが判明しました。この事実を記録するためには、ジョンがビッグタウンに住んでいたという既存のエントリーを2つに分割し、ビーチーに住んでいたことを記録する新しいレコードを挿入する必要があります。そうすると、データベースは次のようになります。

Person(John Doe, Smallville, 3-Apr-1975, 26-Aug-1994).
Person(John Doe, Bigtown, 26-Aug-1994, 1-Jun-1995).
Person(John Doe, Beachy, 1-Jun-1995, 3-Sep-2000).
Person(John Doe, Bigtown, 3-Sep-2000, 1-Apr-2001).

However, this leaves no record that the database ever claimed that he lived in Bigtown during 1-Jun-1995 to 3-Sep-2000. This might be important to know for auditing reasons, or to use as evidence in the official's tax investigation. Transaction time allows capturing this changing knowledge in the database, since entries are never directly modified or deleted. Instead, each entry records when it was entered and when it was superseded (or logically deleted). The database contents then look like this:

しかし、これでは、データベースが、1995年6月1日から2000年9月3日までの間、ビッグタウンに住んでいたと主張した記録は残っていません。このことは、監査上の理由で知っておく必要があるかもしれませんし、役人の税務調査の証拠として使うこともできます。トランザクションタイムは、エントリが直接変更されたり削除されたりすることがないため、このような変化する知識をデータベースに取り込むことができます。各エントリには、いつ入力されたか、いつ上書きされたか（または論理的に削除されたか）が記録されます。データベースの内容は次のようになります。

Name, City, Valid From, Valid Till, Entered, Superseded

Person(John Doe, Smallville, 3-Apr-1975,  ∞,           4-Apr-1975,  27-Dec-1994).
Person(John Doe, Smallville, 3-Apr-1975,  26-Aug-1994, 27-Dec-1994, ∞          ).
Person(John Doe, Bigtown,    26-Aug-1994, ∞,           27-Dec-1994, 2-Feb-2001 ).
Person(John Doe, Bigtown,    26-Aug-1994, 1-Jun-1995,  2-Feb-2001,  ∞          ).
Person(John Doe, Beachy,     1-Jun-1995,  3-Sep-2000,  2-Feb-2001,  ∞          ).
Person(John Doe, Bigtown,    3-Sep-2000,  ∞,           2-Feb-2001,  1-Apr-2001 ).
Person(John Doe, Bigtown,    3-Sep-2000,  1-Apr-2001,  1-Apr-2001,  ∞          ).

The database records not only what happened in the real world, but also what was officially recorded at different times.

### Using three axes: valid time, decision time, and transaction time\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=10 "Edit section: Using three axes: valid time, decision time, and transaction time")\]

Main article: [Decision time](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "Decision time (page does not exist)")


[主な記事 決定時間](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "決定時間(ページは存在しません)")

[Decision time](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "Decision time (page does not exist)") is an alternative to the transaction time period for recording the time at which a database entry may be accepted as correct. This enables queries that show the officially recognized facts at a given time, even if there was a delay in committing those facts to the database. Support for decision time preserves the entire history and prevents the loss of information during updates.[\[6\]](#cite_note-6)

[Decision time](https://en.wikipedia.org/w/index.php?title=Decision_time&action=edit&redlink=1 "Decision time (page does not exist)")は、データベースエントリが正しいと認められる時間を記録するための、トランザクションの時間帯に代わるものです。これにより、データベースに事実をコミットするのに時間がかかったとしても、ある時点で公式に認められた事実を示すクエリが可能になります。決定時期をサポートすることで、履歴全体が保存され、更新時に情報が失われるのを防ぐことができます。

Decision time periods can only occur in the past or up to the transaction time. As in a transaction time table, records are never deleted. Only new records can be inserted, and existing ones updated by setting their decision end time to show that they are no longer current.

決定時間帯は、過去またはトランザクション時間までしか発生しません。トランザクションタイムテーブルのように、レコードが削除されることはない。新しいレコードだけが挿入され、既存のレコードは決定時間の終了時間を設定することで更新され、最新ではなくなったことを示します。

To enable decision time, two more fields are added to a database table: _Decision From_ and _Decision To_. _Decision From_ is the time a decision was made, and _Decision-To_ is the time that the decision was superseded (which may be infinity if it has not yet been superseded). When combined with transaction time, this makes the table into a [tritemporal table](#Tritemporal_relations).

判定時間を有効にするには、データベースのテーブルに2つのフィールドを追加します。Decision From_ と _Decision To_ です。Decision From_は決定がなされた時刻、_Decision-To_は決定が破棄された時刻です（まだ破棄されていない場合は無限大になります）。これを取引時間と組み合わせると、[tritemporal table](#Tritemporal_relations)となります。

The following is a list of real-world events that occurred between the [United States presidential elections](https://en.wikipedia.org/wiki/United_States_presidential_election "United States presidential election") of 1964 and 1976:

以下は、1964年の[United States presidential election](https://en.wikipedia.org/wiki/United_States_presidential_election "United States presidential election")と1976年の間に起こった現実世界の出来事のリストである。

Date

Decision Maker

Real world event

November 3, 1964

[Electoral College](https://en.wikipedia.org/wiki/United_States_Electoral_College "United States Electoral College")

[Election of 1964](https://en.wikipedia.org/wiki/1964_United_States_presidential_election "1964 United States presidential election")

November 5, 1968

Electoral College

[Election of 1968](https://en.wikipedia.org/wiki/1968_United_States_presidential_election "1968 United States presidential election")

November 7, 1972

Electoral College

[Election of 1972](https://en.wikipedia.org/wiki/1972_United_States_presidential_election "1972 United States presidential election")

October 10, 1973

[Spiro Agnew](https://en.wikipedia.org/wiki/Spiro_Agnew "Spiro Agnew")

[Agnew resigns](https://en.wikipedia.org/wiki/Spiro_Agnew#Criminal_investigation_and_resignation "Spiro Agnew")

October 12, 1973

[Richard Nixon](https://en.wikipedia.org/wiki/Richard_Nixon "Richard Nixon")

[Nixon nominates Ford](https://en.wikipedia.org/wiki/Gerald_Ford#Vice_presidency_(1973–1974) "Gerald Ford")

December 6, 1973

[Congress](https://en.wikipedia.org/wiki/United_States_Congress "United States Congress")

Congress confirms Ford

August 9, 1974

Richard Nixon

[Nixon resigns](https://en.wikipedia.org/wiki/Richard_Nixon#Resignation "Richard Nixon")

August 20, 1974

[Gerald Ford](https://en.wikipedia.org/wiki/Gerald_Ford "Gerald Ford")

[Ford nominates Rockefeller](https://en.wikipedia.org/wiki/Nelson_Rockefeller#Vice_President_of_the_United_States_(1974–1977) "Nelson Rockefeller")

December 19, 1974

Congress

Congress confirms Rockefeller

November 2, 1976

Electoral College

[Election of 1976](https://en.wikipedia.org/wiki/1976_United_States_presidential_election "1976 United States presidential election")

Suppose there is a constant 7-day delay between the decision time and the transaction time committed to the database. Then following the election of 1976 the database contents would be:

                   President, Vice President, Valid From, Valid Till, Decision From, Decision To, Transaction From, Transaction To
---------------------------------------------------------------------------------------------------------------------------------- 
Administration(Lyndon Johnson,    Hubert Humphrey, 20-Jan-1965, 20-Jan-1969,  3-Nov-1964,           ∞, 10-Nov-1964,           ∞)
Administration( Richard Nixon,        Spiro Agnew, 20-Jan-1969, 20-Jan-1973,  5-Nov-1968,           ∞, 12-Nov-1968,           ∞)
Administration( Richard Nixon,        Spiro Agnew, 20-Jan-1973, 20-Jan-1977,  7-Nov-1972,           ∞, 14-Nov-1972, 17-Oct-1973)
Administration( Richard Nixon,        Spiro Agnew, 20-Jan-1973, 20-Jan-1977,  7-Nov-1972, 10-Oct-1973, 17-Oct-1973,           ∞)
Administration( Richard Nixon,        Spiro Agnew, 20-Jan-1973, 10-Oct-1973, 10-Oct-1973,           ∞, 17-Oct-1973,           ∞)
Administration( Richard Nixon,           (Vacant), 10-Oct-1973, 20-Jan-1977, 10-Oct-1973,           ∞, 17-Oct-1973, 13-Dec-1973)
Administration( Richard Nixon,        Gerald Ford,           ∞, 20-Jan-1977, 12-Oct-1973,           ∞, 19-Oct-1973, 13-Dec-1973)
Administration( Richard Nixon,           (Vacant), 10-Oct-1973, 20-Jan-1977, 10-Oct-1973,  6-Dec-1973, 13-Dec-1973,           ∞)
Administration( Richard Nixon,           (Vacant), 10-Oct-1973,  6-Dec-1973,  6-Dec-1973,           ∞, 13-Dec-1973,           ∞)
Administration( Richard Nixon,        Gerald Ford,           ∞, 20-Jan-1977, 12-Oct-1973,  6-Dec-1973, 13-Dec-1973,           ∞)
Administration( Richard Nixon,        Gerald Ford,  6-Dec-1973, 20-Jan-1977,  6-Dec-1973,           ∞, 13-Dec-1973, 15-Aug-1974)
Administration( Richard Nixon,        Gerald Ford,  6-Dec-1973, 20-Jan-1977,  6-Dec-1973,  8-Aug-1974, 15-Aug-1974,           ∞)
Administration( Richard Nixon,        Gerald Ford,  6-Dec-1973,  9-Aug-1974,  8-Aug-1974,           ∞, 15-Aug-1974,           ∞)
Administration(   Gerald Ford,           (Vacant),  9-Aug-1974, 20-Jan-1977,  8-Aug-1974,           ∞, 15-Aug-1974, 26-Dec-1974)
Administration(   Gerald Ford, Nelson Rockefeller,           ∞, 20-Jan-1977, 20-Aug-1974,           ∞, 27-Aug-1974, 26-Dec-1974)
Administration(   Gerald Ford,           (Vacant),  9-Aug-1974, 20-Jan-1977,  8-Aug-1974, 19-Dec-1974, 26-Dec-1974,           ∞)
Administration(   Gerald Ford,           (Vacant),  9-Aug-1974, 19-Dec-1974, 19-Dec-1974,           ∞, 26-Dec-1974,           ∞)
Administration(   Gerald Ford, Nelson Rockefeller,           ∞, 20-Jan-1977, 20-Aug-1974, 19-Dec-1974, 26-Dec-1974,           ∞)
Administration(   Gerald Ford, Nelson Rockefeller, 19-Dec-1974, 20-Jan-1977, 19-Dec-1974,           ∞, 26-Dec-1974,           ∞)
Administration(  Jimmy Carter,     Walter Mondale, 20-Jan-1977, 20-Jan-1981,  2-Nov-1976,           ∞,  9-Nov-1976,           ∞)

Consider the question of who would be President and Vice President for a valid time of 1-Jan-1977:

-   Nixon/Agnew when using a decision time and transaction time of 14-Nov-1972
-   Nixon/(Vacant) when using a decision time and transaction time of 17-Oct-1973
-   Nixon/Ford when using a decision time and transaction time of 8-Aug-1974
-   Ford/(Vacant) when using a decision time of 8-Aug-1974 and transaction time of current
-   Ford/Rockefeller when using a decision time and transaction time of current

## Bitemporal Modelling\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=11 "Edit section: Bitemporal Modelling")\]

Main article: [Bitemporal Modeling](https://en.wikipedia.org/wiki/Bitemporal_Modeling "Bitemporal Modeling")

A [bitemporal model](https://en.wikipedia.org/wiki/Bitemporal_Modeling "Bitemporal Modeling") contains both valid and transaction time. This provides both **historical** and **rollback** information. Historical information (e.g.: "Where did John live in 1992?") is provided by the valid time. Rollback (e.g.: "In 1992, where did the database believe John lived?") is provided by the transaction time. The answers to these example questions may not be the same – the database may have been altered since 1992, causing the queries to produce different results.

The valid time and transaction time do not have to be the same for a single fact. For example, consider a temporal database storing data about the 18th century. The valid time of these facts is somewhere between 1701 and 1800. The transaction time would show when the facts were inserted into the database (for example, January 21, 1998).

## Schema evolution\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=12 "Edit section: Schema evolution")\]

Main article: [Schema evolution](https://en.wikipedia.org/wiki/Schema_evolution "Schema evolution")

A challenging issue is the support of temporal queries in a transaction time database under evolving [schema](https://en.wikipedia.org/wiki/Database_schema "Database schema"). In order to achieve perfect archival quality it is of key importance to store the data under the schema version under which they first appeared. However, even the most simple temporal query rewriting the history of an attribute value would be required to be manually rewritten under each of the schema versions, potentially hundreds as in the case of MediaWiki [\[1\]](http://yellowstone.cs.ucla.edu/schema-evolution/index.php/Schema_Evolution_Benchmark). This process would be particularly taxing for users. A proposed solution is to provide automatic query rewriting,[\[7\]](#cite_note-curino-vldb-prima2008-7)[\[8\]](#cite_note-curino-sigmod-aims2010-8) although this is not part of SQL or similar standards.

Approaches to minimize the complexities of [schema evolution](https://en.wikipedia.org/wiki/Schema_evolution "Schema evolution") are:

-   to use a semi-structured database/NoSQL database which reduces the complexities of modeling attribute data but provides no features for handling multiple time axes.[\[9\]](#cite_note-mlw-talk-why-banks-need-bitemporal-2015-9)
-   to use a database capable of storing both semi-structured data for attributes and structured data for time axes (e.g., [SnowflakeDB](https://en.wikipedia.org/wiki/Snowflake_Inc. "Snowflake Inc."), PostgreSQL)

## Implementations in notable products\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=13 "Edit section: Implementations in notable products")\]

The following implementations provide temporal features in a relational database management system (RDBMS).

-   [MariaDB](https://en.wikipedia.org/wiki/MariaDB "MariaDB") version 10.3.4 added support for [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011") standard as "System-Versioned Tables".[\[10\]](#cite_note-10)
-   [Oracle Database](https://en.wikipedia.org/wiki/Oracle_Database "Oracle Database") – Oracle Workspace Manager is a feature of Oracle Database which enables application developers and DBAs to manage current, proposed and historical versions of data in the same database.
-   [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL "PostgreSQL") version 9.2 added native ranged data types that are capable of implementing all of the features of the pgFoundry temporal contributed extension.[\[11\]](#cite_note-11)[\[12\]](#cite_note-12) The PostgreSQL range types are supported by numerous native operators and functions.
-   [Teradata](https://en.wikipedia.org/wiki/Teradata "Teradata") provides two products. Teradata version 13.10 and [Teradata version 14](https://en.wikipedia.org/wiki/Teradata#Teradata_Database_14 "Teradata") have temporal features based on TSQL2[\[13\]](#cite_note-13) built into the database.
-   [IBM DB2](https://en.wikipedia.org/wiki/IBM_DB2 "IBM DB2") version 10 added a feature called "time travel query"[\[2\]](#cite_note-DB2-2) which is based on the temporal capabilities of the [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011 "SQL:2011") standard.[\[1\]](#cite_note-SQL2011-1)
-   [Microsoft SQL Server](https://en.wikipedia.org/wiki/Microsoft_SQL_Server "Microsoft SQL Server") introduced Temporal Tables as a feature for SQL Server 2016. The feature is described in a video on Microsoft's "Channel 9" web site.[\[14\]](#cite_note-SQLServerVideo-14)

Non-relational, NoSQL database management systems that provide temporal features including the following:

-   [TerminusDB](https://en.wikipedia.org/wiki/TerminusDB "TerminusDB") is a fully featured [open source](https://en.wikipedia.org/wiki/Open-source_software "Open-source software") [graph database](https://en.wikipedia.org/wiki/Graph_database "Graph database") that natively supports version control, time-travel queries and diffing functions. It has an immutable layer architecture based on [delta encoding](https://en.wikipedia.org/wiki/Delta_encoding "Delta encoding") and [succinct data structures](https://en.wikipedia.org/wiki/Succinct_data_structure "Succinct data structure").[\[15\]](#cite_note-15)
-   [MarkLogic](https://en.wikipedia.org/wiki/MarkLogic "MarkLogic") introduced bitemporal data support in version 8.0. Time stamps for Valid and System time are stored in JSON or XML documents.[\[16\]](#cite_note-16)
-   [SirixDB](https://sirix.io) stores snapshots of (currently) XML- and JSON-documents very efficiently in a binary format due to a novel versioning algorithm called sliding snapshot, which balances read-/write-performance and never creates write peaks. Time-travel queries are supported natively as well as diffing functions.
-   [Crux](https://github.com/juxt/crux) provides point-in-time bitemporal [Datalog](https://en.wikipedia.org/wiki/Datalog "Datalog") queries over transactions and documents ingested from semi-immutable Kafka logs. Documents are automatically indexed to create [Entity–attribute–value model](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model "Entity–attribute–value model") indexes without any requirement to define a schema. Transaction operations specify the effective Valid times. Transaction times are assigned by Kafka and enable horizontal scalability via consistent reads.
-   [RecallGraph](https://github.com/RecallGraph/RecallGraph) is a point-in-time, unitemporal (transaction time) graph database, built on top of [ArangoDB](https://en.wikipedia.org/wiki/ArangoDB "ArangoDB"). It runs on ArangoDB's [Foxx Microservice](https://www.arangodb.com/why-arangodb/foxx/) sub-system. It features [VCS](https://en.wikipedia.org/wiki/Version_Control_System "Version Control System")\-like semantics in many parts of its interface, and is backed by a [transactional](https://en.wikipedia.org/wiki/Atomicity_(database_systems) "Atomicity (database systems)") event tracker. Bitemporality is listed as one of the items in its [development roadmap](https://github.com/RecallGraph/RecallGraph#development-roadmap).

### Alternatives\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=14 "Edit section: Alternatives")\]

[![](https://en.wikipedia.org//upload.wikimedia.org/wikipedia/commons/thumb/4/46/Scd_model.png/220px-Scd_model.png)](https://en.wikipedia.org/wiki/File:Scd_model.png)

[](https://en.wikipedia.org/wiki/File:Scd_model.png "Enlarge")

Example of slowly changing dimension (SCD) model  
(click on image to see)

[Slowly changing dimensions](https://en.wikipedia.org/wiki/Slowly_changing_dimension "Slowly changing dimension") can be used to model temporal relations.

## Further reading\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=15 "Edit section: Further reading")\]

.mw-parser-output .refbegin{font-size:90%;margin-bottom:0.5em}.mw-parser-output .refbegin-hanging-indents>ul{margin-left:0}.mw-parser-output .refbegin-hanging-indents>ul>li{margin-left:0;padding-left:3.2em;text-indent:-3.2em}.mw-parser-output .refbegin-hanging-indents ul,.mw-parser-output .refbegin-hanging-indents ul li{list-style:none}@media(max-width:720px){.mw-parser-output .refbegin-hanging-indents>ul>li{padding-left:1.6em;text-indent:-1.6em}}.mw-parser-output .refbegin-100{font-size:100%}.mw-parser-output .refbegin-columns{margin-top:0.3em}.mw-parser-output .refbegin-columns ul{margin-top:0}.mw-parser-output .refbegin-columns li{page-break-inside:avoid;break-inside:avoid-column}

-   [C.J. Date](https://en.wikipedia.org/wiki/C.J._Date "C.J. Date"), [Hugh Darwen](https://en.wikipedia.org/wiki/Hugh_Darwen "Hugh Darwen"), [Nikos Lorentzos](https://en.wikipedia.org/wiki/Nikos_Lorentzos "Nikos Lorentzos") (2002). _Temporal Data & the Relational Model, First Edition_ (The Morgan Kaufmann Series in Data Management Systems); Morgan Kaufmann; 1st edition; 422 pages. .mw-parser-output cite.citation{font-style:inherit}.mw-parser-output .citation q{quotes:"\\"""\\"""'""'"}.mw-parser-output .id-lock-free a,.mw-parser-output .citation .cs1-lock-free a{background:linear-gradient(transparent,transparent),url("//upload.wikimedia.org/wikipedia/commons/6/65/Lock-green.svg")right 0.1em center/9px no-repeat}.mw-parser-output .id-lock-limited a,.mw-parser-output .id-lock-registration a,.mw-parser-output .citation .cs1-lock-limited a,.mw-parser-output .citation .cs1-lock-registration a{background:linear-gradient(transparent,transparent),url("//upload.wikimedia.org/wikipedia/commons/d/d6/Lock-gray-alt-2.svg")right 0.1em center/9px no-repeat}.mw-parser-output .id-lock-subscription a,.mw-parser-output .citation .cs1-lock-subscription a{background:linear-gradient(transparent,transparent),url("//upload.wikimedia.org/wikipedia/commons/a/aa/Lock-red-alt-2.svg")right 0.1em center/9px no-repeat}.mw-parser-output .cs1-subscription,.mw-parser-output .cs1-registration{color:#555}.mw-parser-output .cs1-subscription span,.mw-parser-output .cs1-registration span{border-bottom:1px dotted;cursor:help}.mw-parser-output .cs1-ws-icon a{background:linear-gradient(transparent,transparent),url("//upload.wikimedia.org/wikipedia/commons/4/4c/Wikisource-logo.svg")right 0.1em center/12px no-repeat}.mw-parser-output code.cs1-code{color:inherit;background:inherit;border:none;padding:inherit}.mw-parser-output .cs1-hidden-error{display:none;font-size:100%}.mw-parser-output .cs1-visible-error{font-size:100%}.mw-parser-output .cs1-maint{display:none;color:#33aa33;margin-left:0.3em}.mw-parser-output .cs1-format{font-size:95%}.mw-parser-output .cs1-kern-left,.mw-parser-output .cs1-kern-wl-left{padding-left:0.2em}.mw-parser-output .cs1-kern-right,.mw-parser-output .cs1-kern-wl-right{padding-right:0.2em}.mw-parser-output .citation .mw-selflink{font-weight:inherit}[ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [1-55860-855-9](https://en.wikipedia.org/wiki/Special:BookSources/1-55860-855-9 "Special:BookSources/1-55860-855-9").
-   [Joe Celko](https://en.wikipedia.org/wiki/Joe_Celko "Joe Celko") (2014). _Joe Celko's SQL for Smarties: Advanced SQL Programming_ (The Morgan Kaufmann Series in Data Management); Morgan Kaufmann; 5th edition. [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [978-0-12-800761-7](https://en.wikipedia.org/wiki/Special:BookSources/978-0-12-800761-7 "Special:BookSources/978-0-12-800761-7").—Chapters 12 and 35 in particular discuss temporal issues.
-   Snodgrass, Richard T. (1999). ["_Developing Time-Oriented Database Applications in SQL_ "](http://www.cs.arizona.edu/people/rts/tdbbook.pdf) (PDF). (4.77 [MiB](https://en.wikipedia.org/wiki/Mebibyte "Mebibyte")) (Morgan Kaufmann Series in Data Management Systems); Morgan Kaufmann; 504 pages; [ISBN](https://en.wikipedia.org/wiki/ISBN_(identifier) "ISBN (identifier)") [1-55860-436-7](https://en.wikipedia.org/wiki/Special:BookSources/1-55860-436-7 "Special:BookSources/1-55860-436-7")

## See also\[[edit](https://en.wikipedia.org/w/index.php?title=Temporal_database&action=edit&section=16 "Edit section: See also")\]

-   [Anchor Modeling](https://en.wikipedia.org/wiki/Anchor_Modeling "Anchor Modeling")
-   [Database theory](https://en.wikipedia.org/wiki/Database_theory "Database theory")
-   [Event store](https://en.wikipedia.org/wiki/Event_store "Event store")
-   [Spatiotemporal database](https://en.wikipedia.org/wiki/Spatiotemporal_database "Spatiotemporal database")
-   [Time series database](https://en.wikipedia.org/wiki/Time_series_database "Time series database")

