Environment Variables - Vercel Documentation
https://vercel.com/docs/environment-variables

環境変数 - Vercel ドキュメント
https://vercel.com/docs/environment-variables

# [Environment Variables](#)

# [環境変数](#)

Environment Variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](#Environments).

環境変数とは、ソースコードの外部で設定されるキーと値のペアで、それぞれの値が[環境](#Environments)に応じて変化するようになっています。

Your source code can read these values to change behavior during the [Build Step](https://vercel.com/docs/build-step) or during [Serverless Function](https://vercel.com/docs/serverless-functions/introduction) execution.

あなたのソースコードはこれらの値を読み取って、[Build Step](https://vercel.com/docs/build-step)や[Serverless Function](https://vercel.com/docs/serverless-functions/introduction)の実行中に動作を変えることができます。

All values are encrypted at rest and visible to any user that has access to the [Project](https://vercel.com/docs/platform/projects). It is safe to use both non-sensitive and sensitive data, such as tokens.

すべての値は静止状態では暗号化されており、[Project](https://vercel.com/docs/platform/projects)にアクセスできるすべてのユーザーが見ることができます。トークンのような非機密データと機密データの両方を使用しても安全です。

Changes to Environment Variables are not applied to previous deployments, they only apply to new deployments.

環境変数の変更は、以前のデプロイメントには適用されず、新しいデプロイメントにのみ適用されます。

To declare an Environment Variable for your deployment, head to the Environment Variables page of your Project Settings.

デプロイメントの環境変数を宣言するには、プロジェクト設定の「環境変数」ページにアクセスしてください。

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQ4IiBoZWlnaHQ9IjQwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQ4IiBoZWlnaHQ9IjQwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fadd-env-variable.png&w=1920&q=75)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fadd-env-variable.png&w=1920&q=75)

The _Add New_ section of the Environment Variables page in the Project Settings.

Project Settings の Environment Variables ページの*Add New*セクションです。

Enter the desired Name for your Environment Variable. For example, if you are using Node.js and you create an Environment Variable named `API_URL`, it will be available under `process.env.API_URL` in your code.

環境変数に必要な名前を入力します。例えば、Node.js を使用していて、`API_URL`という名前の環境変数を作成した場合、コード内の`process.env.API_URL`で利用できます。
環境変数に必要な名前を入力します。例えば、Node.js を使用していて、`API_URL`という名前の環境変数を作成した場合、コード内の`process.env.API_URL`で利用できます。
環境変数に必要な名前を入力します。例えば、Node.js を使用していて、`API_URL`という名前の環境変数を作成した場合、コード内の`process.env.API_URL`で利用できます。
環境変数に必要な名前を入力します。例えば、Node.js を使用していて、`API_URL`という名前の環境変数を作成した場合、コード内の`process.env.API_URL`で利用できます。
環境変数に必要な名前を入力します。例えば、Node.js を使用していて、`API_URL`という名前の環境変数を作成した場合、コード内の`process.env.API_URL`で利用できます。

Then, enter the desired Value for your Environment Variable. The value is encrypted at rest so it is safe to add sensitive data like authentication tokens or private keys.

次に、環境変数に必要な値を入力します。この値は静止状態では暗号化されているので、認証トークンや秘密鍵などの機密データを追加しても安全です。

You can then configure which [Environments](#environments) this variable should apply to.

次に、この環境変数をどの[Environments](#environments)に適用するかを設定します。

Finally, click Save.

最後に「保存」をクリックします。

## [Searching and Filtering](#searching-and-filtering)

## [検索とフィルタリング](#searching-and-filtering)

Just below the _Add New_ form is a list of all the Environment Variables for the Project.

[新規追加]フォームのすぐ下には、プロジェクトのすべての環境変数のリストが表示されます。

You can search for an existing Environment Variable by name using the search input and/or filter by [Environment](#environment) and Git Branch (in the case of the Preview Environment).

ここでは、既存の環境変数を名前で検索したり、[Environment](#environment)や Git Branch(プレビュー環境の場合)でフィルタリングしたりすることができます。

Clicking the three dots to the right allows you to edit or delete the Environment Variable.

右側の 3 つのドットをクリックすると、環境変数の編集や削除ができます。

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzc2IiBoZWlnaHQ9IjE2MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzc2IiBoZWlnaHQ9IjE2MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fvariable-example.png&w=1920&q=75)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fvariable-example.png&w=1920&q=75)

An example of an Environment Variable with the search and filter inputs above.

上記の検索とフィルターの入力をした環境変数の例です。

## [Environments](#environments)

## [Environments](#environments)

For each Environment Variable, you can select one or more Environments to apply the Variable to:

各 Environment Variable に対して、その Variable を適用する Environment を 1 つ以上選択できます。

Environment

環境

Description

説明

[Production](https://vercel.com/docs/platform/deployments#production)

[プロダクション](https://vercel.com/docs/platform/deployments#production)

When selected, the Environment Variable will be applied to your next Production Deployment. To create a Production Deployment, push a commit to the [Production Branch](https://vercel.com/docs/git#production-branch) or run `vercel --prod`.

選択すると、その環境変数は次のプロダクション配置に適用されます。プロダクションデプロイメントを作成するには、[Production Branch](https://vercel.com/docs/git#production-branch)にコミットをプッシュするか、`vercel --prod`を実行してください。

[Preview](#preview-environment-variables)

プレビュー](#preview-environment-variables)

The Environment Variable is applied to your next Preview Deployment. Preview Deployments are created when you push to a branch that is not the [Production Branch](https://vercel.com/docs/git#production-branch) or run `vercel`.

環境変数は、次回のプレビューデプロイメントに適用されます。プレビューデプロイメントは、[Production Branch](https://vercel.com/docs/git#production-branch)ではないブランチにプッシュするか、`vercel`を実行すると作成されます。

[Development](#development-environment-variables)

開発](#development-environment-variables)

The Environment Variable is used when running your project locally with `vercel dev` or your preferred development command. To download Development Environment Variables, run [`vercel env pull`](https://vercel.com/docs/cli#commands/env).

環境変数は、`vercel dev`やお好みの開発コマンドでプロジェクトをローカルに実行する際に使用されます。開発環境変数をダウンロードするには、[`vercel env pull`](https://vercel.com/docs/cli#commands/env)を実行します。

## [Preview Environment Variables](#preview-environment-variables)

## [環境変数のプレビュー](#preview-environment-variables)

**Note:** You need Vercel CLI version 22.0.0 or higher to use the features described in this section.

**Note:** このセクションで説明されている機能を使用するには、Vercel CLI バージョン 22.0.0 以降が必要です。

Preview Environment Variables are applied to deployments from any Git branch that does not match the [Production Branch](https://vercel.com/docs/git#production-branch). When you add a Preview Environment Variable, you can choose to apply to all Preview branches or you can select a specific branch.

プレビュー環境変数は、[Production Branch](https://vercel.com/docs/git#production-branch)と一致しない任意の Git ブランチからのデプロイに適用されます。プレビュー環境変数を追加する際には、すべてのプレビューブランチに適用するか、特定のブランチを選択することができます。

When you push to a branch, a combination of Preview Environment Variables and branch-specific variables (if any) will be used. Any branch-specific variables will override other variables with the same name. This means you don't need to replicate all your existing Preview Environment Variables for each branch – you only need to add the values you wish to override.

ブランチにプッシュする際には、プレビュー用の環境変数とブランチ固有の変数（もしあれば）を組み合わせて使用します。ブランチ固有の変数は、同じ名前の他の変数よりも優先されます。つまり、ブランチごとに既存のプレビュー環境変数をすべて複製する必要はなく、上書きしたい値を追加するだけでよいのです。

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQ4IiBoZWlnaHQ9IjQwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQ4IiBoZWlnaHQ9IjQwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fadd-preview-var.png&w=1920&q=75)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fadd-preview-var.png&w=1920&q=75)

Adding an Environment Variable to the `staging` branch.

環境変数を `staging` ブランチに追加します。

## [Development Environment Variables](#development-environment-variables)

## 【開発環境変数】(#development-environment-variables)

**Note:** You need Vercel CLI version 21.0.1 or higher to use the features described in this section.

**Note:** このセクションで説明されている機能を使用するには、Vercel CLI バージョン 21.0.1 以降が必要です。

Environment Variables created for the Development Environment can be downloaded into a local development setup using the `vercel env pull` command provided by [Vercel CLI](https://vercel.com/cli):

開発環境用に作成した環境変数は、[Vercel CLI](https://vercel.com/cli)で提供されている`vercel env pull`コマンドを使って、ローカルの開発環境にダウンロードすることができます。

vercel env pull
Downloading Development Environment Variables for Project my-lovely-project
✅ Created .env file [510ms]

バーセルエンベロープル
プロジェクト my-lovely-project の開発環境変数のダウンロード
✅ .env ファイルを作成しました ✅ .env ファイルを作成しました ✅ [510ms].

Downloading Development Environment Variables with the `vercel env pull` command.

`vercel env pull`コマンドで開発環境変数をダウンロードします。

Running the command will create a `.env` file in the current directory, which can then be consumed by your framework's Development Command (like `next dev`).

このコマンドを実行すると、カレントディレクトリに`.env`ファイルが作成され、フレームワークの開発コマンド（`next dev`など）で利用することができます。

If you're using `vercel dev`, there's no need to run `vercel env pull`, as `vercel dev` automatically downloads the Development Environment Variables into memory.

`vercel dev` を使用している場合は、`vercel env pull` を実行する必要はありません。`vercel dev` は自動的に開発環境変数をメモリにダウンロードするからです。

**Note:** Make sure to read [this section](https://vercel.com/docs/cli#commands/dev) about whether you should use `vercel dev` or not.

**Note:** `vercel dev` を使うべきかどうかについては、[このセクション](https://vercel.com/docs/cli#commands/dev)を必ず読んでください。

For more information on the `vercel env` command, check out [this section](https://vercel.com/docs/cli#commands/env).

また、`vercel env`コマンドの詳細については、[このセクション](https://vercel.com/docs/cli#commands/env)をご覧ください。

## [Integration Environment Variables](#integration-environment-variables)

## 【統合環境変数】(#integration-environment-variables)

[Integrations](https://vercel.com/docs/integrations) can automatically add Environment Variables to your Project Settings. In that case, the Integration that added the Variable will be displayed:

インテグレーション](https://vercel.com/docs/integrations)では、プロジェクトの設定に環境変数を自動的に追加することができます。その場合は、環境変数を追加したインテグレーションが表示されます。

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzY4IiBoZWlnaHQ9Ijk2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==)

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzY4IiBoZWlnaHQ9Ijk2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==)と表示されます。

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fintegration-env-variable.png&w=1920&q=75)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fintegration-env-variable.png&w=1920&q=75)

An Environment Variable added by the [Sentry](https://vercel.com/integrations/sentry) Integration.

Sentry](https://vercel.com/integrations/sentry)の統合により追加された環境変数です。

**Note:** Support for Integration Environment Variables was added on April 10th, 2020. Variables added before that date do not have the Integration indication.

**注：** 統合環境変数のサポートは 2020 年 4 月 10 日に追加されました。それ以前に追加された変数には統合の表示がありません。

## [Reserved Environment Variables](#reserved-environment-variables)

## 【予約環境変数】(#reserved-environment-variables)

The following [Environment Variable](https://vercel.com/docs/environment-variables) names are [reserved](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) and therefore unavailable for use:

以下の[環境変数](https://vercel.com/docs/environment-variables)の名前は[予約](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime)されているため、使用できません。

- `AWS_REGION`
- `AWS_DEFAULT_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_KEY`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_EXECUTION_ENV`
- `AWS_LAMBDA_LOG_GROUP_NAME`
- `AWS_LAMBDA_LOG_STREAM_NAME`
- `AWS_LAMBDA_FUNCTION_NAME`
- `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`
- `AWS_LAMBDA_FUNCTION_VERSION`
- `AWS_SESSION_TOKEN`
- `NOW_REGION`
- `TZ`
- `LAMBDA_TASK_ROOT`
- `LAMBDA_RUNTIME_DIR`

## [System Environment Variables](#system-environment-variables)

## 【システム環境変数】(#system-environment-variables)

Vercel provides a set of Environment Variables that are automatically populated by the System, such as the URL of the Deployment or the name of the Git branch deployed.

Vercel には、デプロイメントの URL やデプロイされた Git ブランチの名前など、システムによって自動的に入力される一連の環境変数があります。

To expose them to your Deployments, make sure Automatically expose System Environment Variables is checked in your Project Settings.

これらの環境変数をデプロイメントに公開するには、プロジェクト設定で「システム環境変数を自動的に公開する」がチェックされていることを確認してください。

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9Ijg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==)

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9Ijg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fauto-expose-system-envs.png&w=1920&q=75)

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fenvironment-variables%2Fauto-expose-system-envs.png&w=1920&q=75)

Automatically exposing System Environment Variables in the Project Settings.

プロジェクト設定でシステム環境変数を自動的に公開する。

The following System Environment Variables will be exposed to your Deployments:

以下のシステム環境変数がデプロイメントに公開されます。

**Note:** If you are using a Framework for your Project, we provide prefixed Environment Variables. You can find a list of those below this table.

**Note:** プロジェクトにフレームワークを使用している場合、接頭辞付きの環境変数が提供されます。この表の下にそのリストがあります。

| Name | Description |
| ---| --- |
| `VERCEL` | An indicator that the app is deployed and running on Vercel. Example: `1`. |
| `CI` | An indicator that the code is running in a [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) environment. Example: `1`. **Note:** This Variable is only exposed during [Build Step](https://vercel.com/docs/build-step). |
| `VERCEL_ENV` | The [Environment](https://vercel.com/docs/environment-variables#environments) that the app is deployed an running on. The value can be either `production`, `preview`, or `development`. |
| `VERCEL_URL` | The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`. |
| `VERCEL_REGION` | The ID of the [Region](https://vercel.com/docs/edge-network/regions) where the app is running. Example: `cdg1`. **Note:** This Variable is only exposed during Runtime for [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction). |
| `VERCEL_GIT_PROVIDER` | The Git Provider the deployment is triggered from. Example: `github`. |
| `VERCEL_GIT_REPO_SLUG` | The origin repository the deployment is triggered from. Example: `my-site`. |
| `VERCEL_GIT_REPO_OWNER` | The account that owns the repository the deployment is triggered from. Example: `acme`. |
| `VERCEL_GIT_REPO_ID` | The ID of the repository the deployment is triggered from. Example: `117716146`. |
| `VERCEL_GIT_COMMIT_REF` | The git branch of the commit the deployment was triggered by. Example: `improve-about-page`. |
| `VERCEL_GIT_COMMIT_SHA` | The git [SHA](https://help.github.com/articles/github-glossary/#commit) of the commit the deployment was triggered by. Example: `fa1eade47b73733d6312d5abfad33ce9e4068081`. |
| `VERCEL_GIT_COMMIT_MESSAGE` | The message attached to the commit the deployment was triggered by. Example: `Update about page`. |
| `VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | The username attached to the author of the commit that the project was deployed by. Example: `johndoe`. |
| `VERCEL_GIT_COMMIT_AUTHOR_NAME` | The name attached to the author of the commit that the project was deployed by. Example: `John Doe`. |

---

| Name | Description |
| --- | --- |
| `VERCEL` | アプリが Vercel 上にデプロイされ、実行されていることを示すインジケータです。例: `1`. |
| `CI` | そのコードが[継続的インテグレーション](https://en.wikipedia.org/wiki/Continuous_integration)環境で実行されていることを示すインジケータです。例: `1`. |
| `VERCEL_ENV` | アプリがデプロイされ、実行されている[環境](https://vercel.com/docs/environment-variables#environments)です。 |
| `VERCEL_URL` | デプロイメントの URL です。例: `my-site-7q03y4pi5.vercel.app`. |
| `VERCEL_REGION` | アプリが動作している[リージョン](https://vercel.com/docs/edge-network/regions)の ID です。例: `cdg1`. **Note:** この変数は、[サーバーレス関数](https://vercel.com/docs/serverless-functions/introduction)のランタイム中にのみ公開されます。 |
| `VERCEL_GIT_PROVIDER` | デプロイメントのトリガーとなる Git プロバイダー。例: `github`. | 。 |
| `VERCEL_GIT_REPO_SLUG` | デプロイメントのトリガーとなるオリジンリポジトリ。例: `my-site`. |
| `VERCEL_GIT_REPO_OWNER` | デプロイメントのトリガーとなるリポジトリを所有するアカウントです。例: `acme`.`VERCEL_GIT_REPO_OWNER`デプロイメントがトリガーされるリポジトリを所有するアカウント。 |
| `VERCEL_GIT_REPO_ID` | デプロイメントがトリガーされたリポジトリの ID です。例: `117716146`. |
| `VERCEL_GIT_COMMIT_REF` | デプロイメントのトリガーとなったコミットの git ブランチ。例: `improve-about-page`. |
| `VERCEL_GIT_COMMIT_SHA` | デプロイメントがトリガーされたコミットの git [SHA](https://help.github.com/articles/github-glossary/#commit)。Example: `fa1eade47b73733d6312d5abfad33ce9e4068081`. |
| `VERCEL_GIT_COMMIT_MESSAGE` | デプロイメントがトリガーされたコミットに添付されたメッセージです。例: `Update about page`. |
| `VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | プロジェクトがデプロイされた際のコミットの作者に付けられたユーザー名です。例: `johndoe`. |
| `VERCEL_GIT_COMMIT_AUTHOR_NAME` | プロジェクトがデプロイされた際のコミットの作者に付けられた名前です。例: `John Doe`. |

Frameworks typically use a prefix in order to expose Environment Variables to the browser.

The following prefixed Environment Variables will be available during the Build Step, based on the Project's selected [Framework Preset](https://vercel.com/docs/build-step#framework-preset).

Next.js

Gatsby.js

Vue.js

Create React App

Nuxt.js

RedwoodJS

| Name | Description |
| --- | --- |
| `NEXT_PUBLIC_VERCEL_ENV` | The [Environment](https://vercel.com/docs/environment-variables#environments) that the app is deployed an running on. The value can be either `production`, `preview`, or `development`. |
| `NEXT_PUBLIC_VERCEL_URL` | The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`. |
| `NEXT_PUBLIC_VERCEL_GIT_PROVIDER` | The Git Provider the deployment is triggered from. Example: `github`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG` | The origin repository the deployment is triggered from. Example: `my-site`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER` | The account that owns the repository the deployment is triggered from. Example: `acme`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_ID` | The ID of the repository the deployment is triggered from. Example: `117716146`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` | The git branch of the commit the deployment was triggered by. Example: `improve-about-page`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` | The git [SHA](https://help.github.com/articles/github-glossary/#commit) of the commit the deployment was triggered by. Example: `fa1eade47b73733d6312d5abfad33ce9e4068081`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE` | The message attached to the commit the deployment was triggered by. Example: `Update about page`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | The username attached to the author of the commit that the project was deployed by. Example: `johndoe`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME` | The name attached to the author of the commit that the project was deployed by. Example: `John Doe`. |

---

| Name | Description |
|  --- | --- |
| `NEXT_PUBLIC_VERCEL_ENV` | アプリがデプロイされ、実行される[環境](https://vercel.com/docs/environment-variables#environments)です。この値は、`production`、`preview`、`development`のいずれかになります。 |
| `NEXT_PUBLIC_VERCEL_URL` | デプロイメントの URL です。例: `my-site-7q03y4pi5.vercel.app`. | 。 |
| `NEXT_PUBLIC_VERCEL_GIT_PROVIDER` | デプロイメントのトリガーとなる Git プロバイダーです。例: `github`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG` | デプロイメントのトリガーとなるオリジンリポジトリ。例: `my-site`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER` | デプロイメントがトリガーされたリポジトリを所有するアカウントです。例: `acme`. |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_ID` | デプロイメントのトリガーとなるリポジトリの ID です。例: `117716146`. | 。 |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` | デプロイメントがトリガーされたコミットの git ブランチ。例: `improve-about-page`. | 。 |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` | デプロイメントがトリガーされたコミットの git [SHA](https://help.github.com/articles/github-glossary/#commit)です。Example: `fa1eade47b73733d6312d5abfad33ce9e4068081`. |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE` | デプロイメントがトリガーされたコミットに添付されたメッセージです。例: `Update about page`. | 。 |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | プロジェクトがデプロイされたコミットの作者に付けられたユーザー名です。例: `johndoe`. | 。 |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME` | プロジェクトがデプロイされたときのコミットの作者に付けられた名前。例: `John Doe`. |

プロジェクトがデプロイされたコミットの作者に付けられた名前です。例: `John Doe`.

**Note:** System Environment Variables will be populated with an empty string if the value is not applicable, for example when running `vercel dev` during [Development](#development-environment-variables) or if the Deployment is not triggered by a Git Commit.

**注:** システム環境変数は、例えば、[開発](#development-environment-variables)中に `vercel dev` を実行した場合や、Git コミットによってデプロイが開始されなかった場合など、値が適用されない場合には、空の文字列が入力されます。
