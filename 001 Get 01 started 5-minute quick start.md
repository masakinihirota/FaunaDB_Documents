Fauna has two main APIs: GraphQL and FQL (Fauna Query Language). This quick start provides a brief intro to both since you can use them together.

1.  **Sign up for a free account**
    
    When you first log in, you are greeted with a Welcome tutorial. Click anywhere (other than the tutorial panel) to close it. You can return to the tutorial at any time by clicking the question mark **?** button at the top right.
    
    ![The Fauna Dashboard home screen with tutorial prompt](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-home-tutorial.png)
    
2.  **Create a database**
    
    1.  Click **NEW DATABASE**.
        
        ![The Fauna Dashboard new database screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-new_database.png)
        
    2.  Enter `my_db` into the "Database Name" field.
        
    3.  Check the "Pre-populate with demo data" checkbox.
        
    4.  Click **SAVE**.
        
    
    You have created your first Fauna database!
    
3.  **Browse your database**
    
    The Overview page for the `my_db` database is displayed. The database has been populated with some collections, indexes, and the corresponding GraphQL schema for a grocery delivery app.
    
    ![The Fauna Dashboard database overview screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-db_overview.png)
    
    1.  **Collections**
        
        Click **COLLECTIONS** in the left sidebar to browse your collections. You’ll see the documents for each collection on the right. If you are familiar with SQL, collections are like tables and documents are like rows in a table, except that each document can contain its own, distinct fields.
        
        ![The Fauna Dashboard collections screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-collections.png)
        
    2.  **Indexes**
        
        Click the **INDEXES** tab in the left sidebar. If you are familiar with SQL, Fauna’s indexes are like SQL views. Most Fauna queries require a companion index to help avoid performing full scans of collections (which could get expensive), but you can have hundreds of indexes without affecting overall performance.
        
        ![The Fauna Dashboard indexes screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-indexes.png)
        
    3.  **Functions**
        
        Click the **FUNCTIONS** tab in the left sidebar. User-defined functions (UDFs) contain custom business logic that runs on the server, similar to "stored procedures".
        
        ![The Fauna Dashboard functions screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-functions.png)
        
        This UDF might look weird if it’s your first time seeing FQL, the Fauna Query Language, but FQL is actually pretty easy and tons of fun to learn. FQL is also unique in how much power and precision it gives you with respect to predictable cost and performance as you scale.
        
    
4.  **Try some FQL**
    
    Now that we know some basic concepts, let’s query our data.
    
    1.  Click on **SHELL** in the left sidebar to open the web shell.
        
        ![The Fauna Dashboard shell screen](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-shell-initial.png)
        
    2.  Copy the following FQL query:
        
        ```
        Get(Ref(Collection("products"),"202"))
        ```
        
    3.  Replace the queries in the bottom panel of the shell by selecting them and then and pasting the copied query.
        
    4.  Click **RUN QUERY**.
        
        This query simply gets a document identified by its [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref). A document [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) contains a reference to the document’s collection (in this case, "products") and a unique ID for the document in that collection (in this case, "202"). Fauna’s auto-generated Reference IDs are 18-digits long — you can set your own during document creation, as we have done with the pre-populated demo data to ease copy/pasting.
        
        The upper panel contains the result of the query:
        
        ![The Fauna Dashboard shell screen with the query result](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-shell-result.png)
        
    5.  Hover your pointer over the **i** icon to the left of "Time elapsed" to see the query execution metrics. For example, here we can learn that this query resulted in one read operation.
        
        ![The Fauna Dashboard shell screen with the query result and query statistics tooltip](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-shell-stats.png)
        
        You can reduce read operations by leveraging indexes and using them as views. Expand the following block to learn more.
        
    
5.  **Try some GraphQL**
    
    Click **GraphQL** in the left sidebar to access the GraphQL Playground.
    
    ![The Fauna Dashboard GraphQL](https://docs.fauna.com/fauna/current/start/_images/screen-dashboard-playground-initial.png)
    
    Next, copy/paste the following query into the left panel of the editor, then click the "play" button in the middle.
    
    ```
    query {
      findProductByID(id: "202") {
        name
        description
        price
      }
    }
    ```
    
    This query fetches a single document based on its Reference ID, just like the FQL example in [Step #4](https://docs.fauna.com/fauna/current/start/#step4):
    
    ```
    {
      "data": {
        "findProductByID": {
          "name": "pinata",
          "description": "Original Classic Donkey Pinata",
          "price": 24.99
        }
      }
    }
    ```
    
    Each GraphQL query is translated into a single FQL query, which means that the GraphQL API has completely solved the [n+1](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a) problem behind the scenes for you.
    
6.  **Next steps: Query Fauna from an app**
    
    If you already have an app to connect to Fauna, pick your language of choice:
    
    Otherwise, clone and run a sample app:
    
      
    
    FQL
    
    GraphQL
    
    -   [Rethinking Twitter as a Serverless App](https://docs.fauna.com/fauna/current/start/apps/fwitter)
        
    -   [https://github.com/netlify/netlify-faunadb-example](https://github.com/netlify/netlify-faunadb-example)
        
    
    -   [https://github.com/molebox/serverless-graphql-potter](https://github.com/molebox/serverless-graphql-potter)
        
    
    For more sample apps, visit the [awesome-faunadb](https://github.com/n400/awesome-faunadb) list on GitHub.
