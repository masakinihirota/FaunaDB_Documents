Schema previews | Fauna Documentation
https://docs.fauna.com/fauna/current/api/graphql/previews/

# Schema previews

スキーマプレビュー

The Fauna GraphQL API uses an approach called "Schema previews", which gives you early, opt-in access to new or incomplete features. This approach lets you test features which will be available to production GraphQL queries in the future, which lets you develop your GraphQL queries with confidence.

動物相 GraphQLAPIは、「スキーマプレビュー」と呼ばれるアプローチを使用します。これにより、新しい機能または不完全な機能への早期のオプトインアクセスが可能になります。このアプローチにより、本番環境で使用できる機能をテストできます GraphQL 将来のクエリ。これにより、 GraphQL 自信を持ってクエリを実行します。

Schema previews represent functionality changes to the GraphQL API. All such changes will be made in an _additive_ way. Whenever fields require changes, they will be marked as deprecated but otherwise continue to function as normal. New fields supporting the new/revised functionality are added. This approach should eliminate changes that could break your queries.

スキーマプレビューは、機能の変更を表します GraphQLAPI。このような変更はすべて、追加的な方法で行われます。フィールドに変更が必要な場合は常に、非推奨としてマークされますが、それ以外の場合は通常どおり機能し続けます。新機能/改訂機能をサポートする新しいフィールドが追加されました。このアプローチにより、クエリを壊す可能性のある変更を排除できます。

Schema previews are opt-in, and are enabled per query:

スキーマプレビューはオプトインであり、クエリごとに有効になります。

-   When a schema preview provides some dynamic feature, such as a new query or mutation, a new dynamic type, etc., the schema preview needs to be enabled while executing queries via the [`/graphql` endpoint](https://docs.fauna.com/fauna/current/api/graphql/endpoints#graphql).

- スキーマプレビューが新しいクエリやミューテーション、新しい動的タイプなどの動的機能を提供する場合、/graphqlエンドポイントを介してクエリを実行するときにスキーマプレビューを有効にする必要があり ます。

-   When a schema preview provides new schema capabilities, such as a new directive, types, scalars, etc., the schema preview needs to be enabled while [merging or overriding](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes) a schema via the [`/import` endpoint](https://docs.fauna.com/fauna/current/api/graphql/endpoints#import).

- スキーマプレビューが、新しいディレクティブ、タイプ、スカラーなどの新しいスキーマ機能を提供する場合、[`/import` エンドポイント](https://docs.fauna.com/fauna/current/api/graphql/endpoints#import)を介してスキーマを [merge or overriding](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes)する際に、スキーマプレビューを有効にする必要があります。

This section describes the [Current schema previews](#previews), the [Retired schema previews](#production), and how to [Enable schema previews](#enable).

このセクションでは、現在のスキーマプレビュー、廃止されたスキーマプレビュー、およびスキーマプレビューを有効にする方法について説明し ます。

## [](#previews)Current schema previews

現在のスキーマプレビュー

Name

[`partial-update-mutation`](https://docs.fauna.com/fauna/current/api/graphql/previews/partial_update_mutation)

Description

Auto-generates an input type where all fields are optional, and auto-generates a mutation that validates any required fields at runtime.

名前	
partial-update-mutation

説明
すべてのフィールドがオプションである入力タイプを自動生成し、実行時に必要なフィールドを検証するミューテーションを自動生成します。

## [](#production)Retired schema previews

廃止されたスキーマプレビュー

This section describes schema previews that are no longer available as a preview, since their functionality has been integrated with normal, production schema processing.

このセクションでは、機能が通常の本番スキーマ処理と統合されているため、プレビューとして使用できなくなったスキーマプレビューについて説明します。

  

Name

_none so far_

Description

今のところなし

If you enable a schema feature that is no longer in preview, but is now in production, your request does not fail: the specified feature just works.

注意
プレビューではなく、現在本番環境にあるスキーマ機能を有効にしても、リクエストは失敗しません。指定された機能は正常に機能します。

## [](#enable)Enable schema previews

スキーマプレビューを有効にする

To access schema features that are in preview, your queries must include a custom HTTP header: `X-Schema-Preview`.

プレビュー中のスキーマ機能にアクセスするには、クエリにカスタムHTTPヘッダーを含める必要がありますX-Schema-Preview。

To enable a feature, specify its code in the header:

機能を有効にするには、ヘッダーでそのコードを指定します。

```http
X-Schema-Preview: partial-update-mutation
```

To enable multiple features, express the feature codes as a comma-separated list:

複数の機能を有効にするには、機能コードをコンマ区切りのリストとして表現します。

```http
X-Schema-Preview: partial-update-mutation, another-feature
```

In [Fauna Dashboard](https://dashboard.fauna.com/)'s GraphQL screen, you can add this header by clicking the **HTTP Headers** button in the lower left.

で動植物ダッシュボードのGraphQL画面、あなたがクリックすることによって、このヘッダを追加することができますHTTPヘッダの左下にあるボタンを。

Once a preview feature has moved out of preview and into production, the code is marked as "retired": the feature it represents is available for general use, and your query should continue to succeed even though the code is no longer required.

プレビュー機能がプレビューから本番環境に移行すると、コードは「廃止」としてマークされます。それが表す機能は一般に使用でき、コードが不要になった場合でもクエリは引き続き成功します。

If you provide an invalid feature code, your query fails with an invalid code error.

無効な機能コードを指定すると、クエリは無効なコードエラーで失敗します。

