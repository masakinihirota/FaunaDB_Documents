Multi-tenancy | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/multitenant

# Multi-tenancy

Many database systems provide multi-tenant capabilities. They can contain multiple databases, each with their own access controls. Fauna takes this much further by allowing any database to have multiple child databases. This enables an operator to manage a single large Fauna cluster, create a few top-level databases, and give full administrative access of those databases to the respective teams. Each team is free to create as many databases as they need without requiring operator intervention. As far as the team is concerned, they have their own full Fauna cluster.

多くのデータベースシステムは、マルチテナント機能を備えています。複数のデータベースを持ち、それぞれにアクセス制御を行うことができるのだ。Faunaはこれをさらに推し進め、どのデータベースも複数の子データベースを持つことができる。これにより、オペレータは1つの大きなFaunaクラスタを管理し、いくつかのトップレベルのデータベースを作成して、それらのデータベースの完全な管理アクセスを各チームに与えることができます。各チームは、オペレーターの介入を必要とせず、必要な数のデータベースを自由に作成することができます。チームは自分たちのFaunaクラスタを持っていることになる。

It is not possible to query databases outside of the current database. It is possible to perform read-only queries within child databases by specifying the optional `database` parameter when calling any of these functions: [`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection), [`Collections`](https://docs.fauna.com/fauna/current/api/fql/functions/collections), [`Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database), [`Databases`](https://docs.fauna.com/fauna/current/api/fql/functions/databases), [`Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function), [`Functions`](https://docs.fauna.com/fauna/current/api/fql/functions/functions), [`Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex), [`Indexes`](https://docs.fauna.com/fauna/current/api/fql/functions/indexes), [`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys), [`Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role), [`Roles`](https://docs.fauna.com/fauna/current/api/fql/functions/roles)

現在のデータベース以外のデータベースへの問い合わせはできません。これらの関数を呼び出す際に、オプションの `database` パラメータを指定することで、子データベース内で読み取り専用のクエリを実行することができます。Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection), [Collections`](https://docs.fauna.com/fauna/current/api/fql/functions/collections), [Database`](https://docs.fauna.com/fauna/current/api/fql/functions/database), [Databases`](https://docs.fauna.com/fauna/current/api/fql/functions/databases), [Function`](https://docs.fauna.com/fauna/current/api/fql/functions/function), [Functions`](https://docs.fauna.com/fauna/current/api/fql/functions/functions), [Index`](https://docs.fauna.com/fauna/current/api/fql/functions/iindex), [`Indexes`](https://docs.fauna.com/fauna/current/api/fql/functions/indexes), [Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys), [Role`](https://docs.fauna.com/fauna/current/api/fql/functions/role), [`Roles`](https://docs.fauna.com/fauna/current/api/fql/functions/roles)

To query another database, or perform queries involving writes within a child database, you must use a secret associated with that database. See [Fauna key system](https://docs.fauna.com/fauna/current/security/keys) for more information.

別のデータベースへの問い合わせや、子データベース内の書き込みを含む問い合わせを行うには、そのデータベースに関連するシークレットを使用する必要があります。詳しくは[Fauna key system](https://docs.fauna.com/fauna/current/security/keys)を参照してください。

This tutorial demonstrates how to create multiple databases, create child databases, and provide access secrets.

このチュートリアルでは、複数のデータベースを作成し、子データベースを作成し、アクセスシークレットを提供する方法を説明します。

This tutorial assumes that you have completed the [Fauna Shell](https://docs.fauna.com/fauna/current/start/) quick start.

このチュートリアルは、[Fauna Shell](https://docs.fauna.com/fauna/current/start/)のクイックスタートが完了していることを前提としています。

1.  **Start Fauna Shell**

**Fauna Shell を起動します。**

    In a terminal, start Fauna Shell by running:

    ターミナルで次のコマンドを実行し、Fauna Shell を起動します。

    terminal

    ```bash
    fauna shell my_db
    Starting shell for database my_db
    Connected to https://db.fauna.com
    Type Ctrl+D or .exit to exit the shell

    ```

    The secret used to setup and access the database `my_db` is an admin secret, which has permission to create and manage child databases.

    データベース `my_db` の設定とアクセスに使用するシークレットは、子データベースの作成と管理の権限を持つ admin シークレットです。

2.  **Create the top-level databases**

**トップレベルのデータベースを作成する**。

    First, create a set of top-level databases that can be handed over to individual teams. Run the following query to create two databases, named `production` and `internal`:

    まず、各チームに引き渡すことができるトップレベルのデータベースを作成します。以下のクエリを実行して、`production`と`internal`という名前の2つのデータベースを作成します。

    shell

    ```shell
    Map(
      ["production", "internal"],
      Lambda("name", CreateDatabase({ name: Var("name")}))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    ```javascript
    [ { ref: Database("production"),
        ts: 1558574366150000,
        name: 'production' },
      { ref: Database("internal"),
        ts: 1558574366150000,
        name: 'internal' } ]
    ```

3.  **Create admin secrets for each database**

**各データベースの管理者用シークレットの作成**

    Here we create admin secrets for each database. These secrets can be handed to each team, and they give the teams full control over their respective databases (but not each other’s).

    ここでは、各データベースの管理者用シークレットを作成します。これらのシークレットは各チームに渡すことができ、各チームはそれぞれのデータベースを完全にコントロールすることができます（ただし、お互いにコントロールすることはできません）。

    shell

    ```shell
    Map(
      [Database("production"), Database("internal")],
      Lambda("db", CreateKey({ role: "admin", database: Var("db") }))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    ```javascript
    [ { ref: Ref(Keys(), "233115268679729664"),
        ts: 1558574894580000,
        role: 'admin',
        database: Database("production"),
        secret: 'fnADPDEaDWACAONo-I_v8FH9DEuWDZKCGQyborRY',
        hashed_secret:
         '$2a$05$ufSuq8vPlxU2KpX3qIxTMue59uz51D.VpXwfiZovyMAm.1lcY/IPK' },
      { ref: Ref(Keys(), "233115268694409728"),
        ts: 1558574894580000,
        role: 'admin',
        database: Database("internal"),
        secret: 'fnADQDExDkACAJxK4j3CwxjTWxB2CnqTHowktW4M',
        hashed_secret:
         '$2a$05$3XncjrjIPhkPAXX9DsV8B.46FVJZOmSAOF6dsqMz3/p5HiLt1aPDm' } ]
    ```

    Be sure to save a copy of each secret. Secrets are only displayed when they are created. If you lose a secret, you would need to delete the associated key and make a new one.

    各シークレットのコピーを必ず保存してください。シークレットは作成されたときにしか表示されません。シークレットを紛失した場合は、関連するキーを削除して新しいキーを作成する必要があります。

4.  **Create per-team child databases**

**チームごとに子データベースを作成します。**

    Given the new keys, each team can create their own child databases that fit their needs. In this case, the production team does not need any child databases, but the internal team does.

    新しいキーが与えられれば、各チームは自分たちのニーズに合った子データベースを作成することができます。今回のケースでは、プロダクションチームには子データベースは必要ありませんが、インターナルチームには必要です。

    Open a new terminal window, and start Fauna Shell with the secret for the `internal` database (**replace the secret below with the secret generated in the previous command**):

    新しいターミナルウィンドウを開き、「内部」データベースのシークレットを指定して Fauna Shell を起動します (**以下のシークレットを前のコマンドで生成したシークレットに置き換えてください**)。

    terminal

    ```bash
    fauna shell --secret=fnADQDExDkACAJxK4j3CwxjTWxB2CnqTHowktW4M
    Connected to https://db.fauna.com
    Type Ctrl+D or .exit to exit the shell

    ```

    Fauna knows which database to connect to when you provide a secret, but it doesn’t know the database’s name (the prompt is just `>`).

    Fauna はシークレットを指定すると、どのデータベースに接続するかを知っていますが、データベースの名前は知りません（プロンプトは単に `>` です）。

    The internal team needs two child databases, `personnel` and `bulletin-board`. Run the following query:

    内部チームは、`personnel`と`bulletin-board`という2つの子データベースを必要としています。以下のクエリを実行します。

    shell

    ```shell
    Map(
      ["personnel", "bulletin-board"],
      Lambda("db", CreateDatabase({ name: Var("db") }))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    ```javascript
    [ { ref: Database("personnel"),
        ts: 1558575584530000,
        name: 'personnel' },
      { ref: Database("bulletin-board"),
        ts: 1558575584530000,
        name: 'bulletin-board' } ]
    ```

5.  **Create server secrets for the internal team’s child databases**

**社内チームの子データベース用にサーバーシークレットを作成する**

    The internal team has an application for each database, so we now need to create server secrets to permit the applications to connect to their respective databases. Server secrets do not have permission to create or manage child databases; they can only be used to connect to their associated database.

    内部チームはそれぞれのデータベースに対応したアプリケーションを持っているので、アプリケーションがそれぞれのデータベースに接続できるようにサーバーシークレットを作成する必要があります。サーバーシークレットには、子データベースの作成や管理の権限はなく、関連するデータベースへの接続にのみ使用できます。

    Run the following query:

    以下のクエリを実行します。

    shell

    ```shell
    Map(
      [Database("personnel"), Database("bulletin-board")],
      Lambda("db", CreateKey({ role: "server", database: Var("db") }))
    )
    ```

    You should see output similar to:

    以下のような出力が表示されるはずです。

    ```javascript
    [ { ref: Ref(Keys(), "233116225856602624"),
        ts: 1558575807350000,
        role: 'server',
        database: Database("personnel"),
        secret: 'fnADPDH46ZACAIfnmFk883bVBkFVFodHhtVXXtBK',
        hashed_secret:
         '$2a$05$WWJkl8bydmoAo8D0KNN/w.4sglkxfDwKtSIYr3RU5jg36uT3l3atm' },
      { ref: Ref(Keys(), "233116225856603648"),
        ts: 1558575807350000,
        role: 'server',
        database: Database("bulletin-board"),
        secret: 'fnADPDH46ZAGAMjVDSoDHU89i0qsMq9uMArnLzoK',
        hashed_secret:
         '$2a$05$ZgftjR/OiajqV3qaDSDl0uHolpaO.HRfHQoM4NaWlinF18bgcIUli' } ]
    ```

    These secrets should be copied into the respective application’s configuration now; you won’t see the secrets again.

    これらのシークレットはそれぞれのアプリケーションの設定にコピーしておきましょう。

6.  **Verify the configuration**

**設定を確認する**

    Now that the databases have been created, which databases can be seen?

    データベースが作成されましたが、どのデータベースを見ることができますか？

    In the terminal with Fauna Shell connected to the internal database, run the following query:

    内部データベースに Fauna Shell を接続したターミナルで、次のクエリを実行します。

    shell

    ```shell
    Paginate(Databases())
    ```

    You should see output similar to:

    次のような出力が表示されるはずです。

    ```javascript
    { data: [ Database("personnel"), Database("bulletin-board") ] }
    ```

    In the terminal with the Fauna Shell connected to the `my_db` database, run the following query:

    Fauna Shell が `my_db` データベースに接続されているターミナルで、以下のクエリを実行します。

    shell

    ```shell
    Paginate(Databases())
    ```

    You should see output similar to:

    次のような出力が表示されるはずです。

    ```javascript
    { data: [ Database("production"), Database("internal") ] }
    ```

    Surprised? Fauna only lists the immediate child databases within the connected database. However, the operator can use her admin secret to connect to the child databases to investigate further.

    驚きましたか？Fauna は、接続されているデータベース内の直近の子データベースのみをリストアップします。しかし、オペレーターは管理者の秘密を使って子データベースに接続し、さらに詳しく調べることができます。

## [](#conclusion)Conclusion

結論

In this tutorial, we demonstrated how to set up a hierarchy of databases, starting with two top-level, broadly-scoped databases and continuing down to individual databases for the internal team. And we saw how to create access secrets and learned how much access those secrets provide.

このチュートリアルでは、2つのトップレベルの広い範囲をカバーするデータベースから始まり、内部チームのための個々のデータベースに至るまで、データベースの階層を設定する方法を示しました。また、アクセスシークレットの作成方法と、そのシークレットによってどの程度のアクセスが可能になるかを学びました。

Fauna works identically. An organization can build their database hierarchy according to their structure without the overhead of operating their own Fauna cluster.

Faunaも同様に機能します。組織は、独自の Fauna クラスタを運用するオーバーヘッドなしに、組織の構造に応じてデータベース階層を構築することができる。

## [](#next-steps)Next steps

-   [Fauna’s security system](https://docs.fauna.com/fauna/current/security/)
-   [Other tutorials](https://docs.fauna.com/fauna/current/tutorials/)

