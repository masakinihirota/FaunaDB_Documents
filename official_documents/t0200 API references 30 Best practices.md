Best practices | Fauna Documentation
https://docs.fauna.com/fauna/current/api/best_practices?lang=javascript

# Best practices

This section describes best practices that we recommend, covering a variety of Fauna use cases.

このセクションでは、さまざまなFaunaのユースケースをカバーする、推奨されるベストプラクティスについて説明します。

## [](#counters-and-other-frequently-updated-fields)Counters and other frequently updated fields

カウンターおよびその他の頻繁に更新されるフィールド

-   Counter data is not well-suited for database storage. In Fauna, each document update stores a new version of the document. For frequently-updated fields, a lot of document history can be collected very quickly.

カウンタデータは、データベースストレージには適していません。Faunaでは、ドキュメントが更新されるたびに、ドキュメントの新しいバージョンが保存されます。頻繁に更新されるフィールドの場合、多くのドキュメント履歴を非常に迅速に収集できます。

    If a frequently-updated counter is an essential part of your application, you can make some adjustments to improve performance:

頻繁に更新されるカウンターがアプリケーションの重要な部分である場合は、パフォーマンスを向上させるためにいくつかの調整を行うことができます。

    1.  Set a collection’s `history_days` field to a small value (zero is best). Document history is still collected, but is removed far sooner than the default of 30 days. See [Collections](https://docs.fauna.com/fauna/current/api/fql/collections) for details.

セットするコレクションのhistory_daysフィールドを小さい値にします（ゼロが最適です）。資料履歴は引き続き収集されますが、デフォルトの30日よりもはるかに早く削除されます。詳細については、コレクションを参照してください。

    2.  Periodically run a query that calls [`Remove`](https://docs.fauna.com/fauna/current/api/fql/functions/remove) to explicitly remove document history.

Removeドキュメント履歴を明示的に削除するために呼び出すクエリを定期的に実行します。

-   Fauna processes transactions in 10 millisecond batches (100 times per second). Each batch can contain many transactions, but only one transaction per batch can modify a specific field, so throughput could be limited by contention on the field updates.

Faunaは、トランザクションを10ミリ秒のバッチ（1秒あたり100回）で処理します。各バッチには多くのトランザクションを含めることができますが、特定のフィールドを変更できるのはバッチごとに1つのトランザクションのみであるため、フィールド更新の競合によってスループットが制限される可能性があります。

-   Indexes must evaluate document history when searching for matching entries. Where possible, do not include frequently-updated fields in an index’s `terms` or `values` definitions.

インデックスは、一致するエントリを検索するときにドキュメントの履歴を評価する必要があります。可能であれば、頻繁に更新されるフィールドをインデックスtermsまたはvalues定義に含めないでください。

-   Where possible, set a collection’s `history_days` field to 0. Removal of older versions is handled by a background task, so versions accumulate until that task has a chance to execute. See [Collections](https://docs.fauna.com/fauna/current/api/fql/collections) for details.

可能な場合は、コレクションのhistory_daysフィールドを0に設定します。古いバージョンの削除はバックグラウンドタスクによって処理されるため、バージョンはそのタスクが実行されるまで蓄積されます。詳細については、 コレクションを参照してください。

-   Consider setting a collection’s `ttl_days` to a small value. Once the `ttl_days` limit has been reached, "old" documents and all of their history are removed. See [Collections](https://docs.fauna.com/fauna/current/api/fql/collections) for details.

コレクションのttl_days値を小さく設定することを検討してください。一度 ttl_days制限に達しました、「古い」文書とその歴史のすべてが削除されます。詳細については、コレクションを参照してください。

-   Instead of attempting to implement a real-time counter solution, consider storing countable documents as a cache and periodically analyzing the cache’s contents to update a "report" document.

リアルタイムのカウンターソリューションの実装を試みる代わりに、カウント可能なドキュメントをキャッシュとして保存し、キャッシュの内容を定期的に分析して「レポート」ドキュメントを更新することを検討してください。

## [](#defensive-query-strategies)Defensive query strategies

防御的なクエリ戦略

-   Relationships in Fauna typically involve storing a document’s [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) in another document. For example, document A might store a reference to document B. When document B is deleted, the reference to B stored within A is not modified. So, queries that process document A and attempt to fetch the now-deleted document B would fail.

Faunaの関係には、通常、ドキュメントの参照を別のドキュメントに保存することが含ま れます。たとえば、ドキュメントAはドキュメントBへの参照を格納する場合があります。ドキュメントBが削除されても、A内に格納されているBへの参照は変更されません。したがって、ドキュメントAを処理し、削除されたドキュメントBをフェッチしようとするクエリは失敗します。

    You can test for the existence of a document before attempting to fetch it by using the [`If`](https://docs.fauna.com/fauna/current/api/fql/functions/if) and [`Exists`](https://docs.fauna.com/fauna/current/api/fql/functions/exists) functions.

IfandExists関数を使用して、ドキュメントをフェッチする前に、ドキュメントの存在をテストできます。

    For example, the following query fails because the related document does not exist:

たとえば、関連ドキュメントが存在しないため、次のクエリは失敗します。

    ```javascript
    client.query(
      q.Let(
        {
          spellbook: q.Get(q.Ref(q.Collection('spellbooks'), '101')),
          owner_ref: q.Select(['data', 'owner'], q.Var('spellbook')),
          owner: q.Get(q.Var('owner_ref')),
        },
        {
          spellbook: q.Select(['data', 'name'], q.Var('spellbook')),
          owner: q.Select(['data', 'name'], q.Var('owner')),
        }
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))
    ```

    ```none
    Error: [NotFound: instance not found] {
      description: 'Document not found.',
      requestResult: [RequestResult]
    }
    ```

    Whereas the following query succeeds because we now check for the existence of the related document, and since it does not exist we substitute with an object including the `DISAPPEARED` name:

次のクエリは、関連するドキュメントの存在を確認し、存在しないため、DISAPPEARED名前を含むオブジェクトに置き換えて成功します。

    ```javascript
    client.query(
      q.Let(
        {
          spellbook: q.Get(q.Ref(q.Collection('spellbooks'), '101')),
          owner_ref: q.Select(['data', 'owner'], q.Var('spellbook')),
          owner: q.If(
            q.Exists(q.Var('owner_ref')),
            q.Get(q.Var('owner_ref')),
            { data: { name: 'DISAPPEARED' } },
          ),
        },
        {
          spellbook: q.Select(['data', 'name'], q.Var('spellbook')),
          owner: q.Select(['data', 'name'], q.Var('owner')),
        }
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))
    ```

    ```none
    { spellbook: "Dallben's Spellbook", owner: 'DISAPPEARED' }
    ```

-   Fauna’s flexible data model allows documents with different structures to exist side-by-side in a single collection, so two documents in a single collection might have entirely different structures. When evaluating a document where the field structure is not consistent, attempting to access a non-existent field causes your query to fail.

Faunaの柔軟なデータモデルにより、異なる構造のドキュメントを1つのコレクションに並べて存在させることができるため、1つのコレクション内の2つのドキュメントの構造が完全に異なる場合があります。フィールド構造に一貫性がないドキュメントを評価するときに、存在しないフィールドにアクセスしようとすると、クエリが失敗します。

    You can test for the existence of a field within a document by using the [`If`](https://docs.fauna.com/fauna/current/api/fql/functions/if) and [`ContainsPath`](https://docs.fauna.com/fauna/current/api/fql/functions/containspath) functions.

IfandContainsPath関数を使用して、ドキュメント内のフィールドの存在をテストでき ます。

    For example, the following query fails because only some documents contain the `extra` field:

たとえば、一部のドキュメントにのみextraフィールドが含まれているため、次のクエリは失敗します。

    ```javascript
    client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Letters'))),
        q.Lambda(
          'ref',
          q.Let(
            { doc: q.Get(q.Var('ref')) },
            {
              letter: q.Select(['data', 'letter'], q.Var('doc')),
              extra: q.Concat(
                [
                  'Extra',
                  q.ToString(
                    q.Select(['data', 'extra'], q.Var('doc'))
                  ),
                ],
                '-'
              ),
            }
          )
        )
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))
    ```

    ```none
    Error: [NotFound: value not found] {
      description: 'Value not found at path [data,extra].',
      requestResult: [RequestResult]
    }
    ```

    Whereas the following query succeeds because we now check for the existence of the `extra` field, and since it does not exist we substitute with `UNDEFINED`:

次のクエリは、extraフィールドの存在を確認し、存在しないため、次のように置き換えて成功しますUNDEFINED。

    ```javascript
    client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Letters'))),
        q.Lambda(
          'ref',
          q.Let(
            { doc: q.Get(q.Var('ref')) },
            {
              letter: q.Select(['data', 'letter'], q.Var('doc')),
              extra: q.If(
                q.ContainsPath(['data', 'extra'], q.Var('doc')),
                q.Concat(
                  [
                    'Extra',
                    q.ToString(
                      q.Select(['data', 'extra'], q.Var('doc'))
                    ),
                  ],
                  '-'
                ),
                'UNDEFINED',
              ),
            }
          )
        )
      )
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))
    ```

    ```none
    {
      data: [
        { letter: 'A', extra: 'Extra-First' },
        { letter: 'B', extra: 'Extra-second' },
        { letter: 'C', extra: 'Extra-third' },
        { letter: 'D', extra: 'Extra-4th' },
        { letter: 'E', extra: 'Extra-fifth' },
        { letter: 'F', extra: 'Extra-sixth' },
        { letter: 'G', extra: 'Extra-seventh' },
        { letter: 'H', extra: 'Extra-eighth' },
        { letter: 'I', extra: 'Extra-9th' },
        { letter: 'J', extra: 'Extra-tenth' },
        { letter: 'K', extra: 'Extra-11' },
        { letter: 'L', extra: 'Extra-' },
        { letter: 'M', extra: 'UNDEFINED' },
        { letter: 'N', extra: 'Extra-14th' },
        { letter: 'O', extra: 'Extra-fifteenth' },
        { letter: 'P', extra: 'Extra-16th' },
        { letter: 'Q', extra: 'Extra-seventeenth' },
        { letter: 'R', extra: 'Extra-18th' },
        { letter: 'S', extra: 'Extra-19th' },
        { letter: 'T', extra: 'Extra-20th' },
        { letter: 'U', extra: 'Extra-21st' },
        { letter: 'V', extra: 'Extra-22nd' },
        { letter: 'W', extra: 'Extra-twenty-third' },
        { letter: 'X', extra: 'Extra-24' },
        { letter: 'Y', extra: 'Extra-24 + 1' },
        { letter: 'Z', extra: 'UNDEFINED' }
      ]
    }
    ```

## [](#errors)Errors

-   503 response codes typically indicate that a timeout has been triggered, which could be due to contended queries, queries with high compute operations, etc.

503応答コードは通常、タイムアウトがトリガーされたことを示します。これは、競合するクエリ、高い計算操作を伴うクエリなどが原因である可能性があります。

    The best practice to handle 503 responses is to retry the query. Fauna is comprised of multiple replicas that each involve multiple nodes. Retrying would often involve a different set of nodes than the original query, and so may be more successful.

503応答を処理するためのベストプラクティスは、クエリを再試行することです。Faunaは、それぞれが複数のノードを含む複数のレプリカで構成されています。再試行には、多くの場合、元のクエリとは異なるノードのセットが含まれるため、より成功する可能性があります。

    The best practice for retries is to apply a smaller query timeout initially so that your query can fail faster and then retry, and to apply exponential back-off to that timeout so that you are not creating a situation where your queries can never succeed but you keep executing queries.

再試行のベストプラクティスは、最初に小さいクエリタイムアウトを適用して、クエリがより速く失敗してから再試行できるようにし、そのタイムアウトに指数バックオフを適用して、クエリが成功しない状況を作成しないようにすることです。クエリを実行し続けます。

## [](#indexes)Indexes

-   Instead of using "collection indexes" — indexes with no `terms` or `values` specified — consider using the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function. See [Indexes](https://docs.fauna.com/fauna/current/api/fql/indexes) for details.

「コレクションインデックス」（なしtermsまたはvalues指定されたインデックス）を使用する代わりに 、Documents 関数の使用を検討してください。詳細については、インデックスを参照してください。

## [](#security)Security

-   Periodically, revoke existing keys then generate and distribute new keys. See [Keys](https://docs.fauna.com/fauna/current/security/keys) for details.

定期的に、既存のキーを取り消してから、新しいキーを生成して配布します。詳細については、キーを参照してください。

-   Use Admin keys sparingly. Keys with custom roles that determine specific privileges are safer. See [User-defined role](https://docs.fauna.com/fauna/current/security/keys#user-defined-role) for details.

管理者キーは慎重に使用してください。特定の特権を決定するカスタムロールを持つキーの方が安全です。詳細については、 ユーザー定義の役割を参照してください。

## [](#temporality)Temporality

-   Temporality is the Fauna feature that allows you to perform point-in-time queries. A point-in-time query is executed using a specific timestamp in the past, using the [`At`](https://docs.fauna.com/fauna/current/api/fql/functions/at) function. The results are based on the document versions available at that timestamp.

テンポラリティは、ポイントインタイムクエリを実行できるFauna機能です。ポイントインタイムクエリは、At関数を使用して、過去の特定のタイムスタンプを使用して実行されます。結果は、そのタイムスタンプで利用可能なドキュメントバージョンに基づいています。

    When you are not using temporality on a collection’s documents, document versions increase your storage costs and reduce the performance of indexes covering those documents. Reduce the collection’s `history_days` setting to reduce the period of time document versions should exist.

コレクションのドキュメントでテンポラリティを使用していない場合、ドキュメントバージョンはストレージコストを増加させ、それらのドキュメントをカバーするインデックスのパフォーマンスを低下させます。コレクションのhistory_days 設定を減らして、ドキュメントバージョンが存在する期間を減らします。

## [](#backup)Backup

-   Fauna stores data in geographically-distributed [clusters](https://docs.fauna.com/fauna/current/glossary#Cluster) of replicas, each involving multiple nodes. This means that there are always multiple copies of your stored documents.

Faunaは、地理的に分散したレプリカのクラスターにデータを格納します 。各クラスターには複数のノードが含まれます。これは、保存されたドキュメントのコピーが常に複数あることを意味します。

    Fauna does not currently offer a backup and restore solution.

Faunaは現在、バックアップと復元のソリューションを提供していません。

