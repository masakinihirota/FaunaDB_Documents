ABAC + GraphQL
https://fauna.com/blog/abac-graphql

# ABAC + GraphQL

Leo Regnier|Dec 10th, 2019|

2019 年 12 月 10 日

Categories:

[Features](https://fauna.com/blog?category=features)[Tutorial](https://fauna.com/blog?category=tutorial)[GraphQL](https://fauna.com/blog?category=graphql)

In this article, we will learn about Fauna's ABAC capabilities, and how they can be used with Fauna's native GraphQL API. To do so, we will go through an example use case showing how to build a comprehensive authorization implementation with Fauna's GraphQL API.

この記事では、Fauna の ABAC 機能と、それを Fauna のネイティブ GraphQL API でどのように使用できるかについて説明します。そのために、Fauna の GraphQL API を使って包括的な認証実装を構築する方法を示すユースケースの例を見ていきます。

First, let’s start by revisiting the main aspects of the ABAC model.

まず、ABAC モデルの主な点を再確認することから始めましょう。

## What is ABAC?

ABAC とは？

ABAC stands for Attribute-Based Access Control. As its name indicates, it’s an authorization model that establishes access policies based on attributes. Attributes are characteristics that describe any of the different elements in the system. These can be one of the following types:

ABAC とは Attribute-Based Access Control（属性ベースのアクセスコントロール）の略。その名が示すように、属性に基づいてアクセスポリシーを確立する認証モデルである。属性とは、システム内のさまざまな要素を記述する特性のことです。属性には以下の種類があります。

- User attributes: describe the user attempting the access (e.g., role, department, clearance level, etc).

- ユーザー属性：アクセスを試みるユーザーを記述する（例：役割、部署、クリアランスレベルなど）。

- Action attributes: describe the action being attempted (e.g., read, write, delete, etc).

- アクション属性：試みられているアクションを記述します（例：読み取り、書き込み、削除など）。

- Resource attributes: describe the resource being accessed (e.g., owner, sensitivity, creation date, etc).

- リソース属性：アクセスされるリソースを記述する（所有者、感度、作成日など）。

- Environmental attributes: describe the environmental conditions on which the access attempt is being performed (e.g., location, time, day of the week, etc).

- 環境属性：アクセス試行が行われている環境条件を記述する（場所、時間、曜日など）。

Through the combination of these attributes, ABAC allows the definition of fine-grained access control policies on a new level. This ability to express truly complex access rules is the key aspect of the ABAC model, and what makes it stand out from its predecessors.

これらの属性の組み合わせにより、ABAC は新しいレベルのきめ細かなアクセス制御ポリシーの定義を可能にします。本当に複雑なアクセスルールを表現できることが、ABAC モデルの重要な点であり、従来のモデルとは一線を画しています。

Fauna implements ABAC as part of its integral [security model](https://docs.fauna.com/fauna/current/security/), which allows the definition of attribute-based policies through its FQL API.

Fauna では、インテグラル[セキュリティモデル](https://docs.fauna.com/fauna/current/security/)の一部として ABAC を実装しており、FQL API を通じて属性ベースのポリシーを定義することができます。

## An example use case

ユースケースの例

Now that we've gone through the principles of the ABAC model, let's introduce an example use case that demonstrates Fauna's ABAC and GraphQL API features working together.

ABAC モデルの原則を確認したところで、Fauna の ABAC と GraphQL API の機能が連携していることを示すユースケース例を紹介しよう。

Since we will be building a GraphQL service, we are going to use the GraphQL Schema Definition Language (SDL) to model our domain. SDL is the most simple and intuitive, yet powerful and expressive, tool to describe a GraphQL schema. Its syntax is well-defined and is part of the official [GraphQL specification](https://graphql.org/learn/schema).

今回は GraphQL サービスを構築するので、ドメインのモデル化には GraphQL Schema Definition Language（SDL）を使用します。SDL は、GraphQL スキーマを記述するための最もシンプルで直感的、かつ強力で表現力に富んだツールである。その文法は明確に定義されており、公式の[GraphQL 仕様](https://graphql.org/learn/schema)の一部となっている。

So, for the domain model defined in the following GraphQL schema:

そこで、以下のような GraphQL スキーマで定義されたドメインモデルに対して

```javascript
type User {
  username: String! @unique
  role: UserRole!
}

enum UserRole {
  MANAGER
  EMPLOYEE
}

type File {
  content: String!
  confidential: Boolean!
}

input CreateUserInput {
  username: String!
  password: String!
  role: UserRole!
}

input LoginUserInput {
  username: String!
  password: String!
}

type Query {
  allFiles: [File!]!
}

type Mutation {
  createUser(input: CreateUserInput): User! @resolver(name: "create_user")
  loginUser(input: LoginUserInput): String! @resolver(name: "login_user")
}
```

We are going to implement the following access rules:

以下のようなアクセスルールを導入する予定です。

1.  Allow employee users to read public files only.

1.  従業員ユーザーに公開ファイルの読み取りのみを許可する。

1.  Allow manager users to read both public files and, only during weekdays, confidential files.

1.  管理者ユーザーが公開ファイルと、平日のみ機密ファイルの両方を読めるようにする。

As you might have already noticed, these access rules include all of the different ABAC attribute types described earlier.

すでにお気づきかもしれませんが、これらのアクセスルールには、前述のさまざまな ABAC 属性タイプがすべて含まれています。

We will define the access rules through the FQL API, and then verify that they are working as expected by executing some queries from the GraphQL API.

FQL API を使ってアクセスルールを定義し、GraphQL API からいくつかのクエリを実行して、期待通りに動作しているかどうかを検証します。

With our goals already set, let’s put our hands to work!

目標を設定した後は、手を動かしてみましょう。

# Importing the schema

スキーマのインポート

First, let’s import the example schema into a new database. Log into the Fauna [Cloud Console](https://dashboard.fauna.com/) with your credentials. If you don’t have an account yet, you can sign up for free in a few seconds.

まず、例のスキーマを新しいデータベースにインポートしてみましょう。Fauna [Cloud Console](https://dashboard.fauna.com/)に認証情報を入力してログインします。まだアカウントをお持ちでない方は、数秒で無料でサインアップできます。

Once logged in, click the NEW DATABASE button from the home page:

ログインしたら、トップページの「NEW DATABASE」ボタンをクリックします。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2iRt4DODdB98hb3Z4GcH2C/024ff3150f6b556709ebd0cd0e484465/6629-ABAC_GraphQL-1.png)

Choose a name for the new database, and click the SAVE button:

新しいデータベースの名前を決めて、「SAVE」ボタンをクリックします。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6UcT6nxq8MFqHKypVb3Nlw/1c208186aa8f6a9829cd839aef5eafc7/6630-ABAC_GraphQL-2.png)

Next, we will import the GraphQL schema listed above into the database we just created. To do so, create a file named schema.gql containing the schema definition. Then, select the GRAPHQL tab from the left sidebar, click the IMPORT SCHEMA button, and select the newly-created file:

次に、先ほど作成したデータベースに、上記の GraphQL スキーマをインポートします。そのためには、スキーマの定義を含む schema.gql というファイルを作成します。そして、左サイドバーから「GRAPHQL」タブを選択し、「IMPORT SCHEMA」ボタンをクリックして、新たに作成したファイルを選択してください。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/1x4wutqtg6zucT8fVvgUgT/4114dfe33a409b54b13d157cb6ff0ace/6631-ABAC_GraphQL-3.png)

The import process creates all of the necessary database elements, including collections and indexes, for backing up all of the types defined in the schema. In the next step, we will implement the custom resolver functions for the createUser and loginUser Mutation fields.

インポート処理では、スキーマで定義されたすべてのタイプをバックアップするために、コレクションやインデックスなど、必要なデータベース要素がすべて作成されます。次のステップでは、createUser と loginUser Mutation フィールド用のカスタム・レゾルバ関数を実装します。

# Implementing custom resolvers

カスタムリゾルバの実装

When looking at the schema, you might notice that the createUser and loginUser Mutation fields have been annotated with a special directive named [@resolver](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver). This is a directive provided by the Fauna GraphQL API, which allows us to define a custom behavior for a given Query or Mutation field.

スキーマを見ていると、createUser と loginUser Mutation フィールドに [@resolver](https://docs.fauna.com/fauna/current/api/graphql/directives/d_resolver) という特別なディレクティブがアノテーションされていることに気づくかもしれません。これは、Fauna GraphQL API で提供されているディレクティブで、指定された Query または Mutation フィールドに対してカスタムの動作を定義することができます。

On the database end, a template [User-defined function](https://docs.fauna.com/fauna/current/api/graphql/functions) (UDF) is created during the import process for each of the fields annotated with the @resolver directive. A UDF is a custom Fauna function, similar to a _stored procedure_, that enables users to define a tailor-made operation in [FQL](https://docs.fauna.com/fauna/current/api/fql/). This function is then used as the resolver of the annotated field.

データベース側では、@resolver ディレクティブでアノテーションされた各フィールドのインポート処理中に、テンプレート[User-defined function](https://docs.fauna.com/fauna/current/api/graphql/functions) (UDF)が作成されます。UDF は Fauna のカスタム関数で、*stored procedure*に似ており、[FQL](https://docs.fauna.com/fauna/current/api/fql/)でオーダーメイドの操作を定義することができます。この関数は、アノテーションされたフィールドのリゾルバとして使用されます。

Now, let’s continue to implement the UDF for the createUser field resolver. First, select the SHELL tab from the left sidebar:

さて、引き続き createUser フィールドリゾルバの UDF を実装していきましょう。まず、左サイドバーから「SHELL」タブを選択します。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6hj673QOCVyFW8r0nDyzkp/5a37924615db53485ea2330fbf463a92/6632-ABAC_GraphQL-4.png)

As explained before, a template UDF has already been created during the import process. When called, this template UDF prints an error message stating that it needs to be updated with a proper implementation. In order to update it with the intended behavior, we are going to use FQL's [Update](https://docs.fauna.com/fauna/current/api/fql/functions/update) function.

先に説明したように、インポート処理中にテンプレート UDF がすでに作成されています。このテンプレート UDF が呼び出されると、適切な実装に更新する必要があるというエラーメッセージが表示されます。意図した通りの動作に更新するために、FQL の[Update](https://docs.fauna.com/fauna/current/api/fql/functions/update)関数を使用することにします。

So, let’s copy the following FQL query into the command panel, and click the RUN QUERY button:

そこで、以下の FQL クエリをコマンドパネルにコピーして、「RUN QUERY」ボタンをクリックしてみましょう。

```javascript
Update(Function("create_user"), {
  body: Query(
    Lambda(
      ["input"],
      Create(Collection("User"), {
        data: {
          username: Select("username", Var("input")),
          role: Select("role", Var("input")),
        },
        credentials: {
          password: Select("password", Var("input")),
        },
      })
    )
  ),
});
```

Your screen should look similar to:

以下のような画面になります。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2bKaseQeS5zLy95fUWb8wJ/84967a2e3907694133ff045d8f7e17ec/6633-ABAC_GraphQL-5.png)

The create*user UDF will be in charge of properly creating a User document along with a password value. The password is stored in the document within a special object named \_credentials* that cannot be retrieved back by any FQL function. As a result, the password is securely saved in the database making it impossible to read from either the FQL or the GraphQL APIs. The password will be used later for authenticating a User through a dedicated FQL function named [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login), as explained next.

create_user UDF は、パスワード値を持つ User ドキュメントを適切に作成する役割を果たします。パスワードはドキュメント内の ˶˙º̬˙˶ という名前の特別なオブジェクトに保存され、FQL 関数では取り出せません。その結果、パスワードはデータベースに安全に保存され、FQL や GraphQL の API から読み取ることができなくなります。このパスワードは、次に説明するように、[Login](https://docs.fauna.com/fauna/current/api/fql/functions/login)という専用の FQL 関数を使ってユーザーを認証する際に使用されます。

Now, let’s add the proper implementation for the UDF backing up the loginUser field resolver through the following FQL query:

それでは、以下の FQL クエリを使って、loginUser フィールドリゾルバをバックアップする UDF の適切な実装を追加してみましょう。

```javascript
Update(Function("login_user"), {
  body: Query(
    Lambda(
      ["input"],
      Select(
        "secret",
        Login(
          Match(
            Index("unique_User_username"),
            Select("username", Var("input"))
          ),
          { password: Select("password", Var("input")) }
        )
      )
    )
  ),
});
```

Copy the query listed above and paste it into the Shell’s command panel, and click the RUN QUERY button:

上記のクエリをコピーして、シェルのコマンドパネルに貼り付け、「RUN QUERY」ボタンをクリックします。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/BtJupaNwK6rP1dWzrxV8F/f74d478fb69443421af9e526e45af306/6634-ABAC_GraphQL-6.png)

The login*user UDF will attempt to authenticate a User with the given username and password credentials. As mentioned before, it does so via the [Login](https://docs.fauna.com/fauna/current/api/fql/functions/login) function. The Login function verifies that the given password matches the one stored along with the User document being authenticated. Note that the password stored in the database is not output at any point during the login process. Finally, in case the credentials are valid, the login_user UDF returns an authorization token called a \_secret* which can be used in subsequent requests for validating the User’s identity.

login*user UDF は、与えられたユーザー名とパスワードの資格情報を持つユーザーの認証を試みます。前述のように、[Login](https://docs.fauna.com/fauna/current/api/fql/functions/login)関数を介して行われます。Login 関数は、与えられたパスワードが、認証される User ドキュメントと共に保存されたものと一致するかどうかを検証します。なお、データベースに保存されているパスワードは、ログインプロセスのいかなる時点でも出力されません。最後に、認証情報が有効であった場合、login_user UDF は、ユーザーのアイデンティティを検証するために後続のリクエストで使用することができる、\_secret*と呼ばれる認証トークンを返します。

With the resolvers in place, we will continue with creating some sample data. This will let us try out our use case and help us better understand how the access rules are defined later on.

リゾルバを設置した後、いくつかのサンプルデータの作成を続けます。これにより、今回のユースケースを試し、後にアクセスルールがどのように定義されるかをよりよく理解することができます。

# Creating sample data

サンプルデータの作成

First, we are going to create a _manager_ user. Select the GRAPHQL tab from the left sidebar, copy the following mutation into the GraphQL Playground, and click the _Play_ button:

まず、*manager*のユーザーを作成していきます。左サイドバーから「GRAPHQL」タブを選択し、GraphQL Playground に以下のミューテーションをコピーして、「_Play_」ボタンをクリックします。

```javascript
mutation CreateManagerUser {
  createUser(input: {
    username: "bill.lumbergh"
    password: "123456"
    role: MANAGER
  }) {
    username
    role
  }
}
```

Your screen should look like this:

画面はこのようになります。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/4sVGHLKo8l2rIaAP29uBL9/2e5074877c2ef131cc07c9f0d0300c4c/6635-ABAV_GraphQL-7.png)

Next, let’s create an _employee_ user by running the following mutation through the GraphQL Playground editor:

次に、GraphQL Playground エディタで以下のミューテーションを実行して、*employee*ユーザーを作成してみましょう。

```javascript
mutation CreateEmployeeUser {
  createUser(input: {
    username: "peter.gibbons"
    password: "abcdef"
    role: EMPLOYEE
  }) {
    username
    role
  }
}
```

You should see the following response:

以下のようなレスポンスが表示されます。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/15qjqlxUgLdhj7Pdh0rINf/d5633ab46543878280d936c7e4b36746/6636-ABAC_GraphQL-8.png)

Now, let’s create a _confidential_ file by running the following mutation:

では、次のような突然変異を起こして、*confidential*ファイルを作ってみましょう。

```javascript
mutation CreateConfidentialFile {
  createFile(data: {
    content: "This is a confidential file!"
    confidential: true
  }) {
    content
    confidential
  }
}
```

As a response, you should get the following:

応答として、次のようなものが得られるはずです。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7zwv3DC8U79QtywlQYi6rB/94157781a39ef6b77e0cc256cdaa2c53/6637-ABAC_GraphQL-9.png)

And lastly, create a _public_ file with the following mutation:

そして最後に、次のような変異を持つ*public*ファイルを作成します。

```javascript
mutation CreatePublicFile {
  createFile(data: {
    content: "This is a public file!"
    confidential: false
  }) {
    content
    confidential
  }
}
```

If successful, it should prompt the following response:

成功した場合、次のような応答が表示されます。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/32H3byNeo3VuFYpBeOlYwb/d58078f2090dc5ba7c7f030e21c6f936/6638-ABAC_GraphQL-10.png)

Now that all the sample data is in place, let’s continue with defining the access rules that we described earlier. The access rules determine how the sample data we just created should be accessed.

全てのサンプルデータが揃ったところで、先ほど説明したアクセスルールの定義を進めていきましょう。アクセスルールとは、先ほど作成したサンプルデータにどのようにアクセスするかを決めるものです。

# Defining the access rules

アクセスルールの定義

In Fauna, access rules are defined in the form of roles. A role consists of the following data:

Fauna では、アクセスルールはロールの形で定義されている。ロールは以下のデータで構成されています。

- name — the name that identifies the role

- name - ロールを識別するための名前

- [privileges](https://docs.fauna.com/fauna/current/security/abac#privileges) — specific actions that can be executed on specific resources

- 特権](https://docs.fauna.com/fauna/current/security/abac#privileges) - 特定のリソース上で実行できる特定のアクション

- [membership](https://docs.fauna.com/fauna/current/security/abac#membership) — specific identities that should have the specified privileges

- [membership](https://docs.fauna.com/fauna/current/security/abac#membership) - 指定された権限を持つべき特定の ID

Roles are created through the [CreateRole](https://docs.fauna.com/fauna/current/api/fql/functions/createrole) FQL function, as shown in the following example snippet:

ロールは、次の例に示すように、[CreateRole](https://docs.fauna.com/fauna/current/api/fql/functions/createrole) FQL 関数によって作成されます。

```javascript
CreateRole({
  name: "role_name",
  membership: [
    // ...
  ],
  privileges: [
    // ...
  ],
});
```

A privilege specifies how a resource in Fauna (e.g., a database, collection, document, index, etc.) can be accessed through a set of predefined actions (e.g. create, read, delete, history_read, etc.) and a [predicate function](https://docs.fauna.com/fauna/current/security/abac#predicates). A predicate function is an FQL read-only function that returns true or false to indicate whether the access is permitted or not. The main purpose of a predicate function defined in the context of a role privilege is to read the attributes of the resource being accessed, and establish access policies based on them.

特権は、Fauna のリソース（データベース、コレクション、ドキュメント、インデックスなど）が、一連の定義済みアクション（create、read、delete、history_read など）と [predicate function](https://docs.fauna.com/fauna/current/security/abac#predicates) を通じて、どのようにアクセスできるかを指定します。プレディケート関数とは、アクセスが許可されているかどうかを示すために true または false を返す FQL の読み取り専用関数です。役割権限の文脈で定義された述語関数の主な目的は、アクセスされるリソースの属性を読み取り、それに基づいてアクセスポリシーを確立することです。

Here’s an example snippet that shows how to define a privilege that establishes read access on _public_ files for the File collection:

ここでは、File コレクションの*public*ファイルに対する読み取りアクセスを確立する特権を定義する方法を示す例を示します。

```javascript
privileges: [
  {
    resource: Collection("File"),
    actions: {
      // Read and establish rule based on action attribute
      read: Query(
        // Read and establish rule based on resource attribute
        Lambda(
          "fileRef",
          Not(Select(["data", "confidential"], Get(Var("fileRef"))))
        )
      ),
    },
  },
];
```

In addition, attributes of the subject attempting the access, as well as environmental attributes, are available within the privileges’ predicate functions too. This enables establishing further policies based on them, if required.

さらに、アクセスを試みる対象者の属性や環境の属性も、特権の述語関数の中で利用可能である。これにより、必要に応じて、それらに基づいてさらなるポリシーを確立することができます。

Membership defines a set of collections whose documents should have the role’s privileges. As in the case of privileges, a predicate function can be provided when defining the membership as well. The main purpose of a predicate function defined in the context of a role membership is to read the attributes of the user attempting access, and establish access policies based on them.

メンバーシップは、ドキュメントがロールの特権を持つべきコレクションのセットを定義します。特権の場合と同様に、メンバーシップを定義する際に、述語関数を提供することができます。ロール・メンバーシップのコンテキストで定義された述語関数の主な目的は、アクセスを試みるユーザの属性を読み取り、それに基づいてアクセス・ポリシーを確立することです。

Here’s an example snippet that shows how to define the membership for documents in the User collection that have a MANAGER role:

ここでは、MANAGER ロールを持つ User コレクションのドキュメントのメンバーシップを定義する方法を示す例を紹介します。

```javascript
membership: {
  resource: Collection("User"),
  predicate: Query(
    // Read and establish rule based on user attribute
    Lambda("userRef",
      Equals(Select(["data", "role"], Get(Var("userRef"))), "MANAGER")
    )
  )
}
```

In this case, the attributes of the resource being accessed are not available in the membership predicate function. Environmental attributes can be retrieved here though, in case they are required for defining further access rules based on them.

この場合、アクセスされるリソースの属性は、メンバーシップ述語関数では利用できません。環境属性は、それに基づいてさらにアクセスルールを定義する際に必要となる場合には、ここで取得することができます。

In sum, Fauna roles are a very flexible mechanism that allows defining access rules based on all of the system elements attributes, with different levels of granularity. The place where the rules are defined — privileges or membership — determines their granularity and the attributes that are available, and will differ with each particular use case.

要するに、Fauna のロールは非常に柔軟なメカニズムであり、システム要素のすべての属性に基づいて、さまざまなレベルの粒度でアクセスルールを定義することができます。ルールを定義する場所（特権またはメンバーシップ）によって、その粒度と利用可能な属性が決まり、特定のユースケースごとに異なります。

Now that we have covered the basics of how roles work, let’s continue by creating the access rules for our example use case! In order to keep things neat and tidy, we’re going to create two roles, one for each of the access rules. This will allow us to extend the roles with further rules in an organized way if required later. Nonetheless, be aware that all of the rules could also have been defined together within just one role if needed.

ロールの基本的な機能について説明しましたが、続いて例となるユースケースのアクセスルールを作成してみましょう。物事をきちんと整理しておくために、2 つのロールを作成し、それぞれのアクセスルールに対応させます。これにより、後で必要に応じてロールを拡張して、さらにルールを整理することができます。ただし、必要に応じて、すべてのルールを 1 つのロールにまとめて定義することもできますのでご注意ください。

Let’s implement the first rule:

1 つ目のルールを実行してみましょう。

_“Allow employee users to read public files only.”_

_"従業員のユーザーに公開ファイルの読み取りのみを許可する"_。

In order to create a role meeting these conditions, we are going to use the following query:

これらの条件を満たすロールを作成するために、次のようなクエリを使用することにします。

```javascript
CreateRole({
  name: "employee_role",
  membership: {
    resource: Collection("User"),
    predicate: Query(
      Lambda(
        "userRef",
        // User attribute based rule:
        // It grants access only if the User has EMPLOYEE role.
        // If so, further rules specified in the privileges
        // section are applied next.
        Equals(Select(["data", "role"], Get(Var("userRef"))), "EMPLOYEE")
      )
    ),
  },
  privileges: [
    {
      // Note: 'allFiles' Index is used to retrieve the
      // documents from the File collection. Therefore,
      // read access to the Index is required here as well.
      resource: Index("allFiles"),
      actions: { read: true },
    },
    {
      resource: Collection("File"),
      actions: {
        // Action attribute based rule:
        // It grants read access to the File collection.
        read: Query(
          Lambda(
            "fileRef",
            Let(
              {
                file: Get(Var("fileRef")),
              },
              // Resource attribute based rule:
              // It grants access to public files only.
              Not(Select(["data", "confidential"], Var("file")))
            )
          )
        ),
      },
    },
  ],
});
```

Select the SHELL tab from the left sidebar, copy the above query into the command panel, and click the RUN QUERY button:

左サイドバーから「SHELL」タブを選択し、上記のクエリをコマンドパネルにコピーして、「RUN QUERY」ボタンをクリックします。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/BKVTUoyHR7n1dFz2rhmIh/5cc2b1a4edcc1fadc47d13df04cbc90f/6647-ABAC_GraphQL-11-2.png)

Next, let’s implement the second access rule:

次に、2 つ目のアクセスルールを実装してみましょう。

_“Allow manager users to read both public files and, only during weekdays, confidential files.”_

\_"マネージャー・ユーザーが公開ファイルと、平日のみ機密ファイルの両方を読めるようにする"。

In this case, we are going to use the following query:

今回は、次のようなクエリを使用します。

```javascript
CreateRole({
  name: "manager_role",
  membership: {
    resource: Collection("User"),
    predicate: Query(
      Lambda(
        "userRef",
        // User attribute based rule:
        // It grants access only if the User has MANAGER role.
        // If so, further rules specified in the privileges
        // section are applied next.
        Equals(Select(["data", "role"], Get(Var("userRef"))), "MANAGER")
      )
    ),
  },
  privileges: [
    {
      // Note: 'allFiles' Index is used to retrieve the
      // documents from the File collection. Therefore,
      // read access to the Index is required here as well.
      resource: Index("allFiles"),
      actions: { read: true },
    },
    {
      resource: Collection("File"),
      actions: {
        // Action attribute based rule:
        // It grants read access to the File collection.
        read: Query(
          Lambda(
            "fileRef",
            Let(
              {
                file: Get(Var("fileRef")),
                dayOfWeek: DayOfWeek(Now()),
              },
              Or(
                // Resource attribute based rule:
                // It grants access to public files.
                Not(Select(["data", "confidential"], Var("file"))),
                // Resource and environmental attribute based rule:
                // It grants access to confidential files only on weekdays.
                And(
                  Select(["data", "confidential"], Var("file")),
                  And(GTE(Var("dayOfWeek"), 1), LTE(Var("dayOfWeek"), 5))
                )
              )
            )
          )
        ),
      },
    },
  ],
});
```

Copy the query into the command panel, and click the RUN QUERY button:

今回は、次のようなクエリを使用します。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2EpZvAZ8VhC4mJ4ivSHTCh/6c1b43b5eb2ae53d02b6ab5ae8be8eae/6648-ABAC_GraphQL-12-2.png)

At this point, we have created all of the necessary elements for implementing and trying out our example use case! Let’s continue with verifying that the access rules we just created are working as expected...

この時点で、例示したユースケースを実装して試すために必要な要素がすべて作成されました。続いて、作成したアクセスルールが期待通りに機能しているかどうかを確認してみましょう。

# Putting everything in action

♪ 全てを行動に移す

Let’s start by checking the first rule:

まずは、1 つ目のルールを確認してみましょう。

_“Allow employee users to read public files only.”_

_"従業員のユーザーに公開ファイルの読み取りのみを許可する"_。

The first thing we need to do is log in as an employee user so that we can verify which files can be read on its behalf. In order to do so, execute the following mutation from the GraphQL Playground console:

まず最初に行うべきことは、従業員ユーザーとしてログインして、どのファイルが読めるのかを確認することです。そのためには、GraphQL Playground コンソールから以下の変異を実行します。

```javascript
mutation LoginEmployeeUser {
  loginUser(input: {
    username: "peter.gibbons"
    password: "abcdef"
  })
}
```

As a response, you should get a _secret_ access token. The secret represents that the user has been authenticated successfully:

レスポンスとして、*secret*アクセストークンが得られるはずです。この secret は、ユーザーが正常に認証されたことを表しています。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6QaOPpDHocf82uoXHEda2o/874d6f38826830a585a200cb989b8030/6641-ABAC_GraphQL-13.png)

At this point, it’s important to remember that the access rules we defined earlier are not directly associated with the secret that is generated as a result of the login process. Unlike other authorization models, the secret token itself does not contain any _authorization_ information on its own, but it’s just an _authentication_ representation of a given document.

この時点で覚えておきたいのは、先に定義したアクセスルールは、ログイン処理の結果として生成されるシークレットとは直接関連していないということです。他の認証モデルとは異なり、シークレット・トークン自体はそれ自体で*認証*情報を含んでいるわけではなく、与えられたドキュメントの*認証*表現に過ぎません。

As explained before, access rules are stored in roles, and roles are associated with documents through their membership configuration. After authentication, the secret token can be used in subsequent requests to prove the caller’s identity and determine which roles are associated with it. This means that access rules are effectively verified in every subsequent request and not only during authentication. This model enables us to modify access rules dynamically without requiring users to authenticate again.

先に説明したように、アクセスルールはロールに格納され、ロールはメンバーシップ設定によりドキュメントと関連付けられます。認証後、シークレット・トークンを後続のリクエストで使用することにより、呼び出し元のアイデンティティを証明し、どのロールに関連付けられているかを判断することができます。つまり、アクセスルールは、認証時だけでなく、その後のすべてのリクエストで効果的に検証されます。このモデルにより、ユーザーに再度認証を要求することなく、アクセスルールを動的に変更することができます。

Now, we will use the secret issued in the previous step to validate the identity of the caller in our next query. In order to do so, we need to include the secret as a [_Bearer Token_](https://docs.fauna.com/fauna/current/api/graphql/endpoints#bearer-token) as part of the request. To achieve this, we have to modify the Authorization header value set by the GraphQL Playground. Since we don’t want to miss the admin secret that is being used as default, we’re going to do this in a new tab.

さて、前のステップで発行したシークレットを使って、次のクエリで発信者のアイデンティティを検証します。そのためには、シークレットを[_Bearer Token_](https://docs.fauna.com/fauna/current/api/graphql/endpoints#bearer-token)としてリクエストの一部に含める必要があります。そのためには、GraphQL Playground が設定する Authorization ヘッダーの値を変更する必要があります。デフォルトで使われている管理者用の秘密を見逃したくないので、新しいタブでこの作業を行います。

Click the plus (+) button to create a new tab, and select the HTTP HEADERS panel on the bottom left corner of the GraphQL Playground editor. Then, modify the value of the Authorization header to include the secret obtained earlier, as shown in the following example. Make sure to change the _scheme_ value from Basic to Bearer as well:

プラス（＋）ボタンをクリックして新しいタブを作成し、GraphQL Playground エディタの左下にある「HTTP HEADERS」パネルを選択します。次に、Authorization ヘッダーの値を変更して、先ほど取得したシークレットを含めるようにします（以下の例）。また、*scheme*の値を Basic から Bearer に変更することも忘れずに。

```javascript
{
  "authorization": "Bearer fnEDdByZ5JACFANyg5uLcAISAtUY6TKlIIb2JnZhkjU-SWEaino"
}
```

With the secret properly set in the request, let’s try to read all of the files on behalf of the employee user. Run the following query from the GraphQL Playground:

リクエストに適切にシークレットが設定されているので、employee ユーザーに代わってすべてのファイルを読み込んでみましょう。GraphQL Playground から以下のクエリを実行します。

```javascript
query ReadFiles {
  allFiles {
    data {
      content
      confidential
    }
  }
}
```

In the response, you should see the public file only:

レスポンスでは、公開ファイルのみが表示されるはずです。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/7iPTsMNdsgpNLzYqppbq13/adbbb84e76b408decba19cb7cb21d389/6642-ABAC_GraphQL-14.png)

Since the role we defined for employee users does not allow them to read confidential files, they have been correctly filtered out from the response!

従業員ユーザーに定義した役割では、機密ファイルを読むことができないため、応答から正しくフィルタリングされています。

Let’s move on now to verifying our second rule:

次に、2 つ目のルールの検証に移りましょう。

_“Allow manager users to read both public files and, only during weekdays, confidential files.”_

\_"マネージャー・ユーザーが公開ファイルと、平日のみ機密ファイルの両方を読めるようにする"。

This time, we are going to log in as the employee user. Since the login mutation requires an _admin_ secret token, we have to go back first to the original tab containing the default authorization configuration. Once there, run the following query:

今回は Employee ユーザーとしてログインしてみます。ログイン変異には _admin_ secret token が必要なので、まずデフォルトの認証設定を含む元のタブに戻らなければなりません。そこでは、次のようなクエリを実行します。

```javascript
mutation LoginManagerUser {
  loginUser(input: {
    username: "bill.lumbergh"
    password: "123456"
  })
}
```

You should get a new secret as a response:

これに応じて、新しいシークレットを取得する必要があります。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/2QZx7DAr3yH274FsdyrUT/595100048381aeabc2dd6af027a40cb1/6643-ABAC_GraphQL-15.png)

Copy the secret, create a new tab, and modify the Authorization header to include the secret as a Bearer Token as we did before. Then, run the following query in order to read all of the files on behalf of the manager user:

秘密をコピーして新しいタブを作成し、Authorization ヘッダを修正して、先ほどと同様に秘密を Bearer Token として含めるようにします。そして、次のようなクエリを実行して、manager ユーザーに代わってすべてのファイルを読み込みます。

```javascript
query ReadFiles {
  allFiles {
    data {
      content
      confidential
    }
  }
}
```

As long as you’re running this query on a weekday (if not, feel free to update this rule to include weekends), you should be getting both the public and the confidential file in the response:

このクエリを平日に実行している限り（そうでない場合は、このルールを更新して週末も含めることができます）、レスポンスには公開ファイルと機密ファイルの両方が含まれているはずです。

![blog post image](https://fauna.com//images.ctfassets.net/po4qc9xpmpuh/6EUAIaRfRY42GEiTbWdx4U/998701d8671f09c84d581f1bf7017ca3/6646-ABAC_GraphQL-16-2.png)

And, finally, we have verified that all of the access rules are working successfully from the GraphQL API!

そして最後に、GraphQL API からすべてのアクセスルールが正常に動作していることを確認しました

# Conclusion

結論

In this post, we have learned how a comprehensive authorization model can be implemented on top of the Fauna GraphQL API using Fauna's built-in ABAC features. We have also reviewed ABAC's distinctive capabilities, which allow defining complex access rules based on the attributes of each system component.

この記事では、Fauna GraphQL API の上に、Fauna に組み込まれた ABAC 機能を使って、包括的な認可モデルを実装する方法を学びました。また、各システムコンポーネントの属性に基づいて複雑なアクセスルールを定義できる、ABAC の特徴的な機能についても確認しました。

While access rules can only be defined through the FQL API at the moment, they are effectively verified for every request executed against the Fauna GraphQL API. Providing support for specifying access rules as part of the GraphQL schema definition is already planned for the future.

現時点では、アクセスルールは FQL API を通じてのみ定義できますが、Fauna GraphQL API に対して実行されるすべてのリクエストに対して、アクセスルールが効果的に検証されます。将来的には、GraphQL のスキーマ定義の一部としてアクセスルールを指定できるようにする予定です。

In short, Fauna provides a powerful mechanism for defining complex access rules on top of the GraphQL API covering most common use cases without the need of third-party services.

つまり、Fauna は GraphQL API の上で複雑なアクセスルールを定義するための強力なメカニズムを提供し、サードパーティのサービスを必要とせずに、ほとんどの一般的なユースケースをカバーします。
