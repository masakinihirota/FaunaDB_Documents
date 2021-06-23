

DESC（SQLのコマンドの場合）
指定した表、ビューまたはシノニムの列定義を表示したり、指定したファンクションまたはプロシージャの仕様を表示します。


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

## [](#data-definition-language)Data definition language

データ定義言語

**CREATE DATABASE**

データベースの作成

In some relational databases, like MySQL, a database can be created with:

MySQLなどの一部のリレーショナルデータベースでは、データベースは次の方法で作成できます。

```sql
CREATE DATABASE employees;
```


**CREATE TABLE**

テーブル作成

```sql
CREATE TABLE dept(
  deptno   NUMBER(2,0),
  dname   VARCHAR2(14),
  loc     VARCHAR2(13),
  CONSTRAINT pk_dept PRIMARY KEY (deptno)
)
```


**ALTER TABLE ADD COLUMN**

テーブル構造を変更する

```sql
ALTER TABLE dept ADD (zip NUMBER);
```





**TRUNCATE TABLE**

切り捨てテーブル

In SQL, `truncate` removes all records, but preserves the structure of the table.

SQLでは、truncateすべてのレコードを削除しますが、テーブルの構造は保持します。

```sql
TRUNCATE TABLE dept;
```



**DROP TABLE**

ドロップテーブル

```sql
DROP TABLE dept;
```




## [](#data-manipulation-language)Data manipulation language

データ操作言語

**INSERT RECORD**

レコードを挿入

```sql
INSERT INTO dept (deptno, dname, loc)
  VALUES (10, "ACCOUNTING", "NEW YORK");
```


**UPDATE**

更新

```sql
UPDATE dept SET loc = "AUSTIN"
  WHERE deptno = 10;
```


**DELETE**

削除

```sql
DELETE FROM dept WHERE deptno = 10;
```


---

## [](#query)Query

クエリ

**SELECT: ALL ROWS**

選択：すべての行

```sql
SELECT * FROM dept;
```





**SELECT: Based on a single Parameter**

SELECT：単一のパラメーターに基づく

```sql
SELECT * FROM dept WHERE deptno = 10;
```






**SELECT: Based on a single Parameter with a NOT**

SELECT：NOTを含む単一のパラメーターに基づく

```sql
SELECT * FROM dept WHERE deptno != 10;
```






**SELECT: Based on a condition**

選択：条件に基づく

```sql
SELECT * FROM emp WHERE sal >= 2000
```





**SELECT: GROUP BY**

選択：GROUP BY

Query to select the maximum salary by department

部門ごとの最大給与を選択するためのクエリ

```sql
SELECT MAX(sal), deptno FROM emp GROUP BY deptno;
```







**EQUI-JOIN two tables**

2つのテーブルをEQUI-JOINする

```sql
SELECT e.* FROM emp e, dept d
 WHERE e.deptno = d.deptno
   AND d.dname = "SALES";
```





