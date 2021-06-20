AccessProvider (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/security/external/access_provider

Plan Feature
This feature requires an appropriate billing plan.
See the Pricing page for details.
You can upgrade via the Fauna Dashboard

プラン機能
この機能を利用するには、適切な課金プランが必要です。
詳細は、料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# AccessProvider

An AccessProvider is a document within a Fauna database that configures one half of the relationship required to access authentication information from an external identity provider. The other half of the relationship is configured in the identity provider.

## [](#definition)Definition

An AccessProvider document has this structure:

```javascript
{
  ref: AccessProvider("Auth0-myapp"),
  ts: 1604524688650000,
  name: 'Auth0-myapp',
  issuer: 'https://myapp.auth0.com/',
  jwks_uri: 'https://myapp.auth0.com/.well-known/jwks.json',
  audience: 'https://db.fauna.com/db/yxuihtdghybyy'
}
```

  

Field Name

Field Type

Definition and Requirements

`name`

[String](https://docs.fauna.com/fauna/current/api/fql/types#string)

A unique name for the AccessProvider. You can use this name to retrieve the AccessProvider later.

`issuer`

[String](https://docs.fauna.com/fauna/current/api/fql/types#string)

An HTTPS URL for the IdP that you are using to grant access to Fauna. This is typically an account-/app-specific URL that your IdP provides.

Use an exact copy of your IdP’s `issuer` URL, including a trailing slash (if there is one). URL differences could prevent Fauna acceptance of your IdP’s JWT tokens.

`jwks_uri`

[String](https://docs.fauna.com/fauna/current/api/fql/types#string)

A valid HTTPS URI, which should serve the JSON Web Key that signs the JWT tokens from your IdP.

`roles`

[Array](https://docs.fauna.com/fauna/current/api/fql/types#array) of Role [Reference](https://docs.fauna.com/fauna/current/api/fql/types#ref)s or Role-predicate objects.

Optional - Defines the roles that should be evaluated to determine access for a provided JWT token.

When `roles` is not specified, no privileges are defined — queries with JWT tokens from the specified `issuer` cannot be processed.

The usual use of `roles` is to specify a list of one or more Role references:

```json
roles: [ Role('developers'), Role('managers') ]
```

Per [overlapping roles](https://docs.fauna.com/fauna/current/security/abac#overlapping), any role that grants access means that the query involving a JWT token is processed, even if another Role might deny access.

A Role-predicate object specifies a Role to potentially evaluate, whose evaluation is determined by the specified predicate function:

```json
{
  role: Role('executives'),
  predicate: Query(Lambda("accessToken", ... )),
}
```

The `predicate` function is passed an object representing the `payload` field from the JWT token. The `payload` field contains _claims_, which are statements about the user represented by the JWT token. How these claims are specified/interpreted can vary depending on the IdP. See [https://jwt.io/introduction/](https://jwt.io/introduction/) for background information, and your IdP’s documentation, for more details.

The `predicate` function must return a boolean value, and if the result is `true`, the specified Role is evaluated to determine whether the access required to execute the query (in the request accompanying the JWT token) has been granted.

`data`

[Object](https://docs.fauna.com/fauna/current/api/fql/types#object)

Optional - Contains user-defined metadata for the AccessProvider. It is provided for the developer to store AccessProvider-relevant information.

`audience`

[String](https://docs.fauna.com/fauna/current/api/fql/types#string)

Read only - A unique URL for your database that should be used in the `audience` configuration for an identity provider. Fauna creates this field automatically when you create a database (see the [`CreateDatabase`](https://docs.fauna.com/fauna/current/api/fql/functions/createdatabase) function).

## [](#related)Related

-   [JSON Web Tokens (JWTs)](https://docs.fauna.com/fauna/current/security/external/jwt)
    
-   [Auth0 configuration](https://docs.fauna.com/fauna/current/security/external/auth0)
    
-   [`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)
    
-   [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)
    
-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)
    

Was this article helpful?