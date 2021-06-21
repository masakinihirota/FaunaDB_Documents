# Attribute-based access control (ABAC)
属性ベースのアクセス制御 (ABAC)

重要
This tutorial assumes that you have completed
the [Quick Start with Fauna](https://docs.fauna.com/fauna/current/start/) tutorial.

このチュートリアルは、Faunaチュートリアルのクイック スタートを完了していることを前提としています 。

Attribute-based access control (ABAC) is an alternative
to an all-or-nothing security model,
and is commonly used in applications to restrict access
to specific data based on the user’s role.
ABAC is an extension of role-based access control (RBAC),
where users are assigned roles that grant them specific privileges.

The benefit of ABAC is that privileges can be dynamically
determined based on attributes of the user,
the documents to be accessed or modified,
or context during a transaction (for example,
time of day).
属性ベースのアクセス制御(ABAC)は、
全か無かのセキュリティモデルに代わるものであり、
ユーザーの役割に基づいて特定のデータへのアクセスを
制限するためにアプリケーションで一般的に使用されます。
ABACはロールベースのアクセス制御(RBAC)
の拡張であり、
ユーザーには特定の権限を付与するロールが割り当てられます。

ABACの利点は、
ユーザーの属性、
アクセスまたは変更するドキュメント、
またはトランザクション中のコンテキスト
(たとえば、時刻など)
に基づいて特権を動的に決定できることです。

In this tutorial,
we introduce Fauna’s
Attribute-Based Access Control (ABAC)
feature by simulating an employee hierarchy,
and employing a "smart" role that permits users to see their own salary,
and managers to see their own salary and the salaries of users that report to them.
このチュートリアルでは、
従業員の階層をシミュレートし、
ユーザーが自分の給与を確認できる「スマート」ロールを採用し、
マネージャーが自分の給与とユーザーの給与を確認できるようにすることで、
Faunaの属性ベースのアクセス制御(ABAC)
機能を紹介します。
それは彼らに報告します。

For more information on ABAC,
see [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac).
ABAC の詳細については、「属性ベースのアクセス制御 (ABAC)」を参照してください。

1.  **Create a new database**
新しいデータベースを作成する

    Open a terminal and run:
ターミナルを開き、次を実行します。

    terminal

    ```bash
    fauna create-database abac

    creating database abac
    created database 'abac'
    To start a shell with your new database, run:
    fauna shell 'abac'
    Or, to create an application key for your database, run:
    fauna create-key 'abac'
    ```

データベースの作成
fauna create-database abac

シェルの起動
fauna shell abac

キーの作成
fauna create-key abac

2.  **Connect to the new database using Fauna Shell**
Fauna Shell を使用して新しいデータベースに接続する

    Start a Fauna Shell session:
Fauna Shell セッションを開始します。

    terminal

    ```bash
    fauna shell abac
    Starting shell for database abac
    Connected to http://faunadb:8443
    Type Ctrl+D or .exit to exit the shell

    ```

fauna shell abac

3.  **Create three separate collections (classes)**
3 つの個別のコレクション (クラス) を作成する

    terminal

    ```
    CreateCollection({ name: "users" })
    CreateCollection({ name: "salary" })
    CreateCollection({ name: "user_subordinate" })
    ```

fauna shell abac
Starting shell for database abac
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
abac> CreateCollection({ name: "users" })
{
  ref: Collection("users"),
  ts: 1622925731280000,
  history_days: 30,
  name: 'users'
}
abac> CreateCollection({ name: "salary" })
{
  ref: Collection("salary"),
  ts: 1622925740720000,
  history_days: 30,
  name: 'salary'
}
abac> CreateCollection({ name: "user_subordinate" })
{
  ref: Collection("user_subordinate"),
  ts: 1622925747775000,
  history_days: 30,
  name: 'user_subordinate'
}
abac>

subordinate
【＠】サボーディネイト,
【変化】《動》subordinates|subordinating|subordinated,
【大学入試】,
《形-1》従属の,
従属的な,
従属する,
隷属する,
後塵を拝する,
《形-2》下位の,
副次的な,
《名》部下,
《他動》～を従属させる

The `users` collection is used to store the user details,
while the `salary` collection is used to collect the salary information.
The `user_subordinate` collection is used 
to store the information of managers and their subordinates.

usersコレクションは、
ユーザーの詳細情報を格納するために使用される

salaryコレクションは
給与情報を収集するために使用されます。

user_subordinateコレクションは、
経営者とその部下の情報を格納するために使用されます。

4.  **Create three indexes**
3 つのインデックスを作成する

In Fauna,
indexes are required for pagination or searching.
Here,
we create collection indexes on the `users` and `salary` collections,
and a specific index to retrieve users by name.
Faunaでは、
ページ付けや検索にインデックスが必要です。
ここでは、
コレクションインデックスusersとsalaryコレクションに
コレクションインデックスを作成し、
特定のインデックスを作成してユーザーを名前で取得します。

    shell

    ```shell
    CreateIndex({
      name: "all_users",
      source: Collection("users"),
    })
    ```

結果
{
  ref: Index("all_users"),
  ts: 1622926010740000,
  active: true,
  serialized: true,
  name: 'all_users',
  source: Collection("users"),
  partitions: 8
}

    shell

    ```shell
    CreateIndex({
      name: "user_by_name",
      source: Collection("users"),
      terms: [{ field: ["data", "name"] }],
    })
    ```

結果
{
  ref: Index("user_by_name"),
  ts: 1622926034820000,
  active: true,
  serialized: true,
  name: 'user_by_name',
  source: Collection("users"),
  terms: [ { field: [ 'data', 'name' ] } ],
  partitions: 1
}

    shell

    ```shell
    CreateIndex({
      name: "all_salaries",
      source: Collection("salary"),
    })
    ```

結果
{
  ref: Index("all_salaries"),
  ts: 1622926079706000,
  active: true,
  serialized: true,
  name: 'all_salaries',
  source: Collection("salary"),
  partitions: 8
}

5.  **Create user and salary data**
ユーザーおよび給与データの作成

Here,
we create some `users` and `salary` data.
The `salary` collection stores the user reference as a foreign key.
The `user` collection also stores the user’s credentials,
which is just a simple password for this tutorial.
ここではusers、
salaryデータをいくつか作成します。
salaryコレクションは、
外部キーなどのユーザーの参照を格納します。
このuserコレクションには、
ユーザーの資格情報も格納されます。
これは、
このチュートリアルでは単なるパスワードです。

Mary はマネージャークラスで自分と、働いている人の給料が見れるようにする。
Bobは自分しか見ることはできない。

    shell

    ```shell
    Map([
      ["Bob", 95000],
      ["Joe", 60000],
      ["John", 70000],
      ["Peter", 97000],
      ["Mary", 120000],
      ["Carol", 150000]
    ], Lambda("data", Let(
        {
          user: Create(Collection("users"), {
            data: { name: Select(0, Var("data")) },
            credentials: { password: "123" }
          }),
          salary: Select(1, Var("data"))
        },
        Create(Collection("salary"), { data: {
          user: Select("ref", Var("user")),
          salary: Var("salary")
        }})
    )))
    ```

結果
[
  {
    ref: Ref(Collection("salary"), "300592452264264202"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250636810"),
      salary: 95000
    }
  },
  {
    ref: Ref(Collection("salary"), "300592452263218698"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250634762"),
      salary: 60000
    }
  },
  {
    ref: Ref(Collection("salary"), "300592452263216650"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250632714"),
      salary: 70000
    }
  },
  {
    ref: Ref(Collection("salary"), "300592452263215626"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250637834"),
      salary: 97000
    }
  },
  {
    ref: Ref(Collection("salary"), "300592452263219722"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250633738"),
      salary: 120000
    }
  },
  {
    ref: Ref(Collection("salary"), "300592452263217674"),
    ts: 1622926151430000,
    data: {
      user: Ref(Collection("users"), "300592452250635786"),
      salary: 150000
    }
  }
]

6.  **Verify that the data is correct**
データが正しいことを確認する

Now that the data is created,
let us query the two collections to check out the usernames and salaries.
データが作成されたので、
2つのコレクションにクエリを実行して、
ユーザー名と給与を確認してみましょう。

    shell

    ```shell
    Map(
      Paginate(Match(Index("all_salaries"))),
      Lambda("salaryRef",
        Let({
          salary: Get(Var("salaryRef")),
          user: Get(Select(["data", "user"], Var("salary")))
        },
        {
          user: Select(["data", "name"], Var("user")),
          salary: Select(["data", "salary"], Var("salary"))
        }
       )
      )
    )
    ```

結果
{
  data: [
    { user: 'Peter', salary: 97000 },
    { user: 'John', salary: 70000 },
    { user: 'Carol', salary: 150000 },
    { user: 'Joe', salary: 60000 },
    { user: 'Mary', salary: 120000 },
    { user: 'Bob', salary: 95000 }
  ]
}

The above query should display the users and their salaries (the order of the results can vary):
上記のクエリは、
ユーザーとその給与を表示する必要があります
(結果の順序は異なる場合があります)。

    ```javascript
    { data:
       [ { user: 'Carol', salary: 150000 },
         { user: 'Peter', salary: 97000 },
         { user: 'Joe', salary: 60000 },
         { user: 'Bob', salary: 95000 },
         { user: 'Mary', salary: 120000 },
         { user: 'John', salary: 70000 } ] }
    ```

7.  **Create manager→user relationship data**
マネージャー作成→ユーザー関係データ

Now that the basic data is created,
we create a similar sample data associating managers and their subordinates
基本データができたので、
上司と部下を関連付けた同様のサンプルデータを作成します

    shell

    ```shell
    Map([
      ["Bob", "Mary"],
      ["John", "Mary"],
      ["Peter", "Joe"]
    ], Lambda("data", Let(
      {
        user: Get(Match(Index("user_by_name"), Select(0, Var("data")))),
        manager: Get(Match(Index("user_by_name"), Select(1, Var("data"))))
      },
      Create(Collection("user_subordinate"), { data: {
        user: Select("ref", Var("user")),
        reports_to: Select("ref", Var("manager"))
      }})
    )))
    ```

結果
[
  {
    ref: Ref(Collection("user_subordinate"), "300592706608956938"),  
    ts: 1622926393990000,
    data: {
      user: Ref(Collection("users"), "300592452250636810"),
      reports_to: Ref(Collection("users"), "300592452250633738")     
    }
  },
  {
    ref: Ref(Collection("user_subordinate"), "300592706608955914"),  
    ts: 1622926393990000,
    data: {
      user: Ref(Collection("users"), "300592452250632714"),
      reports_to: Ref(Collection("users"), "300592452250633738")     
    }
  },
  {
    ref: Ref(Collection("user_subordinate"), "300592706608957962"),  
    ts: 1622926393990000,
    data: {
      user: Ref(Collection("users"), "300592452250637834"),
      reports_to: Ref(Collection("users"), "300592452250634762")     
    }
  }
]

Here,
we see that Bob and John work for Mary,
while Peter works for Joe.
Once our access controls are in place,
Bob should only be able to see his salary,
but Mary should be able to see her salary as well as the salary for Bob and John.
ここでは、
BobとJohnがMaryのために働いているのに対し、
PeterはJoeのために働いています。
アクセス制御が行われると、
Bobは自分の給与しか見ることができなくなりますが、
Maryは自分の給与だけでなく、
BobとJohnの給与も見ることができるはずです。

8.  **Create an index for the `user_subordinate` collection**
user_subordinateコレクションのインデックスを作成する

    shell

    ```shell
    CreateIndex({
      name: "is_subordinate",
      source: Collection("user_subordinate"),
      terms: [
        { field: ["data", "user"] },
        { field: ["data", "reports_to"] }
      ]
    })
    ```

結果
{
  ref: Index("is_subordinate"),
  ts: 1622926472300000,
  active: true,
  serialized: true,
  name: 'is_subordinate',
  source: Collection("user_subordinate"),
  terms: [
    { field: [ 'data', 'user' ] },
    { field: [ 'data', 'reports_to' ] }
  ],
  partitions: 1
}

9.  **Create a role that provides the appropriate privileges**
適切な権限を提供するロールを作成します

    shell

    ```shell
    CreateRole({
      name: "normal_user",
      membership: {
        resource: Collection("users")
      },
      privileges: [
        { resource: Collection("users"), actions: { read: true } },
        { resource: Index("all_users"), actions: { read: true } },
        { resource: Index("all_salaries"), actions: { read: true } },
        {
          resource: Collection("salary"),
          actions: {
            read: Query(
              Lambda("salaryRef", Let(
                {
                  salary: Get(Var("salaryRef")),
                  userRef: Select( ["data", "user"], Var("salary"))
                },
                Or(
                  Equals(Var("userRef"), Identity()),
                  Exists(
                    Match(Index("is_subordinate"), [Var("userRef"), Identity()])
                  )
                ))
              )
            )
          }
        }
      ]
    })
    ```

結果
(node:820) DeprecationWarning: Identity() is deprecated, use CurrentIdentity() instead
(Use `node --trace-deprecation ...` to show where the warning was created)

... {
  ref: Role("normal_user"),
  ts: 1622926501330000,
  name: 'normal_user',
  membership: { resource: Collection("users") },
  privileges: [
    { resource: Collection("users"), actions: { read: true } },      
    { resource: Index("all_users"), actions: { read: true } },       
    { resource: Index("all_salaries"), actions: { read: true } },    
    {
      resource: Collection("salary"),
      actions: {
        read: Query(Lambda("salaryRef", Let({"salary": Get(Var("salaryRef")), "userRef": Select(["data", "user"], Var("salary"))}, Or(Equals(Var("userRef"), Identity()), Exists(Match(Index("is_subordinate"), [Var("userRef"), Identity()]))))))
      }
    }
  ]
}

This query defines the role that assigns privileges to members of the "users" collection.
This is the critical part of this tutorial and the query is rather complex,
so it deserves close inspection.
このクエリは、
「users」
コレクションのメンバーに権限を割り当てるロールを定義します。
これはこのチュートリアルの重要な部分であり、
クエリはかなり複雑であるため、
綿密に調査する必要があります。

The role’s `membership` is simple: any document
in the "users" collection that has been successfully 
authenticated by using 
the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
function gains the specified privileges,
and is called an "authenticated user".
役割membershipは単純です。
Login関数を使用して正常に認証された
"users"コレクション内のすべてのドキュメントは、
指定された特権を取得し、
"認証されたユーザー"と呼ばれます。

    The `privileges` definition says, starting from the top, that:
privileges定義は、上から順にすることを、こう述べています。

-   Read access to the "users" collection is granted.
Authenticated users can access documents describing other users.
「users」コレクションへの読み取りアクセスが許可されます。認証されたユーザーは、他のユーザーを説明するドキュメントにアクセスできます。

-   Read access to the "all\_users" index is granted.
Authenticated users can use the "all\_users" index to list all existing users.
「all_users」
インデックスへの読み取りアクセスが許可されます。
認証されたユーザーは、
「all_users」
インデックスを使用して、
既存のすべてのユーザーを一覧表示できます。

-   Read access to the "all\_salaries" index is granted.
Authenticated users can use the "all\_salaries" index to list all salaried users.
「all_salaries」
インデックスへの読み取りアクセスが許可されます。
認証されたユーザーは、
「all_salaries」
インデックスを使用してすべての給与ユーザーをリストできます。

-   A predicate [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) function dynamically determines the read access to the "salary" collection.
When read access is not granted,
the salary documents are not readable.
述語Lambda関数は、
「給与」
コレクションへの読み取りアクセスを動的に決定します。
読み取りアクセスが許可されていない場合、
給与文書は読み取れません。

        The predicate function grants read access when one of the following conditions is met:
述語関数は、次の条件のいずれかが満たされた場合に読み取りアクセスを許可します。

1.
The user reference in the "salary" document matches
the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) of the authenticated user.
「給与」ドキュメントのユーザー参照は、 Identity 認証されたユーザーの。

