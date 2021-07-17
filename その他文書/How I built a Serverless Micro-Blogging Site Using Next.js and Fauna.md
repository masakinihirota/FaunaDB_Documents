How I built a Serverless Micro-Blogging Site Using Next.js and Fauna
https://blog.bhanuteja.dev/how-i-built-a-serverless-micro-blogging-site-using-nextjs-and-fauna






# How I built a Serverless Micro-Blogging Site Using Next.js and Fauna

Next.jsとFaunaを使ってサーバーレスのマイクロブログサイトを作ってみた





___



## Table of Contents

目次



-   [Authentication](#authentication)
-   [Setting up Fauna in Next.js](#setting-up-fauna-in-nextjs)
    -   [Installing Fauna](#installing-fauna)
    -   [Setting up Migrations Tool](#setting-up-migrations-tool)
-   [Authentication and Authorization in Fauna](#authentication-and-authorization-in-fauna)
    -   [Next.js Serverless Function Setup for Fauna](#nextjs-serverless-function-setup-for-fauna)
-   [NextAuth](#nextauth)
-   [Requirements and Features](#requirements-and-features)
-   [Modelling the data](#modelling-the-data)
    -   [Goals](#goals)
    -   [Goal Participants](#goal-participants)
    -   [Goal Updates](#goal-updates)
    -   [Update Likes](#update-likes)
    -   [Update Comments](#update-comments)
    -   [Comment Likes](#comment-likes)
    -   [Activities](#activities)
    -   [Notifications](#notifications)
    -   [Notification Statuses](#notification-statuses)
    -   [User Followers](#user-followers)
    -   [Users](#users)
-   [Conclusion](#conclusion)



- [認証](#authentication)
- [Next.js で Fauna を設定する](#setting-up-fauna-in-nextjs)
    - [Fauna のインストール](#installing-fauna)
    - [マイグレーションツールの設定](#setting-up-migrations-tool)
- [Fauna での認証と認可](#authentication-and-authorization-in-fauna)
    - [Next.js Serverless Function Setup for Fauna](#nextjs-serverless-function-setup-for-fauna)
- [NextAuth](#nextauth)
- [要件と機能](#requirements-and-features)
- [データのモデリング](#データのモデリング)
    - [目標](#goals)
    - [ゴールの参加者](#goal-participants)
    - [ゴールの更新](#ゴール-updates)
    - [いいね！を更新](#更新-いいね！)
    - [コメントの更新](#更新コメント)
    - [コメントの「いいね！」](#comment-likes)
    - [アクティビティ](#activities)
    - [通知](#notifications)
    - [通知ステータス](#notification-statuses)
    - [ユーザーフォロワー](#user-followers)
    - [ユーザー](#users)
- [結論](#conclusion)


I have recently built a website for our local developer community [Coderplex](https://coderplex.org) completely Serverless. 

私は最近、地元の開発者コミュニティ[Coderplex](https://coderplex.org)のウェブサイトを完全にServerlessで構築しました。

We were able to start from scratch and got it launched within just 3 weeks of time. 

ゼロからスタートして、わずか3週間の期間で立ち上げることができました。

In this article, I will show what the website is about, how I built it, and also show the areas of improvement and the new features that we are planning to add to it.

この記事では、ウェブサイトがどのようなものか、どのように構築したか、また、改善点や新たに追加する予定の機能について紹介します。



The website is basically a platform like Twitter where you post updates. 

このウェブサイトは基本的に、更新情報を投稿するTwitterのようなプラットフォームです。

The only difference is that it's aimed towards developers(has things like markdown editor), and it's goal-centric. 

goal-centric

目標指向、目標指向の

唯一の違いは、開発者を対象としていること（マークダウンエディタなどを備えている）と、ゴールを重視していることです。

As soon as the users log in to the site, they will be prompted to set their goal.

ユーザーは、サイトにログインするとすぐに、ゴールを設定するように促されます。

You will be asked to set a title for the goal, write the plan of action of how you want to achieve that goal, and finally, you will be asked to set a deadline, before which you intend to achieve that goal. 

目標のタイトルを設定し、その目標を達成するための行動計画を書き、最後にその目標を達成するための期限を設定するよう求められます。

After that, you will be allowed to post updates whenever you want, showing what you are doing in order to reach that goal.

その後は、目標達成のために何をしているかを、好きな時に更新して投稿することができます。



## Authentication

認証




We only have one mode of authentication i.e., through GitHub login. 

私たちの認証方法は、GitHub へのログインによるものだけです。

We are using `next-auth` package for this.

これには `next-auth` パッケージを使用しています。

Check out the following blog post which I published a few weeks ago to know more about setting up GitHub authentication using `next-auth`.

`next-auth`を使ったGitHub認証の設定については、数週間前に公開した以下のブログ記事をご覧ください。



[3 Simple Steps To Setup Authentication in Next.js](https://blog.bhanuteja.dev/3-simple-steps-to-setup-authentication-in-nextjs)


##################
ここからFauna
##################

## Setting up Fauna in Next.js

Next.jsでのFaunaの設定



### Installing Fauna

Fauna のインストール

Before we go through other features of [coderplex.org](http://coderplex.org), let's see how I have set up my Fauna in Next.js and how my Fauna workflow is.

[coderplex.org](http://coderplex.org)の他の機能について説明する前に、私が Next.js で Fauna をどのようにセットアップしたか、また Fauna のワークフローを見てみましょう。



Install `faunadb` (javascript driver for Fauna DB) as a dependency in your Next.js project


Next.js プロジェクトに `faunadb` (Fauna DB の javascript ドライバ) を依存関係にあるものとしてインストールします。


```
yarn add faunadb
# npm install faunadb
```




While developing locally, you have two choices:

ローカルでの開発中は、2つの選択肢があります。



1.  You can either create a test database in the Fauna cloud directly.
2.  You can set up the Fauna Dev Docker container locally.


1.  Fauna クラウドにテスト用のデータベースを直接作成するか。
2.  Fauna DevのDockerコンテナをローカルにセットアップすることができる。




I personally have set up the Docker container and have been using that for local development.


私は個人的にDockerコンテナをセットアップして、ローカル開発に使用しています。



To know more about setting up the Fauna Dev container, go to the [relevant section in the documentation](https://docs.fauna.com/fauna/current/integrations/dev).



Fauna Devコンテナのセットアップについては、[ドキュメントの関連セクション](https://docs.fauna.com/fauna/current/integrations/dev)を参照してください。



To summarize, here is what I have done.




要約すると、私が行ったことは以下の通りです。




```
# Pull the latest Docker image of faunadb
faunadb の最新の Docker イメージをプルします。

docker pull fauna/faunadb:latest



# Verify if it installed correctly

正しくインストールされたか確認する

docker run fauna/faunadb --help



# Run the Fauna Dev
docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 fauna/faunadb



# After this, the Fauna Dev is started locally at port 8443

この後、Fauna Dev がポート 8443 でローカルに起動します。

```



If you go through the [documentation](https://docs.fauna.com/fauna/current/integrations/dev), you will see that there are so many ways to run the Fauna Dev. I chose the first approach because I want to start with a fresh state every time I start the database. In this approach, as soon as you stop the container, all the data will be erased, and whenever you start the container again, you will be starting with a fresh instance of Fauna.


[ドキュメント](https://docs.fauna.com/fauna/current/integrations/dev)を見てみると、Fauna Devを実行するには非常に多くの方法があることがわかります。私は、データベースを起動するたびに新鮮な状態でスタートしたいので、最初のアプローチを選びました。この方法では、コンテナを停止するとすぐにすべてのデータが消去され、再びコンテナを起動するたびに、Fauna の新しいインスタンスが開始されます。



### Setting up Migrations Tool

マイグレーションツールの設定




If you come from a background of Laravel/Django/Rails/Node, you are most probably be aware of migrations. In simple terms, the migrations are the set of files. They help manage the changes in the database schema. The files are usually associated with timestamps of the time when the migrations are created. There will usually be a way to apply a migration or rollback(unapply) a migration. These are incremental steps that you need to perform to get the fresh database to the same state as the current database.


Laravel/Django/Rails/Node を使用している方であれば、マイグレーションについてはご存知のことと思います。簡単に言えば、マイグレーションとはファイルの集合体です。データベーススキーマの変更を管理するのに役立ちます。このファイルには、マイグレーションが作成された時のタイムスタンプが付いています。通常、マイグレーションを適用したり、マイグレーションをロールバック（適用解除）する方法があります。これらは、新しいデータベースを現在のデータベースと同じ状態にするために実行する必要のある増分ステップです。



In Fauna, there is no native solution to achieve this. But very recently, an unofficial tool has been created by a developer advocate at Fauna. I have been using that tool for setting up migrations in my projects.


Faunaでは、これを実現するネイティブなソリューションはありません。しかし、ごく最近、Faunaの開発者擁護者によって非公式のツールが作成されました。私のプロジェクトでは、そのツールを使ってマイグレーションを設定しています。



```
# Install the tool as a dev dependency
ツールを開発用の依存関係としてインストールします。

yarn add -D fauna-schema-migrate 



# If you use npm, run the following command to install it.
# npm install -D fauna-schema-migrate



# Initialize the folders and config needed for this tool

このツールに必要なフォルダやコンフィグを初期化する

npx fauna-schema-migrate init
```



This will create some files and folders which we later use to set up migrations for the collections and indexes that we create. Go through the [GitHub REAMDE](https://github.com/fauna-brecht/fauna-schema-migrate) to know more about this tool. To summarize, here's how it works.

これでいくつかのファイルとフォルダが作成され、後で作成したコレクションとインデックスのマイグレーションを設定するのに使用します。このツールの詳細については、[GitHub REAMDE](https://github.com/fauna-brecht/fauna-schema-migrate)を参照してください。要約すると、以下のような仕組みになっています。




1.  You add all your collections, indexes, etc in your `fauna/resources` folder.
2.  Based on the changes in the resources folder, you will be able to generate migrations. These migrations will get generated in your `fauna/migrations` folder.
3.  You will have the ability to see the state of the database. You will be able to see what all migrations have been applied and what migrations are yet to be applied.
4.  You will be able to apply the migrations or rollback the applied migrations.
5.  While running any of these commands, you will be asked to enter the `FAUNA ADMIN KEY`.
    -   You will be able to generate this key from the Security tab of the Fauna dashboard.
    -   You can also set the environment variables `FAUNA_ADMIN_KEY`, `FAUNADB_DOMAIN`, `FAUNADB_SCHEME`, and `FAUNADB_PORT`.
    -   While connecting to the cloud database, you will only need to set `FAUNA_ADMIN_KEY`.
    -   If you are working with the Fauna Dev Docker container, you need to set up other variables too.
        -   Since I am using Fauna Dev for local development, I have set up these as per my configuration.

1.  コレクションやインデックスなどをすべて `fauna/resources` フォルダに追加します。
2.  2. resources フォルダ内の変更に基づいて、マイグレーションを生成することができるようになります。これらのマイグレーションは `fauna/migrations` フォルダに生成されます。
3.  3. データベースの状態を確認することができるようになります。すべてのマイグレーションが適用され、どのマイグレーションがまだ適用されていないかを見ることができるようになります。
4.  4. 移行を適用したり、適用した移行をロールバックしたりすることができます。
5.  5. これらのコマンドを実行する際に、「FAUNA ADMIN KEY」の入力を求められます。
    - このキーは、Fauna ダッシュボードの「セキュリティ」タブで生成できます。
    - また、環境変数 `FAUNA_ADMIN_KEY`, `FAUNADB_DOMAIN`, `FAUNADB_SCHEME`, `FAUNADB_PORT` を設定することもできます。
    - クラウドデータベースに接続するときは、`FAUNA_ADMIN_KEY`を設定するだけでよいでしょう。
    - Fauna Dev の Docker コンテナで作業する場合は、他の変数も設定する必要があります。
        - 私はローカル開発に Fauna Dev を使用しているので、これらを私の構成に合わせて設定しました。




```
export FAUNA_ADMIN_KEY=secret # This is the default secret for Fauna Dev
export FAUNADB_DOMAIN=localhost
export FAUNADB_SCHEME=http
export FAUNADB_PORT=8443
```



## Authentication and Authorization in Fauna

Fauna の認証と認可



Fauna has its own authentication system. But in this project, I have been using a `next-auth` adapter for authentication. Basically what this means is that I will handle all the authentication and authorization elsewhere(in the serverless functions of my app), and only allow the users to access the resources that they are authorized to access. Doing things this way is definitely not ideal. Fauna offers a very powerful security system out of the box. But it's a bit tricky to make it work with `next-auth` system. But I am definitely planning to make use of Fauna's security system in the future and will try to make it work with `next-auth` without losing any of the capabilities of Fauna.

Fauna は独自の認証システムを持っています。しかし、このプロジェクトでは、認証に `next-auth` アダプタを使用しています。

基本的には、すべての認証と認可を別の場所(アプリのサーバーレス機能)で処理し、ユーザーがアクセスを許可されたリソースにのみアクセスできるようにするということです。

この方法では、理想的とは言えません。Faunaには、非常に強力なセキュリティシステムが用意されています。

しかし、それを`next-auth`システムで動作させるのは少し難しいですね。

しかし、私は将来的にFaunaのセキュリティシステムを利用することを確実に計画しており、Faunaの機能を失うことなく`next-auth`で動作するようにしたいと考えています。



### Next.js Serverless Function Setup for Fauna

FaunaのためのNext.jsサーバーレス関数のセットアップ




This is how all my serverless functions look like in my Next.js app



私のNext.jsアプリでは、すべてのサーバーレス関数はこのようになっています。



**Fauna DB Client Setup**

Fauna の DB クライアントのセットアップ




I use Docker container locally, and use Fauna Cloud when the app is in production


ローカルでは Docker コンテナを使用し、本番環境では Fauna Cloud を使用しています。






```
import faunadb from 'faunadb'



// Checking if the app is in production
アプリがプロダクションにあるかどうかを確認する

const isProduction = process.env.NODE_ENV === 'production'



// Using Fauna Dev Docker container when running locally
// Using Fauna Cloud when in production

// ローカルで実行するときは Fauna Dev の Docker コンテナを使用する
// 本番環境では Fauna Cloud を使用

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET ?? 'secret',
  scheme: isProduction ? 'https' : 'http',
  domain: isProduction ? 'db.fauna.com' : 'localhost',
  ...(isProduction ? {} : { port: 8443 }),
})
```



**Requires Authentication**

**認証を必要とする場合**



If it requires the user to be authenticated, then I use `next-auth` `getSession` function to check if the user is authenticated.



ユーザーの認証が必要な場合は、`next-auth` `getSession` 関数を使って、ユーザーが認証されているかどうかを確認します。





```
import { getSession } from 'next-auth/client'



const Handler = async (req, res) => {



    // If the user needs authentication
  const session = await getSession({ req })



  if (!session) {
    return res.status(401).json({ message: 'Not logged in (UnAuthenticated)' })
  }



    // other code
    // ...
    // ...
    // ...
}



export default Handler
```



**Requires Authorization**



If only a particular user is authorized to run this function, then I send the `id` of the authorized user in the request body, and manually check if the currently logged-in user is the same as that of the authorized user.



特定のユーザーだけがこの関数を実行することを許可されている場合は、リクエストボディに許可されたユーザーの`id`を送り、現在ログインしているユーザーが許可されたユーザーと同じかどうかを手動でチェックします。




```
import { getSession } from 'next-auth/client'



const Handler = async (req, res) => {



    // If the user needs authentication
        // ユーザーが認証を必要とする場合

  const session = await getSession({ req })



  if (!session) {
    return res.status(401).json({ message: 'Not logged in (UnAuthenticated)' })
  }



  const { authorizedUserId } = req.body



  const loggedInUserId = session.user.id



  if (loggedInUserId !== authorizedUserId) {
    return res.status(403).json({ message: 'Access Forbidden' })
  }



    // other code
    // ...
    // ...
    // ...



}



export default Handler
```



Putting it all together, this is how a typical serverless function looks like in my nextjs app.


これらをまとめると、典型的なサーバーレス関数は私のnextjsアプリではこのようになります。



```
import { getSession } from 'next-auth/client'



import faunadb from 'faunadb'
const isProduction = process.env.NODE_ENV === 'production'
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET ?? 'secret',
  scheme: isProduction ? 'https' : 'http',
  domain: isProduction ? 'db.fauna.com' : 'localhost',
  ...(isProduction ? {} : { port: 8443 }),
})
const q = faunadb.query



const Handler = async (req, res) => {



    // If the user needs authentication

    // ユーザーが認証を必要とする場合

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Not logged in (UnAuthenticated)' })
  }



  const { authorizedUserId } = req.body



  const loggedInUserId = session.user.id



  if (loggedInUserId !== authorizedUserId) {
    return res.status(403).json({ message: 'Access Forbidden' })
  }



    try {
    const response: any = await client.query(
            q.Do(
                // Execute some fauna code here
            )
        )



        // Some code
        // ...
        // ...
        // ...
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }  
}



export default Handler
```



## NextAuth



We need a few collections and indexes to work with `next-auth`'s Fauna adapter. So, let's add those in `fauna/resources` folder. I have created two directories inside the `resources` folder. One is for `collections` and another for `indexes`.


`next-auth` の Fauna アダプタで動作させるには、いくつかのコレクションとインデックスが必要です。そこで、それらを `fauna/resources` フォルダに追加してみましょう。ここでは、`resources`フォルダの中に2つのディレクトリを作成しました。一つは `collections` で、もう一つは `indexes` です。



These are the collections that I need for the `next-auth`'s Fauna adapter.


これらは、`next-auth` の Fauna アダプタに必要なコレクションです。



```
// fauna/resources/collections/accounts.fql
CreateCollection({ 
  name: 'accounts' 
})



// fauna/resources/collections/users.fql
CreateCollection({ 
  name: 'users' 
})



// fauna/resources/collections/sessions.fql
CreateCollection({ 
  name: 'sessions' 
})



// fauna/resources/collections/verification_requests.fql
CreateCollection({ 
  name: 'verification_requests' 
})
```



Each of the above FQL queries is in a different file inside the `resources/collections` folder.


上記の FQL クエリは、それぞれ `resources/collections` フォルダ内の別のファイルにあります。



We also need a few indexes for the `next-auth`'s Fauna adapter.


また、`next-auth` の Fauna アダプタ用にいくつかのインデックスが必要です。




```
// fauna/resources/indexes/account_by_provider_account_id.fql
CreateIndex({
  name: 'account_by_provider_account_id',
  source: Collection('accounts'),
  unique: true,
  terms: [
    { field: ['data', 'providerId'] },
    { field: ['data', 'providerAccountId'] },
  ],
})



// fauna/resources/indexes/session_by_token.fql
CreateIndex({
  name: 'session_by_token',
  source: Collection('sessions'),
  unique: true,
  terms: [{ field: ['data', 'sessionToken'] }],
})



// fauna/resources/indexes/user_by_email.fql
CreateIndex({
  name: 'user_by_email',
  source: Collection('users'),
  unique: true,
  terms: [{ field: ['data', 'email'] }],
})



// fauna/resources/indexes/verification_request_by_token.fql
CreateIndex({
  name: 'verification_request_by_token',
  source: Collection('verification_requests'),
  unique: true,
  terms: [{ field: ['data', 'token'] }],
})



// fauna/resources/indexes/user_by_username.fql
CreateIndex({
  name: 'user_by_username',
  source: Collection('users'),
  unique: true,
  terms: [{ field: ['data', 'username'] }],
})
```



Now we need to generate the corresponding migrations for these resources. To do that, you can just run `npx fauna-schema-migrate generate`. This will create a new folder in the `fauna/migrations` folder, inside which there are files for each of the resource files that we created. You can apply all of these migrations in one go by running `npx fauna-schema-migrate apply all`.




次に、これらのリソースに対応するマイグレーションを生成する必要があります。そのためには、`npx fauna-schema-migrate generate`を実行すればいいでしょう。すると、`fauna/migrations`フォルダの中に新しいフォルダが作成され、その中に作成した各リソースファイルのファイルが入っています。npx fauna-schema-migrate apply all` を実行すると、これらの移行をすべて一度に適用することができます。



Now that we are all set up, let's start working on the actual features of the application.


これですべてのセットアップが完了したので、アプリケーションの実際の機能に取り組んでみましょう。



## Requirements and Features

要件と機能



In [coderplex.org](http://coderplex.org) app, each user will be able to do all of the following things:


[coderplex.org](http://coderplex.org)のアプリでは、各ユーザーは以下のことがすべてできるようになります。



-   Goals
    -   Set a goal with title, description(goal plan – which also accepts MDX), and deadline.
    -   Currently, only 1 user will correspond to 1 goal. In other words, each goal will have a single participant, but in the future, multiple users can participate in the same goal. So the schema should take care of that.
-   Updates
    -   Post an update to the goal
        -   An update is very similar to a tweet that you have on Twitter. The only difference is that each update will correspond to a goal.
        -   The update will also accept markdown(MDX).
    -   Edit your update
    -   Like any update
-   Comments
    -   Add a comment to an update (also accepts MDX)
    -   Edit your comment.
    -   Like any comment
-   Follow any other user
-   Notifications
    -   Whenever another user likes your update/comment.
    -   Whenever another user follows you.
    -   Whenever another user comments on your update.
    -   Users should see the unread notification count.
    -   When they open the notifications, they should also be able to differentiate unread-notifications from read-notifications.
    -   All the notifications should be marked as read, by the next time they open the notifications, and the notification count should be reset to 0.
-   Users should be able to edit/add the details like their social media links, their name, etc.


- 目標
    - タイトル、説明文（ゴールプラン-MDXも使用可能）、期限を持つゴールを設定します。
    - 現在、1人のユーザーが1つのゴールに対応できるのは1人だけです。言い換えれば、各ゴールには1人の参加者がいることになりますが、将来的には複数のユーザが同じゴールに参加できるようになります。そのため、スキーマで対応する必要があります。
- 更新情報
    - ゴールへの更新情報の投稿
        - 更新情報は、Twitterでのつぶやきに非常によく似ています。唯一の違いは、各アップデートがゴールに対応することです。
        - アップデートには、markdown(MDX)も受け入れられます。
    - アップデートの編集
    - 更新情報の編集
- コメント
    - 更新情報にコメントを追加する（MDXも受け付ける
    - コメントを編集します。
    - 任意のコメントに「いいね！」を付ける
- 他のユーザーをフォローする
- 通知機能
    - 他のユーザーが「いいね！」を押したとき。
    - 他のユーザーがあなたをフォローしたときに表示されます。
    - 自分の更新情報に他のユーザーがコメントしたとき
    - ユーザーは通知の未読数を確認することができます。
    - また、通知を開いたときに、未読の通知と既読の通知を区別できるようにしてください。
    - 次に通知を開くときには、すべての通知が既読になり、通知数が0にリセットされている必要があります。
- ソーシャルメディアへのリンクや名前などの詳細を編集・追加できるようにすること。



These are the requirements and features that we have in [coderplex.org](http://coderplex.org) app.


以上が、[coderplex.org](http://coderplex.org)のアプリに求められる要件と機能です。



## Modelling the data

データのモデリング



These are the following collections that I have created.


これらは私が作成した以下のコレクションです。




-   goals
-   goal\_participants
-   goal\_updates
-   update\_likes
-   update\_comments
-   comment\_likes
-   activities
-   notifications
-   notification\_statuses
-   user\_followers
-   users



### Goals



This is how an example goal will look like. Each goal will have a reference to the `user` who created the goal.



ゴールの例はこのようになっています。各ゴールには、そのゴールを作成した`user`への参照があります。



```
{
  "ref": Ref(Collection("goals"), "291155149010764290"),
  "ts": 1614490198607000,
  "data": {
    "createdBy": Ref(Collection("users"), "291151577246335494"),
    "title": "Learn NextJS",
    "description": "I will go through the following resources......",
    "timestamps": {
      "createdAt": Time("2021-02-21T16:47:17.542336Z"),
      "updatedAt": Time("2021-02-28T05:29:58.485254Z")
    },
    "deadline": Time("2021-03-12T00:00:00Z")
  }
}
```



### Goal Participants

ゴールの参加者



Currently, the user who created a goal will be the only participant of the goal. But even if there are multiple participants of a goal, it will just be another new document in this collection. Each document of this collection will have a reference to the `goal` and also to the `user` collections.


現在、ゴールを作成したユーザーは、そのゴールの唯一の参加者となります。しかし、ゴールに複数の参加者がいたとしても、それはこのコレクションの新しいドキュメントに過ぎません。このコレクションの各ドキュメントは、`goal`と`user`コレクションへの参照を持ちます。




```
{
  "ref": Ref(Collection("goal_participants"), "291155149149176322"),
  "ts": 1613926037910000,
  "data": {
    "goal": Ref(Collection("goals"), "291155149010764290"),
    "participant": Ref(Collection("users"), "291151577246335494"),
    "timestamps": {
      "createdAt": Time("2021-02-21T16:47:17.542336Z"),
      "updatedAt": Time("2021-02-21T16:47:17.542336Z")
    }
  }
}
```



### Goal Updates

ゴールの更新



Each goal update will have reference to the `goal` to which this update belongs to, and also to the `user` who is posting this update.



各ゴールのアップデートには、このアップデートが属する `goal` と、このアップデートを投稿する `user` への参照があります。




```
{
  "ref": Ref(Collection("goal_updates"), "291156218380026372"),
  "ts": 1613927057530000,
  "data": {
    "goal": Ref(Collection("goals"), "291155149010764290"),
    "postedBy": Ref(Collection("users"), "291151577246335494"),
    "description": "Finished the \"Create a Next.js App\" section from the NextJS basics tutorial ",
    "timestamps": {
      "createdAt": Time("2021-02-21T17:04:17.345236Z"),
      "updatedAt": Time("2021-02-21T17:04:17.345236Z")
    }
  }
}
```



### Update Likes

いいね！を更新



Each document of this collection will have a reference to the `user` who performed this action and also to the `update` on which this action is performed on. Here the action is either `like` or `unlike`. Whenever a user likes an update for the first time, a new document is created in this collection, with `liked` set to `true`. Whenever the user unlikes an update, since the document is already created, we would just toggle the `liked` to `false`. Similarly, when the user likes the update for the second time after unliking, instead of creating a new document, `liked` is again set back to `true`.



このコレクションの各ドキュメントには、このアクションを実行した `user` への参照と、このアクションが実行された `update` への参照があります。ここでは、アクションは `like` または `unlike` のどちらかです。ユーザーが初めて更新情報に「いいね！」を押すたびに、このコレクションには新しいドキュメントが作成され、`liked`が`true`に設定されます。ユーザーが更新を気に入らないときは、すでにドキュメントが作成されているので、単に`liked`を`false`に切り替えます。同様に、ユーザーが更新をアンライクした後に2回目のライクをすると、新しいドキュメントを作成する代わりに、`liked`は再び`true`に戻されます。



```
{
  "ref": Ref(Collection("update_likes"), "291156291484647936"),
  "ts": 1613927127890000,
  "data": {
    "user": Ref(Collection("users"), "291150570318725632"),
    "update": Ref(Collection("goal_updates"), "291156254585258502"),
    "liked": true,
    "timestamps": {
      "createdAt": Time("2021-02-21T17:05:26.235891Z"),
      "updatedAt": Time("2021-02-21T17:05:26.235891Z")
    }
  }
}
```



### Update Comments

アップデートコメント



Each document in this collection will have reference to the `user` who posted this comment and also to the `update` under which this comment is posted.



このコレクションの各ドキュメントには、このコメントを投稿した`ユーザー`と、このコメントが投稿された`アップデート`への参照があります。




```
{
  "ref": Ref(Collection("update_comments"), "291226260758069760"),
  "ts": 1613993855415000,
  "data": {
    "postedBy": Ref(Collection("users"), "291151577246335494"),
    "update": Ref(Collection("goal_updates"), "291226189279789572"),
    "description": "Nice job! ",
    "timestamps": {
      "createdAt": Time("2021-02-22T11:37:34.940974Z"),
      "updatedAt": Time("2021-02-22T11:37:34.940974Z")
    }
  }
}
```



### Comment Likes

コメントのイイネ



A comment like is very similar to `update_like`, the only difference is that the user is liking/unliking a comment instead of an update.


コメントのイイネは `update_like` とよく似ていますが、唯一の違いは、ユーザーが更新ではなくコメントにイイネ/アンネをすることです。




```
{
  "ref": Ref(Collection("comment_likes"), "291748514516435458"),
  "ts": 1614491916980000,
  "data": {
    "user": Ref(Collection("users"), "291196688254632454"),
    "comment": Ref(Collection("update_comments"), "291748498072666628"),
    "liked": false,
    "timestamps": {
      "createdAt": Time("2021-02-28T05:58:34.974710Z"),
      "updatedAt": Time("2021-02-28T05:58:36.839458Z")
    }
  }
}
```



### Activities

アクティビティ



Whenever an activity is performed, a new document will be created in this collection. An activity can be `LIKED_UPDATE`, `UNLIKED_UPDATE`, `LIKED_COMMENT`, `UNIKED_COMMENT`, `COMMENTED`, `FOLLOWED`, `UNFOLLOWED`. Each document in this collection will have a reference to the `user` who performed this activity and also to the `resource`, which has been added/changes as a result of this activity. For example, if the activity is `LIKED_UPDATE`, then the resource is from the `update_likes` collection because that is where we are storing the likes of the updates.


アクティビティが実行されるたびに、このコレクションには新しいドキュメントが作成されます。アクティビティには `LIKED_UPDATE`, `UNLIKED_UPDATE`, `LIKED_COMMENT`, `UNIKED_COMMENT`, `COMMENTED`, `FOLLOWED`, `UNFOLLOWED` があります。このコレクションの各ドキュメントは、このアクティビティを実行した `ユーザー` への参照と、このアクティビティの結果として追加/変更された `リソース` への参照を持ちます。例えば、アクティビティが `LIKED_UPDATE` であれば、リソースは `update_likes` コレクションのものになりますが、これはアップデートの「いいね！」を保存している場所だからです。




```
{
  "ref": Ref(Collection("activities"), "291746021461983744"),
  "ts": 1614489537610000,
  "data": {
    "user": Ref(Collection("users"), "291151577246335494"),
    "resource": Ref(Collection("update_likes"), "291701773249282560"),
    "type": "LIKED_UPDATE",
    "timestamps": {
      "createdAt": Time("2021-02-28T05:18:57.449934Z"),
      "updatedAt": Time("2021-02-28T05:18:57.449934Z")
    }
  }
}
```



### Notifications



This is the place where we store the notifications. Each document in this collection will have a reference to the `user` to which this notification should be shown. It will also have a reference to the `activity` based on which this notification is created. We will not create notifications for all the activities. For example, if one user unfollowed another user, we don't want to show that notification. So we only create notifications for some of the activities.



これは通知を格納する場所です。このコレクションの各ドキュメントには、この通知を表示すべき `user` への参照があります。このコレクションの各ドキュメントには、この通知を表示すべき`ユーザー`への参照があり、また、この通知を作成する元となる`アクティビティ`への参照があります。すべてのアクティビティに対して通知を作成するわけではありません。例えば、あるユーザーが他のユーザーをフォロー解除した場合、その通知を表示したくありません。そのため、一部のアクティビティに対してのみ通知を作成します。



```
{
  "ref": Ref(Collection("notifications"), "291746542632567300"),
  "ts": 1614490034620000,
  "data": {
    "user": Ref(Collection("users"), "291299459214606850"),
    "activity": Ref(Collection("activities"), "291746542630470148"),
    "timestamps": {
      "createdAt": Time("2021-02-28T05:27:14.492640Z"),
      "updatedAt": Time("2021-02-28T05:27:14.492640Z")
    }
  }
}
```



### Notification Statuses



In this collection, we store the number of notifications read by the user. Each document in this collection will have a reference to the `user`. This is how we will know how many unread notifications are present for a user. For example, if we have a total of `60` notifications for a user, and in `notification_statuses` collection, the same user has count as `58`, then we know that the user has `2` new notifications, and we show the recent two notifications as `unread` in the UI.



このコレクションには、ユーザーが読んだ通知の数を格納します。このコレクションの各ドキュメントは `user` への参照を持ちます。このようにして、あるユーザの未読通知の数を知ることができます。例えば、あるユーザの通知が合計で`60`件あり、`notification_statuses`コレクションでは、同じユーザが`58`件とカウントされている場合、そのユーザには`2`件の新しい通知があることがわかり、UIでは最近の2件の通知を`未読`として表示します。





```
{
  "ref": Ref(Collection("notification_statuses"), "291746117445485062"),
  "ts": 1615246280027000,
  "data": {
    "user": Ref(Collection("users"), "291150570318725632"),
    "count": 58,
    "timestamps": {
      "createdAt": Time("2021-02-28T05:20:28.984137Z"),
      "updatedAt": Time("2021-03-08T23:31:19.808558Z")
    }
  }
}
```



### User Followers

ユーザーフォロワー




This collection is very similar to the `update_likes` collection. Instead of `liked`, here you will have `isFollowing`. This will also have references to the `user` who is being followed, and also the `user` who is following the other user.



このコレクションは、`update_likes`コレクションとよく似ています。このコレクションは、`update_likes`コレクションとよく似ていますが、`liked`の代わりに、`isFollowing`があります。このコレクションは、フォローされている`ユーザー`と、相手のユーザーをフォローしている`ユーザー`への参照も持ちます。




```
{
  "ref": Ref(Collection("user_followers"), "291151670793994758"),
  "ts": 1614489819630000,
  "data": {
    "user": Ref(Collection("users"), "291151577246335494"),
    "follower": Ref(Collection("users"), "291150570318725632"),
    "isFollowing": true,
    "timestamps": {
      "createdAt": Time("2021-02-21T15:52:00.472819Z"),
      "updatedAt": Time("2021-02-28T05:23:39.192197Z")
    }
  }
}
```



### Users

ユーザー



This is an example document in `users` collection.

これは、`users`コレクションのドキュメントの例です。








```
{
  "ref": Ref(Collection("users"), "292150540328725632"),
  "ts": 1613940787978000,
  "data": {
    "email": "pbteja1998@gmail.com",
    "image": "https://avatars.githubusercontent.com/u/17903466?v=4",
    "account": {
      "firstName": "Bhanu Teja",
      "lastName": "Pachipulusu",
      "bio": "Software Engineer"
    },
    "socials": {
      "github": "pbteja1998",
      "twitter": "pbteja1998",
      "blog": "https://bhanuteja.dev/",
      "facebook": "pbteja1998",
      "linkedin": "pbteja1998",
      "codepen": "pbteja1998",
      "discord": "BhanuTeja#4468"
    },
    "otherDetails": {
      "company": "Coderplex",
      "userType": "yes",
      "mobile": "9876543210",
      "isCurrentlyWorking": "yes"
    },
    "username": "pbteja1998",
    "timestamps": {
      "createdAt": Time("2021-02-21T15:34:30.938680Z"),
      "updatedAt": Time("2021-02-21T20:53:07.848454Z")
    },
    "loggedInFromCoderplexOrg": true
  }
}
```



## Conclusion

結論




In this blog post, I have tried to explain how I use Fauna DB in my Next.js applications. I also showed how I modeled the data for the application. In the next blog post, I would write about different parts of the home page of the application, and also the queries to fetch the data required to show everything that is there on the home page.


今回のブログ記事では、私がNext.jsのアプリケーションでFauna DBをどのように使っているかを説明してみました。また、アプリケーションのデータをどのようにモデル化したかについても紹介しました。次のブログ記事では、アプリケーションのホームページのさまざまな部分と、ホームページにあるすべてのものを表示するために必要なデータを取得するためのクエリについて書きます。









