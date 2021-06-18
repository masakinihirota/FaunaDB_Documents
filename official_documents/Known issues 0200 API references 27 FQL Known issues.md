Known issues | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/known_issues


# Known issues

This page describes issues where FQL functions do not behave as intended in various situations. These are all issues that we intend to fix, but the solutions may take some time.

## [](#dates-and-times)Dates and Times

-   We claim support for ISO 8601 time and date formats, but the library that we use does not, in fact, support all variations of ISO 8601.
    

## [](#sets)Sets

-   The [`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join) function does not behave well with reversed indexes. You might try using [`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union) instead.
    
-   When you attempt to [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate) a set composed with one (or more) of the set functions, such as [`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection), an estimator uses the page size to guess how many items to fetch from the set for manipulation. When the page size is too small to reach far enough into the set, the result may contain far fewer entries than expected. Increasing the page size can often improve the results.
    

---


# 既知の問題点

このページでは、さまざまな状況でFQL関数が意図したとおりに動作しない問題について説明します。これらはすべて修正する予定の問題ですが、解決には時間がかかる場合があります。

## [](#dates-and-times)日付と時刻

-   ISO 8601の時刻と日付の形式のサポートを主張していますが、実際、使用しているライブラリはISO8601のすべてのバリエーションをサポートしているわけではありません。
    

## [](#sets)セット

-   この[`Join`](https://docs.fauna.com/fauna/current/api/fql/functions/join)関数は、逆インデックスでは適切に動作しません。[`Union`](https://docs.fauna.com/fauna/current/api/fql/functions/union)代わりに使用してみてください。
    
-   などの[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)1つ（または複数）の集合関数で構成される集合を試行する[`Intersection`](https://docs.fauna.com/fauna/current/api/fql/functions/intersection)と、推定器はページサイズを使用して、操作のために集合からフェッチする項目の数を推測します。ページサイズが小さすぎてセットに十分に到達できない場合、結果には予想よりもはるかに少ないエントリが含まれる可能性があります。多くの場合、ページサイズを大きくすると、結果が向上します。
    


