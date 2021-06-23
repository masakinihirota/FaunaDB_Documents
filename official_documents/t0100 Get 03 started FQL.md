

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

Fauna is a multi-tenant database and databases can be created like a nested tree.

Faunaはマルチテナントデータベースであり、データベースはネストされたツリーのように作成できます。

```shell
CreateDatabase({name: "employees"})
```
















**CREATE COLLECTION**

コレクションを作成する

shell

```shell
CreateCollection({name: "dept"});
```

Fauna doesn’t enforce the structure of a collection at the time of creation. However, if we know that every document in this collection should have a `deptno` field, we can create a unique index on the `deptno` field which emulates a relational database’s primary key.

Faunaは、作成時にコレクションの構造を強制しません。ただし、このコレクション内のすべてのドキュメントにdeptnoフィールドが必要であることがわかっている場合はdeptno、リレーショナルデータベースの主キーをエミュレートする一意のインデックスをフィールドに作成できます 。

shell

```shell
CreateIndex({
  name:   "dept_by_deptno",
  source: Collection("dept"),
  terms:  [{ field: [ "data", "deptno" ] }],
  unique: true
})
```




**No direct correlation**

直接的な相関関係はありません

As documents do not have a predefined schema, there is no straightforward equivalent to adding a term (equivalent to a column) to all documents without any values. The Fauna equivalent would be to run `Update` on the document.

ドキュメントには事前定義されたスキーマがないため、値のないすべてのドキュメントに用語（列に相当）を追加することに相当する簡単な方法はありません。Faunaに相当するものUpdateは、ドキュメント上で実行すること です。

shell

```shell
Update(
  Ref(Collection("dept"), "224507299921658368"),
  { data: { zip: 10001 } }
)
```


**DELETE DOCUMENTS**

ドキュメントを削除する

In FQL, the equivalent would be to delete all records from the table.

FQLでは、テーブルからすべてのレコードを削除するのと同じです。

shell

```shell
Map(
  Paginate(
    Match(Index("all_depts"))
  ),
  Lambda("X", Delete(Var("X")))
)
```

The `all_depts` index is a collection index that indexes the entire collection.

all_deptsインデックスは、インデックス全体コレクションコレクションインデックスです。

shell

```shell
CreateIndex({
  name: "all_depts",
  source: Collection("dept")
})
```


**DELETE COLLECTIONS and INDEXES**

コレクションとインデックスを削除する

The `Delete` command can be used to remove tables and indexes. Unlike in SQL, dropping a table doesn’t remove the underlying indexes automatically. The indexes need to be removed manually.

このDeleteコマンドを使用して、テーブルとインデックスを削除できます。SQLとは異なり、テーブルを削除しても、基になるインデックスは自動的に削除されません。インデックスは手動で削除する必要があります。

Delete a Collection

削除 コレクション

shell

```shell
Delete(Collection("dept"))
```

Delete an Index

削除 インデックス

shell

```shell
Delete(Index("all_depts"))
```



**CREATE DOCUMENT**

ドキュメントを作成する

shell

```shell
Create(
  Collection("dept"),
  {
    data: {
      "deptno": 10,
      "dname": "ACCOUNTING",
      "loc": "NEW YORK"
    }
  }
)
```



**UPDATE**

更新

shell

```shell
Update(
  Select("ref",
    Get(
      Match(Index("dept_by_deptno"), 10)
    )
  ),
  {
    data: { loc: "AUSTIN" }
  }
)
```

Running the `Replace` command on an entire document is also a form of `Update`. This is similar to a `Delete` followed by an `Insert`.

Replaceドキュメント全体でコマンドを実行することも、の形式です Update。これは、Deleteその後にInsert。が続くのと似ています。

shell

```shell
Replace(
  Ref(Collection("dept"), "224572974137606656"),
  {
    data: {
      "deptno": 10,
      "dname": "ACCOUNTING",
      "loc":   "AUSTIN"
    }
  }
)
```


**DELETE**

削除

You can use the reference as the key to delete a specific record.

参照をキーとして使用して、特定のレコードを削除できます。

shell

```shell
Delete(
  Ref(Collection("dept"), "224532222499095041")
)
```

Alternatively, you can delete a record based on a specific index column.

または、特定のインデックス列に基づいてレコードを削除することもできます。

shell

```shell
Delete(
  Select(
    "ref",
    Get(
      Match(Index("dept_by_deptno"), 10)
    )
  )
)
```

---

## [](#query)Query

クエリ





**GET ALL DOCUMENTS**

すべてのドキュメントを入手する

Just like in relational databases, selecting all documents from a collection results in a full scan. In SQL, the server automatically selects the appropriate indexes based on the specified columns. In Fauna, indexes must be specified explicitly.

リレーショナルデータベースの場合と同様に、コレクションからすべてのドキュメントを選択すると、フルスキャンが実行されます。SQLでは、サーバーは指定された列に基づいて適切なインデックスを自動的に選択します。Faunaでは、インデックスを明示的に指定する必要があります。

You need a collection index to run a full scan:

フルスキャンを実行するには、コレクションインデックスが必要です。

