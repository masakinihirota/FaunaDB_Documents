Driver version strategy | Fauna Documentation
https://docs.fauna.com/fauna/current/drivers/versioning

# Driver version strategy

This section describes the versioning strategy for the Fauna drivers, and what that means for your applications.

このセクションでは、Fauna ドライバのバージョニング戦略と、それがアプリケーションに与える影響について説明します。

Each driver release may differ from previous versions in both function output and behavior. It is important to test your application in a QA environment before deploying driver updates to production.

各ドライバーのリリースは、機能出力と動作の両方において、以前のバージョンと異なる場合があります。ドライバのアップデートを本番環境に導入する前に、QA環境でアプリケーションをテストすることが重要です。

## [](#stable-releases)Stable releases

安定したリリース

Beginning with the version 3 release of Fauna drivers, each release with a whole number is a new, stable feature release. Such releases include production-ready features and fixes from previous releases.

Fauna ドライバのバージョン 3 リリースから、整数の付いた各リリースは新しい安定した機能のリリースとなります。このようなリリースには、製品版に対応した機能や以前のリリースでの修正が含まれます。

## [](#point-releases)Point releases

ポイントリリース

Bug fixes, or improvements that do not affect the behavior of Fauna queries, may be required from time to time, and may be driver-specific. For example, there might be a JavaScript 3.1 driver, and a Go 3.4 driver. Point releases are also considered stable, but typically do not introduce any new features.

バグ修正や、Fauna クエリの動作に影響を与えない改善が必要になることがありますが、これはドライバ固有のものである可能性があります。たとえば、JavaScript 3.1 のドライバと Go 3.4 のドライバがある場合などです。ポイントリリースも安定していると考えられますが、通常は新しい機能は導入されません。

## [](#preview-releases)Preview releases

プレビューリリース

Upcoming features are provided in _preview_ releases, where the version is a higher whole number than the current stable release and has the `-preview` suffix. As preview releases contain in-development functionality (which may not work at all), preview releases should only be used for testing, or in non-production application environments. There is no guarantee that any feature in a preview release would remain unchanged for the next stable release.

今後の機能は _preview_ リリースで提供されます。バージョンは現在の安定版リリースよりも高い整数で、接尾辞は `-preview` です。プレビューリリースには開発中の機能が含まれているため（まったく動作しない可能性もあります）、プレビューリリースはテスト用として、または本番ではないアプリケーション環境でのみ使用してください。また、プレビューリリースに含まれる機能が、次の安定版リリースでも変更されないという保証はありません。

Preview releases might occur with some regularity, but do not expect any particular schedule.

プレビューリリースはある程度定期的に行われる可能性がありますが、特定のスケジュールを期待しないでください。

## [](#backwards-compatibility)Backwards compatibility

後方互換性

As of API version 3, each driver sends its API version to the Fauna server with each query. The server guarantees that each supported API version behaves as initially released. For example, if an existing function requires a behavior change in, say, the version 4 release, queries using version 3 drivers continue to execute with unchanged behavior.

APIバージョン3では、各ドライバはクエリごとにAPIバージョンをFaunaサーバに送信します。サーバは、サポートされている各APIバージョンが当初のリリース通りに動作することを保証します。例えば、既存の機能が、例えばバージョン4のリリースで動作の変更を必要とする場合、バージョン3のドライバーを使用したクエリは、変更されない動作で実行され続けます。

For drivers older than API version 3 which do not specify their API version, the default API version is 2.12.

APIバージョンを指定していないAPIバージョン3より古いドライバの場合、デフォルトのAPIバージョンは2.12となります。

## [](#deprecations)Deprecations

非推奨事項

Over time, specific API versions may need to be deprecated. All functionality and behavior within an API version continues to function until the entire version has been deprecated and removed. We aim to provide deprecation notification for at least one year prior to removal of an API version. Known deprecations and their termination schedule are provided in the [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations) section.

時間の経過とともに、特定のAPIバージョンが非推奨となる場合があります。あるAPIバージョンのすべての機能と動作は、そのバージョン全体が廃止されて削除されるまで継続して機能します。APIバージョンが削除される少なくとも1年前から非推奨の通知を提供することを目指しています。既知の非推奨事項とその終了予定は、[非推奨事項](https://docs.fauna.com/fauna/current/api/fql/deprecations)のセクションに記載されています。

