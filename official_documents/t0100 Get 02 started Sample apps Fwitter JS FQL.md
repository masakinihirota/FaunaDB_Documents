Rethinking Twitter as a Serverless App | Fauna Documentation
https://docs.fauna.com/fauna/current/start/apps/fwitter

# Rethinking Twitter as a Serverless App

Twitterをサーバーレスアプリとして再考する

The gold standard for example applications that feature a specific technology is a todo app — mainly because they are simple. Any database out there can serve a very simple application and shine.

特定のテクノロジーを備えたアプリケーションのゴールドスタンダードは、主にシンプルであるため、todoアプリです。そこにあるどのデータベースも、非常に単純なアプリケーションを提供し、輝かせることができます。

And that is exactly why this app is different, if we truly want to show how Fauna excels for real-world applications, then we need to build something more advanced.

そのため、このアプリは異なります。Faunaが実際のアプリケーションでどのように優れているかを本当に示したい場合は、より高度なものを構築する必要があります。

## [](#introducing-fwitter)Introducing Fwitter

Fwitterの紹介

> When we started at Twitter, databases were bad. When we left, they were still bad.

Twitterを始めたとき、データベースは悪かった。私たちが去ったとき、彼らはまだ悪かった。

— Evan Weaver

Since Fauna was developed by ex-Twitter engineers who experienced these limitations first-hand, a Twitter-like application felt like an appropriately sentimental choice. And, since we are building it with Fauna, let’s call this serverless baby "Fwitter". The following short video shows how it works, and the full source code is available in the [Fwitter repository](https://github.com/fauna-brecht/fwitter):

Faunaは、これらの制限を直接経験した元Twitterエンジニアによって開発されたため、Twitterのようなアプリケーションは適切に感傷的な選択のように感じました。そして、Faunaで構築しているので、このサーバーレスベイビーを「Fwitter」と呼びましょう。次の短いビデオは、それがどのように機能するかを示しており、完全なソースコードはFwitterリポジトリで入手でき ます。

When you clone the [Fwitter repository](https://github.com/fauna-brecht/fwitter) and start digging around, you might notice a plethora of well-commented example queries not covered in this article. This article covers just enough to get you up and running. Future tutorials will use Fwitter as the basis for more advanced features and topics.

Fwitterリポジトリのクローンを作成して掘り下げ始めると、この記事で取り上げられていない、コメントの多いクエリの例がたくさんあることに気付くかもしれません。この記事では、稼働させるのに十分な内容について説明します。今後のチュートリアルでは、より高度な機能とトピックの基礎としてFwitterを使用します。

But, for now, here’s a basic rundown of what we are going to cover here:

rundown
要約

しかし、今のところ、ここで取り上げる内容の基本的な概要は次のとおりです。

We build these features without having to configure operations or set up servers for your database. Since Fauna is scalable and distributed out-of-the-box, all of the operational concerns for running a geographically-distributed, always-consistent database are already taken care of.

これらの機能は、データベースの操作を構成したりサーバーを設定したりすることなく構築されます。Faunaはスケーラブルですぐに配布できるため、地理的に分散し、常に一貫性のあるデータベースを実行するための運用上の懸念はすべてすでに処理されています。

Let’s dive in!

飛び込みましょう！

-   [Modeling the data](#modeling)
-   [Setup the project](#setup)
-   [Creating the front end](#frontend)
-   [The Fauna JavaScript driver](#drivers)
-   [Creating data](#createdata)
-   [Securing your data with UDFs and ABAC roles](#security)
-   [How to implement authentication](#authentication)
-   [Retrieving data](#retrievedata)
-   [More in the code base](#codebase)

データのモデリング
プロジェクトをセットアップする
フロントエンドの作成
FaunaJavaScriptドライバー
データの作成
UDFとABACの役割でデータを保護する
認証を実装する方法
データの取得
コードベースの詳細

## [](#modeling)Modeling the data

データのモデリング

Before we can show how Fauna excels at relations, we need to cover the types of relations in our application’s data model.

Faunaがどのように関係に優れているかを示す前に、アプリケーションのデータモデルで関係のタイプをカバーする必要があります。

Fauna’s data entities are stored in documents, which are then stored in collections — like rows in tables. For example, each user’s details are represented by a User document stored in a Users collection. And we eventually plan to support both single sign-on and password-based login methods for a single user, each of which would be represented as an Account document in an Accounts collection.

Faunaのデータエンティティはドキュメントに保存され、ドキュメントはテーブルの行のようにコレクションに保存されます。たとえば、各ユーザーの詳細は、Usersコレクションに格納されているUserドキュメントによって表されます。そして、最終的には、シングルサインオンとパスワードベースのログイン方法の両方を単一のユーザーに対してサポートすることを計画しています。これらの方法はそれぞれ、AccountsコレクションのAccountドキュメントとして表されます。

At this point, one user has one account, so it doesn’t matter which entity stores the reference (i.e., the user ID). We could have stored the user ID in either the Account or the User document in a one-to-one relation:

この時点で、1人のユーザーが1つのアカウントを持っているため、どのエンティティが参照（つまり、ユーザーID）を保存するかは関係ありません。アカウントまたはユーザードキュメントのいずれかに1対1の関係でユーザーIDを保存することもできます。

![Diagram: one-to-one relationship](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/one-to-one.svg)

However, since one User will eventually have multiple Accounts (or authentication methods), our data model uses a one-to-many model:

eventually
最終的に

ただし、1人のユーザーが最終的に複数のアカウント（または認証方法）を持つため、データモデルは1対多のモデルを使用します。

![Diagram: one-to-many relationship](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/one-to-many.svg)

In a one-to-many relation between Users and Accounts, each Account points to only one user, so it makes sense to store the User reference on the Account:

ユーザーとアカウント間の1対多の関係では、各アカウントは1人のユーザーのみを指すため、ユーザー参照をアカウントに保存することは理にかなっています。

![Diagram: many-to-many relationship](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/accounts-users.svg)

The application also has many-to-many relations, like the relations between Fweets and Users, because of the complex ways users interact with each other via likes, comments, and refweets:

このアプリケーションには、FweetsとUsersの関係のように、ユーザーがいいね、コメント、refweetsを介して相互に対話する複雑な方法があるため、多対多の関係もあります。

![Diagram: intermediate collection](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/fweets-users.svg)

Further, we use a third collection, Fweetstats, to store information about the interaction between a User and a Fweet:

さらに、3番目のコレクションであるFweetstatsを使用して、ユーザーとFweet間の相互作用に関する情報を保存します。

![Diagram: fweet statistics](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/fweetstats.svg)

Fweetstats’ data helps us determine, for example, whether or not to color the icons indicating to the user that he has already liked, commented, or refweeted a Fweet. It also helps us determine what clicking on the heart means: unlike or like:

Fweetstatsのデータは、たとえば、ユーザーがFweetをすでに気に入っている、コメントしている、または再ウィートしたことを示すアイコンに色を付けるかどうかを決定するのに役立ちます。また、ハートをクリックすることの意味を判断するのにも役立ちます。

![Screenshot: comment, like and refweet icons](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/icons.png)

The final model for the application looks like this:

アプリケーションの最終モデルは次のようになります。

![Diagram: application model](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/model.svg)

Fweets are at the center of the model, because they contain the most important data of the Fweet, such as the information about the message, the number of likes, refweets, and comments. Fauna stores this data in a JSON format that looks like this:

Fweetは、メッセージに関する情報、いいねの数、refweets、コメントなど、Fweetの最も重要なデータが含まれているため、モデルの中心にあります。FaunaはこのデータをJSON 次のような形式：

![Screenshot: example fweet document](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/example_fweet.png)

As shown in the model and in this example JSON, hashtags are stored as a list of references. If we wanted to, we could have stored the complete hashtag JSON in here, and that is the preferred solution in more limited document-based databases that lack relations. However, that would mean that our hashtags would be duplicated everywhere (as they are in more limited databases) and it would be more difficult to search for hashtags and/or retrieve Fweets for a specific hashtag:

モデルとこの例に示されているように JSON、ハッシュタグは参照のリストとして保存されます。必要に応じて、完全なハッシュタグを保存することもできますJSONこれは、関係のない、より限定されたドキュメントベースのデータベースで推奨されるソリューションです。ただし、これは、ハッシュタグがどこにでも複製されることを意味し（データベースがより限定されているため）、ハッシュタグの検索や特定のハッシュタグのFweetsの取得がより困難になります。

![Screenshot: fweet tags UI](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/fwitter_screenshot.png)

Note that a Fweet does not contain a link to Comments, but the Comments collection contains a reference to the Fweet. That’s because one Comment belongs to one Fweet, but a Fweet can have many comments — similar to the one-to-many relation between Users and Accounts.

Fweetにはコメントへのリンクは含まれていませんが、CommentsコレクションにはFweetへの参照が含まれていることに注意してください。これは、1つのコメントが1つのFweetに属しているが、Fweetには多くのコメントを含めることができるためです。これは、ユーザーとアカウント間の1対多の関係に似ています。

Finally, there is a FollowerStats collection which basically saves information about how much users interact with each other in order to personalize their respective feeds. This guide does not cover every application feature but you can experiment with the queries in the [Fwitter repository](https://github.com/fauna-brecht/fwitter) as we continue to extend this guide.

最後に、FollowerStatsコレクションがあります。これは、基本的に、それぞれのフィードをパーソナライズするためにユーザーが相互に対話する量に関する情報を保存します。このガイドはすべてのアプリケーション機能を網羅しているわけではありませんが、このガイドを拡張し続けることで、Fwitterリポジトリのクエリを試すことができ ます。

Hopefully, you’re starting to see why we chose something more complex than a ToDo app. Although Fwitter is nowhere near the complexity of the real Twitter app upon which it’s based, it’s already becoming apparent that implementing such an application without relations would be a serious brain-breaker.

うまくいけば、ToDoアプリよりも複雑なものを選択した理由がわかり始めているはずです。Fwitterは、それが基づいている実際のTwitterアプリの複雑さにはほど遠いですが、関係なしでそのようなアプリケーションを実装することは深刻な頭脳を壊すものになることがすでに明らかになっています。

Now, if you haven’t already done so from the [Fwitter repository](https://github.com/fauna-brecht/fwitter), it’s finally time to get our project running locally!

さて、Fwitterリポジトリからまだ行っていない場合は、ついにプロジェクトをローカルで実行する時が来ました！さて、Fwitterリポジトリからまだ行っていない場合は、ついにプロジェクトをローカルで実行する時が来ました！

## [](#setup)Setup the project

プロジェクトをセットアップする

To set up the project, go to the [Fauna Dashboard](https://dashboard.fauna.com/) and sign up. Once you are in the Dashboard, click **New Database**, fill in a name, and click **Save**. You should now be on the "Overview" page of your new database.

プロジェクトを設定するには、Faunaダッシュボードに移動してサインアップします。ダッシュボードが表示されたら、[新しいデータベース]をクリックし、名前を入力して、[保存]をクリックします。これで、新しいデータベースの「概要」ページが表示されます。

Next, we need a key that we can be used in our setup scripts. Click **Security** in the left sidebar, then click the **New key** button.

次に、セットアップスクリプトで使用できるキーが必要です。左側のサイドバーで[ セキュリティ]をクリックし、[新しいキー]ボタンをクリックします。

In the "New key" form, the current database should already be selected. For the "Role" field, leave it as "Admin". Optionally, add a key name. Next, click **Save** and copy the key’s secret displayed on the next page. **It is never displayed again**.

「新しいキー」フォームでは、現在のデータベースがすでに選択されているはずです。「役割」フィールドは「管理者」のままにします。必要に応じて、キー名を追加します。次に、[保存]をクリックして、次のページに表示されているキーのシークレットをコピーします。二度と表示されることはありません。

![Screenshot: setup admin key](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/setup_admin_key.png)

Now that you have your database secret, clone the [Fwitter repository](https://github.com/fauna-brecht/fwitter) and follow the `README`. We have prepared a few scripts so that you only have to run the following commands to initialize your app, create all of the collections, and populate your database. The scripts give you further instructions:

今、あなたは、データベースの秘密を持っていることを、クローンFwitterリポジトリをフォロー README。次のコマンドを実行するだけでアプリを初期化し、すべてのコレクションを作成し、データベースにデータを入力できるように、いくつかのスクリプトを用意しました。スクリプトはあなたにさらなる指示を与えます：

shell

```shell
npm install
npm run setup (1)
npm run populate (2)
npm run start
```

**1**

This command creates all of the resources in your database. Provide the admin key when the script asks for it. The setup script then gives you another key with almost no permissions that you need to place in your `.env.local` file, as the script suggests.

このコマンドは、データベース内のすべてのリソースを作成します。スクリプトで要求されたら、管理者キーを入力します。次に、セットアップスクリプトは.env.local、スクリプトが示すように、ファイルに配置する必要のあるアクセス許可がほとんどない別のキーを提供します。

**2**

This script adds data to your database.

このスクリプトは、データベースにデータを追加します。

After the script has completed, your `.env.local` file should contain the bootstrap key that the script provided to you (not the admin key).

スクリプトが完了すると、.env.localファイルには、スクリプトから提供されたブートストラップキー（管理者キーではない）が含まれているはずです。

terminal

```bash
REACT_APP_LOCAL___BOOTSTRAP_FAUNADB_KEY=<bootstrap key>
```

![Screenshot: Fwitter card UI](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/twitter-card.png)

## [](#frontend)Creating the front end

フロントエンドの作成

![Screenshot: project tree overview](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/project-tree-overview.png)

For the frontend, we used `create-react-app` to generate an application, then divided the application into pages and components. Pages are top-level components which have their own URLs. The Login and Register pages speak for themselves. Home is the standard feed of Fweets from the authors we follow; this is the page that we see when we log into our account. And the User and Tag pages show the Fweets for a specific user or tag in reverse chronological order.

フロントエンドでは、以前create-react-appはアプリケーションを生成してから、アプリケーションをページとコンポーネントに分割していました。ページは、独自のURLを持つトップレベルのコンポーネントです。ログインページと登録ページはそれ自体を物語っています。Homeは、私たちがフォローしている作者からのFweetsの標準フィードです。これは、アカウントにログインしたときに表示されるページです。また、[ユーザー]ページと[タグ]ページには、特定のユーザーまたはタグのFweetsが新しい順に表示されます。

We use React Router to direct to these pages depending on the URL, as you can see in the `src/app.js` file:

src/app.jsファイルに示されているように、URLに応じて、ReactRouterを使用してこれらのページに移動します。

html

```html
<Router>
  <SessionProvider value={{ state, dispatch }}>
    <Layout>
      <Switch>
        <Route exact path="/accounts/login">
          <Login />
        </Route>
        <Route exact path="/accounts/register">
          <Register />
        </Route>
        <Route path="/users/:authorHandle" component={User} />
        <Route path="/tags/:tag" component={Tag} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  </SessionProvider>
</Router>
```

The only other thing to note in the above snippet is the SessionProvider, which is a React context to store the user’s information upon login. For more details, see the [How to implement authentication](#authentication) section. For now, it’s enough to know that this gives us access to the Account (and thus User) information from each component.

上記のスニペットで注意すべき他の唯一のことは、SessionProviderです。これは、ログイン時にユーザーの情報を格納するReactコンテキストです。詳細については、「認証の実装方法」 セクションを参照してください。今のところ、これにより、各コンポーネントからアカウント（したがってユーザー）情報にアクセスできることを知っておくだけで十分です。

Take a quick look at the home page [\`src/pages/home.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/pages/home.js) to see how we use a combination of hooks to manage our data. The bulk of our application’s logic is implemented in Fauna queries which live in the [\`src/fauna/queries\`](https://github.com/fauna-brecht/fwitter/tree/master/src/fauna/queries) folder.

ホームページ`src / pages / home.js`をざっと見て、フックの組み合わせを使用してデータを管理する方法を確認してください。アプリケーションのロジックの大部分は、`src / fauna / queries`フォルダーにあるFaunaクエリに実装されてい ます。

All calls to the database originate from the frontend, then pass through the query-manager. We can secure the sensitive parts with Fauna’s ABAC security rules and User Defined Functions (UDF). Since Fauna behaves as a token-secured API, we do not have to worry about a limit on the number of connections as we would in traditional databases.

データベースへのすべての呼び出しはフロントエンドから発信され、クエリマネージャーを通過します。FaunaのABACセキュリティルールとユーザー定義関数（UDF）を使用して、機密性の高い部分を保護できます。Faunaはトークンで保護されたAPIとして動作するため、従来のデータベースのように接続数の制限について心配する必要はありません。

## [](#drivers)The Fauna JavaScript driver

FaunaJavaScriptドライバー

Next, take a look at the [\`src/fauna/query-manager.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/query-manager.js) file to see how we connect Fauna to our application using Fauna’s JavaScript driver, which is just a Node.js module that we installed with `npm install`. As with any Node.js module, we import it into our application like so:

次に、`src / fauna / query-manager.js`ファイルを見て、FaunaのJavaScriptドライバーを使用してFaunaをアプリケーションに接続する方法を確認します。これは、でインストールしたNode.jsモジュールですnpm install。他のNode.jsモジュールと同様に、次のようにアプリケーションにインポートします。

```javascript
import faunadb from 'faunadb'
```

And we create a client by providing a token:

そして、トークンを提供してクライアントを作成します。

```javascript
this.client = new faunadb.Client({
  secret: token || this.bootstrapToken
})
```

We cover tokens a little more in the [How to implement authentication](#authentication) section. For now, let’s create some data!

トークンについては、認証の実装方法のセクションでもう少し説明します。とりあえず、データを作ってみましょう！

## [](#createdata)Creating data

データの作成

The logic to create a new Fweet document can be found in the [\`src/fauna/queries/fweets.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/queries/fweets.js) file. Fauna documents are just like JSON, and each Fweet follows the same basic structure:

新しいFweetドキュメントを作成するロジックは、 `src / fauna / queries / fweets.js`ファイルにあります。FaunaドキュメントはJSONと同じであり、各Fweetは同じ基本構造に従います。

```javascript
const data = {
  data: {
   message: message,
   likes: 0,
   refweets: 0,
   comments: 0,
   created: Now()
  }
}
```

The [`Now`](https://docs.fauna.com/fauna/current/api/fql/functions/now) function is used to insert the time of the query so that the Fweets in a user’s feed can be sorted chronologically. Note that Fauna automatically places timestamps on every database entity for temporal querying. However, the Fauna timestamp represents the time the document was last updated, not the time it was created, and the document gets updated every time a Fweet is liked; for our intended sorting order, we need the created time.

このNow関数は、クエリの時間を挿入するために使用され、ユーザーのフィード内のFweetsを時系列で並べ替えることができます。Faunaは、一時的なクエリのために、すべてのデータベースエンティティにタイムスタンプを自動的に配置することに注意してください。ただし、Faunaタイムスタンプは、ドキュメントが作成された時刻ではなく、ドキュメントが最後に更新された時刻を表し、Fweetが高く評価されるたびにドキュメントが更新されます。意図したソート順では、作成された時間が必要です。

Next, we send this data to Fauna with the [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) function. By providing [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) with the reference to the Fweets collection using `Collection('fweets')`, we specify where the document needs to exist.

次に、このデータをCreate関数を使用してFaunaに送信します。Createを使用してFweetsコレクションへの参照を提供することによりCollection('fweets')、ドキュメントが存在する必要がある場所を指定します。

```javascript
const query = Create(Collection('fweets'), data )
```

We can now wrap this query in a function that takes a message parameter and executes it using `client.query()` which sends the query to the database for execution. Before that, we can combine as many FQL functions as we want to construct our query:

これで、このクエリを、メッセージパラメータを受け取り、それを実行する関数でラップできます。この関数を使用しclient.query()て、クエリをデータベースに送信して実行します。その前に、クエリを作成するのに必要な数のFQL関数を組み合わせることができます。

```javascript
function createFweet(message, hashtags) {
   const data = …
   const query = …
   return client.query(query)
}
```

Note that we have used plain old JavaScript variables to compose this query and, in essence, just called functions. Writing FQL is all about function composition; you construct queries by combining small functions into larger expressions. This functional approach has very strong advantages. It allows us to use native language features such as JavaScript variables to compose queries, while also writing higher-order FQL functions that are protected from injection.

このクエリを構成するためにプレーンな古いJavaScript変数を使用しており、本質的には関数と呼ばれていることに注意してください。FQLの作成は、すべて関数の合成に関するものです。小さな関数を大きな式に組み合わせてクエリを作成します。この機能的なアプローチには、非常に強力な利点があります。これにより、JavaScript変数などの母国語機能を使用してクエリを作成できると同時に、インジェクションから保護された高階FQL関数を記述できます。

For example, in the following query, we add hashtags to the document with a `CreateHashtags()` function that we’ve defined elsewhere using FQL:

たとえば、次のクエリでは、FQLをCreateHashtags()使用して他の場所で定義した関数を使用して、ドキュメントにハッシュタグを追加します。

```javascript
const data = {
  data: {
    // ...
    hashtags: CreateHashtags(tags),
    likes: 0,
    // ...
}
```

The way FQL works from within the driver’s host language (in this case, JavaScript) is what makes FQL an eDSL (embedded domain-specific language). Functions like `CreateHashtags()` behave just like a native FQL function in that they are both just functions that take input. This means that we can easily extend the language with our own functions, like in this [open source FQL](https://github.com/shiftx/faunadb-fql-lib) library from the Fauna community.

ドライバーのホスト言語（この場合はJavaScript）内からFQLが機能する方法が、FQLをeDSL（組み込みドメイン固有言語）にしている理由です。のようなCreateHashtags()関数は、どちらも入力を受け取る関数であるという点で、ネイティブFQL関数と同じように動作します。これは 、FaunaコミュニティのこのオープンソースFQLライブラリのように、独自の関数を使用して言語を簡単に拡張できることを意味します。

It’s also important to notice that we create two entities in two different collections, in one transaction. Thus, if/when things go wrong, there is no risk that the Fweet is created but the Hashtags are not. In more technical terms, Fauna is transactional and consistent whether you run queries over multiple collections or not, a property that is rare in scalable, distributed databases.

また、1つのトランザクションで2つの異なるコレクションに2つのエンティティを作成することに注意することも重要です。したがって、問題が発生した場合、Fweetが作成されるリスクはありませんが、ハッシュタグは作成されません。より専門的に言えば、Faunaはトランザクションであり、複数のコレクションに対してクエリを実行するかどうかに関係なく一貫性があります。これは、スケーラブルな分散データベースではまれなプロパティです。

Next, we need to add the author to the query. First, we can use the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function to return a reference to the currently logged in document. As discussed previously in the [Modeling the data](#modeling) section, that document is of the type Account and is separated from Users to support SSO in a later phase.

次に、作成者をクエリに追加する必要があります。まず、 Identity現在ログインしているドキュメントへの参照を返す関数。データのモデリングのセクションで前述したように、そのドキュメントはアカウントタイプであり、後のフェーズでSSOをサポートするためにユーザーから分離されています。

![Diagram: users and authors link](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/accounts-users2.svg)

Then, we need to wrap the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function in a [`Get`](https://docs.fauna.com/fauna/current/api/fql/functions/get) call to access the full Account document and not just the reference to it:

次に、ラップする必要があります IdentityGetアカウントドキュメントへの参照だけでなく、完全なアカウントドキュメントにアクセスするための呼び出しで機能します。

```javascript
Get(Identity())
```

Finally, we wrap all of that in a [`Select`](https://docs.fauna.com/fauna/current/api/fql/functions/select) call to select the `data.user` field from the account document and add it to the data JSON.

最後に、これらすべてをSelect呼び出しでラップdata.userして、アカウントドキュメントからフィールドを選択 し、データに追加します。JSON。

```javascript
const data = {
  data: {
    // ...
    hashtags: CreateHashtags(tags),
    author: Select(['data', 'user'], Get(Identity())),
    likes: 0,
    // ...
  }
}
```

Now that we’ve constructed the query, let’s pull it all together and call `client.query(query`) to execute it:

クエリを作成したので、すべてをまとめてclient.query(query）を呼び出して実行します。

```javascript
function createFweet(message, hashtags) {
 const data = {
   data: {
     message: message,
     likes: 0,
     refweets: 0,
     comments: 0,
     author: Select(['data', 'user'], Get(Identity())),
     hashtags: CreateHashtags(tags),
     created: Now()
   }
 }

 const query = Create(Collection('fweets'), data )
 return client.query(query)
}
```

By using functional composition, you can easily combine all of your advanced logic in one query that can be executed in one transaction. Check out the file [\`src/fauna/queries/fweets.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/queries/fweets.js) to see the final result which takes even more advantage of function composition to add rate-limiting, etc.

機能合成を使用することにより、1つのトランザクションで実行できる1つのクエリにすべての高度なロジックを簡単に組み合わせることができます。ファイル`src / fauna / queries / fweets.js`をチェックして、レート制限などを追加するために関数合成をさらに活用する最終結果を確認してください。

## [](#security)Securing your data with UDFs and ABAC roles

UDFとABACの役割でデータを保護する

The attentive reader likely has some thoughts about security by now. We are essentially creating queries in JavaScript and calling these queries from the frontend. What stops a malicious user from altering these queries?

注意深い読者は、おそらく今ではセキュリティについていくつかの考えを持っています。基本的にJavaScriptでクエリを作成し、これらのクエリをフロントエンドから呼び出しています。悪意のあるユーザーがこれらのクエリを変更するのを防ぐものは何ですか？

Fauna provides two features that allow us to secure our data: [Attribute-Based Access Control (ABAC)](https://docs.fauna.com/fauna/current/security/abac) and User Defined Functions (UDF). With ABAC, we can control which collections or entities that a specific key or token can access by writing Roles.

Faunaは、データを保護するための2つの機能を提供します。 属性ベースのアクセス制御（ABAC）とユーザー定義関数（UDF）です。ABACを使用すると、ロールを作成することで、特定のキーまたはトークンがアクセスできるコレクションまたはエンティティを制御できます。

With UDFs, we can combine multiple FQL statements into a single callable function by using the [`CreateFunction`](https://docs.fauna.com/fauna/current/api/fql/functions/createfunction) function:

UDFを使用すると、次のCreateFunction関数を使用して、複数のFQLステートメントを1つの呼び出し可能な関数に組み合わせることができます。

```javascript
CreateFunction({
  name: 'create_fweet',
  body: <your FQL statement>,
})
```

Once the function is in the database as a UDF, where the application can’t alter it anymore, we then call this UDF from the front end:

関数がUDFとしてデータベースにあり、アプリケーションがそれを変更できなくなったら、フロントエンドからこのUDFを呼び出します。

```javascript
client.query(
  Call(Function('create_fweet'), message, hashTags)
)
```

Since the query is now saved in the database (just like a stored procedure), malicious users can no longer manipulate it from the client.

クエリは（ストアドプロシージャと同じように）データベースに保存されるようになったため、悪意のあるユーザーはクライアントからクエリを操作できなくなりました。

One example of how UDFs can be used to secure a call is that we do not pass in the author of the Fweet. The author of the Fweet is derived from the [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity) function instead, which makes it impossible for a user to write a Fweet on someone else’s behalf.

UDFを使用して通話を保護する方法の一例は、Fweetの作成者を渡さないことです。Fweetの作者はIdentity 代わりに関数を使用すると、ユーザーが他の誰かに代わってFweetを作成することができなくなります。

Of course, we still have to define that the user has access to call the UDF. For that, we use a very simple ABAC role that defines a group of role members and their privileges. This role is named `logged_in_role`, its membership includes all of the documents in the Accounts collection, and all of these members are granted the privilege of calling the `create_fweet` UDF.

もちろん、ユーザーがUDFを呼び出すためのアクセス権を持っていることを定義する必要があります。そのために、ロールメンバーのグループとその特権を定義する非常に単純なABACロールを使用します。このロールには名前が付けられlogged_in_role、そのメンバーシップにはAccountsコレクション内のすべてのドキュメントが含まれ、これらのメンバーすべてにcreate_fweetUDFを呼び出す特権が付与され ます。

```javascript
CreateRole(
  name: 'logged_in_role',
  privileges: [
   {
     resource: q.Function('create_fweet'),
     actions: {
       call: true
     }
   }
  ],
  membership: [{ resource: Collection('accounts') }],
)
```

We now know that these privileges are granted to an account, but how do we become an Account? By using the [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) function to authenticate our users as explained in the next section.

これらの特権がアカウントに付与されていることがわかりましたが、どのようにしてアカウントになりますか？Login次のセクションで説明するように、この機能を使用してユーザーを認証します。

## [](#authentication)How to implement authentication

認証を実装する方法

![Screenshot: login form UI](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/login.png)

We just defined a role that gives Accounts the permissions to call the `create_fweets` function. But how do we "become" an Account?.

アカウントにcreate_fweets関数を呼び出す権限を与えるロールを定義しました 。しかし、どのようにしてアカウントに「なる」のでしょうか。

First, we create a new Account document, storing credentials alongside any other data associated with the Account (in this case, the email address and the reference to the User):

まず、新しいアカウントドキュメントを作成し、アカウントに関連付けられている他のデータ（この場合はメールアドレスとユーザーへの参照）と一緒にクレデンシャルを保存します。

```javascript
return Create(Collection('accounts'), {
  credentials: { password: password },
    data: {
      email: email,
      user: Select(['ref'], Var('user'))
    }
  })
}
```

We can then call [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) on the Account reference, which retrieves a token:

次にLogin、トークンを取得するアカウント参照を呼び出すことができます。

```javascript
Login(
  <Account reference>,
  { password: password }
)
```

We use this token in the client to impersonate the Account. Since all Accounts are members of the Account collection, this token fulfills the membership requirement of the `logged_in_role` and is granted access to call the `create_fweet` UDF. To bootstrap this whole process, we have two very important roles:

クライアントでこのトークンを使用して、アカウントになりすます。すべてのアカウントはアカウントコレクションのメンバーであるため、このトークンはのメンバーシップ要件を満たしlogged_in_role、create_fweetUDFを呼び出すためのアクセス権が付与されます。このプロセス全体をブートストラップするには、2つの非常に重要な役割があります。

-   **bootstrap\_role**: can only call the `login` and `register` UDFs
    
    loginとregisterUDFのみを呼び出すことができます

-   **logged\_in\_role**: can call other functions such as `create_fweet`
    

次のような他の関数を呼び出すことができますcreate_fweet

The token you received when you ran the setup script is essentially a key created with the `bootstrap_role`. A client is created with that token in [\`src/fauna/query-manager.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/query-manager.js) which is only be able to register or login. Once we log in, we use the new token returned from [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login) to create a new Fauna client which now grants access to other UDF functions such as `create_fweet`. Logging out means we just revert to the bootstrap token. You can see this process in [\`src/fauna/query-manager.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/query-manager.js), along with more complex role examples in the [\`src/fauna/setup/roles.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/setup/roles.js) file.

セットアップスクリプトを実行したときに受け取ったトークンは、基本的にはで作成されたキーですbootstrap_role。クライアントは、`src / fauna / query-manager.js`にそのトークンを使用して作成され、登録またはログインのみが可能です。ログインすると、から返された新しいトークンを使用して、Login などの他のUDF関数へのアクセスを許可する新しいFaunaクライアントを作成しますcreate_fweet。ログアウトすると、ブートストラップトークンに戻るだけです。このプロセスは`src / fauna / query-manager.js`で確認でき、より複雑な役割の例は` src / fauna / setup / roles.js`ファイルで確認できます。

### [](#how-to-implement-the-session-in-react)How to implement the session in React

Reactでセッションを実装する方法

Previously, in the [Creating the front end](#frontend) section, we mentioned the SessionProvider component. In React, providers belong to a React Context which is a concept to facilitate data sharing between different components. This is ideal for data such as user information that you need everywhere in your application. By inserting the SessionProvider in the HTML early on, we made sure that each component would have access to it. Now, the only thing a component has to do to access the user details is import the context and use React’s "useContext" hook:

以前、「フロントエンドの作成」セクションで、SessionProviderコンポーネントについて説明しました。Reactでは、プロバイダーはReact Contextに属しています。これは、異なるコンポーネント間のデータ共有を容易にするための概念です。これは、アプリケーションのあらゆる場所で必要なユーザー情報などのデータに最適です。早い段階でSessionProviderをHTMLに挿入することで、各コンポーネントがそれにアクセスできるようにしました。これで、コンポーネントがユーザーの詳細にアクセスするために行う必要があるのは、コンテキストをインポートしてReactの「useContext」フックを使用することだけです。

```javascript
import SessionContext from '../context/session'
import React, { useContext } from 'react'

// In your component
const sessionContext = useContext(SessionContext)
const { user } = sessionContext.state
```

But how does the user end up in the context? When we included the SessionProvider, we passed in a value consisting of the current state and a dispatch function:

しかし、ユーザーはどのようにしてコンテキストにたどり着くのでしょうか。SessionProviderを含めると、現在の状態とディスパッチ関数で構成される値を渡しました。

```javascript
const [state, dispatch] = React.useReducer(sessionReducer, { user: null })
// ...
<SessionProvider value={{ state, dispatch }}>
```

The state is simply the current state, and the dispatch function is called to modify the context. This dispatch function is actually the core of the context since creating a context only involves calling `React.createContext()`, which gives you access to a Provider and a Consumer:

状態は単に現在の状態であり、コンテキストを変更するためにディスパッチ関数が呼び出されます。コンテキストの作成には呼び出しのみが含まれるため、このディスパッチ関数は実際にはコンテキストのコアです React.createContext()。これにより、プロバイダーとコンシューマーにアクセスできます。

```javascript
const SessionContext = React.createContext({})
export const SessionProvider = SessionContext.Provider
export const SessionConsumer = SessionContext.Consumer
export default SessionContext
```

We can see that the state and dispatch are extracted from something that React calls a "reducer" (using React.useReducer), so let’s write a reducer:

状態とディスパッチは、Reactが「レデューサー」と呼ぶものから抽出されていることがわかります（React.useReducerを使用）。そこで、レデューサーを作成しましょう。

```javascript
export const sessionReducer = (state, action) => {
 switch (action.type) {
   case 'login': {
     return { user: action.data.user }
   }
   case 'register': {
     return { user: action.data.user }
   }
   case 'logout': {
     return { user: null }
   }
   default: {
     throw new Error(`Unhandled action type: ${action.type}`)
   }
 }
}
```

This is the logic that allows you to change the context. In essence, it receives an action and decides how to modify the context given that action. In our case, the action is simply a type with a string. We use this context to keep user information, which means that we call it on a successful login with:

これは、コンテキストを変更できるようにするロジックです。本質的に、それはアクションを受け取り、そのアクションを与えられたコンテキストを変更する方法を決定します。この場合、アクションは単純に文字列を含む型です。このコンテキストを使用してユーザー情報を保持します。つまり、ログインが成功すると、次のように呼び出します。

```javascript
sessionContext.dispatch({ type: 'login', data: e })
```

## [](#retrievedata)Retrieving data

データの取得

We have shown how to add data. Now we still need to retrieve data. Getting the data of our Fwitter feed has many challenges. We need to:

データを追加する方法を示しました。今でもデータを取得する必要があります。Fwitterフィードのデータを取得するには、多くの課題があります。必要がある：

-   Get fweets from people you follow in a specific order (taking time and popularity into account).

なたがフォローしている人々から特定の順序でfweetを取得します（時間と人気を考慮に入れて）。

-   Get the author of the fweet to show his profile image and handle.

fweetの作者に、プロフィール画像とハンドルを見せてもらいます。

-   Get the statistics to show how many likes, refweets, and comments it has.
    
統計を取得して、いいね、refweets、コメントの数を示します。

-   Get the comments to list those beneath the fweet.
    
コメントを取得して、fweetの下にあるものをリストします。

-   Get info about whether you already liked, refweeted, or commented on this specific fweet.
    

この特定のfweetについて、すでに気に入っているか、再ウィートしたか、コメントしたかについての情報を入手してください。

-   If it’s a refweet, get the original fweet.
    
refweetの場合は、元のfweetを入手してください。

This kind of query fetches data from many different collections and requires advanced indexing/sorting, but let’s start off simple. How do we get the Fweets? We start off by getting a reference to the Fweets collection using the [`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection) function:

この種のクエリは、さまざまなコレクションからデータをフェッチし、高度なインデックス作成/並べ替えを必要としますが、簡単なことから始めましょう。どうやってFweetsを入手しますか？まず、次のCollection関数を使用してFweetsコレクションへの参照を取得します。

```javascript
Collection('fweets')
```

And we wrap that in the [`Documents`](https://docs.fauna.com/fauna/current/api/fql/functions/documents) function to get all of the collection’s document references:

そして、それをDocuments関数でラップして、コレクションのすべてのドキュメント参照を取得します。

```javascript
Documents(Collection('fweets'))
```

We then [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) over these references:

次にPaginate、これらの参照について説明します。

```javascript
Paginate(Documents(Collection('fweets')))
```

[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) requires some explanation. Before calling [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate), we had a query that returned a hypothetical set of data. [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) actually materializes that data into pages of entities that we can read. Fauna requires that we use this [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) function to protect us from writing inefficient queries that retrieve every document from a collection, because in a database built for massive scale, that collection could contain millions of documents. Without the safeguard of [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate), that could get very expensive!

Paginate説明が必要です。を呼び出す前 Paginateに、架空のデータセットを返すクエリがありました。Paginate実際にそのデータを、私たちが読むことができるエンティティのページに具体化します。Faunaでは、このPaginate関数を使用して、コレクションからすべてのドキュメントを取得する非効率的なクエリを作成しないようにする必要があります。これ は、大規模に構築されたデータベースでは、コレクションに数百万のドキュメントが含まれる可能性があるためです。のセーフガードがないと、Paginate非常に高額になる可能性があります。

Let’s save this partial query in a plain JavaScript variable reference that we can continue to build on:

この部分的なクエリを、引き続き構築できるプレーンなJavaScript変数参照に保存しましょう。

```javascript
const references = Paginate(Documents(Collection('fweets')))
```

So far, our query only returns a list of references to our Fweets. To get the actual documents, we do exactly what we would do in JavaScript: map over the list with an anonymous function. In FQL, a [`Lambda`](https://docs.fauna.com/fauna/current/api/fql/functions/lambda) is just an anonymous function.

これまでのところ、クエリはFweetsへの参照のリストのみを返します。実際のドキュメントを取得するには、JavaScriptで行うのとまったく同じことを行います。つまり、無名関数を使用してリストにマップします。FQLでは、aLambdaは単なる無名関数です。

```javascript
const fweets = Map(
  references,
  Lambda(['ref'], Get(Var('ref')))
)
```

This might seem verbose if you’re used to declarative query languages like SQL that declare **what you want** and let the database figure out how to get it. In contrast, FQL declares both **what you want** and **how you want it** which makes it more procedural. Since you’re the one defining how you want your data, and not the query engine, the price and performance impact of your query is predictable. You can exactly determine how many reads this query costs without executing it, which is a significant advantage if your database contains a huge amount of data. So there might be a learning curve, but it’s well worth it financially and hassle it saves you. And once you learn how FQL works, you find that queries read just like regular code.

必要なものを宣言し、データベースにそれを取得する方法を理解させるSQLのような宣言型クエリ言語に慣れている場合、これは冗長に思えるかもしれません。これとは対照的に、FQLは、両方を宣言し、あなたが望むものをと、あなたはそれをしたいか、それはより多くの手続きになりました。クエリエンジンではなく、データの必要性を定義するのはあなたであるため、クエリの価格とパフォーマンスへの影響は予測可能です。このクエリを実行せずに、このクエリの読み取りにかかるコストを正確に判断できます。これは、データベースに大量のデータが含まれている場合に大きな利点です。したがって、学習曲線があるかもしれませんが、それは経済的に価値があり、面倒なことであなたを救うことができます。そして、FQLがどのように機能するかを学ぶと、クエリが通常のコードと同じように読み取られることがわかります。

Let’s prepare our query to be extended easily by introducing [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let). [`Let`](https://docs.fauna.com/fauna/current/api/fql/functions/let) allows us to bind variables and reuse them immediately in the next variable binding, which allows you to structure your query more elegantly:

を導入して、クエリを簡単に拡張できるように準備しましょうLet。 Let変数をバインドして、次の変数バインディングですぐに再利用できるようにします。これにより、クエリをよりエレガントに構造化できます。

```javascript
const fweets = Map(
 references,
 Lambda(
   ['ref'],
   Let(
     {
       fweet: Get(Var('ref'))
     },
     // Just return the fweet for now
     Var('fweet')
   )
 )
)
```

Now that we have this structure, getting extra data is easy. So let’s get the author:

この構造ができたので、追加のデータを簡単に取得できます。それでは、作者を取得しましょう。

```javascript
const fweets = Map(
 references,
 Lambda(
   ['ref'],
   Let(
     {
       fweet: Get(Var('ref')),
       author: Get(Select(['data', 'author'], Var('fweet')))
     },
     { fweet: Var('fweet'), author: Var('author') }
   )
 )
)
```

Although we did not write a join, we have just joined Users (the author) with the Fweets. Browse [\`src/fauna/queries/fweets.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/queries/fweets.js) to view the final query and several more examples.

結合を作成しませんでしたが、ユーザー（作成者）をFweetsに結合しました。ブラウズ`SRC /Fauna/クエリ/ fweets.js`最終クエリといくつかのより多くの例を表示します。

## [](#codebase)More in the code base

コードベースの詳細

If you haven’t already, please open the code base for this Fwitter example app. You can find a plethora of well-commented examples we haven’t explored here. This section touches on a few files we think you should check out.

まだ開いていない場合は、このFwitterサンプルアプリのコードベースを開いてください。ここではまだ調べていない、コメントの多い例がたくさんあります。このセクションでは、チェックアウトする必要があると思われるいくつかのファイルについて説明します。

First, check out the [\`src/fauna/queries/fweets.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/queries/fweets.js) file for examples of how to do complex matching and sorting with Fauna’s indexes (the indexes are created in [\`src/fauna/setup/fweets.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/setup/fweets.js)).

まず、Faunaのインデックスを使用して複雑なマッチングと並べ替えを行う方法の例については、`src / fauna / queries / fweets.js`ファイルを確認してください（インデックスは` src / fauna / setup / fweets.js`で作成されます）。

We implemented three different access patterns to get Fweets by popularity and time, by handle, and by tag:

人気と時間、ハンドル、タグでFweetsを取得するために、3つの異なるアクセスパターンを実装しました。

![Screenshot: various access paths](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/access_paths.png)

Getting Fweets by popularity and time is a particularly interesting access pattern because it actually sorts the Fweets by a sort of decaying popularity based on users’ interactions with each other.

人気と時間でFweetsを取得することは、ユーザーの相互作用に基づいて、ある種の衰退する人気によってFweetsを実際にソートするため、特に興味深いアクセスパターンです。

Also, check out [\`src/fauna/queries/search.js\`](https://github.com/fauna-brecht/fwitter/blob/master/src/fauna/queries/search.js) where we’ve implemented autocomplete based on Fauna indexes and index bindings to search for authors and tags. Since Fauna can index over multiple collections, we can write one index that supports an autocomplete type of search on both Users and Tags.

また、作成者とタグを検索するために、Faunaインデックスとインデックスバインディングに基づいてオートコンプリートを実装した`src / fauna / queries / search.js`を確認してください。Faunaは複数のコレクションにインデックスを付けることができるため、ユーザーとタグの両方でオートコンプリートタイプの検索をサポートする1​​つのインデックスを作成できます。

![Screenshot: searching for users/tags](https://docs.fauna.com/fauna/current/start/apps/fwitter../_images/fwitter/search.png)

We’ve implemented these examples because the combination of flexible and powerful indexes with relations is rare for scalable distributed databases. Databases that lack relations and flexible indexes require you to know in advance how your data is going to be accessed and you can run into problems when your business logic needs to change to accommodate your clients’ evolving use cases.

スケーラブルな分散データベースでは、柔軟で強力なインデックスとリレーションの組み合わせはまれであるため、これらの例を実装しました。リレーションと柔軟なインデックスがないデータベースでは、データへのアクセス方法を事前に知っておく必要があり、クライアントの進化するユースケースに対応するためにビジネスロジックを変更する必要がある場合に問題が発生する可能性があります。

In Fauna, if you did not foresee a specific way that you’d like to access your data, no worries — just add another index! We have range indexes, term indexes, and composite indexes that can be specified whenever you want without having to code around eventual consistency.

Faunaでは、データにアクセスする特定の方法を予測していなくても、心配する必要はありません。別のインデックスを追加するだけです。結果整合性をコード化することなく、いつでも指定できる範囲インデックス、用語インデックス、および複合インデックスがあります。