shell

```shell
CreateIndex({
  name: "all_depts",
  source: Collection("dept")
})
```

Once the index is in place, run the query below.

インデックスを作成したら、以下のクエリを実行します。

shell

```shell
Map(
  Paginate(
    Match(Index("all_depts"))
  ),
  Lambda("X", Get(Var("X")))
)
```





**GET: Based on a single Parameter**

GET：単一のパラメーターに基づく

We can use the unique index we created earlier to enforce the primary key.

以前に作成した一意のインデックスを使用して、主キーを適用できます。

shell

```shell
Map(
  Paginate(
    Match(Index("dept_by_deptno"), 10)
  ),
  Lambda("X", Get(Var("X")))
)
```


**GET: Based on a single Parameter with a NOT**

GET：NOTを含む単一のパラメーターに基づく

Unlike SQL, we create this list as a difference between two indexes, the collection index and the unique index on the `deptno`.

SQLとは異なり、このリストは、コレクションインデックスとの一意のインデックスという2つのインデックスの違いとして作成されますdeptno。

shell

```shell
Map(
  Paginate(
    Difference(
      Match(Index("all_depts")),
      Match(Index("dept_by_deptno"), 10)
    )
  ),
  Lambda("x", Get(Var("x")))
)
```



**GET: Based on a condition**

GET：条件に基づく

In order to accomplish this, we need an index on the `sal` term along with the Refs that point to the location of each document.

これを実現するにはsal、各ドキュメントの場所を指す参照とともに、用語のインデックスが必要です。

shell

```shell
CreateIndex({
  name: "emp_by_sal",
  source: Collection("emp"),
  values: [
    {field: ["data", "sal"]},
    {field: ["ref"]}
  ],
})
```

After the index has built, we can get the results with:

インデックスが作成されたら、次の結果を取得できます。

shell

```shell
Map(
  Paginate(
    Match(Index("emp_by_sal")),
    { after: 2000 }
  ),
  Lambda("x", Get(Select(1, Var("x"))))
)
```

Observe the Lambda function. The `Select` command gets the Ref fields, and then passes them to the `Get` command. Alternatively, we could have used `Lambda(["sal", "ref"], Get(Var("ref")))` as we know the index returns two different values.

Lambda関数を観察します。Selectコマンドは、REFフィールドを取得し、その後に渡すGetコマンド。あるいは、Lambda(["sal", "ref"], Get(Var("ref")))インデックスが2つの異なる値を返すことがわかっているので、を使用することもできます。

The `after` parameter is inclusive.

afterパラメータは、包括的です。






**GET: Grouped documents**

GET：グループ化されたドキュメント

FQL can accomplish such queries using two indexes, the first on `deptno` and the second on `deptno` and `salary`.

FQLは、2つのインデックス（最初のオンdeptno と2番目のオンdeptnoと）を使用してこのようなクエリを実行できますsalary。

shell

```shell
CreateIndex({
  name: "emp_by_deptno",
  source: Collection("emp"),
  values: [{ field: ["data","deptno"] }]
})
```

shell

```shell
CreateIndex({
  name: "deptno_by_sal",
  source: Collection("emp"),
  terms: [{ field: ["data","deptno"] }],
  values: [{ field: ["data","sal"] }]
})
```

The second index `deptno_by_sal` stores the values sorted by `sal` within each `deptno` group. Since `Get()` returns the first element that matches the index, it returns the maximum value of `sal`.

2番目のインデックスdeptno_by_salは、sal 各deptnoグループ内でソートされた値を格納します。以来、Get()リターンインデックスに一致する最初の要素は、の最大値を返しますsal。

shell

```shell
Map(
  Paginate(
    Distinct(
      Match(Index("emp_by_deptno"))
    )
  ),
  gid => Get(
    Match(Index("deptno_by_sal"), Gid)
  )
)
```




**GET documents joined by two collections**

2つのコレクションで結合されたドキュメントを取得する

We need two indexes to accomplish this join in FQL. When we JOIN two collections, the value of one index is joined to the term of another index.

FQLでこの結合を実行するには、2つのインデックスが必要です。2つのコレクションを結合すると、1つのインデックスの値が別のインデックスの用語に結合されます。

Index #1 (Collection: Dept, Term: dname, Value: deptno)

インデックス ＃1（コレクション：部門、用語：dname、値：deptno）

shell

```shell
CreateIndex({
  name: "dept_by_name",
  source: Collection("dept"),
  terms: [{ field: ["data", "dname"] }],
  values: [{ field: ["data","deptno"] }]
})
```

Index #2 (Collection: emp, Term: deptno)

インデックス ＃2（コレクション：emp、用語：deptno）

shell

```shell
CreateIndex({
  name: "emp_by_deptno",
  source: Collection("emp"),
  terms: [{ field: ["data","deptno"] }]
})
```

Query

shell

```shell
Map(
  Paginate(
    Join(
      Match(Index("dept_by_name"), "SALES"),
      Index("emp_by_deptno")
    )
  ),
  Lambda("X", Get(Var("X")))
)
```
