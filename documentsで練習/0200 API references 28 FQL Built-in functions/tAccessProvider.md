AccessProvider (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider?lang=javascript

この機能を利用するには、適切な課金プランが必要です。
詳しくは料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# `AccessProvider`

```javascript
AccessProvider( name )
```

## [](#description)Description

The `AccessProvider` function returns a valid [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref) for the specified AccessProvider `name` in the specified child `database`. If a child `database` is not specified, the returned AccessProvider reference belongs to the current database.

AccessProvider`関数は、指定された子の `database` にある指定されたAccessProvider `name` の有効な[Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)を返します。子の `database` が指定されていない場合、返されるAccessProviderのリファレンスは現在のデータベースに属します。

## [](#parameters)Parameters

|Argument|Type|Definition and Requirements|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|The name of an AccessProvider.|

|引数|型|定義と要件|
|--|--|--|
|`name`|[String](https://docs.fauna.com/fauna/current/api/fql/types#string)|AccessProviderの名前です。|

## [](#returns)Returns

A reference to an AccessProvider with the specified `name`, in the specified child `database` (or the current database if `database` is not specified).

指定された子の `database` （`database` が指定されていない場合は、現在のデータベース）にある、指定された `name` を持つ AccessProvider への参照です。

## [](#examples)Examples

The following query gets a reference to the AccessProvider named "Auth0-myapp":

次のクエリは、"Auth0-myapp "という名前のAccessProviderへの参照を取得します。

```javascript
client.query(
  q.AccessProvider('Auth0-myapp')
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
AccessProvider("Auth0-myapp")
```

The following query retrieves the "Auth0-myapp" AccessProvider document:

次のクエリは、"Auth0-myapp "というAccessProviderドキュメントを取得します。

```javascript
client.query(
  q.Get(q.AccessProvider('Auth0-myapp'))
)
.then((ret) => console.log(ret))
.catch((err) => console.error('Error: %s', err))
```

```none
{
  ref: AccessProvider("Auth0-myapp"),
  ts: 1605546537710000,
  name: 'Auth0-myapp',
  issuer: 'https://myapp.auth0.com/',
  jwks_uri: 'https://myapp.auth0.com/.well-known/jwks.json',
  audience: 'https://db.fauna.com/db/yxi13oyw1ybyy'
}
```

## [](#related-functions)Related functions

-   [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)
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

関連トピック

-   [Fauna keys](https://docs.fauna.com/fauna/current/security/keys)
-   [Fauna tokens](https://docs.fauna.com/fauna/current/security/tokens)
-   [External authentication](https://docs.fauna.com/fauna/current/security/external/)
-   [Fauna credentials](https://docs.fauna.com/fauna/current/security/credentials)
-   [Attribute-based access control (ABAC)](https://docs.fauna.com/fauna/current/security/abac)
-   [Cookbook: keys](https://docs.fauna.com/fauna/current/cookbook/#key)
-   [Authentication tutorials](https://docs.fauna.com/fauna/current/tutorials/authentication/)

