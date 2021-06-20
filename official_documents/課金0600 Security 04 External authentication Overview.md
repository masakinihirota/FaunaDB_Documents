Overview (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/security/external/

Plan Feature
This feature requires an appropriate billing plan.
See the Pricing page for details.
You can upgrade via the Fauna Dashboard

プラン機能
この機能を利用するには、適切な課金プランが必要です。
詳細は、料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# Overview

This section describe the elements, functions, and operations required to use an identity provider (IdP) to authenticate users that can then query Fauna.

On this page:

-   [What is external authentication?](#what)
    
-   [How does external authentication work?](#how)
    
-   [Configuration](#configuration)
    
-   [Resources](#resources)
    

## [](#what)What is external authentication?

External authentication is any authentication — which should allow Fauna queries to be executed — that takes place outside of your Fauna database.

Typically, external authentication is handled by an Identity Provider (IdP). An IdP provides the following services and capabilities:

-   creates, maintains, and manages identity information
    
-   creates, maintains, and manages permissions for each identity
    
-   provides authentication services where its own identities, or those from other identity providers, can authentication.
    

When you use external authentication with Fauna, you have two primary choices for identity information storage:

-   Identities are stored in your Fauna database — you provide some code to the IdP that allows the IdP to authenticate users within your database. In this scenario, there is no significant benefit to using an IdP.
    
-   Identities are stored in the IdP, or in an IdP that you do not use directly. For example, if you use Auth0 as your IdP, you might manage your users and their credentials in Auth0. Similarly, you might accept "social" logins from users who exist in other identity providers, such as FaceBook, GitHub, etc.
    
    In this scenario, each of the identities have already been confirmed, usually by email verification, but occasionally by other mechanisms such as exchange of public keys. Upon successful authentication, the IdP generates a JSON Web Token (JWT) which is signed (and possible encrypted) so that the claim of authentication can be known to be made by a trusted source. The JWT is then used as a password-equivalent and, once the appropriate configuration in your Fauna database has been created, can be used in place of a Fauna [token](https://docs.fauna.com/fauna/current/security/tokens) or [key](https://docs.fauna.com/fauna/current/security/keys) to authorize the execution of queries.
    

## [](#how)How does external authentication work?

Once configured, the process of using an IdP to authenticate in order to query a database in Fauna looks like this:

![An overview of the sequence of events required to use external authentication](https://docs.fauna.com/fauna/current/security/external//../_images/sequence-jwt.svg)

1.  An unauthenticated user visits your web application and clicks "Log in".
    
2.  Your web application redirects to, or opens a sub-frame for, the IdP’s login form.
    
3.  The IdP presents the login form.
    
4.  The user enters their credentials, and submits them to the IdP.
    
5.  If authentication is successful, the IdP makes a request to your application’s "login successful" endpoint, and provides a freshly-generated JWT.
    
6.  Your web application indicates to the user that their login was successful. Your web application holds onto the JWT to use for subsequent queries to Fauna.
    
7.  The user performs some action that requires fetching data from Fauna.
    
8.  Your web application composes a GraphQL or FQL query, and uses the held JWT, in place of a Fauna token/key, as the HTTP Bearer token.
    
9.  Fauna validates the JWT. If necessary, Fauna fetches the specified public key from the `jwks_uri` to validate/decrypt the JWT. Fauna only performs the validation/decryption step once during the JWT’s validity period (if specified), or once per hour. The result of the query execution is returned to your web application.
    
10.  Your web application updates its UI for the user based on the response that it received.
    

This flow is typical. While there are variations of this flow depending upon where the identities are stored, and where permissions are configured, the variations are not described here.

## [](#configuration)Configuration

External authentication is configured in two places:

1.  within the Fauna database that should permit users authenticated via an IdP to execute queries, and
    
2.  with the IdP, to specify which web-accessible services should accept the JWTs that they create after successful authentication.
    

It is important that these two configurations are correct, so that authenticated users can access documents within Fauna, and to prevent non-authenticated users from gaining access.

Within Fauna, configuration involves creating an [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider) document, that specifies the issue (the IdP), the `jwks_uri` (the URL where the IdP’s public key can be found, verify/decrypt the JWT), and the `audience` (identifies which database should accept the JWT).

For more information, see [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider).

IdP configuration varies by providers, but there are many similarities between the services. Generally, you configure an "API" with the details of connecting to Fauna, create some "roles" or "scopes" that define the types of access that each user should have, create some user records that include their credentials, roles/scopes.

For provider-specific information, see:

-   [Auth0 configuration](https://docs.fauna.com/fauna/current/security/external/auth0)
    

Once the Fauna and IdP configuration is complete, you can then configure your application to integrate the IdP login workflow, and then query Fauna with the JWTs that your application receives from the IdP.

## [](#resources)Resources

-   [https://jwt.io/](https://jwt.io/)
    
-   [RFC 7519](https://tools.ietf.org/html/rfc7519)
    
-   [Auth0](https://www.auth0.com/)
    

## [](#next-steps)Next steps

-   [JSON Web Token (JWT)](https://docs.fauna.com/fauna/current/security/external/jwt)
    
-   [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider)
    
-   [Auth0 configuration](https://docs.fauna.com/fauna/current/security/external/auth0)
    
