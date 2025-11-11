# CDR Arrangement Revocation API

When a customer revokes a granted consent there should be a mechanism to inform relevant parties that the particular CDR 
Arrangement ID is not valid anymore. The Data Recipients use the CDR Arrangement Management API, which facilitates 
this requirement. If this communication does not take place, the Data Holder will continue to expose the customer's 
data and the Data Recipient will continue to have the customer's data within their system. Therefore, it is important 
to communicate the revocation to both parties to protect customer data and prevent misuse.

This page explains how to configure and deploy the CDR Arrangement Management API.
in the latest updates of WSO2 Open Banking.

## Configuring CDR Arrangement Revocation API

!!! tip "Before you begin..."

     1. Open the `<IS_HOME>/repository/conf/deployment.toml` file. 

     2. Configure the event listener tags as follows. These endpoints are used to configure the private key JWT Client Authenticator. 
        ```
         [[event_listener]]
         id = "cds_arrangement_private_key_jwt_authenticator"
         type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
         name = "com.wso2.openbanking.cds.identity.authenticator.CDSArrangementPrivateKeyJWTClientAuthenticator"
         order = "-13"
         enable = true
          
         [event_listener.properties]
         TokenEndpointAlias = "https://<APIM_HOST>:8243/arrangements/1.0.0"
        ```
     3. Open the `<APIM_HOME>/repository/conf/deployment.toml` file. 

     4. Add the given executors under the executor type "Arrangement" to enforce MTLS security and other required validations.
        ```
        [[open_banking.gateway.openbanking_gateway_executors.type]]
        name = "Arrangement"
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor"
        priority = 1
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.CertRevocationValidationExecutor"
        priority = 2
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.accelerator.gateway.executor.impl.api.resource.access.validation.APIResourceAccessValidationExecutor"
        priority = 3
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.accelerator.gateway.executor.impl.common.reporting.data.executor.CommonReportingDataExecutor"
        priority = 4
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.cds.gateway.executors.reporting.CDSCommonDataReportingExecutor"
        priority = 5
        [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
        name = "com.wso2.openbanking.cds.gateway.executors.error.handler.CDSErrorHandler"
        priority = 1000
        ```

### Data Holder Initiated Consent Revocation 

If a consent is withdrawn by a customer via the Data Holder’s Consent Dashboard, the 
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

      - This needs to be done before enabling this feature, using a DCR PUT request.  If the Data Recipients modify this 
        endpoint, they should update their client registrations with each Data Holder as well.

## Deploying the Arrangement Management API

1. Sign in to the API Publisher portal at `https://<APIM_HOST>:9443/publisher` with `creator/publisher` privileges.

    ![sign_into](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**.

    ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. 
   
    ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/ArrangementRevocation/cdr-arrangement-mgt-api.yaml` file.

5. Click **Next**.

6. Set the **Endpoint** as follows:
    ```
     https://<IS_HOST>:9446/api/openbanking/cds-arrangement-revocation/arrangements
    ```
7. Click **Create** to create the API

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel.
   ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**.
   ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Go back to **Overview** using the left menu panel. 

12. Click **PUBLISH**

13. The published API is available in the Developer Portal at `https://<APIM_HOST>:9443/devportal`.

## Revoke a sharing arrangement

This endpoint is to revoke a sharing arrangement (consent) between the Data Holder and the Data Recipient. This endpoint 
must be implemented by both Data Holders and Data Recipients and notify each other when a CDR Arrangement ID is revoked.
A sample request is given below:

``` tab="Request"
POST https://data.holder.com.au/arrangements/1.0.0/revoke
HTTP/1.1
Host: data.holder.com.au
Content-Type: application/x-www-form-urlencoded
 
client_id=s6BhdRkqt3&
client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNDU2In0.ey ...&
cdr_arrangement_id=5a1bf696-ee03-408b-b315-97955415d1f0
```

``` tab="Response"
204 No Content
```