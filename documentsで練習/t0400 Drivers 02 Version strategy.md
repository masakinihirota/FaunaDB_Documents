Driver version strategy | Fauna Documentation
https://docs.fauna.com/fauna/current/drivers/versioning

# Driver version strategy

This section describes the versioning strategy for the Fauna drivers, and what that means for your applications.

このセクションでは、Faunaドライバーのバージョン管理戦略と、それがアプリケーションにとって何を意味するかについて説明します。

Each driver release may differ from previous versions in both function output and behavior. It is important to test your application in a QA environment before deploying driver updates to production.

重要
各ドライバーリリースは、関数の出力と動作の両方で以前のバージョンと異なる場合があります。ドライバーの更新を本番環境にデプロイする前に、QA環境でアプリケーションをテストすることが重要です。

## [](#stable-releases)Stable releases

安定したリリース

Beginning with the version 3 release of Fauna drivers, each release with a whole number is a new, stable feature release. Such releases include production-ready features and fixes from previous releases.

Faunaドライバーのバージョン3リリース以降、整数の各リリースは、新しい安定した機能リリースです。このようなリリースには、本番環境に対応した機能と以前のリリースからの修正が含まれています。

## [](#point-releases)Point releases

ポイントリリース

Bug fixes, or improvements that do not affect the behavior of Fauna queries, may be required from time to time, and may be driver-specific. For example, there might be a JavaScript 3.1 driver, and a Go 3.4 driver. Point releases are also considered stable, but typically do not introduce any new features.

バグ修正、または動物相クエリの動作に影響を与えない改善は、時々必要になる場合があり、ドライバー固有の場合があります。たとえば、JavaScript3.1ドライバーとGo3.4ドライバーがあるとします。ポイントリリースも安定していると見なされますが、通常、新しい機能は導入されていません。

## [](#preview-releases)Preview releases

プレビューリリース

Upcoming features are provided in _preview_ releases, where the version is a higher whole number than the current stable release and has the `-preview` suffix. As preview releases contain in-development functionality (which may not work at all), preview releases should only be used for testing, or in non-production application environments. There is no guarantee that any feature in a preview release would remain unchanged for the next stable release.

今後の機能はプレビューリリースで提供され、バージョンは現在の安定版リリースよりも整数が大きく、-preview接尾辞が付いてい ます。プレビューリリースには開発中の機能が含まれているため（まったく機能しない場合があります）、プレビューリリースはテストまたは非実稼働アプリケーション環境でのみ使用する必要があります。プレビューリリースの機能が次の安定版リリースで変更されないという保証はありません。

Preview releases might occur with some regularity, but do not expect any particular schedule.

プレビューリリースは一定の規則性で発生する可能性がありますが、特定のスケジュールは期待していません。

## [](#backwards-compatibility)Backwards compatibility

下位互換性

As of API version 3, each driver sends its API version to the Fauna server with each query. The server guarantees that each supported API version behaves as initially released. For example, if an existing function requires a behavior change in, say, the version 4 release, queries using version 3 drivers continue to execute with unchanged behavior.

APIバージョン3以降、各ドライバーはクエリごとにAPIバージョンをFaunaサーバーに送信します。サーバーは、サポートされている各APIバージョンが最初にリリースされたとおりに動作することを保証します。たとえば、既存の関数でバージョン4リリースなどの動作の変更が必要な場合、バージョン3ドライバーを使用したクエリは変更されていない動作で実行され続けます。

For drivers older than API version 3 which do not specify their API version, the default API version is 2.12.

APIバージョンを指定しないAPIバージョン3より古いドライバーの場合、デフォルトのAPIバージョンは2.12です。

## [](#deprecations)Deprecations

非推奨

Over time, specific API versions may need to be deprecated. All functionality and behavior within an API version continues to function until the entire version has been deprecated and removed. We aim to provide deprecation notification for at least one year prior to removal of an API version. Known deprecations and their termination schedule are provided in the [Deprecations](https://docs.fauna.com/fauna/current/api/fql/deprecations) section.

時間の経過とともに、特定のAPIバージョンを非推奨にする必要がある場合があります。APIバージョン内のすべての機能と動作は、バージョン全体が非推奨になり削除されるまで機能し続けます。APIバージョンを削除する前に、少なくとも1年間は廃止通知を提供することを目指しています。既知の非推奨とその終了スケジュールは、「非推奨」セクションに記載されています。

