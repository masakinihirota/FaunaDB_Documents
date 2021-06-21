AccessProviders (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders?lang=javascript

# `AccessProviders`

```javascript
AccessProviders( )
```

## [](#description)Description

The `AccessProviders` function, when executed with [`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate), returns an array of [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s for all AccessProviders in the specified child `database`. If a child `database` is not specified, the returned index references all belong to the current database.

`AccessProviders`関数は、[`Paginate`](https://docs.fauna.com/fauna/current/api/fql/functions/paginate)と一緒に実行すると、指定した子`database`内のすべてのAccessProvidersの[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)の配列を返します。子の `database` が指定されていない場合は、返されるインデックス参照はすべて現在のデータベースに属するものです。

## [](#parameters)Parameters

None.

## [](#returns)Returns

A [Set](https://docs.fauna.com/fauna/current/api/fql/types#set) [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) for the available AccessProviders in the specified child `database` (or the current database if `database` is not specified).

Aセット ・リファレンス指定された子で利用可能AccessProvidersのためのdatabase（または現在のデータベースであればdatabase指定されていません）。

## [](#examples)Examples

The following query gets the references to all AccessProviders in the current database:

次のクエリは、現在のデータベース内のすべてのAccessProviderへの参照を取得します。

```javascript
client.query(
  q.Paginate(q.AccessProviders())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ data: [ AccessProvider("Auth0-myapp") ] }
```

The following query demonstrates what happens when no AccessProviders exist:

次のクエリは、AccessProviderが存在しない場合に何が起こるかを示しています。

```javascript
client.query(
  q.Paginate(q.AccessProviders())
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{ data: [] }
```

## [](#related-functions)Related functions

関連機能

-   [`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)
-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)
-   [`CreateKey`](https://docs.fauna.com/fauna/current/api/fql/functions/createkey)
-   [`Credentials`](https://docs.fauna.com/fauna/current/api/fql/functions/credentials)
-   [`CurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/currentidentity)
-   [`HasCurrentIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrentidentity)
-   [`CurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/currenttoken)
-   [`HasCurrentToken`](https://docs.fauna.com/fauna/current/api/fql/functions/hascurrenttoken)
-   [`HasIdentity`](https://docs.fauna.com/fauna/current/api/fql/functions/hasidentity)
-   [`Identify`](https://docs.fauna.com/fauna/current/api/fql/functions/identify)
-   [`Identity`](https://docs.fauna.com/fauna/current/api/fql/functions/identity)
-   [`KeyFromSecret`](https://docs.fauna.com/fauna/current/api/fql/functions/keyfromsecret)
-   [`Keys`](https://docs.fauna.com/fauna/current/api/fql/functions/keys)
-   [`Login`](https://docs.fauna.com/fauna/current/api/fql/functions/login)
-   [`Logout`](https://docs.fauna.com/fauna/current/api/fql/functions/logout)
-   [`Tokens`](https://docs.fauna.com/fauna/current/api/fql/functions/tokens)

## [](#related-topics)Related topics

-   [Fauna keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Fauna tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [External authentication](https://docs.fauna.com/fauna/current/security/external/)
-   [Fauna credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)
-   [Cookbook: keys](https://docs.fauna.com/fauna/current/cookbook/#key)
-   [Authentication tutorials](https://docs.fauna.com/fauna/current/tutorials/authentication/)

