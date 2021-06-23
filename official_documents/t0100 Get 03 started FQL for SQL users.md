Fauna Query Language for SQL users | Fauna Documentation
https://docs.fauna.com/fauna/current/start/fql_for_sql_users

# Fauna Query Language for SQL users

SQLユーザー向けのFaunaクエリ言語

This section describes a number of common structured query language (SQL) queries and their Fauna Query Language (FQL) equivalents.

このセクションでは、いくつかの一般的な構造化照会言語（SQL）照会と、それに相当するFauna照会言語（FQL）について説明します。

While it is almost impossible to provide an exhaustive comparison of every variation of all SQL commands, we provide a very basic comparison of the most used [DDL](#data-definition-language) (Data Definition Language) and [DML](#data-manipulation-language) (Data Manipulation Language) queries. As you gain more experience with the Fauna Query Language, the ease and power of its syntax should become evident. Complex queries that are difficult, or even impossible, in SQL can be composed very easily in FQL. One very important difference between the two is that FQL is not a declarative language as SQL. Hence the actual path of execution needs to be provided for each query — FQL requires the developer to specify an index in most queries.

すべてのSQLコマンドのすべてのバリエーションを網羅的に比較することはほとんど不可能ですが、ここでは最もよく使われる[DDL](#data-definition-language)(Data Definition Language)と[DML](#data-manipulation-language)(Data Manipulation Language)のクエリの基本的な比較を行います。Fauna Query Languageを使いこなすうちに、その構文の簡単さと力強さがわかってくるはずです。SQLでは難しい、あるいは不可能な複雑なクエリでも、FQLでは非常に簡単に構成できます。2つの言語の非常に重要な違いは、FQLはSQLのような宣言型言語ではないということです。したがって、実際の実行経路を各クエリに提供する必要があります。FQLでは、ほとんどのクエリで開発者がインデックスを指定する必要があります。



[DDL](#data-definition-language)
-   [CREATE DATABASE](#create-database)
-   [CREATE TABLE](#create-table)
-   [ALTER TABLE](#alter-table)
-   [TRUNCATE TABLE](#truncate-table)
-   [DROP TABLE](#drop-table)

[DML](#data-manipulation-language)
-   [INSERT](#insert)
-   [UPDATE](#update)
-   [DELETE](#delete)

[Query](#query)
-   [SELECT ALL](#select-all)
-   [SELECT WHERE](#select-where)
-   [SELECT WHERE NOT](#select-not)
-   [SELECT WHERE CONDITION](#select-condition)
-   [SELECT GROUP BY](#select-groupby)
-   [SELECT JOIN](#join)

DDL
データ定義言語
データベースの作成
CREATE TABLE
他の机
切り捨てテーブル
ドロップテーブル

DML
データ操作言語
インサート
更新
削除

クエリ
すべて選択
場所を選択
選択しない場所
WHERECONDITIONを選択
GROUPBYを選択
参加を選択

## [](#conceptual-equivalents)Conceptual equivalents

概念上の同等物

|Relational|Fauna|
| ---- | ---- |
|Schema|Database|
|Table|Collection|
|Row|Document|
|Index/Materialized Views|Index|

|リレーショナル・データベース|Fauna・データベース|
| ---- | ---- |
|スキーマ|データベース|
|テーブル|コレクション|
|行|ドキュメント|
|インデックス/マテリアライズドビュー|インデックス|

In these examples below, we use two tables, `dept` (departments) and `emp` (Employees) to compare basic operations in both query languages. These tables have been extensively used in Oracle documentation to explain various SQL basics.

以下のこれらの例では、dept（ departments 部門 ）と emp（ Employees 従業員 ）の2つのテーブルを使用して、両方のクエリ言語の基本的な操作を比較しています。これらのテーブルは、さまざまなSQLの基本を説明するためにOracleのドキュメントで広く使用されています。

DESC（SQLのコマンドの場合）
指定した表、ビューまたはシノニムの列定義を表示したり、指定したファンクションまたはプロシージャの仕様を表示します。

DESC（ORDEY BYで指定の場合）
降順でソート

ASC（ORDEY BYで指定の場合）
昇順でソート

```sql
SQL> DESC emp
 Name                         Null?         Type
 ----------------------------------------- --------
 EMPNO                      NOT NULL       NUMBER(4)
 ENAME                                     VARCHAR2(10)
 JOB                                       VARCHAR2(9)
 MGR                                       NUMBER(4)
 HIREDATE                                  DATE
 SAL                                       NUMBER(7,2)
 COMM                                      NUMBER(7,2)
 DEPTNO                                    NUMBER(2)
```

```sql
SQL> DESC dept
 Name                         Null?         Type
 ----------------------------------------- --------
 DEPTNO                     NOT NULL       NUMBER(2)
 DNAME                                     VARCHAR2(14)
 LOC                                       VARCHAR2(13)
 ZIP                                       NUMBER
```

---

FQLコマンドはこちらへ移動
t0100 Get 03 started FQL.md

SQLコマンドはこちらへ移動
t0100 Get 03 started SQL.md

