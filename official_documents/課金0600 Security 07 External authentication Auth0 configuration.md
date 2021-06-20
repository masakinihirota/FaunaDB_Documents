Auth0 configuration (plan) | Fauna Documentation
https://docs.fauna.com/fauna/current/security/external/auth0

Plan Feature
This feature requires an appropriate billing plan.
See the Pricing page for details.
You can upgrade via the Fauna Dashboard

プラン機能
この機能を利用するには、適切な課金プランが必要です。
詳細は、料金プランのページをご覧ください。
アップグレードは、Fauna Dashboardから行えます。

# Auth0 configuration

This section describes how to configure Auth0 as an identity provider (IdP) for your application such that Auth0 users can then query your Fauna database.

On this page:

-   [Preparation](#preparation)
    
-   [Minimum viable configuration](#minimum)
    
    -   [Fauna - part 1](#fauna-part1)
        
    -   [Auth0 configuration](#auth0)
        
    -   [Fauna - part 2](#fauna-part2)
        
    -   [Verify](#verify)
        
    

## [](#preparation)Preparation

The following is a list of preparatory steps. You only need to perform a step if you have not already done so:

-   Sign up for a Fauna account.
    
-   Create a database.
    
-   Sign up for an [Auth0](https://www.auth0.com/) account.
    
-   Create a [Role](https://docs.fauna.com/fauna/current/security/roles) to define the access privileges that authenticated Auth0 users should have.
    
    When your users are stored in the IdP, they are not stored in Fauna so the usual [membership](https://docs.fauna.com/fauna/current/security/abac#membership) field in an [ABAC](https://docs.fauna.com/fauna/current/security/abac) role cannot apply. However, an [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider) document lets you specify one or more roles that should be applied in order to grant externally-authenticated users appropriate access.
    

## [](#minimum)Minimum viable configuration

Successful acceptance of a JWT for authentication requires that your Fauna database and [Auth0](https://www.auth0.com/) agree on their respective configurations for the following details:

-   The `audience` URL. Auth0 needs this field in order to create JWTs that can be accepted by Fauna. When you create an [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider) document, Fauna creates a unique `audience` URL for your database.
    
-   The `issuer` URL. This tells Fauna which IdP is permitted to send a JWT that should authorize a query to be executed.
    
    Use an exact copy of your IdP’s `issuer` URL, including a trailing slash (if there is one). URL differences could prevent Fauna acceptance of your IdP’s JWT tokens.
    
-   The `jwks_uri` URL. This is the URL to the JSON Web Key Set containing the public key managed by the IdP that services, such as Fauna can use to verify, or decrypt, a JWT and confirm that it is legitimate. The standard convention is that this URL is the `issuer` URL with `.well-known/jwks.json` appended.
    

This section covers the minimum configuration steps required to accept a JWT from an IdP in order to execute a query.

Use one browser tab/window for the [Fauna Dashboard](https://dashboard.fauna.com/), and another for the [Auth0](https://www.auth0.com/) web interface.

### [](#fauna-part1)Fauna - part 1

In this section, we configure an Access Provider in your Fauna database. Perform these steps in a browser tab/window:

1.  Log in to the [Fauna Dashboard](https://dashboard.fauna.com/).
    
2.  Click on the database that should accept authenticated users from Auth0.
    
3.  Click the **Security** link in the left navigation pane.
    
4.  Click the **Providers** link near the top of the page.
    
5.  Click the **New Access Provider** link.
    
    At this point, the **New Access Provider** screen is displayed:
    
    ![The New Access Provider screen in the Dashboard](https://docs.fauna.com/fauna/current/security/external/auth0../_images/screen-dashboard-new_access_provider.png)
    
6.  Click the icon beside the **Audience** field to copy the URL, or select the entire URL beginning with `https://db.fauna.com/db/` and copy it.
    

At this point, we have the **Audience** URL copied. We have not completed configuration of the Access Provider, but we need to do some configuration in Auth0 first. Do not close the browser window — later steps expect to proceed from this point.

### [](#auth0)Auth0 configuration

In this section, we configure an API within Auth0, using the Audience URL that we copied in the previous step. Perform these steps in a separate browser tab/window:

1.  Log in to [Auth0](https://www.auth0.com/).
    
2.  Click the **APIs** link in the left navigation pane.
    
3.  Click the **\+ Create API** button.
    
    At this point, the **New API** dialog is displayed:
    
    ![The New API screen in Auth0](https://docs.fauna.com/fauna/current/security/external/auth0../_images/screen-auth0-new_api.png)
    
4.  Fill out the API fields:
    
    1.  Enter a name in the **Name** field to help you identify this API. We recommend combining "Fauna" with your database’s name. For example: `Fauna-my_app`.
        
    2.  Paste the **Audience** URL, that you copied from the previous steps, into the **Identifier** field.
        
    
5.  Click the **Create** button.
    
6.  Click the "Test" tab.
    
    At this point, your Auth0 API’s **Test** tab is displayed:
    
    ![The Auth0 API screen with the Test tab selected](https://docs.fauna.com/fauna/current/security/external/auth0../_images/screen-auth0-api_test.png)
    
7.  Locate the `--url` value in the code sample: we need to copy a portion of the URL, omitting the `oauth/token` portion. Copy the URL’s prefix. In the screenshot, the value to copy is `https://dev—nozpv3z.us.auth0.com/` (your URL is unique and differs from the screenshot).
    

At this point, we have copied the API-specific URL that is used to create the `issuer` and `jwks_uri` fields in the Fauna configuration.

### [](#fauna-part2)Fauna - part 2

In this section, we complete the configuration of an Access Provider in your Fauna database, using the API-specific "issuer" URL that we copied in the previous step. Return to the browser tab/window showing the [Fauna Dashboard](https://dashboard.fauna.com/) and perform the following steps:

1.  Enter a name into the **Name** field to help you identify this access provider. We recommend using the IdP’s name — in this case, "Auth0".
    
2.  Paste the Auth0 API-specific URL, that you copied in the previous step, into the **Issuer** field.
    
3.  Paste the Auth0 API-specific URL, from the previous step, into the **JSON Wen Key Secret URI** field.
    
4.  Append `.well-known/jwks.json` to the **JSON Wen Key Secret URI** field. For example, if your Auth0 API-specific URL is `https://dev—nozpv3z.us.auth0.com/`, the **JSON Wen Key Secret URI** field should contain `https://dev—nozpv3z.us.auth0.com/.well-known/jwks.json` at this point.
    
5.  Select a role to apply to users authenticated by Auth0. You can specify more than one role, if necessary.
    
6.  Click the **SAVE** button.
    

You can perform the Access Provider configuration using the [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider) function.

### [](#verify)Verify

At this point, both your Fauna database and your Auth0 API are configured to exchange authentication information via a JWT. To verify that the configuration works, follow these steps:

1.  In the browser tab/window that you are using for Auth0, where the "Test" tab is still displayed, make sure that the `cURL` tab is selected.
    
2.  Copy the contents of the `cURL` code sample. The code sample begins with `curl --request POST \`.
    
3.  Open a terminal window.
    
4.  Paste the code sample into the terminal window, and press Return to execute it.
    
5.  The output should be similar to:
    
    ```json
    {"access_token":"eyJhbGcIqiJSUzI1N5IsInR5cCi6IkpXVCIsImTpZCI6ilNCZTczWmFyOWpKU3hueG44QlNTSqJ9.eyJpc3MiOiJQdHRwczovL2R6di0tbm96cHYzei51cy5hdXRoMC5jb20vIiwic3ViIjoibDZ2SlM4UXZIQzJMbWlHUmFPVGlFMTZnaXZ1dWZSMjJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGIuZmF1bmEuY29tL2RiL3l4eGY1eDl3MXlieW4iLCJpYXQiOjE2MDU1MDI2NDgsImV4cCI6MTYwNTU4OTA0OCwiYXpwIjoibDZ2SlM4UXZIQzJMbWlHUmFPVGlFMTZnaXZ1dWZSMjIiLCJndHkiOiJjbGllbnQtY3JlZG.udGlhbHMif6.pdnzxME8gaQkyxsWhurgVzQcakcnMRUJEGcb83f_lgd0tWaE-VcFcfb-SXLCFX3IcJkls9woQVcFM911UCHRN_qSKjEzB1vOrFqQ73FSq33dLviGM_8E195R_zJVmCsb__ADhQCaWTYM-vO8ZSA7lC2WzVejLAg8CJhOXwP7WGeG_FDfqVDM0InaJdVOoUwXF4SzZ00DVjJxSoKnsiRgwpPyaV3rGAQGVlijyYe1mea7D3g2jHO2a-yUV-yT75xglTyjwC5WKHySXgu-iXq7x6N5JIRAcBh2-ka6sS5o61JHR35sFfXYpUiSiPj45XLsnGhB7wbVwvq4mA3ur1bePg","expires_in":86400,"token_type":"Bearer"}
    ```
    

The value of the `access_token` field can be used in place of the secret from a Fauna [token](https://docs.fauna.com/fauna/current/security/tokens) or [key](https://docs.fauna.com/fauna/current/security/keys). This specific token identifies your user account in Auth0.

The easiest way to test that the JWT access token works is with [`fauna-shell`](https://docs.fauna.com/fauna/current/integrations/shell/). First, start `fauna-shell` using the secret:

terminal

```bash
fauna shell --secret=eyJhbGcIqiJSUzI1N5IsInR5cCi6IkpXVCIsImTpZCI6ilNCZTczWmFyOWpKU3hueG44QlNTSqJ9.eyJpc3MiOiJQdHRwczovL2R6di0tbm96cHYzei51cy5hdXRoMC5jb20vIiwic3ViIjoibDZ2SlM4UXZIQzJMbWlHUmFPVGlFMTZnaXZ1dWZSMjJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGIuZmF1bmEuY29tL2RiL3l4eGY1eDl3MXlieW4iLCJpYXQiOjE2MDU1MDI2NDgsImV4cCI6MTYwNTU4OTA0OCwiYXpwIjoibDZ2SlM4UXZIQzJMbWlHUmFPVGlFMTZnaXZ1dWZSMjIiLCJndHkiOiJjbGllbnQtY3JlZG.udGlhbHMif6.pdnzxME8gaQkyxsWhurgVzQcakcnMRUJEGcb83f_lgd0tWaE-VcFcfb-SXLCFX3IcJkls9woQVcFM911UCHRN_qSKjEzB1vOrFqQ73FSq33dLviGM_8E195R_zJVmCsb__ADhQCaWTYM-vO8ZSA7lC2WzVejLAg8CJhOXwP7WGeG_FDfqVDM0InaJdVOoUwXF4SzZ00DVjJxSoKnsiRgwpPyaV3rGAQGVlijyYe1mea7D3g2jHO2a-yUV-yT75xglTyjwC5WKHySXgu-iXq7x6N5JIRAcBh2-ka6sS5o61JHR35sFfXYpUiSiPj45XLsnGhB7wbVwvq4mA3ur1bePg
Connected to http://localhost:8443
Type Ctrl+D or .exit to exit the shell
>
```

Then execute a simple query:

shell

```shell
Add(1, 1)
2
```

If you have mis-copied the access token, or have waited long enough for the JWT to expire, the result that you receive would be:

shell

```fql
Error: unauthorized
{
  errors: [
    {
      code: 'unauthorized',
      description: 'Unauthorized'
    }
  ]
}
>
```

## [](#related)Related

-   [JSON Web Tokens (JWTs)](https://docs.fauna.com/fauna/current/security/external/jwt)
    
-   [AccessProvider](https://docs.fauna.com/fauna/current/security/external/access_provider)
    
-   [`AccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/accessprovider)
    
-   [`AccessProviders`](https://docs.fauna.com/fauna/current/api/fql/functions/accessproviders)
    
-   [`CreateAccessProvider`](https://docs.fauna.com/fauna/current/api/fql/functions/createaccessprovider)
    
