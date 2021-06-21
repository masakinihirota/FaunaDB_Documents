Team management (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/integrations/dashboard/teams

Plan Feature
This feature requires an appropriate billing plan.
See the Pricing page for details.
You can upgrade via the Fauna Dashboard

プラン機能
この機能を利用するには、適切な課金プランが必要です。
詳細は、料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# Team management

チーム管理

Fauna’s Team Management feature allows you to invite multiple members of your team to share an organizational-level Fauna account and assign them different roles (admin, billing developer).

Fauna のチーム管理機能では、組織レベルの Fauna アカウントを共有するためにチームの複数のメンバーを招待し、それぞれに異なる役割（管理者、課金開発者）を割り当てることができます。

NOTE
The Fauna Team Management feature is not be available in all pricing tiers. Learn more on our [pricing page](https://fauna.com/pricing).

注記
Fauna のチーム管理機能は、すべての価格帯で利用できるわけではありません。詳しくは[価格ページ](https://fauna.com/pricing)をご覧ください。

## [](#teams)Inviting team members

チームメンバーの招待

1.  Click the user icon in the upper right, then **Account settings** in the dropdown, then **Team management** in the left sidebar.

右上のユーザーアイコンをクリックし、ドロップダウンの**アカウント設定**、左サイドバーの**チーム管理**の順にクリックします。

    ![The team management screen Fauna Dashboard](https://docs.fauna.com/fauna/current/integrations/dashboard/teams../_images/screen-dashboard-settings-team_management.png)

    ![チーム管理画面 Fauna Dashboard](https://docs.fauna.com/fauna/current/integrations/dashboard/teams../_images/screen-dashboard-settings-team_management.png)

2.  Enter the team member’s email address. If the email address is already associated with a Fauna account, the error "Member is already registered in another account" is displayed. You can either:

チームメンバーのEメールアドレスを入力します。メールアドレスがすでにFaunaアカウントに関連付けられている場合は、「メンバーはすでに別のアカウントに登録されています」というエラーが表示されます。次のいずれかを実行します。

    1.  Ask the team member to change the email address associated with their existing Fauna account.

チームメンバーに、既存のFaunaアカウントに登録されているメールアドレスの変更を依頼する。

    2.  If the team member’s email address is hosted with Gmail/G Suite or Outlook/Office 365, create a unique alias address by appending `+<team name>` to the username. For example, if the email address is `username@gmail.com`, and your team name is "Project1", invite `username+project1@gmail.com`.

チームメンバーのメールアドレスがGmail/G SuiteまたはOutlook/Office 365でホストされている場合、ユーザー名に「+<チーム名>」を付加して固有のエイリアスアドレスを作成する。例えば、メールアドレスが `username@gmail.com` で、チーム名が "Project1" の場合、`username+project1@gmail.com` を招待します。

3.  Grant the user an admin, billing, or developer role. See the [next section](#team-roles).

ユーザーに管理者、課金者、開発者のいずれかの役割を与える。次のセクション](#team-roles)を参照してください。

4.  Once a team member has accepted your invitation, their status changes from "Invited" to "Active".

チームメンバーが招待を承認すると、ステータスが "Invited "から "Active "に変わります。

5.  You can revoke access, or resend an invitation, by clicking the vertical ellipsis to the right of the team member’s status.

チームメンバーのステータスの右にある縦の省略記号をクリックすると、アクセス権を取り消したり、招待状を再送することができます。

## [](#team-roles)Team roles

チームの役割

The following table provides a more detailed breakdown of the permissions available to each role, including permissions that users have only for themselves:

次の表は、ユーザーが自分自身に対してのみ持つ権限を含む、各ロールで利用可能な権限のより詳細な内訳を示しています。

|Action | Owner | Admin | Billing | Developer | User only\[[1](#_footnotedef_1 "View footnote.")\] | 
| -- | :--: |:--: |:--: |:--: |:--: |
|View other team members'email addresses,<br>roles, and invited/active status | ✓ | ✓ | ✓ | ✓ | ✓ | 
|View, create, edit, <br>and delete databases and data | ✓ | ✓ |  | ✓ | 
|Invite new team members | ✓ | ✓ | 
|Edit team’s company name,<br>website, and main contact | ✓ | ✓ | 
|Add and update payment methods | ✓ |  | ✓ | 
|Upgrade plans | ✓ |  | ✓ | 
|View invoices | ✓ |  | ✓ | 
|Edit a user’s name,<br>email address, or password |  |  |  |  | ✓ | 
|Require MFA |  |  |  |  | ✓ | 

---

|Action|Owner|Admin|Billing|Developer|User only[[1](#_footnotedef_1 "View footnote.")]|
| -- | :--: |:--: |:--: |:--: |:--: |
|他のチームメンバーの電子メールアドレス、<br>役割、招待、アクティブの状態を表示 | ✓ | ✓ | ✓ | ✓ | ✓ | 
|データベースやデータの表示、<br>作成、編集、削除を行う | ✓ | ✓ |  | ✓ | 
|新しいチームメンバーを招待する | ✓ | ✓ | 
|チームの会社名、ウェブサイト、<br>主な連絡先の編集  | ✓ | ✓ | 
|支払い方法の追加と更新  | ✓ |  | ✓ | 
|プランのアップグレード  | ✓ |  | ✓ | 
|請求書の表示  | ✓ |  | ✓ | 
|ユーザーの名前、電子メールアドレス、<br>またはパスワードの編集  |  |  |  |  | ✓ | 
|MFA を要求 |  |  |  |  | ✓ | 

[1](#_footnoteref_1). Not a role, just permissions that users have only for themselves.

ロールではなく、ユーザーが自分自身のためだけに持つパーミッションです。

