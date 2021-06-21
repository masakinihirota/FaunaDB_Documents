JSON Web Tokens (JWTs) (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/security/external/jwt

Plan Feature
This feature requires an appropriate billing plan.
See the Pricing page for details.
You can upgrade via the Fauna Dashboard

プラン機能
この機能を利用するには、適切な課金プランが必要です。
詳細は、料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# JSON Web Tokens (JWTs)

Beginning with API version 4.0, Fauna can accept valid JWTs from a configured identity provider (IdP) — such as [Auth0](https://www.auth0.com/) — that provide self-contained JWTs.

A JSON Web Token (JWT) is a compact representation of various _claims_, which can include identity, authentication status, permissions, and more.

Within a JWT, a claim is, essentially, a specific key and value within a JSON structure. For example:

```json
{
  "iss": "https://faunadb-auth0.auth0.com/",
  "sub": "google-oauth2|997696438605329289272",
  "aud": [
    "https://faunadb-auth0.auth0.com/userinfo",
    "https://db.fauna.com/db/yxxeeaaqcydyy",
  ],
  "iat": 1602681059,
  "exp": 1602767459,
  "azp": "QpU1xmXv7pwumxlBilT34MB7pErILWrF",
  "scope": "openid profile email",
}
```

Within that JWT, there are seven claims:

-   `iss`: The issuer of the JWT, specifying the identity provider.
    
-   `sub`: The "subscriber" or authenticated user identity. The example `sub` claim is for an authenticated Google user whose identity was confirmed by the identity provider, Auth0.
    
-   `aud`: The audience(s) (URLs) that expect to validate and use the JWT’s claims. The example `aud` claim includes two URLs that are permitted/expected to process the JWT:
    
    1.  The first URL is an identity provider-specific URL that permits the JWT holder to ask for additional user information that is not automatically included in the JWT.
        
    2.  The second URL is an example of a Fauna database identifier URL. The latter string of characters is a globally-unique identifier for the specific database that should accept the JWT.
        
    
-   `iat`: The "Issued-at" timestamp, which is a Unix timestamp identifying when the JWT token was created.
    
-   `exp`: The expiry timestamp. The audience URLs should accept the JWT’s claims starting with the `iat`, and ending with the `exp`. Once the JWT has expired, its claims should be ignored/rejected.
    
-   `azp`: The "authorized party", party to which the JWT was issued. Usually, this is used to contain the userid within the identity provider.
    
-   `scope`: The scope is a space-delimited list of scope names. Each scope should be considered to be permitted use of the JWT.
    

There are a wide variety of claims that can be included in a JWT, but the claims identified above tend to be the most commonly used claims. To work with Fauna, a JWT must, at minimum, include the `iss`, `sub`, and `aud` claims.

Trust in a JWT comes from the cryptographic signing of the JWT by the identity provider, or encryption of the JWT when disclosure of the claims is undesirable. Typically, the identity provider makes a public key available so that the receiver of a JWT can validate/decrypt the JWT for use. The standard location URL template is `https://<identity provider>/.well-known/jwks.json`.

## [](#related)Related

-   [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider)
    
-   [Auth0 configuration](https://docs.fauna.com/fauna/current/security/external/auth0)
    
-   [`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)
    
-   [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)
    
-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)
    
