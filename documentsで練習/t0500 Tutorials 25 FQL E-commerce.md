E-commerce | Fauna Documentation
https://docs.fauna.com/fauna/current/tutorials/ecommerce

# E-commerce

Fauna is a modern database that combines the capability of maintaining data integrity, typical of relational databases, with the scale and flexibility of non-relational systems. Inspired by the [Calvin](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf) protocol, Fauna guarantees strong consistency in a multi-region environment — a core tenet since inception.

Faunaは、リレーショナルデータベースの典型であるデータの整合性を維持する機能と、非リレーショナルシステムのスケールと柔軟性を組み合わせた最新のデータベースです。[Calvin](http://cs.yale.edu/homes/thomson/publications/calvin-sigmod12.pdf)プロトコルにインスパイアされたFaunaは、マルチリージョン環境において強力な一貫性を保証します。

The current tutorial showcases Fauna’s correctness guarantees upon the execution of concurrent distributed transactions, in the context of an E-commerce scenario.

現在のチュートリアルでは、E-コマースのシナリオの中で、同時の分散型トランザクションの実行時にFaunaが保証する正しさを紹介しています。

For further information on the multiple consistency levels supported by Fauna, see [Isolation levels](https://docs.fauna.com/fauna/current/concepts/isolation_levels).

Faunaがサポートする複数の一貫性レベルの詳細については、[Isolation Levels](https://docs.fauna.com/fauna/current/concepts/isolation_levels)を参照。

## [](#overview)Overview

-   [Setup](#setup)
    -   [Create the database](#database)
    -   [Create the schema](#schema)
    -   [Insert initial data](#insert)
    -   [A word on document IDs](#ids)
    -   [Create `submit_order` function](#function)
-   [Use cases](#use-cases)
    -   [1. Submit a simple order](#submit-plenty)
    -   [2. Submit an order which affects `backordered` status](#submit-backordered)
    -   [3. Submit an order with insufficient stock](#submit-limited)
    -   [4. Submit two orders with insufficient stock, at the same time](#submit-multiple)
-   [Conclusions](#conclusions)

---

- [セットアップ](#setup)
    - [データベースの作成](#database)
    - [スキーマの作成](#schema)
    - [初期データの挿入](#insert)
    - [ドキュメントIDについて](#ids)
    - [submit_order`関数の作成](#function)
- [ユースケース](#use-cases)
    - [1. 簡単な注文の送信](#submit-plenty)
    - [2. backorderedステータスに影響する注文を出す](#submit-backordered)
    - [3. 在庫不足の注文を出す](#submit-limited)
    - [4. 在庫不足の注文を2つ同時に出す](#submit-multiple)
- [結論](#conclusions)

This tutorial requires a Fauna account. If you don’t have a Fauna account, visit [https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register) to register.

このチュートリアルをご覧いただくには、Faunaアカウントが必要です。Fauna アカウントをお持ちでない場合は、[Fauna Shell](https://dashboard.fauna.com/accounts/register)で登録してください。

You can also complete this tutorial with the [Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/). All the commands work the same way in the Dashboard’s Shell and the command-line Fauna Shell.

このチュートリアルは、[Fauna Shell](https://docs.fauna.com/fauna/current/integrations/shell/)でも行うことができます。すべてのコマンドは、ダッシュボードのシェルでもコマンドラインの Fauna シェルでも同じように動作します。

## [](#setup)Setup

### [](#database)Create the database

1.  **Open the Fauna Dashboard**

    Log in to the [Fauna Dashboard](https://dashboard.fauna.com/).

2.  **Create a new database**

    Click the **NEW DATABASE** link near the upper-left corner of the Dashboard. Name the new database `ecommerce-tutorial` and click the **SAVE** button.

    ダッシュボードの左上にある**NEW DATABASE**リンクをクリックします。新しいデータベースを `ecommerce-tutorial` という名前にして、**SAVE** ボタンをクリックします。

3.  **Open the Dashboard’s Shell**

    Click **SHELL** in the left sidebar to display the Dashboard’s Shell.

    左サイドバーの**SHELL**をクリックして、ダッシュボードのシェルを表示します。

### [](#schema)Create the schema

The data model represents a simple E-commerce database through the following collections:

データモデルは、以下のようなコレクションでシンプルなEコマースデータベースを表現します。

-   `customers`
-   `orders`
-   `products`
-   `stores`

---

- 顧客（customers
- 注文
- 商品
- ストア

The data model:

データモデルは

![The E-commerce data model"](https://docs.fauna.com/fauna/current/tutorials/ecommerce_images/ecommerce.svg)

A _collection_ is a container for documents within a database. If you are familiar with traditional databases, you can think of a collection as a table without a structured schema.

コレクションとは、データベース内のドキュメントを格納する容器のことです。伝統的なデータベースに慣れている方は、コレクションを構造化されたスキーマのないテーブルと考えることができます。

Documents within a collection usually have a common structure, but this is not required. Fauna implements a schema-free paradigm. This means that no structure is provided when creating a collection, but just a name for identifying it.

コレクション内のドキュメントは通常、共通の構造を持っていますが、これは必須ではありません。Faunaはスキーマフリーのパラダイムを実装している。つまり、コレクションを作成する際には構造は提供されず、コレクションを識別するための名前が提供されるだけです。

To create the collections for the E-commerce database, copy the following query and paste it into the Shell, then press **RUN QUERY** to run it:

E-commerce データベース用のコレクションを作成するには、次のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行します。

shell

```shell
CreateCollection({name: "customers"});
CreateCollection({name: "products"});
CreateCollection({name: "orders"});
CreateCollection({name: "stores"});
```

With the collections in place, we are now able to insert and retrieve data from them.

コレクションを作成したので、データを挿入したり取得したりできるようになりました。

### [](#insert)Insert initial data

初期データの挿入

With the schema ready it’s time to insert the initial data into the database. The data is inserted into collections into the form of _documents_.

スキーマの準備ができたら、いよいよデータベースに初期データを挿入します。データは _documents_ という形式でコレクションに挿入されます。

Documents are single, changeable records within a Fauna database. If you’re familiar with other database systems, you can think of a document as a row, or record.

ドキュメントは、Fauna データベース内の単一の変更可能なレコードです。他のデータベースシステムに慣れている方は、ドキュメントを行（レコード）と考えることができます。

1.  **Create the `stores` documents**

**`stores`ドキュメントを作成する**。

    Copy the following query and paste it into the Shell, and press **RUN QUERY** to run it:

    以下のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行してください。

    shell

    ```shell
    Do(
      // Create Store 1 document
      Create(
        Ref(Collection("stores"), "301"),
        {
          data: {
            "name": "DC Fruits",
            "address": {
              "street": "13 Pierstorff Drive",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20220"
            }
          }
        }
      ),
      // Create Store 2 document
      Create(
        Ref(Collection("stores"), "302"),
        {
          data: {
            "name": "Party Supplies",
            "address": {
              "street": "7529 Capitalsaurus Court",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20002"
            }
          },
        }
      ),
      // Create Store 3 document
      Create(
        Ref(Collection("stores"), "303"), {
          data: {
            "name": "Foggy Bottom Market",
            "address": {
              "street":"4 Floride Ave",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20037"
            },
          }
        }
      )
    )
    ```

    Optional: run the following query to list the new `stores` documents:

    オプション：以下のクエリを実行して、新しい `stores` ドキュメントをリストアップします。

    shell

    ```shell
    Map(
      Paginate(Documents(Collection("stores"))),
      Lambda("storeRef", Get(Var("storeRef")))
    );
    ```

2.  **Create the `products` documents**

**`products`ドキュメントの作成**。

    Copy the following query and paste it into the Shell, and press **RUN QUERY** to run it:

    以下のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行します。

    shell

    ```shell
    Do(
      // Create Product 1 document
      Create(
        Ref(Collection("products"), "201"), {
          data: {
            "name": "cups",
            "description": "Translucent 9 Oz, 100 ct",
            "price": 6.98,
            "quantity": 100,
            "store": Ref(Collection("stores"), "302"),
            "backorderLimit": 5,
            "backordered": false
          }
        }
      ),
      // Create Product 2 document
      Create(
        Ref(Collection("products"), "202"), {
          data: {
            "name": "pinata",
            "description": "Original Class Donkey Pinata",
            "price": 24.99,
            "quantity": 20,
            "store": Ref(Collection("stores"), "303"),
            "backorderLimit": 10,
            "backordered": false
          }
        }
      ),
      // Create Product 3 document
      Create(
        Ref(Collection("products"), "203"), {
          data: {
            "name": "pizza",
            "description": "Frozen Cheese",
            "price": 4.99,
            "quantity": 100,
            "store": Ref(Collection("stores"), "303"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 4 document
      Create(
        Ref(Collection("products"), "204"), {
          data: {
            "name": "avocados",
            "description": "Conventional Hass, 4ct bag",
            "price": 3.99,
            "quantity": 1000,
            "store": Ref(Collection("stores"), "301"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 5 document
      Create(
        Ref(Collection("products"), "205"), {
          data: {
            "name": "limes",
            "description": "Conventional, 1 ct",
            "price": 0.35,
            "quantity": 1000,
            "store": Ref(Collection("stores"), "301"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 6 document
      Create(
        Ref(Collection("products"), "206"), {
          data: {
            "name": "limes",
            "description": "Organic, 16 oz bag",
            "price": 3.49,
            "quantity": 50,
            "store": Ref(Collection("stores"), "301"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 7 document
      Create(
        Ref(Collection("products"), "207"), {
          data: {
            "name": "limes",
            "description": "Conventional, 16 oz bag",
            "price": 2.99,
            "quantity": 30,
            "store": Ref(Collection("stores"), "303"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 8 document
      Create(
        Ref(Collection("products"), "208"), {
          data: {
            "name": "cilantro",
            "description": "Organic, 1 bunch",
            "price": 1.49,
            "quantity": 100,
            "store": Ref(Collection("stores"), "301"),
            "backorderLimit": 15,
            "backordered": false
          }
        }
      ),
      // Create Product 9 document
      Create(
        Ref(Collection("products"), "209"), {
          data: {
            "name": "pinata",
            "description": "Giant Taco Pinata",
            "price": 23.99,
            "quantity": 10,
            "store": Ref(Collection("stores"), "302"),
            "backorderLimit": 10,
            "backordered": false
          }
        }
      )
    );
    ```

    Optional: run the following query to list the new `products` documents:

    オプション：次のクエリを実行して、新しい `products` ドキュメントをリストアップします。

    shell

    ```shell
    Map(
      Paginate(Documents(Collection("products"))),
      Lambda("productRef", Get(Var("productRef")))
    );
    ```

3.  **Create the `customers` documents**

**`customers`のドキュメントを作成する**。

    Copy the following query and paste it into the Shell, and press **RUN QUERY** to run it:

    以下のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行します。

    shell

    ```shell
    Do(
      // Create Customer 1 document
      Create(
        Ref(Collection("customers"), "101"), {
          data: {
            "firstName": "Alice",
            "lastName": "Appleseed",
            "address": {
              "street": "87856 Mendota Court",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20220"
            },
            "telephone": "208-346-0715",
            "creditCard": {
              "network": "Visa",
              "number": "4556781272473393"
            }
          }
        }
      ),
      // Create Customer 2 document
      Create(
        Ref(Collection("customers"), "102"), {
          data: {
            "firstName": "Bob",
            "lastName": "Brown",
            "address": {
              "street": "72 Waxwing Terrace",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20002"
            },
            "telephone": "719-872-8799",
            "creditCard": {
              "network": "Visa",
              "number": "4916112310613672"
            }
          }
        }
      ),
      // Create Customer 3 document
      Create(
        Ref(Collection("customers"), "103"), {
          data: {
            "firstName": "Carol",
            "lastName": "Clark",
            "address": {
              "street": "5 Troy Trail",
              "city": "Washington",
              "state": "DC",
              "zipCode": "20220",
            },
            "telephone": "907-949-4470",
            "creditCard": {
              "network": "Visa",
              "number": "4532636730015542"
            }
          }
        }
      )
    )
    ```

    Optional: run the following query to list the new `customers` documents:

    オプション：次のクエリを実行して、新しい `customers` ドキュメントをリストアップします。

    shell

    ```shell
    Map(
      Paginate(Documents(Collection("customers"))),
      Lambda("customerRef", Get(Var("customerRef")))
    );
    ```

The `orders` collection remains empty for now, its documents are going to be created when we go through the use cases, coming next.

`orders`コレクションは今のところ空のままですが、そのドキュメントは次のユースケースで作成される予定です。

#### [](#ids)A word on document IDs

ドキュメントのIDについての説明

It’s important to notice that, in the queries above, we are using _hard-coded_ document IDs when creating the documents. This is being done to easily establish the relationships between the different documents in the example.

上記のクエリでは、ドキュメントを作成する際に、_hard-coded_ document ID を使用していることに注意してください。これは、例に挙げた異なるドキュメント間の関係を簡単に確立するために行われています。

Normally, a document ID is created automatically when you call [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) and just specify the [`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection) as the first parameter (instead of providing the [`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref) call). However, these document IDs are not predictable. To properly form the required relationships between documents, you might have to run queries to create new documents, gather their [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s, and then run additional queries to specify the relationships.

通常、ドキュメントIDは、[Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)を呼び出し、最初のパラメータとして[`Collection`](https://docs.fauna.com/fauna/current/api/fql/functions/collection)を指定するだけで（[`Ref`](https://docs.fauna.com/fauna/current/api/fql/functions/ref)の呼び出しを提供する代わりに）自動的に作成されます。しかし、これらのドキュメントIDは予測できません。ドキュメント間の必要な関係を適切に形成するためには、新しいドキュメントを作成するためのクエリを実行し、その[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を収集してから、関係を指定するための追加のクエリを実行しなければならないかもしれません。

Alternatively, you can use the [`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid) function to generate a unique, valid document ID for yet-to-be-created documents. Then you can use that document ID to create a document and specify its relationship in other documents.

あるいは、[`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid)関数を使って、まだ作成されていないドキュメントに対して、ユニークで有効なドキュメントIDを生成することもできます。そして、そのドキュメントIDを使ってドキュメントを作成し、他のドキュメントとの関係を指定することができます。

A [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref), or _ref_ for short, is a pointer to a document within the database. A ref is a composite value that includes a reference to the collection that the document belongs to, and the document’s numeric document ID.

[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)、略して_ref_は、データベース内のドキュメントへのポインタです。refは、そのドキュメントが属するコレクションへの参照と、そのドキュメントの数値化されたドキュメントIDを含む複合値です。

For further information, see the reference for the [`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create) and [`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid) functions.

詳細は、[`Create`](https://docs.fauna.com/fauna/current/api/fql/functions/create)および[`NewId`](https://docs.fauna.com/fauna/current/api/fql/functions/newid)関数のリファレンスを参照してください。

### [](#function)Create `submit_order` function

submit_order`関数の作成

As a last step, let’s implement a _user-defined function_ for submitting orders.

最後に、注文を出すための_ユーザー定義関数_を実装してみましょう。

A user-defined function accepts a set of arguments, executes an Fauna Query Language expression (one or more FQL functions), and outputs a result.

ユーザー定義関数は、引数を受け取り、Fauna Query Languageの式(1つまたは複数のFQL関数)を実行し、結果を出力します。

The `submit_order` function ensures that there is enough stock for the requested products, decreases the stock quantity if appropriate, updates their `backordered` status if necessary, and creates a new order document. **All of these operations are executed in a transactional fashion.**

SUBMIT_ORDER`関数は、注文された商品の在庫が十分にあることを確認し、必要に応じて在庫量を減らし、必要に応じて `backordered` ステータスを更新し、新しい注文文書を作成します。**これらの操作はすべて、トランザクション方式で実行されます。

To create the `submit_order` function, copy the following query and paste it into the Shell, the press **RUN QUERY** to run it:

SUBMIT_ORDER`関数を作成するには、以下のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行します。

shell

```shell
CreateFunction(
  {
    "name": "submit_order",
    "body": Query(
      Lambda(["customerId", "products"],
        // 1- Get Customer and Products
        // The first step is to make sure that documents exist within the
        // database for the given parameters. Therefore, we try to get
        // the Customer and all of the Products for the given Ids. If
        // they exist, we bind them to variables using the Let function
        // in order to make them available within the scope of the
        // function.
        Let(
          {
            "customer": Get(Ref(Collection("customers"), Var("customerId"))),
            "products":
              Map(
                Var("products"),
                Lambda("requestedProduct",
                  Let(
                    {
                      "product": Get(Ref(
                        Collection("products"),
                        Select(
                          "productId",
                          Var("requestedProduct")
                        )
                      ))
                    },
                    // Build up a new temporal product object containing
                    // the data given as parameter together with the
                    // data retrieved from the database.
                    {
                      "ref": Select("ref", Var("product")),
                      "price": Select(["data", "price"], Var("product")),
                      "currentQuantity": Select(
                        ["data", "quantity"],
                        Var("product")
                      ),
                      "requestedQuantity": Select(
                        ["quantity"],
                        Var("requestedProduct")
                      ),
                      "backorderLimit": Select(
                        ["data", "backorderLimit"],
                        Var("product")
                      )
                    }
                  )
                )
              )
          },
          Do(
            // 2- Check if there's enough stock
            // Next, we need to verify if there is enough stock for the
            // requested products. To do so, we evaluate all of the
            // requested products and compare their requested quantity
            // value against the current quantity value. When there is
            // not enough stock for any of the products, we print a
            // message and cancel the whole transaction with the Abort
            // function.
            Foreach(Var("products"),
              Lambda("product",
                If(
                  LTE(
                    Select("requestedQuantity", Var("product")),
                    Select("currentQuantity", Var("product"))
                  ),
                  Var("product"),
                  Abort(Concat([
                    "Stock quantity for Product [",
                    Select(["ref", "id"], Var("product")),
                    "] not enough – requested at [",
                    ToString(Time("now")),
                    "]"
                  ]))
                )
              )
            ),
            // 3- Update products stock
            // Then, we need to update the product stock quantity
            // accordingly. To do this, we update each product document
            // through the Update function subtracting the requested
            // quantity from its current quantity.
            Foreach(Var("products"),
              Lambda("product",
                Update(
                  Select("ref", Var("product")), {
                    data: {
                      "quantity": Subtract(
                        Select("currentQuantity", Var("product")),
                        Select("requestedQuantity", Var("product"))
                      )
                    }
                  }
                )
              )
            ),
            // 4- Update backordered status
            // Moving forward, we verify if the backordered status needs
            // to be updated. For that, we check if the updated stock
            // quantity is lower than the backorderLimit threshold and
            // set the backordered flag to true if so.
            Foreach(Var("products"),
              Lambda("product",
                If(
                  LTE(
                    Subtract(
                      Select("currentQuantity", Var("product")),
                      Select("requestedQuantity", Var("product"))
                    ),
                    Select("backorderLimit", Var("product"))
                  ),
                  Update(
                    Select("ref", Var("product")), {
                      data: {
                        "backordered": true
                      }
                    }
                  ),
                  Var("product")
                )
              )
            ),
            // 5- Create Order
            // Last, we create a new Order document with the provided
            // and retrieved data. As this is the last query to be
            // executed, the function will output the newly created
            // Order as result.
            Let(
              {
                "productsLine":
                  // Build up the Order products line object from the
                  // products variable.
                  Map(
                    Var("products"),
                    Lambda("product",
                      {
                        "product": Select("ref", Var("product")),
                        "quantity": Select(
                          "requestedQuantity", Var("product")
                        ),
                        "price": Select("price", Var("product"))
                      }
                    )
                  )
              },
              Create(
                Collection("orders"), {
                  data: {
                    "customer": Select("ref", Var("customer")),
                    "line": Var("productsLine"),
                    "status": "processing",
                    "creationDate": Time("now"),
                    "shipDate": null,
                    "shipAddress": Select(
                      ["data", "address"],
                      Var("customer")
                    ),
                    "creditCard": Select(
                      ["data", "creditCard"],
                      Var("customer")
                    )
                  }
                }
              )
            )
          )
        )
      )
    )
  }
);
```

The `submit_order` function leverages many of the Fauna Query Language (FQL) features. In order to get a deeper understanding of how this function is built, see the [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) reference.

`SUBMIT_ORDER`関数はFauna Query Language（FQL）の多くの機能を利用しています。この関数がどのように作られているかをより深く理解するためには、[Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/)のリファレンスを参照してください。

While not a general-purpose programming language, FQL provides much of the functionality expected from one. It allows for complex, precise manipulation and retrieval of data stored within Fauna.

FQLは汎用のプログラミング言語ではありませんが、プログラミング言語に求められる機能の多くを備えています。FQLは、Faunaに保存されているデータを複雑かつ正確に操作したり取得したりすることができます。

## [](#use-cases)Use cases

使用例

### [](#submit-plenty)1\. Submit a simple order

簡単な注文の送信

First, we start by submitting an order for products with enough stock. Copy the following query and paste it into the Shell, then press **RUN QUERY** to run it:

まず、十分な在庫がある商品の注文を送信することから始めます。以下のクエリをコピーしてシェルに貼り付け、**RUN QUERY**を押して実行します。

shell

```shell
Call(
  Function("submit_order"),
    "101",
    [
      {
        "productId": "204",
        "quantity": 10
      },
      {
        "productId": "206",
        "quantity": 5
      },
      {
        "productId": "208",
        "quantity": 20
      }
    ]
);
```

As all of the requested products had enough stock, the query should create a new order and we should see output similar to the following:

リクエストされたすべての商品に十分な在庫があったので、クエリは新しいオーダーを作成し、以下のような出力が表示されます。

```text
{
  ref: Ref(Collection("orders"), "294711005527671296"),
  ts: 1617317166760000,
  data: {
    customer: Ref(Collection("customers"), "101"),
    line: [
      {
        product: Ref(Collection("products"), "204"),
        quantity: 10,
        price: 3.99
      },
      {
        product: Ref(Collection("products"), "206"),
        quantity: 5,
        price: 3.49
      },
      {
        product: Ref(Collection("products"), "208"),
        quantity: 20,
        price: 1.49
      }
    ],
    status: 'processing',
    creationDate: Time("2021-04-01T22:46:06.604Z"),
    shipAddress: {
      street: '87856 Mendota Court',
      city: 'Washington',
      state: 'DC',
      zipCode: '20220'
    },
    creditCard: { network: 'Visa', number: '4556781272473393' }
  }
}
```

Now if we query the `products` collection index, we should also see that the products' quantities have been decreased accordingly. Let’s check it out by running the following query:

ここで、`products`コレクションのインデックスにクエリを実行すると、商品の数量がそれに応じて減少していることも確認できるはずです。次のようなクエリを実行して確認してみましょう。

shell

```shell
Map(
  Paginate(Documents(Collection("products"))),
  Lambda("productRef", Get(Var("productRef")))
);
```

We should see that the quantities have been modified:

数量が変更されていることが確認できます。

```text
{
  data: [
    {
      ref: Ref(Collection("products"), "201"),
      ts: 1617311744380000,
      data: {
        name: 'cups',
        description: 'Translucent 9 Oz, 100 ct',
        price: 6.98,
        quantity: 100,
        store: Ref(Collection("stores"), "302"),
        backorderLimit: 5,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "202"),
      ts: 1617311744380000,
      data: {
        name: 'pinata',
        description: 'Original Class Donkey Pinata',
        price: 24.99,
        quantity: 20,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 10,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "203"),
      ts: 1617311744380000,
      data: {
        name: 'pizza',
        description: 'Frozen Cheese',
        price: 4.99,
        quantity: 100,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "204"),
      ts: 1617317166760000,
      data: {
        name: 'avocados',
        description: 'Conventional Hass, 4ct bag',
        price: 3.99,
        quantity: 990,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "205"),
      ts: 1617311744380000,
      data: {
        name: 'limes',
        description: 'Conventional, 1 ct',
        price: 0.35,
        quantity: 1000,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "206"),
      ts: 1617317166760000,
      data: {
        name: 'limes',
        description: 'Organic, 16 oz bag',
        price: 3.49,
        quantity: 45,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "207"),
      ts: 1617311744380000,
      data: {
        name: 'limes',
        description: 'Conventional, 16 oz bag',
        price: 2.99,
        quantity: 30,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "208"),
      ts: 1617317166760000,
      data: {
        name: 'cilantro',
        description: 'Organic, 1 bunch',
        price: 1.49,
        quantity: 80,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "209"),
      ts: 1617311744380000,
      data: {
        name: 'pinata',
        description: 'Giant Taco Pinata',
        price: 23.99,
        quantity: 10,
        store: Ref(Collection("stores"), "302"),
        backorderLimit: 10,
        backordered: false
      }
    }
  ]
}
```

### [](#submit-backordered)2\. Submit an order which affects `backordered` status

「取り寄せ品」の状態に影響する注文の送信

Next, we try to submit a new order which should affect the `backordered` status of the requested product. Every product has a `backorderLimit` property, if after submitting an order the product’s resulting stock quantity is below that threshold, then the `backordered` status in the product should be set to `true`. This means that the product is about to be out of stock and new items should be purchased.

次に、注文した商品の `backordered` ステータスに影響を与える新規注文を送信してみます。すべての商品には `backorderLimit` プロパティがあり、注文を送信した後に商品の結果としての在庫量がその閾値を下回った場合、その商品の `backordered` ステータスは `true` に設定されます。これは、その商品がそろそろ在庫切れになるので、新しい商品を購入する必要があることを意味します。

Run the following query in the shell to try this case:

このケースを試すために、シェルで以下のクエリを実行してください。

shell

```shell
Call(
  Function("submit_order"),
    "103",
    [
      {
        "productId": "206",
        "quantity": 40
      },
      {
        "productId": "203",
        "quantity": 90
      }
    ]
);
```

As a result, the order should be created successfully:

その結果、オーダーの作成に成功します。

```text
{
  ref: Ref(Collection("orders"), "294711919406744064"),
  ts: 1617318038310000,
  data: {
    customer: Ref(Collection("customers"), "103"),
    line: [
      {
        product: Ref(Collection("products"), "206"),
        quantity: 40,
        price: 3.49
      },
      {
        product: Ref(Collection("products"), "203"),
        quantity: 90,
        price: 4.99
      }
    ],
    status: 'processing',
    creationDate: Time("2021-04-01T23:00:38.243Z"),
    shipAddress: {
      street: '5 Troy Trail',
      city: 'Washington',
      state: 'DC',
      zipCode: '20220'
    },
    creditCard: { network: 'Visa', number: '4532636730015542' }
  }
}
```

And then, if we query the `products` once again, we should see that the requested product is now in `backordered` status, since its current stock `quantity` is below the `backorderedLimit` threshold:

そして、もう一度 `products` を照会すると、現在の在庫 `quantity` が `backorderedLimit` の閾値を下回っているため、要求された製品は `backordered` ステータスになっていることがわかります。

```text
{
  data: [
    {
      ref: Ref(Collection("products"), "201"),
      ts: 1617317952130000,
      data: {
        name: 'cups',
        description: 'Translucent 9 Oz, 100 ct',
        price: 6.98,
        quantity: 100,
        store: Ref(Collection("stores"), "302"),
        backorderLimit: 5,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "202"),
      ts: 1617317952130000,
      data: {
        name: 'pinata',
        description: 'Original Class Donkey Pinata',
        price: 24.99,
        quantity: 20,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 10,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "203"),
      ts: 1617318038310000,
      data: {
        name: 'pizza',
        description: 'Frozen Cheese',
        price: 4.99,
        quantity: 10,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 15,
        backordered: true
      }
    },
    {
      ref: Ref(Collection("products"), "204"),
      ts: 1617317977150000,
      data: {
        name: 'avocados',
        description: 'Conventional Hass, 4ct bag',
        price: 3.99,
        quantity: 990,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "205"),
      ts: 1617317952130000,
      data: {
        name: 'limes',
        description: 'Conventional, 1 ct',
        price: 0.35,
        quantity: 1000,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "206"),
      ts: 1617318038310000,
      data: {
        name: 'limes',
        description: 'Organic, 16 oz bag',
        price: 3.49,
        quantity: 5,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: true
      }
    },
    {
      ref: Ref(Collection("products"), "207"),
      ts: 1617317952130000,
      data: {
        name: 'limes',
        description: 'Conventional, 16 oz bag',
        price: 2.99,
        quantity: 30,
        store: Ref(Collection("stores"), "303"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "208"),
      ts: 1617317977150000,
      data: {
        name: 'cilantro',
        description: 'Organic, 1 bunch',
        price: 1.49,
        quantity: 80,
        store: Ref(Collection("stores"), "301"),
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: Ref(Collection("products"), "209"),
      ts: 1617317952130000,
      data: {
        name: 'pinata',
        description: 'Giant Taco Pinata',
        price: 23.99,
        quantity: 10,
        store: Ref(Collection("stores"), "302"),
        backorderLimit: 10,
        backordered: false
      }
    }
  ]
}
```

### [](#submit-limited)3\. Submit an order with insufficient stock

在庫不足の商品を注文する

Now let’s try to submit an order for a product which exceeds its current stock. Execute the following query:

それでは、現在の在庫数を超える商品の注文を出してみましょう。次のようなクエリを実行します。

shell

```shell
Call(
  Function("submit_order"),
    "102",
    [
      {
        "productId": "203",
        "quantity": 15
      },
      {
        "productId": "202",
        "quantity": 45
      }
    ]
);
```

As there isn’t enough stock quantity for the requested product, we should see an error result containing the following message:

リクエストされた製品の在庫数が十分でないため、以下のメッセージを含むエラー結果が表示されます。

```text
'Stock quantity for Product [203] not enough – requested at [2021-04-01T23:04:46.246Z]'
```

### [](#submit-multiple)4\. Submit two orders with insufficient stock, at the same time

在庫が足りない注文を2つ同時に出す

Last, let’s try to submit two orders for the same product at the same time, which together exceed the current stock. There is only enough stock only for one of the two orders. This means one of them should succeed and the other should fail.

最後に、同じ商品に対して、現在の在庫数を超える注文を2つ同時に出してみましょう。2つの注文のうち、どちらか一方にしか在庫がありません。つまり、片方は成功し、もう片方は失敗するということになります。

In order to go through this use case in the most realistic way possible, you need to be able to simulate two different users running a query at the same time. This could be done by running the corresponding queries simultaneously in two different terminal windows in one single computer. Please check the documentation of your terminal of choice on how to run two commands in different windows at the same time.

このユースケースを可能な限り現実的な方法で実行するためには、2人の異なるユーザーが同時にクエリを実行することをシミュレートできる必要があります。これを実現するには、1台のコンピュータの2つの異なるターミナル・ウィンドウで、対応するクエリを同時に実行する必要があります。2つのコマンドを別々のウィンドウで同時に実行する方法については、お使いの端末のマニュアルをご覧ください。

In one terminal window, prepare the following query:

1つのターミナルウィンドウで、次のようなクエリを用意します。

shell

```shell
Call(
  Function("submit_order"),
    "101",
    [
      Object({
        "productId": "201",
        "quantity": 70
      })
    ]
);
```

And in another terminal, prepare the following query:

そして，別のターミナルで，次のようなクエリを用意します。

shell

```shell
Call(
  Function("submit_order"),
    "102",
    [
      Object({
        "productId": "201",
        "quantity": 50
      })
    ]
);
```

Then run both of them at the same time.

次に、この2つを同時に実行します。

You should see in one of the terminals that the order has been created successfully:

どちらかのターミナルに、オーダーの作成が成功したことが表示されるはずです。

```text
{
  ref: Ref(Collection("orders"), "294712378764820992"),
  ts: 1617318476370000,
  data: {
    customer: Ref(Collection("customers"), "101"),
    line: [
      {
        product: Ref(Collection("products"), "201"),
        quantity: 70,
        price: 6.98
      }
    ],
    status: 'processing',
    creationDate: Time("2021-04-01T23:07:56.323Z"),
    shipAddress: {
      street: '87856 Mendota Court',
      city: 'Washington',
      state: 'DC',
      zipCode: '20220'
    },
    creditCard: { network: 'Visa', number: '4556781272473393' }
  }
}
```

And in the other terminal, you should see an error message indicating there isn’t enough stock for performing the operation:

もう一方の端末では，操作を行うのに十分な在庫がないことを示すエラーメッセージが表示されます。

```text
Stock quantity for Product [201] not enough – requested at [2021-04-01T23:08:27.331Z]
```

If you look closer at the order `creationDate` and the time prompted in the error message, you find that both time values differ only by fractions of a second. This demonstrates that, despite being run at the same time, the two queries have been effectively processed in a serialized way and only one of them has managed to modify the records stored in the database.

エラーメッセージに表示されているオーダーの`creationDate`と時間をよく見ると、どちらの時間もコンマ数秒しか違わないことがわかります。これは、同時に実行されたにもかかわらず、2つのクエリが効果的にシリアル化されて処理され、片方のクエリだけがデータベースに保存されているレコードを変更できたことを示しています。

## [](#conclusions)Conclusions

結論

In this tutorial, we have seen how Fauna keeps data correctness among simultaneous transactions in a distributed environment. This, combined with the power of the Fauna Query Language, allows you to safely build comprehensive use cases directly at the database level, which otherwise would end up being implemented — with most databases — at the application level through multiple queries and locks.

このチュートリアルでは、Faunaが分散環境での同時トランザクション間でデータの正しさを保つ方法を見てきました。これと Fauna クエリ言語の能力を組み合わせることで、データベースレベルで直接、包括的なユースケースを安全に構築することができます。そうでなければ、ほとんどのデータベースでは、複数のクエリとロックを使ってアプリケーションレベルで実装しなければなりません。

