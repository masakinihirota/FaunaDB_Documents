Why do we need a temporal database? - Stack Overflow
https://stackoverflow.com/questions/800331/why-do-we-need-a-temporal-database/3218880

# [Why do we need a temporal database?](https://stackoverflow.com/questions/800331/why-do-we-need-a-temporal-database)
# [なぜ時間軸のデータベースが必要なのか]

I was reading about temporal databases and it seems they have built in time aspects. I wonder why would we need such a model?

テンポラルデータベースについて読んでいたのですが、時間の側面が組み込まれているようです。なぜそのようなモデルが必要なのか疑問です。


How different is it from a normal RDBMS? Can't we have a normal database i.e. RDBMS and say have a trigger which associates a time stamp with each transaction that happens? May be there would be a performance hit. But I'm still skeptical on temporal databases having a strong case in the market.

通常のRDBMSとはどのように違うのでしょうか？通常のデータベース（RDBMS）を持ち、発生した各トランザクションにタイムスタンプを関連付けるトリガーを持つことはできないのでしょうか？もしかしたら、パフォーマンスに影響があるかもしれません。しかし、私はテンポラル・データベースが市場で強力なケースを持っていることにまだ懐疑的です。


Does any of the present databases support such a feature?


現在のデータベースで、このような機能をサポートしているものはありますか？


