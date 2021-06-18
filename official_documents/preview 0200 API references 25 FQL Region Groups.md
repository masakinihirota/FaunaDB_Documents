Region Groups (preview) | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/region_groups



# Region Groups

Region Groups is a "technology preview" feature. It is only available in the Fauna Preview environment for testing purposes. Access to the Preview environment is by invitation only.

To request an invitation, contact: [product@fauna.com](mailto:product@fauna.com)

If you’d prefer to discuss Region Groups with our team, you can [schedule a call here](https://calendly.com/bryan-reinero/user-feedback-session).

If you have access to the Preview environment, do not use it for production workloads. However, do test Region Groups to see if it supports workloads that you might run in production.

Fauna operates as a multi-cloud service, running on infrastructure from Amazon Web Services, and Google Cloud Platform. Up until now, Fauna has provided "global" replication of transactions and database data by operating in multiple US and EU regions. There are two concerns with this arrangement:

-   There has been no way to specify where data should reside, to adhere to data sovereignty concerns.
    
-   The speed of light imposes an observable floor for transactional writes.
    

Region Groups are designed to improve both concerns:

-   Region Groups provide control over where your data resides: each database, its storage, and its compute services would exist in a specific geographic region.
    
-   The nodes in a Region Group are physically located (relatively speaking) close together, which reduces the round-trip time to acknowledge consistent writes (compared to global replication), improving performance for many workloads.
    

## [](#features)Features

-   Your account can have as many databases as it needs.
    
-   Each database can be in a specific Region Group.
    
-   When a database is in a Region Group, it is fully isolated from other Region Groups, and is never replicated to other Region Groups.
    

## [](#limitations)Limitations

-   A database and all of its contents, including child databases, can only exist in a single Region Group.
    
-   There is no way to directly transfer a database from one Region Group to another. You would need to implement your own logic to export the documents from one database and import those documents into another.
    
-   During the technology preview, you can create databases in the Europe, United States, and Global Region Groups.
    

## [](#how-to-use-region-groups)How to use Region Groups

1.  Use the credentials provided in your invitation to access the Preview environment’s Dashboard.
    
2.  Sign up with your email address.
    
3.  Create a new database:
    
    ![The Preview Dashboard’s New Database screen, feature the Region Group selector](https://docs.fauna.com/fauna/current/api/fql/region_groups../_images/screen-region_groups-create_database.png)
    
    1.  Specify a name for your database.
        
    2.  Select a Region Group to contain your database.
        
    3.  Optional: check the **Pre-populate with demo data** checkbox to create some data within the database.
        
    4.  Click **SAVE**.
        
    
4.  Click **HOME** to view the overview of your databases:
    
    ![The Preview Dashboard’s home page, showing databases and their Region Groups](https://docs.fauna.com/fauna/current/api/fql/region_groups../_images/screen-region_groups-database_overview.png)
    
    Notice that the database summary includes a Region Group column to help identify each database’s region group.
    
5.  Update your client applications to use the connection details for the Preview environment.
    
      
    
    Production
    
    Preview
    
    Dashboard
    
    [Fauna Dashboard](https://dashboard.fauna.com/)
    
    [Fauna Preview Dashboard](https://dashboard.fauna-preview.com/)
    
    Connection `domain`
    
    `db.fauna.com`
    
    `db.fauna-preview.com`
    
6.  Run your client applications!
    

## [](#feedback)Feedback

If you are using Region Groups, contact [support@fauna.com](mailto:support@fauna.com).



----------------------------------------------------------------

# 地域グループ

リージョングループは「テクノロジープレビュー」機能です。これは、テスト目的で動物相プレビュー環境でのみ使用できます。プレビュー環境へのアクセスは招待制です。

招待状をリクエストするには、[product @ fauna.com](mailto:product@fauna.com)までご連絡ください[。](mailto:product@fauna.com)

リージョングループについて私たちのチームと話し合いたい場合は[、ここで電話](https://calendly.com/bryan-reinero/user-feedback-session)を[スケジュール](https://calendly.com/bryan-reinero/user-feedback-session)でき [ます](https://calendly.com/bryan-reinero/user-feedback-session)。

プレビュー環境にアクセスできる場合は、実稼働ワークロードには使用しないでください。ただし、リージョングループをテストして、本番環境で実行する可能性のあるワークロードをサポートしているかどうかを確認してください。

Faunaは、Amazon WebServicesおよびGoogleCloudPlatformのインフラストラクチャで実行されるマルチクラウドサービスとして動作します。これまで、Faunaは、米国とEUの複数の地域で事業を展開することにより、トランザクションとデータベースデータの「グローバル」レプリケーションを提供してきました。この配置には2つの懸念があります。

-   データの主権の懸念を遵守するために、データが存在する場所を指定する方法はありませんでした。
    
-   光の速度は、トランザクション書き込みのために観察可能なフロアを課します。
    

リージョングループは、次の両方の懸念を改善するように設計されています。

-   リージョングループは、データが存在する場所を制御します。各データベース、そのストレージ、およびそのコンピューティングサービスは、特定の地理的リージョンに存在します。
    
-   リージョングループ内のノードは物理的に（比較的）近くに配置されているため、（グローバルレプリケーションと比較して）一貫した書き込みを確認するためのラウンドトリップ時間が短縮され、多くのワークロードのパフォーマンスが向上します。
    

## [](#features)特徴

-   アカウントには、必要な数のデータベースを含めることができます。
    
-   各データベースは、特定のリージョングループに含めることができます。
    
-   データベースがリージョングループにある場合、データベースは他のリージョングループから完全に分離され、他のリージョングループに複製されることはありません。
    

## [](#limitations)制限事項

-   データベースとそのすべてのコンテンツ（子データベースを含む）は、単一のリージョングループにのみ存在できます。
    
-   あるリージョングループから別のリージョングループにデータベースを直接転送する方法はありません。あるデータベースからドキュメントをエクスポートし、それらのドキュメントを別のデータベースにインポートするには、独自のロジックを実装する必要があります。
    
-   テクノロジーのプレビュー中に、ヨーロッパ、米国、およびグローバルリージョングループでデータベースを作成できます。
    

## [](#how-to-use-region-groups)リージョングループの使用方法

1.  招待状に記載されている資格情報を使用して、プレビュー環境のダッシュボードにアクセスします。
    
2.  あなたのメールアドレスでサインアップしてください。
    
3.  新しいデータベースを作成します。
    
    ![プレビューダッシュボードの[新しいデータベース]画面には、リージョングループセレクターがあります](https://docs.fauna.com/fauna/current/api/fql/region_groups../_images/screen-region_groups-create_database.png)
    
    1.  データベースの名前を指定します。
        
    2.  データベースを含めるリージョングループを選択します。
        
    3.  オプション：データベース内にデータを作成するには**、\[デモデータを事前入力する\]**チェックボックスを**オン**にします。
        
    4.  \[**保存\]を**クリックします。
        
    
4.  \[**ホーム\]**をクリックして、データベースの概要を表示します。
    
    ![データベースとそのリージョングループを表示するプレビューダッシュボードのホームページ](https://docs.fauna.com/fauna/current/api/fql/region_groups../_images/screen-region_groups-database_overview.png)
    
    データベースの概要には、各データベースの地域グループを識別するのに役立つ地域グループ列が含まれていることに注意してください。
    
5.  プレビュー環境の接続の詳細を使用するようにクライアントアプリケーションを更新します。
    
      
    
    製造
    
    プレビュー
    
    ダッシュボード
    
    [動物相ダッシュボード](https://dashboard.fauna.com/)
    
    [動物相プレビューダッシュボード](https://dashboard.fauna-preview.com/)
    
    接続 `domain`
    
    `db.fauna.com`
    
    `db.fauna-preview.com`
    
6.  クライアントアプリケーションを実行してください！
    

## [](#feedback)フィードバック

リージョングループを使用している場合は、[support @ fauna.comにお問い合わせください](mailto:support@fauna.com)。
