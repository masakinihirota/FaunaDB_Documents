# Fauna Query Language for SQL users

This section describes a number of common structured query language (SQL) queries and their Fauna Query Language (FQL) equivalents.

While it is almost impossible to provide an exhaustive comparison of every variation of all SQL commands, we provide a very basic comparison of the most used [DDL](#data-definition-language) (Data Definition Language) and [DML](#data-manipulation-language) (Data Manipulation Language) queries. As you gain more experience with the Fauna Query Language, the ease and power of its syntax should become evident. Complex queries that are difficult, or even impossible, in SQL can be composed very easily in FQL. One very important difference between the two is that FQL is not a declarative language as SQL. Hence the actual path of execution needs to be provided for each query — FQL requires the developer to specify an index in most queries.

[DDL](#data-definition-language)

- [CREATE DATABASE](#create-database)
- [CREATE TABLE](#create-table)
- [ALTER TABLE](#alter-table)
- [TRUNCATE TABLE](#truncate-table)
- [DROP TABLE](#drop-table)

[DML](#data-manipulation-language)

- [INSERT](#insert)
- [UPDATE](#update)
- [DELETE](#delete)

[Query](#query)

- [SELECT ALL](#select-all)
- [SELECT WHERE](#select-where)
- [SELECT WHERE NOT](#select-not)
- [SELECT WHERE CONDITION](#select-condition)
- [SELECT GROUP BY](#select-groupby)
- [SELECT JOIN](#join)

## [](#conceptual-equivalents)Conceptual equivalents

Relational | Fauna

Schema | Database

Table Collection

Row | Document

Index/Materialized Views | Index

In these examples below, we use two tables, `dept` (departments) and `emp` (Employees) to compare basic operations in both query languages. These tables have been extensively used in Oracle documentation to explain various SQL basics.

以下の例では、dept (部門) と emp (従業員) の 2 つのテーブルを使用して、両方のクエリ言語での基本的な操作を比較しています。これらのテーブルは、さまざまな SQL の基本を説明するために Oracle ドキュメントで広く使用されています。

# Data definition language

SQL
CREATE DATABASE employees;
FQL
CreateDatabase({name: "employees"})

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL

#

SQL

FQL