2.
The user reference in the "salary" document 
is a subordinate of the authenticated user.
「給与」ドキュメントのユーザー参照は、認証されたユーザーの下位です。

    Here is a detailed description of the predicate function:
述語関数の詳細な説明は次のとおりです。

predicate
【＠】プレディケイト,
プレディケット,
【変化】《動》predicates|predicating|predicated,
《名》述部,
述語,
《他動》～を断定する,
断言する,
意味する,
叙述する

Because the privilege defining the predicate function has its `resource` defined as the "salary" collection,
each time a "salary" document is to be read,
the predicate function is called with the `salaryRef` parameter,
which is a reference to the "salary" document being evaluated for access.
述語関数を定義する特権resourceは「給与」
コレクションとして定義されているため、
「給与」
ドキュメントが読み取られるたびに、
salaryRef評価されている「給与」
ドキュメントへの参照であるパラメーターを使用して述語関数が呼び出されます。
アクセス用。

The function first calls [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) to define variables that can be used later on.
The `salary` variable is defined with the associated "salary" document,
acquired by calling [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) with the `salaryRef`.
The `userRef` variable is defined with the reference to the associated "user" document,
which is acquired by calling
[`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) on the value of the `salary` variable.
この関数はLet、
後で使用できる変数を定義するために最初に呼び出します。
salary変数を呼び出すことによって取得関連した「給与」
の文書、
と定義されているGetとsalaryRef。
userRef変数を呼び出すことによって取得される関連する「ユーザ」
文書を参照して定義されているSelectの値にsalary変数。

Then,
the predicate function implicitly returns the value of calling the [`Or`](https://docs.fauna.com/fauna/current/api/fql/functions/or) function,
which includes both the equivalence check that the `userRef` variable matches the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) of the currently authenticated user,
and the check that the `userRef` and [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) match an entry in the "is\_subordinate" index.
If either check returns `true`,
`Or` returns `true` (granting read access),
otherwise `false` is returned (denying read access).
次に、
述語関数はOr関数を呼び出す値を暗黙的に返します。
これには、
userRef変数が一致することの両方の等価性チェックが含まれます。
Identity現在認証されているユーザーの、
userRefおよびIdentity「is_subordinate」
インデックスのエントリに一致します。
いずれかのチェックがtrueをOr返す場合は、
戻りtrue(読み取りアクセスを許可する)、
そうでない場合falseは(読み取りアクセスを拒否する)
が返されます。

Finally,
if the predicate function fails for any reason,
read access is not granted.
最後に、
何らかの理由で述語関数が失敗した場合、
読み取りアクセスは許可されません。

10.  **Verify salary access for a user**
ユーザーの給与へのアクセスを確認する

Now we can log in to the database as Bob and run the salary listing query.
First we have to create a token for Bob:
これで、
Bobとしてデータベースにログインし、
給与リストクエリを実行できます。
まず、
Bobのトークンを作成する必要があります。

    shell

    ```shell
    Login(Match(Index("user_by_name"), "Bob"), { password: "123" })
    ```

結果

{
  ref: Ref(Tokens(), "300593226100769288"),
  ts: 1622926889430000,
  instance: Ref(Collection("users"), "300592452250636810"),
  secret: 'fnEEK-vyT6ACCAQr6p_yYAYIgMlQxQrs-Yw1XubDChdkqXTnXnk'      
}

    The output should look similar to:
出力は次のようになります。

    ```javascript
    { ref: Ref(Tokens(), "231651464569684480"),
      ts: 1557178902130000,
      instance: Ref(Collection("users"), "231651384582210048"),
      secret: 'fnEDNv3HmWACAAM2_aC3wAIAGOysa8knR3F3ZzvUkc0sq_O6chQ' }
    ```

Using the secret,
we can log in to the database and run the user listing query.
In a separate terminal,
start a new Fauna Shell session,
and be sure to copy the value of the `secret` field as the value of the `--secret` argument in the following command:
シークレットを使用して、
データベースにログインし、
ユーザーリストクエリを実行できます。
別のターミナルで、
新しいFaunaShellセッションを開始し、
secretフィールドの値を--secret次のコマンドの引数の値としてコピーしてください。

    terminal

    ```bash
    fauna shell --secret="fnEDNv3HmWACAAM2_aC3wAIAGOysa8knR3F3ZzvUkc0sq_O6chQ"
    Warning: You didn't specify a database. Starting the shell in the global scope.
    Connected to http://faunadb:8443
    Type Ctrl+D or .exit to exit the shell

    ```

キーを書き換えた
fauna shell --secret="fnEEK-vyT6ACCAQr6p_yYAYIgMlQxQrs-Yw1XubDChdkqXTnXnk"

新しいターミナルで実行する

    Then run this query:
次に、このクエリを実行します。
    shell

    ```shell
    Map(
      Paginate(Match(Index("all_salaries"))),
      Lambda("salaryRef", Let({
        salary: Get(Var("salaryRef")),
        user: Get(Select(["data", "user"], Var("salary")))
      },
      {
        user: Select(["data", "name"], Var("user")),
        salary: Select(["data", "salary"], Var("salary"))
      })
    ))
    ```

実行結果
{ data: [ { user: 'Bob', salary: 95000 } ] }

    You should see the following output:
次の出力が表示されます。

    ```javascript
    { data: [ { user: 'Bob', salary: 95000 } ] }
    ```

    So, we can see that Bob can only query his own salary.
したがって、ボブは自分の給与しかクエリできないことがわかります。

11.  **Verify salary access for a manager**
マネージャーの給与へのアクセスを確認する

    In the original Fauna Shell session, create a login token for Mary:
元の Fauna Shell セッションで、Mary のログイン トークンを作成します。

    shell

    ```shell
    Login(Match(Index("user_by_name"), "Mary"), { password: "123" })
    ```

※
abac>    Login(Match(Index("user_by_name"), "Mary"), { password: "123" })
で実行すること。
これは何かというとabacでログインしたターミナルに戻るということ。

結果
{
  ref: Ref(Tokens(), "300593717088092681"),
  ts: 1622927357670000,
  instance: Ref(Collection("users"), "300592452250633738"),
  secret: 'fnEEK-xkoMACCQQr6p_yYAYIyEGxhhSo5k5uLgtvm3jn5Fyji7U'      
}

これでトークンが作成できた。

    You should see output similar to the following:
次のような出力が表示されます。

    ```javascript
    { ref: Ref(Tokens(), "231573285766169088"),
      ts: 1557104345000000,
      instance: Ref(Collection("users"), "231573095978109440"),
      secret: 'fnEDNv4fcEACAAM2_aC3wAIANL6untGn8nhY-NK2O90oHyIeWuY' }
    ```

    In a new terminal, start a new Fauna Shell session, and be sure to copy the value of the `secret` field as the value of the `--secret` argument in the following command:
新しいターミナルで、新しい Fauna Shell セッションを開始し、secretフィールドの値を--secret 次のコマンドの引数の値としてコピーしてください。

    terminal

    ```bash
    fauna shell --secret="fnEDNv4fcEACAAM2_aC3wAIANL6untGn8nhY-NK2O90oHyIeWuY"
    Warning: You didn't specify a database. Starting the shell in the global scope.
    Connected to http://faunadb:8443
    Type Ctrl+D or .exit to exit the shell

    ```

fauna shell --secret=fnEEK-xkoMACCQQr6p_yYAYIyEGxhhSo5k5uLgtvm3jn5Fyji7U

実行結果
06-06 06:12:37> fauna shell --secret=fnEEK-xkoMACCQQr6p_yYAYIyEGxhhSo5k5uLgtvm3jn5Fyji7U
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
>

    Then run the salary lookup query:
次に、給与検索クエリを実行します。

    shell

    ```shell
    Map(
      Paginate(Match(Index("all_salaries"))),
      Lambda("salaryRef", Let({
        salary: Get(Var("salaryRef")),
        user: Get(Select(["data", "user"], Var("salary")))
      },
      {
        user: Select(["data", "name"], Var("user")),
        salary: Select(["data", "salary"], Var("salary"))
      })
    ))
    ```

実行結果
{
  data: [
    { user: 'John', salary: 70000 }, 
    { user: 'Mary', salary: 120000 },
    { user: 'Bob', salary: 95000 }   
  ]
}

    You should see the following output (the order may vary):
次の出力が表示されます (順序は異なる場合があります)。

    ```javascript
    { data:
       [ { user: 'Bob', salary: 95000 },
         { user: 'Mary', salary: 120000 },
         { user: 'John', salary: 70000 } ] }
    ```

    Mary can see the salaries for herself, Bob, and John.
Mary は、自分、Bob、および John の給与を確認できます。

## [](#next-steps)Next steps
次のステップ

-   [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)
属性ベースのアクセス制御 (ABAC)

-   [Fauna security overview](https://docs.fauna.com/fauna/current/security/)
動物相のセキュリティの概要

Was this article helpful?

