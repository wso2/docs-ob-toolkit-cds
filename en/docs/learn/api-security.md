# API Security

Open Banking allows Accredited Data Recipients to access financial data through open APIs, which requires greater API security. 
Therefore,  the Consumer Data Standards (CDS) recommends to ensure API security. It consists of the standards for 
grant types, authentication, and authorisation flows. For more information, see [CDS - Security Profile](https://consumerdatastandardsaustralia.github.io/standards/#security-profile).

The Consumer Data Standards has mandated the Financial API (FAPI) security standards for the Data Holders. WSO2 Open
Banking CDS Toolkit provides mkan extra level of security to the Open Banking APIs adhering to the security
guidelines provided in FAPI, which is based on OAuth 2.0 and OpenID Connect (OIDC).

## MTLS enforcement

Authentication is a crucial requirement in open banking to verify the authenticity of an Accredited Data Recipient before 
sharing the customer’s banking information. When an Accredited Data Recipient invokes APIs, their private credentials can 
be shared in the requests, and it leads to credential leakages and data thefts. Therefore, Mutual Transport Layer Security (MTLS)
is introduced as an authentication protocol where the Accredited Data Recipients do not need to send their private credentials.

MTLS handshake at the transport layer ensures that the corresponding Accredited Data Recipient possesses a secret key 
that is associated with the X509 certificate issued by a trusted Certificate Authority (CA).

In WSO2 Open Banking, MTLS is enforced at the API Manager level to check if

- the message context contains the transport certificate to make sure that the MTLS handshake is successful at the gateway.
- the transport certificate bound to the application when invoking the APIs.

There are two scenarios to consider for the MTLS validation:

1. If the client directly initiates an MTLS connection with the WSO2 API Manager Gateway, the issuer of the certificate 
needs to be present in the truststore of the gateway.

2. If the MTLS terminates at the load balancer prior to the gateway, the WSO2 API Manager Gateway expects the load balancer 
to send the client certificate as a header. In such scenarios, the WSO2 API Manager gateway expects the load balancer to 
perform the issuer validation.

Generally, open banking flows always consist of 3 different types of API requests by the client applications, 
known as [Authorization](#-authorisation-endpoint-security), [Token](#token-endpoint-security), and [Resource](#resource-request)
Requests. 

## Token endpoint security

The WSO2 Open Banking CDS Toolkit uses the Authorization Code grant type to ensure token endpoint security. When a Data 
Recipient attempts to access consumer data, the CDS Toolkit requests the bank customer to authorise the Data Recipient by 
granting consent for the Data Recipient to access that account information. Once the user grants the consent, the user is 
redirected to the redirect URL of the Data Recipient with the authorization code. Using the generated authorization code, 
the Data Recipient can generate the user access token.

The Data Recipients use the Token Endpoint to obtain access tokens, id tokens, and optionally, a refresh token. Following 
security features are available in WSO2 Open Banking during Token flows.

- The Data Recipients can authenticate the authorization server when accessing the token endpoint using any of the following methods:
    - Private key JWT authentication (Auth code grant)
    - MTLS authentication (Auth code grant)
    - Client Assertion (Client Credentials Grant)
- Bind consent Id and MTLS certificate to the token
- Provide verification mechanisms such as PKCE, if initiated in the authorization flow

## Refresh Tokens

Refresh tokens are used to get a new user access token from the authentication server in order to access a specific resource. 
Mostly, a refresh token is generated when the user access token has expired.

WSO2 Open Banking CDS Toolkit provides Private Key JWT to secure the token endpoint that is used by Data Recipients to obtain the 
application and access tokens. Private Key JWT is the default token endpoint authenticator used in CDS Toolkit.

## Resource Request

After a Data Recipient obtains an access token, it is used to invoke a resource endpoint. In this request,
the following validations will be performed:

- Token validity verification
- Token type verification 
- Scopes/roles validation
- Token-bound certificate validation
- Consent validation

## Holder of Key validation

Holder of Key validation ensures that the user access token bounds with the Data Recepient's transport certificate, which 
was presented during the token request. For this, the user access token needs to be bound with the MTLS certificate.

## Authorisation endpoint security

WSO2 Open Banking supports the following security features and fulfil FAPI requirements
during Authorization flows:

- OIDC Hybrid Flow
    - Request object verification
    - Pushed Authorization Request validation
    - Pairwise Identifier support for ID tokens
- Authorization Code Flow
    - When a request object is not available, support authentication mechanisms such as PKCE

WSO2 Open Banking CDS Toolkit enhances the security of the authorisation code grant type in authorisation endpoint security with 
request object and response type attributes.

???Tip "Once decoded, the request object that is used to get the Data Recipient's information looks as follows:"
    ```
    {
    "kid": "<Certificate fingerprint>",
    "typ": "JWT",
    "alg": "<Supported algorithm>"
    }
    {
    "iss": "<Application ID>",
    "aud": "<Audience the ID Token is intended for. For example,https://<WSO2_OB_APIM_HOST>:8243/token>",
    "response_type": "<code:Retrieves authorize code, code id_token: Retrieves authorize token and ID token>",
    "exp": <A JSON number representing the number of seconds from 1970-01-01T00:00:00Z to the UTC expiry time>,
    "client_id": "<Application ID>",
    "redirect_uri": "<Redirect URL of the client application>",
    "scope": "<Available scopes are bank:accounts.basic:read, bank:accounts.detail:read, bank:transactions:read, bank:payees:read, bank:regular_payments:read, common:customer.basic:read, and common:customer.detail:read >",
    "state": "af0ifjsldkj",
    "nonce": "<Prevents replay attacks>",
    "claims": {
    "sharing_duration": "<Requested duration for sharing, in seconds>",
    "id_token": {
    "acr": {
    "values": ["urn:cds.au:cdr:3"]
    }
    }
    }
    }
    <signature>
    ```

    !!!Note
        The `sharing_duration` claim in the request object defines the validity period of the refresh token. This is to limit the validity of the consent to the defined period.
    
!!!Note
    The Token Introspection Endpoint and Token Revocation Endpoints are protected with Private Key JWT Client Authentication 
    and therefore it is mandatory to have the `client-id` parameter in these request bodies.