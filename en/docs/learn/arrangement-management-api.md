When a customer revoke granted consents there should be a mechanism to inform relevant parties that the particular CDR
Arrangement ID is not valid anymore. The Data Recipients use the CDR Arrangement Management API, which facilitates
this requirement. If this communication does not take place, the Data Holder will continue to expose the customer's
data and the Data Recipient will continue to have the customer's data within their system. Therefore, it is important
to communicate the revocation to both parties to protect customer data and prevent misuse.

### Data Holder Initiated Consent Revocation via Data Recipient's Consent Revocation Endpoint

As per the CDS specification, if a consent is withdrawn by a customer via the Data Holder’s Consent Dashboard, the
Data Holders must notify the Data Recipient of this revocation of the sharing arrangement. This is done by invoking
the Data Recipient's CDR Arrangement Revocation endpoint with a valid CDR Arrangement ID. 

??? tip "Click here to see a sample decoded SSA..."
    The Data Recipients must expose their CDR Arrangement Revocation endpoint under the `recipient_base_uri` claim in their SSA.

      ```
      {
      "iss": "cdr-register",
      "iat": 1571808167,
      "exp": 2147483646,
      "jti": "3bc205a1ebc943fbb624b14fcb241196",
      "legal_entity_id": "3B0B0A7B-3E7B-4A2C-9497-E357A71D07C7",
      "legal_entity_name": "Mock Company Pty Ltd.",
      "org_id": "3B0B0A7B-3E7B-4A2C-9497-E357A71D07C8",
      "org_name": "Mock Company Brand",
      "client_name": "Mock Software",
      "client_description": "A mock software product for testing SSA",
      "client_uri": "https://www.mockcompany.com.au",
      "redirect_uris": [
      "https://www.mockcompany.com.au/redirects/redirect1",
      "https://www.mockcompany.com.au/redirects/redirect2"
      ],
      "sector_identifier_uri": "https://www.mockcompany.com.au/sector_identifier",
      "logo_uri": "https://www.mockcompany.com.au/logos/logo1.png",
      "tos_uri": "https://www.mockcompany.com.au/tos.html",
      "policy_uri": "https://www.mockcompany.com.au/policy.html",
      "jwks_uri": "https://www.mockcompany.com.au/jwks",
      "revocation_uri": "https://www.mockcompany.com.au/revocation",
      "recipient_base_uri": "https://www.mockcompany.com.au",
      "software_id": "740C368F-ECF9-4D29-A2EA-0514A66B0CDE",
      "software_roles": "data-recipient-software-product",
      "scope": "openid profile bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration"
      }
      ```

      The Data Recipient's CDR Arrangement Revocation endpoint is `<recipient_base_uri>/arrangements/revoke`. 
      For example, `https://www.mockcompany.com.au/arrangements/revoke`

      - This needs to be done before enabling this feature, using a DCR PUT request and if the Data Recipients modify this 
        endpoint, they should update their client registrations with each Data Holder as well.

## Invoking CDR Arrangement Management API  

This API consists of the following endpoint.

### Revoke a sharing arrangement

This endpoint is to revoke a sharing arrangement (consent) between the Data Holder and the Data Recipient. This endpoint
must be implemented by both Data Holders and Data Recipients and notifies each other when a CDR Arrangement ID is revoked.