[database](https://stackoverflow.com/questions/tagged/database "show questions tagged 'database'") [temporal-database](https://stackoverflow.com/questions/tagged/temporal-database)





[edited Jun 12 '15 at 16:48](https://stackoverflow.com/posts/800331/revisions "show all edits to this post")




A temporal database efficiently stores a time series of data, typically by having some fixed timescale (such as seconds or even milliseconds) and then storing only changes in the measured data. A timestamp in an RDBMS is a discretely stored value for each measurement, which is very inefficient. A temporal database is often used in real-time monitoring applications like SCADA. A well-established system is the PI database from OSISoft ([http://www.osisoft.com/](http://www.osisoft.com/)).

時間データベースは、時系列のデータを効率的に保存します。一般的には、いくつかの固定されたタイムスケール（秒やミリ秒など）を持ち、測定されたデータの変化のみを保存します。RDBMSのタイムスタンプは、各測定に対して離散的に保存された値であり、これは非常に非効率的です。時間データベースは、SCADAのようなリアルタイム監視アプリケーションでよく使われる。確立されたシステムとしては、OSISoft社のPIデータベースがあります([http://www.osisoft.com/](http://www.osisoft.com/))。







    Pi uses a swing gate algorithm, and is to be considered a compressing database, not a temporal database. Temporal databases preserve the ability to see the data as it was seen in the past, while accommodating ability to update even the past in the future. This disassociation of valid time and current time doesn't exist in Pi. Pi shows you a past value that isn't statistically different from the actual value, a temporal database will show you the actual value back then, as seen back then, and the actual value back then, as it is known now (2 different queries). – [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 reputation") [Oct 3 '12 at 15:54](#comment17164628_800350)

    Piは、スイングゲートアルゴリズムを使用しており、時間データベースではなく、圧縮データベースと考えられています。時間データベースでは、過去に見たデータをそのまま見ることができ、過去のデータも未来に更新することができます。このように、有効な時間と現在の時間を切り離すことは、Piには存在しません。円周率は、統計的には実際の値と変わらない過去の値を表示しますが、時間データベースは、当時見られた当時の実際の値と、現在知られている当時の実際の値を表示します（2つの異なるクエリ）。- [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 評判") [Oct 3 '12 at 15:54](#comment17164628_800350)





    I was a integrator / tool smith for the RANGER SCADA system, which went under a number of names, and was sold by Ferranti Systems, Elsag, Elsag / Bailey, Bailey Network Management, ABB Network Management, and now, just ABB. It is currently sold under the name "Network Manager" unless they changed it again. I wrote the Pi installation helpers for that platform, and gave training in the use of Pi Historian, and installed Pi (and a bunch of other software) in numerous electrical SCADA control rooms. In the short span of characters, it's hard to go into such detail. – [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 reputation") [Oct 3 '12 at 16:32](#comment17165670_800350)


    私はRANGER SCADAシステムのインテグレーター/ツールスミスをしていました。RANGER SCADAシステムはいくつかの名前で呼ばれ、Ferranti Systems、Elsag、Elsag / Bailey、Bailey Network Management、ABB Network Management、そして現在はABBのみが販売しています。現在は、再び変更されない限り、「Network Manager」という名前で販売されています。私はそのプラットフォーム用のPiインストールヘルパーを書き、Pi Historianの使用法のトレーニングを行い、数多くの電気SCADA制御室にPi（と他のソフトウェアの数々）をインストールしました。短いスパンの文字数では、ここまで詳細に説明するのは難しいですね。- エドウィン・バック](https://stackoverflow.com/users/302139/edwin-buck "65,054 評判") [Oct 3 '12 at 16:32](#comment17165670_800350)




    OSI has made no secret of using a compression algorithm, (previously swinging gate, now swinging door). It is the backbone of their flagship product, the PI historian server. You configure it by specifying the maximum allowable error (in standard deviation) of the value before the historian will then determine a vertex was encountered and project a new time dependent direction. This allows only the vertices to be stored, greatly reducing amount of data as intermediates are interpolated between vertices. Temporal databases are a completely different thing. – [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 reputation") [Oct 3 '12 at 16:38](#comment17165819_800350)

    OSIは圧縮アルゴリズムを使っていることを秘密にしています（以前はswinging gate、現在はswinging door）。これは、同社の主力製品であるPI historian serverの基幹部分です。これを設定するには、ヒストリアンが頂点に遭遇したと判断して新しい時間依存の方向を投影する前の値の最大許容誤差（標準偏差）を指定します。これにより、頂点のみを保存することができ、頂点間を補間することでデータ量を大幅に削減することができます。時間データベースとは全くの別物です。- Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 評判") [Oct 3 '12 at 16:38](#コメント17165819_800350)



    If that's not enough "source" please read the papers by Richard Snodgrass, and cite some sources yourself. PI is a great product, but don't think for a moment that it will offer its benefits with any data type that doesn't have a standard deviation (like color, customer name, purchase history, etc). – [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 reputation") [Oct 3 '12 at 16:46](#comment17166036_800350)



    もしそれが十分な「ソース」でなければ、Richard Snodgrass氏の論文を読んで、自分でいくつかのソースを引用してください。PIは素晴らしい製品ですが、標準偏差を持たないデータタイプ（色、顧客名、購入履歴など）でそのメリットを発揮するとは一瞬たりとも思わないでください。- [Edwin Buck](https://stackoverflow.com/users/302139/edwin-buck "65,054 評判") [Oct 3 '12 at 16:46](#コメント17166036_800350)



Consider your appointment/journal diary - it goes from Jan 1st to Dec 31st. Now we can query the diary for appointments/journal entries on any day. This ordering is called the **valid time**. However, appointments/entries are not usually inserted in order.

1月1日から12月31日までの予定や日記を考えてみましょう。ここで、任意の日のアポイントメントやジャーナルエントリを日記に照会することができます。この順序を「有効期限」と呼びます。しかし、アポイントメントやエントリーは通常、順番に挿入されるわけではありません。


Suppose I would like to know what appointments/entries were in my diary on April 4th. That is, all the records that existed in my diary on April 4th. This is the **transaction time**.

例えば、4月4日の日記にどのような予定やエントリがあったかを知りたいとします。つまり、4月4日に私の日記に存在していたすべての記録です。これが **トランザクションタイム** です。



Given that appointments/entries can be created and deleted etc. A typical record has a beginning and end valid time that covers the period of the entry and a beginning and end transaction time that indicates the period during which the entry appeared in the diary.


アポイントメント/エントリーは作成や削除などが可能であることを考えると 典型的なレコードは、エントリーの期間をカバーする開始と終了の有効時間と、エントリーがダイアリーに現れた期間を示す開始と終了のトランザクション時間を持っています。




This arrangement is necessary when the diary may undergo **historical revision**. Suppose on April 5th I realise that the appointment I had on Feb 14th actually occurred on February 12th i.e. I discover an error in my diary - I can correct the error so that the valid time picture is corrected, but now, my query of what was in the diary on April 4th would be wrong, UNLESS, the transaction times for appointments/entries are also stored. In that case if I query my diary as of April 4th it will show an appointment existed on February 14th but if I query as of April 6th it would show an appointment on February 12th.

日記が「歴史的修正」を受ける可能性がある場合には、このような配置が必要です。4月5日に、2月14日に行った予約が実際には2月12日に行われていたことに気付いたとしましょう。この場合、4月4日の日記を照会すると、2月14日に予約があったことが表示されますが、4月6日の日記を照会すると、2月12日に予約があったことが表示されます。




This time travel feature of a temporal database makes it possible to record information about how errors are corrected in a database. This is necessary for a true audit picture of data that records when revisions were made and allows queries relating to how data have been revised over time.

このようなタイムトラベル機能を持つテンポラルデータベースでは、データベース内のエラーがどのように修正されたかという情報を記録することができます。これは、いつ修正されたかを記録し、時間の経過とともにどのようにデータが修正されたかに関連するクエリを可能にする、データの真の監査画像に必要です。


Most business information should be stored in this bitemporal scheme in order to provide a true audit record and to maximise business intelligence - hence the need for support in a relational database. Notice that each data item occupies a (possibly unbounded) square in the two dimensional time model which is why people often use a GIST index to implement bitemporal indexing. The problem here is that a GIST index is really designed for geographic data and the requirements for temporal data are somewhat different.

真の監査記録を提供し、ビジネスインテリジェンスを最大化するためには、ほとんどのビジネス情報はこのようなビットテンポラリ方式で保存されるべきであり、そのためにリレーショナルデータベースでのサポートが必要なのです。各データアイテムは、2次元の時間モデルの中で（おそらく拘束されない）正方形を占めることに注意してください。ここでの問題は、GISTインデックスは実際には地理データ用に設計されたものであり、時間データの要件は多少異なるということです。



PostgreSQL 9.0 exclusion constraints should provide new ways of organising temporal data e.g. transaction and valid time PERIODs should not overlap for the same tuple.

PostgreSQL 9.0の排他制約は、時間データを整理する新しい方法を提供するはずです。例えば、トランザクションと有効時間のPERIODは、同じタプルに対して重複してはいけません。




As I understand it (and over-simplifying enormously), a temporal database records facts about when the data was valid as well as the the data itself, and permits you to query on the temporal aspects. You end up dealing with 'valid time' and 'transaction time' tables, or 'bitemporal tables' involving both 'valid time' and 'transaction time' aspects. You should consider reading either of these two books:

私の理解では（非常に単純化しすぎですが）、テンポラル・データベースは、データ自体だけでなく、データがいつ有効であったかという事実を記録し、時間的な側面についての問い合わせを可能にします。最終的には、「有効時間」と「トランザクション時間」のテーブル、または「有効時間」と「トランザクション時間」の両方の側面を含む「ビットテンポラルテーブル」を扱うことになります。この2冊の本のどちらかを読んでみてください。


-   Darwen, Date and Lorentzos "[Temporal Data and the Relational Model](https://rads.stackoverflow.com/amzn/click/com/B001E4587Q)" (out of print),
-   and (at a radically different extreme) "[Developing Time-Oriented Database Applications in SQL](https://rads.stackoverflow.com/amzn/click/com/1558604367)", Richard T. Snodgrass, Morgan Kaufmann Publishers, Inc., San Francisco, July, 1999, 504+xxiii pages, ISBN 1-55860-436-7. That is out of print but available as PDF on his web site at [cs.arizona.edu](http://www.cs.arizona.edu/~rts/publications.html) (so a Google search makes it pretty easy to find).


- Darwen, Date and Lorentzos "[Temporal Data and the Relational Model](https://rads.stackoverflow.com/amzn/click/com/B001E4587Q)" (絶版),
- そして（根本的に異なる極端な例ですが）「[Developing Time-Oriented Database Applications in SQL](https://rads.stackoverflow.com/amzn/click/com/1558604367)」、Richard T. Snodgrass、Morgan Kaufmann Publishers, Inc.、San Francisco、1999年7月、504+xxiiiページ、ISBN 1-55860-436-7です。これは絶版ですが、彼のウェブサイト [cs.arizona.edu](http://www.cs.arizona.edu/~rts/publications.html) で PDF で入手できます (そのため、Google 検索でかなり簡単に見つけることができます)。



[Share](https://stackoverflow.com/a/800516 "Short permalink to this answer")




Temporal databases are often used in the financial services industry. One reason is that you are rarely (if ever) allowed to delete any data, so ValidFrom - ValidTo type fields on records are used to provide an indication of when a record was correct.

金融業界では、時間軸データベースがよく使われます。理由の一つは、データの削除が許されることは（ほとんど）ないので、レコードのValidFrom - ValidTo型フィールドは、レコードがいつ正しかったのかを示すために使用されます。


    Is any specific commercial temporal db popular in financial services ? – [user77115](https://stackoverflow.com/users/77115/user77115 "5,175 reputation") [Dec 19 '10 at 10:41](#comment4901850_4429193)


    金融機関では、特定の商用テンポラルDBが人気なのでしょうか？- [user77115](https://stackoverflow.com/users/77115/user77115 "5,175 reputation") [Dec 19 '10 at 10:41](#comment4901850_4429193)



-   I know from experience that the bitemporal systems in place at Goldman Sachs (SecDB), JP Morgan (Athena), and Bank of America (Quartz) were all built on top of a custom object-oriented database. Athena and Quartz (built by the same team) used a rather elegant bitemporal model, but it doesn't fit directly to a relational paradigm. – [Adam Donahue](https://stackoverflow.com/users/1864795/adam-donahue "1,514 reputation") [Jan 17 '17 at 0:23](#comment70571438_4429193)


- 私は経験上、ゴールドマン・サックス（SecDB）、JPモルガン（Athena）、バンク・オブ・アメリカ（Quartz）で導入されていたビットテンポラリ・システムは、いずれもカスタム・オブジェクト指向データベースの上に構築されていたことを知っています。AthenaとQuartz（同じチームによって作られた）は、かなりエレガントなビットエンポラルモデルを使っていましたが、それはリレーショナルパラダイムには直接フィットしません。- [Adam Donahue](https://stackoverflow.com/users/1864795/adam-donahue "1,514の評判") [Jan 17 '17 at 0:23](#コメント70571438_4429193)



Besides "what new things can I do with it", it might be useful to consider "what old things does it unify?". The temporal database represents a particular generalization of the "normal" SQL database. As such, it may give you a unified solution to problems that previously appeared unrelated. For example:

それを使ってどんな新しいことができるか」ということに加えて、「それがどんな古いものを統一するのか」ということを考えるのも有用かもしれません。一時的なデータベースは、「通常の」SQLデータベースの特定の一般化を表しています。そのため、以前は無関係に見えた問題に統一的な解決策を与えることができるかもしれません。例えば


-   **Web Concurrency** When your database has a web UI that lets multiple users perform standard Create/Update/Delete (CRUD) modifications, you have to face the [concurrent web changes problem](https://stackoverflow.com/questions/7223864/how-do-i-deal-with-concurrent-changes-in-a-web-application). Basically, you need to check that an incoming data modification is not affecting any records that have changed since that user last saw those records. But if you have a temporal database, it quite possibly already associates something like a "revision ID" with each record (due to the difficulty of making timestamps unique and monotonically ascending). If so, then that becomes the natural, "already built-in" mechanism for preventing the clobbering of other users' data during database updates.
-   **Legal/Tax Records** The legal system (including taxes) places rather more emphasis on historical data than most programmers do. Thus, you will often find [advice](https://stackoverflow.com/a/25154387/212264) about schemas for invoices and such that warns you to beware of deleting records or normalizing in a natural way--which can lead to an inability to answer basic legal questions like "Forget their current address, what address did you mail this invoice to in 2001?" With a temporal framework base, all the machinations to those problems (they usually are halfway steps to having a temporal database) go away. You just use the most natural schema, and delete when it make sense, knowing that you can always go back and answer historical questions accurately.


- **Web同時進行** あなたのデータベースが、複数のユーザに標準的なCreate/Update/Delete(CRUD)の変更を行わせるWeb UIを持っている場合、[Web変更の同時進行問題](https://stackoverflow.com/questions/7223864/how-do-i-deal-with-concurrent-changes-in-a-web-application)に直面しなければなりません。基本的には、入力されたデータ修正が、そのユーザーが最後に見たときから変更されたレコードに影響を与えていないことをチェックする必要があります。しかし、もしあなたが時間データベースを持っているならば、それはすでに各レコードに「リビジョンID」のようなものを関連付けているかもしれません（タイムスタンプを一意に、かつ単調に昇順にするのは難しいため）。もしそうであれば、データベースの更新時に他のユーザのデータが破壊されるのを防ぐための、自然で「すでに組み込まれた」メカニズムになります。
- 法律/税務記録** 法制度(税金を含む)は、ほとんどのプログラマーよりも、むしろ履歴データを重視します。そのため、請求書などのスキーマに関する[アドバイス](https://stackoverflow.com/a/25154387/212264)には、レコードの削除や自然な方法での正規化に注意するように書かれていることがよくあります。これでは、"現在の住所を忘れて、2001年にこの請求書をどの住所に郵送したのか？"といった基本的な法律上の質問に答えることができなくなってしまいます。時間軸フレームワークのベースでは、これらの問題に対するすべての操作（それらは通常、時間軸データベースを持つための中途半端なステップです）はなくなります。最も自然なスキーマを使い、意味があるときには削除し、いつでも過去の質問に戻って正確に答えられることを知っているだけです。


On the other hand, the temporal model itself is half-way to complete revision control, which could inspire further applications. For example, suppose you roll your own temporal facility on top of SQL and allow branching, as in revision control systems. Even limited branching could make it easy to offer "sandboxing" -- the ability to play with and modify the database with abandon without causing any visible changes to other users. That makes it easy to supply highly realistic user training on a complex database.

一方で、テンポラルモデル自体は、完全なリビジョンコントロールへの道のりの途中であり、それがさらなるアプリケーションを刺激する可能性があります。例えば、SQLの上に独自のテンポラル機能をロールアップし、リビジョン管理システムのように分岐を可能にしたとします。限定的な分岐であっても、「サンドボックス化」を簡単に提供することができます。つまり、他のユーザーに目に見える変更を引き起こすことなく、自由にデータベースを弄り、修正することができるのです。そうすれば、複雑なデータベースについて、非常に現実的なユーザートレーニングを簡単に提供することができます。


Simple branching with a simple merge facility could also simplify some common workflow problems. For example, a non-profit might have volunteers or low-paid workers doing data entry. Giving each worker their own branch could make it easy to allow a supervisor to review their work or enhance it (e.g., de-duplification) before merging it into the main branch where it would become visible to "normal" users. Branches could also simplify permissions. If a user is only granted permission to use/see their unique branch, you don't have to worry about preventing every possible unwanted modification; you'll only merge the changes that make sense anyway.


シンプルなマージ機能を備えたシンプルなブランチは、一般的なワークフローの問題を簡素化することもできます。例えば、非営利団体では、ボランティアや低賃金の労働者がデータ入力を行っている場合があります。それぞれの作業者に自分のブランチを与えれば、通常のユーザーが見ることのできるメインブランチにマージする前に、スーパーバイザーが作業内容を確認したり、作業内容を改善したりすることが容易になります。ブランチは、パーミッションを簡素化することもできます。ユーザーが自分専用のブランチを使用/閲覧する権限しか与えられていない場合、ありとあらゆる不要な変更を防ぐことを気にする必要はありません。




Apart from reading the [Wikipedia article](http://en.wikipedia.org/wiki/Temporal_database "Temporal Database")? A database that maintains an "audit log" or similar transaction log will have some properties of being "temporal". If you need answers to questions about **who did what to whom and when** then you've got a good candidate for a temporal database.

Wikipediaの記事](http://en.wikipedia.org/wiki/Temporal_database "Temporal Database")を読む以外には？監査ログ」や同様のトランザクションログを保持しているデータベースは、「時間的」であるといういくつかの特性を持っています。誰がいつ、誰に何をしたのか」という質問に対する答えが必要な場合は、時間的データベースの良い候補になります。


You can imagine a simple temporal database that just logs your GPS location every few seconds. The opportunities for compressing this data is great, a normal database you would need to store a timestamp for every row. If you have a great deal of throughput required, knowing the data is temporal and that updates and deletes to a row will never be required permits the program to drop a lot of the complexity inherit in a typical RDBMS.

GPSの位置情報を数秒ごとに記録するだけのシンプルなテンポラリデータベースを想像してみてください。このデータを圧縮する機会は大いにあります。通常のデータベースであれば、すべての行にタイムスタンプを保存する必要があります。大量のスループットを必要とする場合、データが一時的なものであり、行の更新や削除が決して必要ないことを知っていれば、プログラムは典型的なRDBMSに内在する複雑さの多くを取り除くことができます。


Despite this, temporal data is usually just stored in a normal RDBMS. PostgreSQL, for example has some [temporal extensions](http://wiki.postgresql.org/wiki/Temporal_Extensions), which makes this a little easier.


これにもかかわらず、一時的なデータは通常、通常のRDBMSに格納されるだけです。例えば、PostgreSQLにはいくつかの[Temporal extensions](http://wiki.postgresql.org/wiki/Temporal_Extensions)があり、これが少し楽になっています。



1.  Some are optimized for insert and read only and can offer dramatic perf improvements
2.  Some have better understandings of time than traditional SQL - allowing for grouping operations by second, minute, hour, etc


1.  インサートおよびリードオンリーに最適化されており、劇的な性能向上を実現できるものもあります。
2.  2. 従来の SQL よりも時間に対する理解が深く、秒、分、時間などの単位で操作をグループ化できるものがある。




Just an update, Temporal database is coming to SQL Server 2016.

Temporal DatabaseがSQL Server 2016に搭載されることになりました。


To clear all your doubts why one need a Temporal Database, rather than configuring with custom methods, and how efficiently & seamlessly SQL Server configures it for you, check the in-depth video and demo on Channel9.msdn here: [https://channel9.msdn.com/Shows/Data-Exposed/Temporal-in-SQL-Server-2016](https://channel9.msdn.com/Shows/Data-Exposed/Temporal-in-SQL-Server-2016)


カスタムメソッドで構成するのではなく、なぜTemporal Databaseが必要なのか、SQL Serverがどのように効率的かつシームレスに構成するのか、すべての疑問を解消するために、Channel9.msdnのこちらの詳細なビデオとデモをご覧ください。[https://channel9.msdn.com/Shows/Data-Exposed/Temporal-in-SQL-Server-2016](https://channel9.msdn.com/Shows/Data-Exposed/Temporal-in-SQL-Server-2016)




My understanding of temporal databases is that are geared towards storing certain types of temporal information. You could simulate that with a standard RDBMS, but by using a database that supports it you have built-in idioms for a lot of concepts and the query language might be optimized for these sort of queries.


私の理解では、テンポラルデータベースとは、ある種の時間的な情報を保存することを目的としたものです。標準的なRDBMSでもシミュレートできますが、それをサポートするデータベースを使用することで、多くのコンセプトのためのイディオムが組み込まれ、クエリ言語もこの種のクエリに最適化されているかもしれません。



To me this is a little like working with a GIS-specific database rather than an RDBMS. While you could shove coordinates in a run-of-the-mill RDBMS, having the appropriate representations (e.g., via grid files) may be faster, and having SQL primitives for things like topology is useful.

これは、RDBMSではなく、GIS専用のデータベースを使っているようなものだと思います。ありふれたRDBMSでも座標を入力することはできますが、適切な表現（グリッドファイルなど）を持っている方が速いかもしれませんし、トポロジーなどのためのSQLプリミティブがあると便利です。


There are academic databases and some commercial ones. Timecenter has some links.

学術的なデータベースや商用のデータベースがあります。Timecenterにはいくつかのリンクがあります。

Another example of where a temporal database is useful is where data changes over time. I spent a few years working for an electricity retailer where we stored meter readings for 30 minute blocks of time. Those meter readings could be revised at any point but we still needed to be able to look back at the history of changes for the readings.


一時的なデータベースが役立つもう一つの例は、データが時間とともに変化する場合です。私は電力会社で数年間働いたことがありますが、そこでは30分単位の検針値を保存していました。これらの検針値はいつでも修正することができますが、検針値の変化の履歴を振り返ることができる必要がありました。



We therefore had the latest reading (our 'current understanding' of the consumption for the 30 minutes) but could look back at our historic understanding of the consumption. When you've got data that can be adjusted in such a way temporal databases work well.

そのため、最新の読み取り値（30分間の消費量に対する「現在の理解」）を持ちながら、消費量に対する過去の理解を振り返ることができました。このように調整可能なデータがあれば、一時的なデータベースはうまく機能します。



(Having said that, we hand carved it in SQL, but it was a fair while ago. Wouldn't make that decision these days.)

(そうは言っても、私たちはそれをSQLで手書きしましたが、それはかなり前のことです。最近ではそのような判断はしないでしょう）。)

