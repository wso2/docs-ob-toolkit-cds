This page explains how to onboard Accredited Data Recipient applications using the Dynamic Client Registration API. 

### Step 1: Deploy the Dynamic Client Registration (DCR) API

1. Sign in to the API Publisher Portal at `https://<APIM_HOME>:9443/publisher` with `creator/publisher` 
privileges.
    
    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/
openbanking.org.au/DynamicClientRegistration/0.2/au-dcr-swagger.yaml` file.

5. Click **Next**.

6. Set the Endpoint as follows:

    ```
    https://<IS_HOST>:9446/api/openbanking/dynamic-client-registration
    ```

6. Click **Create** to create the API. ![create-dcr-api](../assets/img/get-started/quick-start-guide/create-dcr.png)

7. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

9. Click **Save**.

10. Once you get the message that the API is successfully updated, use the left menu panel and select **API Configurations > Runtime**. 

    ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)
    
11. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

12. Now, select the **Custom Policy** option.

13. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/openbanking.org.au/DynamicClientRegistration/0.2/au-dcr-insequence-0.2.xml` file. ![dcr_insequence](../assets/img/get-started/quick-start-guide/dcr-insequence.png)
 
14. Click **Select**. 

15. Scroll down and click **SAVE**.

16. Use the left menu panel and go to **API Configurations > Endpoints**. 

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

17. Go to **Deployments** using the left menu pane. 

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

18. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

19. Click **Deploy**.

20. Go to **Overview** using the left menu pane. 

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

21. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

22. The deployed API is now available in the Developer Portal at `https://<APIM_HOME>:9443/devportal`.

23. Upload the root and issuer certificates found [here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox) 
    to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and 
    `<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:
    
    ```
    keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
    ```
                
24. Restart the Identity Server and API Manager instances.

## Step 2: Configure IS as Key Manager

 1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOST>:9443/admin`.
 2. Go to **Key Manager** on the left main menu. ![add_Key_Manager](../assets/img/get-started/quick-start-guide/add_Key_Manager.png)
 3. Click **Add New Key Manager** and configure Key Manager. 
    
    ??? tip "Click here to see the full list of configurations..."
        | Configuration       | Description                           | Value                    |
        | -------------       |-------------                          | -----                    |
        | Name                | The name of the authorization server. | OBKM                     |
        | Display Name        | A name to display on the UI.          | OBKM                     |
        | Description         | The name of the authorization server. | (Optional)               |
        | Key Manager Type    | The type of the Key Manager to be selected. | Select `ObKeyManager` |
        |Well-known-url      | The well-known URL of the authorization server (Key Manager).|   `https://<IS_HOST>:9446/oauth2/token/.well-known/openid-configuration` |
        | Issuer              | The issuer that consumes or validates access tokens.         | `https://<IS_HOST>:9446/oauth2/token` |
        |**Key Manager Endpoints**                                                                |
        | Client Registration Endpoint | The endpoint that verifies the identity and obtain profile information of the end-user based on the authentication performed by an authorization server.  |  `https://<IS_HOST>:9446/keymanager-operations/dcr/register`| 
        | Introspection Endpoint | The endpoint that allows authorized protected resources to query the authorization server to determine the set of metadata for a given token that was presented to them by an OAuth Client. | `https://<IS_HOST>:9446/oauth2/introspect` |
        | Token Endpoint      | The endpoint that issues the access tokens. | `https://<IS_HOST>:9446/oauth2/token` |
        | Revoke Endpoint     | The endpoint that revokes the access tokens.| `https://<IS_HOST>:9446/oauth2/revoke` |
        | Userinfo Endpoint   | The endpoint that allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user. | `https://<IS_HOST>:9446/oauth2/userinfo?schema=openid` |
        | Authorize Endpoint  | The endpoint used to obtain an authorization grant from the resource owner via the user-agent redirection. | `https://<IS_HOST>:9446/oauth2/authorize` |
        | Scope Management Endpoint | The endpoint used to manage the scopes. | `https://<IS_HOST>:9446/api/identity/oauth2/v1.0/scopes` |
        | **Connector Configurations**                        |
        | Username            | The username of an admin user who is authorized to connect to the authorization server. |  |
        | Password            | The password corresponding to the latter mentioned admin user who is authorized to connect to the authorization server. | |
        | **Claim URIs**      |   
        | Consumer Key Claim URI | The claim URI for the consumer key.  | (Optional)  |
        | Scopes Claim URI | The claim URI for the scopes | (Optional) | 
        | Grant Types | The supported grant types. According to your open banking specification, add multiple grant types by adding a grant type press Enter. For example, `refresh_token`, `client_credentials`, `authorization_code`.| (Optional) |
        | **Certificates** | 
        | PEM | Either copy and paste the certificate in PEM format or upload the PEM file. | (Optional) |
        | JWKS | The JSON Web Key Set (JWKS) endpoint is a read-only endpoint. This URL returns the Identity Server's public key set in JSON web key set format. This contains the signing key(s) the Relying Party (RP) uses to validate signatures from the Identity Server. | `https://<IS_HOST>:9446/oauth2/jwks` |
        | **Advanced Configurations** |
        | Token Generation | This enables token generation via the authorization server. | (Mandatory) |
        | Out Of Band Provisioning | This enables the provisioning of Auth clients that have been created without the use of the Developer Portal, such as previously created Auth clients. | (Mandatory) |
        | Oauth App Creation | This enables the creation of Auth clients. | (Mandatory) |
        | **Token Validation Method** | The method used to validate the JWT signature. |
        | Self Validate JWT | The kid value is used to validate the JWT token signature. If the kid value is not present, `gateway_certificate_alias` will be used. | (Mandatory) |
        | Use introspect | The JWKS endpoint is used to validate the JWT token signature. | - |
        | Token Handling Options | This provides a way to validate the token for this particular authorization server. This is mandatory if the Token Validation Method is introspect.| (Optional) |
        | REFERENCE | The tokens that match a specific regular expression (regEx) are validated. e.g., <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}</code> | (Optional) |
        | JWT | The tokens that match a specific JWT are validated. | Select this icon |
        | CUSTOM | The tokens that match a custom pattern are validated. | (Optional) |
        | **Claim Mappings** | Local and remote claim mapping. | (Optional) |
    

3. Go to the list of Key Managers and select **Resident Key Manager**. ![select_resident_KM](../assets/img/get-started/quick-start-guide/select_resident_KM.png)

4. Locate **Connector Configurations** and provide a username and a password for a user with super admin credentials.

5. Click **Update**.

6. Disable the Resident Key Manager. ![disable_resident_KM](../assets/img/get-started/quick-start-guide/disable_resident_KM.png)

## Step 3: Register an application

Accredited Data Recipients use the DCR API to request the Data Holder to register a new client. 

The registration request is a POST request that includes a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains client metadata. It is a signed JWT issued by the Open Banking directory and the Accredited Data Recipients need to obtain it before registering with a Data Holder.

This section explains the client registration process. A sample request is as follows:

- For the Transport Layer Security purposes in this sample flow, you can use the attached
  [private key](../../assets/attachments/transport-certs/obtransport.key) and
  [public certificate](../../assets/attachments/transport-certs/obtransport.pem).
```  
curl -X POST https://<APIM_HOME>:8243/open-banking/0.2/register \
 -H 'Content-Type: application/jwt' \
 --cert <TRANSPORT_PUBLIC_CERT_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
 -d 'eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJzZ3NNdWM4QUNCZ0J6aW5wcjhvSjFYIiwiaWF0IjoxNjIwMTg1OTc0LCJleHAiOjE2NTAxODk1NzQsImp0aSI6IjM3NzQ3Y2QxLWMxMDUtNDU2OS05Zjc1LTRhZGYyOGI3M2UzNCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojk0NDYvb2F1dGgyL3Rva2VuIiwicmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3dzbzIuY29tIl0sInRva2VuX2VuZHBvaW50X2F1dGhfc2lnbmluZ19hbGciOiJQUzI1NiIsInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoicHJpdmF0ZV9rZXlfand0IiwiZ3JhbnRfdHlwZXMiOlsiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVmcmVzaF90b2tlbiIsImNsaWVudF9jcmVkZW50aWFscyJdLCJyZXNwb25zZV90eXBlcyI6WyJjb2RlIGlkX3Rva2VuIl0sImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiUFMyNTYiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfYWxnIjoiUlNBLU9BRVAiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfZW5jIjoiQTEyOENCQy1IUzI1NiIsInJlcXVlc3Rfb2JqZWN0X3NpZ25pbmdfYWxnIjoiUFMyNTYiLCJzb2Z0d2FyZV9zdGF0ZW1lbnQiOiJleUpoYkdjaU9pSlFVekkxTmlJc0ltdHBaQ0k2SWpKTlNUbFlVMHRwTm1Sa2VFTmlWMmN5Y21oRVRuUlZiSGhLWXlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUpqWkhJdGNtVm5hWE4wWlhJaUxDSnBZWFFpT2pFMU56RTRNRGd4Tmpjc0ltVjRjQ0k2TWpFME56UTRNelkwTml3aWFuUnBJam9pTTJKak1qQTFZVEZsWW1NNU5ETm1ZbUkyTWpSaU1UUm1ZMkl5TkRFeU1EQWlMQ0p2Y21kZmFXUWlPaUl6UWpCQ01FRTNRaTB6UlRkQ0xUUkJNa010T1RRNU55MUZNelUzUVRjeFJEQTNRemdpTENKdmNtZGZibUZ0WlNJNklrMXZZMnNnUTI5dGNHRnVlU0JKYm1NdUlpd2lZMnhwWlc1MFgyNWhiV1VpT2lKTmIyTnJJRk52Wm5SM1lYSmxJREVpTENKamJHbGxiblJmWkdWelkzSnBjSFJwYjI0aU9pSkJJRzF2WTJzZ2MyOW1kSGRoY21VZ2NISnZaSFZqZENCbWIzSWdkR1Z6ZEdsdVp5QlRVMEVpTENKamJHbGxiblJmZFhKcElqb2lhSFIwY0hNNkx5OTNkM2N1Ylc5amEyTnZiWEJoYm5rdVkyOXRMbUYxSWl3aWNtVmthWEpsWTNSZmRYSnBjeUk2V3lKb2RIUndjem92TDNkemJ6SXVZMjl0SWwwc0lteHZaMjlmZFhKcElqb2lhSFIwY0hNNkx5OTNkM2N1Ylc5amEyTnZiWEJoYm5rdVkyOXRMbUYxTDJ4dloyOXpMMnh2WjI4eExuQnVaeUlzSW5SdmMxOTFjbWtpT2lKb2RIUndjem92TDNkM2R5NXRiMk5yWTI5dGNHRnVlUzVqYjIwdVlYVXZkRzl6TG1oMGJXd2lMQ0p3YjJ4cFkzbGZkWEpwSWpvaWFIUjBjSE02THk5M2QzY3ViVzlqYTJOdmJYQmhibmt1WTI5dExtRjFMM0J2YkdsamVTNW9kRzFzSWl3aWFuZHJjMTkxY21raU9pSm9kSFJ3Y3pvdkwydGxlWE4wYjNKbExtOXdaVzVpWVc1cmFXNW5kR1Z6ZEM1dmNtY3VkV3N2TURBeE5UZ3dNREF3TVVoUlVYSmFRVUZZTDNObmMwMTFZemhCUTBKblFucHBibkJ5T0c5S09FSXVhbmRyY3lJc0luSmxkbTlqWVhScGIyNWZkWEpwSWpvaWFIUjBjSE02THk5bmFYTjBMbWRwZEdoMVluVnpaWEpqYjI1MFpXNTBMbU52YlM5cGJXVnphRGswTHpNeE56SmxNbVUwTlRjMU4yTmtZVEE0WldNeU56STNaamt3WWpjeVkyVmtMM0poZHk5bVpqQmtNMlZoWW1VMFkyUmtZMlUwTjJWbFl6QXlNamhtTlRreU1UYzFNakl6WkdRNU1tSXlMM2R6YnpJdFlYVXRaR055TFdSbGJXOHVhbmRyY3lJc0luSmxZMmx3YVdWdWRGOWlZWE5sWDNWeWFTSTZJbWgwZEhCek9pOHZkM2QzTG0xdlkydGpiMjF3WVc1NUxtTnZiUzVoZFNJc0luTnZablIzWVhKbFgybGtJam9pYzJkelRYVmpPRUZEUW1kQ2VtbHVjSEk0YjBveFdDSXNJbk52Wm5SM1lYSmxYM0p2YkdWeklqb2laR0YwWVMxeVpXTnBjR2xsYm5RdGMyOW1kSGRoY21VdGNISnZaSFZqZENJc0luTmpiM0JsSWpvaWIzQmxibWxrSUhCeWIyWnBiR1VnWW1GdWF6cGhZMk52ZFc1MGN5NWlZWE5wWXpweVpXRmtJR0poYm1zNllXTmpiM1Z1ZEhNdVpHVjBZV2xzT25KbFlXUWdZbUZ1YXpwMGNtRnVjMkZqZEdsdmJuTTZjbVZoWkNCaVlXNXJPbkJoZVdWbGN6cHlaV0ZrSUdKaGJtczZjbVZuZFd4aGNsOXdZWGx0Wlc1MGN6cHlaV0ZrSUdOdmJXMXZianBqZFhOMGIyMWxjaTVpWVhOcFl6cHlaV0ZrSUdOdmJXMXZianBqZFhOMGIyMWxjaTVrWlhSaGFXdzZjbVZoWkNCalpISTZjbVZuYVhOMGNtRjBhVzl1SWl3aWMyVmpkRzl5WDJsa1pXNTBhV1pwWlhKZmRYSnBJam9pYUhSMGNITTZMeTkzZDNjdWJXOWphMk52YlhCaGJua3VZMjl0TG1GMUwzTmxZM1J2Y2lKOS5ZMnRIWDFET3U0cmlja0FCYUVvRHFsdXZ6OEszTUV4UGJqbm5SbjVtenAxMEFkQnB0VWZJaU1zOTVPU1BqOV9xdm9ISlF3OHhOcHdhZlZSQS1XYlV1b3lpQ0NWdENPTFFvNHBHdmlteVNnVjV6eWkwVF8xeHplV3I1VmhCVXJ3ZkEtY0pHYUlFTXhQR2Joc2VmS09iQXVleHhUdnc1aVZNX0dqaFNXa0NUeEF3N3RSOEYwaFZ0dHBqVFlzMHJRSjg0WG96SzdzUFdTUS1EbURVRG9ZSlV6eXFvTkVVekZHeFFVQVlHdHZNdDFKY0dRSUZDOTA4TkxLc3hEaV9SQTNrQXl3eHl1Z0dYNm1CUDYxQnpHbE1pc3BWVV94M1JZUW5CTmVNUldxaDBEckpFRHpDVk5UTlp4TS1URE5oRlY2WlJMdTRoaTBacVp3a21kLW1JU0RxZ2cifQ.eBjvZWPBxbVweDvivOyKAMVSr6BjPpJYHyVE9FWPFHjfHstPC4EtRYp6AGs2cXdKwqWx3wvqxzYjrGtPcd-utrT9fsF2LTHXMNiOVKXksrTGHp7HVO5iKf-lUrGPMtSlYlyxNNk8qeikHUGEAsCYU2M7kEOzzYdkgFkzyKPQ5brviD3-2prOgO_TNtEZ1pePKhjLQJ5-8h-iIv1_BhvMJBkakilAzh65Sjuy0JzkxVeH2pN7jhNekZvOMAvuFq-X9EPL8LOniBRr6seLUTlGUAF5RzRWPhlXPnHXAqQKX6gN1s0uCP4X0HntqRUbrB6-BgoDl_ZHpIfDNDoujftf-A'
 
```

- The payload is a signed JWT in the following format:
``` json
{
  "typ": "JWT",
  "kid": "2MI9XSKi6ddxCbWg2rhDNtUlxJc",
  "alg": "PS256"
}
{
  "iss": "sgsMuc8ACBgBzinpr8oJ1X",
  "iat": 1620185974,
  "exp": 1650189574,
  "jti": "37747cd1-c105-4569-9f75-4adf28b73e34",
  "aud": "https://localhost:9446/oauth2/token",
  "redirect_uris": [
    "https://wso2.com"
  ],
  "token_endpoint_auth_signing_alg": "PS256",
  "token_endpoint_auth_method": "private_key_jwt",
  "grant_types": [
    "authorization_code",
    "refresh_token",
    "client_credentials"
  ],
  "response_types": [
    "code id_token"
  ],
  "application_type": "web",
  "id_token_signed_response_alg": "PS256",
  "id_token_encrypted_response_alg": "RSA-OAEP",
  "id_token_encrypted_response_enc": "A128CBC-HS256",
  "request_object_signing_alg": "PS256",
  "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IjJNSTlYU0tpNmRkeENiV2cycmhETnRVbHhKYyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZHItcmVnaXN0ZXIiLCJpYXQiOjE1NzE4MDgxNjcsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMjA1YTFlYmM5NDNmYmI2MjRiMTRmY2IyNDEyMDAiLCJvcmdfaWQiOiIzQjBCMEE3Qi0zRTdCLTRBMkMtOTQ5Ny1FMzU3QTcxRDA3QzgiLCJvcmdfbmFtZSI6Ik1vY2sgQ29tcGFueSBJbmMuIiwiY2xpZW50X25hbWUiOiJNb2NrIFNvZnR3YXJlIDEiLCJjbGllbnRfZGVzY3JpcHRpb24iOiJBIG1vY2sgc29mdHdhcmUgcHJvZHVjdCBmb3IgdGVzdGluZyBTU0EiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1IiwicmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3dzbzIuY29tIl0sImxvZ29fdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L2xvZ29zL2xvZ28xLnBuZyIsInRvc191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvdG9zLmh0bWwiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3BvbGljeS5odG1sIiwiandrc191cmkiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Nnc011YzhBQ0JnQnppbnByOG9KOEIuandrcyIsInJldm9jYXRpb25fdXJpIjoiaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9pbWVzaDk0LzMxNzJlMmU0NTc1N2NkYTA4ZWMyNzI3ZjkwYjcyY2VkL3Jhdy9mZjBkM2VhYmU0Y2RkY2U0N2VlYzAyMjhmNTkyMTc1MjIzZGQ5MmIyL3dzbzItYXUtZGNyLWRlbW8uandrcyIsInJlY2lwaWVudF9iYXNlX3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInNvZnR3YXJlX2lkIjoic2dzTXVjOEFDQmdCemlucHI4b0oxWCIsInNvZnR3YXJlX3JvbGVzIjoiZGF0YS1yZWNpcGllbnQtc29mdHdhcmUtcHJvZHVjdCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgYmFuazphY2NvdW50cy5iYXNpYzpyZWFkIGJhbms6YWNjb3VudHMuZGV0YWlsOnJlYWQgYmFuazp0cmFuc2FjdGlvbnM6cmVhZCBiYW5rOnBheWVlczpyZWFkIGJhbms6cmVndWxhcl9wYXltZW50czpyZWFkIGNvbW1vbjpjdXN0b21lci5iYXNpYzpyZWFkIGNvbW1vbjpjdXN0b21lci5kZXRhaWw6cmVhZCBjZHI6cmVnaXN0cmF0aW9uIiwic2VjdG9yX2lkZW50aWZpZXJfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3NlY3RvciJ9.Y2tHX1DOu4rickABaEoDqluvz8K3MExPbjnnRn5mzp10AdBptUfIiMs95OSPj9_qvoHJQw8xNpwafVRA-WbUuoyiCCVtCOLQo4pGvimySgV5zyi0T_1xzeWr5VhBUrwfA-cJGaIEMxPGbhsefKObAuexxTvw5iVM_GjhSWkCTxAw7tR8F0hVttpjTYs0rQJ84XozK7sPWSQ-DmDUDoYJUzyqoNEUzFGxQUAYGtvMt1JcGQIFC908NLKsxDi_RA3kAywxyugGX6mBP61BzGlMispVU_x3RYQnBNeMRWqh0DrJEDzCVNTNZxM-TDNhFV6ZRLu4hi0ZqZwkmd-mISDqgg"
}
<signature>
```

!!! note 
    If you change the payload, use the following certificates to sign the JWT and SSA:

    - [signing certificate](../../assets/attachments/signing-certs/obsigning.pem)
    - [private keys](../../assets/attachments/signing-certs/obsigning.key)

- The bank registers the application using the metadata sent in the SSA.

- If an application is successfully created, the bank responds with a JSON payload describing the application that was created. 
The TPP can then use the identifier (`Client ID`) to access customers' financial data on the bank's resource server. A sample response is 
given below:
```
{
   "client_name": "Mock Software",
   "client_description": "A mock software product for testing SSA",
   "client_uri": "https://www.mockcompany.com.au",
   "org_id": "3B0B0A7B-3E7B-4A2C-9497-E357A71D07C8",
   "org_name": "Mock Company Inc.",
   "logo_uri": "https://www.mockcompany.com.au/logos/logo1.png",
   "tos_uri": "https://www.mockcompany.com.au/tos.html",
   "policy_uri": "https://www.mockcompany.com.au/policy.html",
   "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/u3ZWlf9Yt42dyZgIvzkvqb.jwks",
   "sector_identifier_uri": "https://www.mockcompany.com.au/sector_identifier",
   "revocation_uri": "https://gist.githubusercontent.com/imesh94/3172e2e45757cda08ec2727f90b72ced/raw/ff0d3eabe4cddce47eec0228f592175223dd92b2/wso2-au-dcr-demo.jwks",
   "recipient_base_uri": "https://www.mockcompany.com.au",
   "token_endpoint_auth_signing_alg": "PS256",
   "id_token_encrypted_response_alg": "RSA-OAEP",
   "id_token_encrypted_response_enc": "A256GCM",
   "software_roles": "data-recipient-software-product",
   "client_id": "8Zofufw_Yqt823g727JdZo9DvhAa",
   "client_id_issued_at": "1649137285",
   "redirect_uris": [
       "https://wso2.com"
   ],
   "grant_types": [
       "authorization_code",
       "refresh_token"
   ],
   "response_types": [
       "code id_token"
   ],
   "application_type": "web",
   "id_token_signed_response_alg": "PS256",
   "request_object_signing_alg": "PS256",
   "scope": "openid profile bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration",
   "software_id": "Software_78",
   "token_endpoint_auth_method": "private_key_jwt",
   "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkdxaEtWVEFObkxNWXBHR2ZBdEoxTmhka2dqdyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZHItcmVnaXN0ZXIiLCJpYXQiOjE2NDQ4MzQ0NzMsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMmQwNWNhMXNlc2JkYzlkc2Q0M2ZkZGJiNjI0YjE0ZmNiMjQxMTk2Iiwib3JnX2lkIjoiM0IwQjBBN0ItM0U3Qi00QTJDLTk0OTctRTM1N0E3MUQwN0M4Iiwib3JnX25hbWUiOiJNb2NrIENvbXBhbnkgSW5jLiIsImNsaWVudF9uYW1lIjoiTW9jayBTb2Z0d2FyZSIsImNsaWVudF9kZXNjcmlwdGlvbiI6IkEgbW9jayBzb2Z0d2FyZSBwcm9kdWN0IGZvciB0ZXN0aW5nIFNTQSIsImNsaWVudF91cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUiLCJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3NvMi5jb20iXSwibG9nb191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvbG9nb3MvbG9nbzEucG5nIiwidG9zX3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdS90b3MuaHRtbCIsInBvbGljeV91cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvcG9saWN5Lmh0bWwiLCJqd2tzX3VyaSI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvdTNaV2xmOVl0NDJkeVpnSXZ6a3ZxYi5qd2tzIiwicmV2b2NhdGlvbl91cmkiOiJodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2ltZXNoOTQvMzE3MmUyZTQ1NzU3Y2RhMDhlYzI3MjdmOTBiNzJjZWQvcmF3L2ZmMGQzZWFiZTRjZGRjZTQ3ZWVjMDIyOGY1OTIxNzUyMjNkZDkyYjIvd3NvMi1hdS1kY3ItZGVtby5qd2tzIiwicmVjaXBpZW50X2Jhc2VfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1Iiwic2VjdG9yX2lkZW50aWZpZXJfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3NlY3Rvcl9pZGVudGlmaWVyIiwic29mdHdhcmVfaWQiOiJTb2Z0d2FyZV83OCIsInNvZnR3YXJlX3JvbGVzIjoiZGF0YS1yZWNpcGllbnQtc29mdHdhcmUtcHJvZHVjdCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgYmFuazphY2NvdW50cy5iYXNpYzpyZWFkIGJhbms6YWNjb3VudHMuZGV0YWlsOnJlYWQgYmFuazp0cmFuc2FjdGlvbnM6cmVhZCBiYW5rOnBheWVlczpyZWFkIGJhbms6cmVndWxhcl9wYXltZW50czpyZWFkIGNvbW1vbjpjdXN0b21lci5iYXNpYzpyZWFkIGNvbW1vbjpjdXN0b21lci5kZXRhaWw6cmVhZCBjZHI6cmVnaXN0cmF0aW9uIn0.MierpTUvItRijU5-XH4j9cf4L1T6eFn-zyAoglGJakWT72QBzTOgA0B_3PtWBlGS9EH9hvwRucQyNERjHrX0cAlQdAU-BXSkUkhM06a4_BhdxbYgkl1X4FjSxFJ-OoUAfWA5SSFzVOyyGpo7WXMqdklmL4SCTUFyoLnNWoxIo407uVSUgIOPXq4yr-QwklWdXJIzTh6IPHHUVGQ8qotXtIq717Y1zzymOzjqpZt0HVcVBfX9QH7MVxbDXNWGqj_BfBS4sDczMA7r_GY2ueTwcL_kEm9aEbeRtY0kSeINkSkMh9HzqITIp9ObAm3J-O-nevSgyzzPI-l2O1VW_o6sJA"
}

```

### Retrieve an application

Accredited Data Recipients use the DCR API to retrieve the details of an application that has already been registered. 
The request relies on Mutual TLS authentication and application access token (Client Credentials grant type) for 
Accredited Data Recipient authentication.

The request has one path parameter named `ClientId`. It specifies the Client Id of the application that the Accredited 
Data Recipient wants to retrieve details.

- If the request is successful and the identifier (`ClientId`) matches the client to whom the Client Credentials grant
  access token was issued, the Data Holder returns details of the requested client.
- If `ClientId` is unknown, the Data Holder responds with an `Unauthorized` status code and immediately revokes the access token.

``` tab="Request"
curl -X GET \ 
  https://<APIM_HOST>:8243/open-banking/0.1/register/BXxJQxH8OtZYzf622BTP4xnEcgMa\
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'  \
  --cacert certfile \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
{
    "client_name": "Mock Software",
    "client_description": "A mock software product for testing SSA",
    "client_uri": "https://www.mockcompany.com.au",
    "org_id": "117fbc58-036c-eb11-a837-000d3a8842e1",
    "org_name": "Mock Company Inc.",
    "logo_uri": "https://www.mockcompany.com.au/logos/logo1.png",
    "tos_uri": "https://www.mockcompany.com.au/tos.html",
    "policy_uri": "https://www.mockcompany.com.au/policy.html",
    "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/u3ZWlf9Yt42dyZgIvzkvqb.jwks",
    "revocation_uri": "https://gist.githubusercontent.com/imesh94/3172e2e45757cda08ec2727f90b72ced/raw/ff0d3eabe4cddce47eec0228f592175223dd92b2/wso2-au-dcr-demo.jwks",
    "token_endpoint_auth_signing_alg": "PS256",
    "id_token_encrypted_response_alg": "RSA-OAEP",
    "id_token_encrypted_response_enc": "A256GCM",
    "software_roles": "data-recipient-software-product",
    "registration_access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IjZKTHdBNDJZQlRGbzNVUkplbVM4TmY4YUx2Z2EiLCJuYmYiOjE2NTU2OTIyMzcsImF6cCI6IjZKTHdBNDJZQlRGbzNVUkplbVM4TmY4YUx2Z2EiLCJzY29wZSI6ImNkcjpyZWdpc3RyYXRpb24iLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiIyaHlmMEF0a2Q2Rmo0cnpuLXZzRDdHT244aUtnY2JiSEpVSlhMbG1yMUlzIn0sImV4cCI6MTY1NTY5NTgzNywiaWF0IjoxNjU1NjkyMjM3LCJqdGkiOiI5OWJiMjhlYS05ZmU0LTQ3MGYtYWFjMy1mYzAwOWUyZGNhZjQifQ.aoFYG7m1NMwevzpEvKJXWkq1CjF-xamOpG41z7ykl2cW65NsFCRU8pIC4ScRki9R7d4KwcFR2P8-cLlJXrrHJaQmhhylS2-E9nF58kkcznqrfSSmmAdCVJnmJ7jVtLIkI8uNlTZ9921mn7f180JckFydNfTmAxIkpp_oRh59McFEtzT4k9RzPIi4JH_2yOCvCKXNvg9Nb9EJ4NAkD05CHIWzfhiWWfZliw76H5CPPkP1NCxxakA-chxLoh0zK7mDKdDLi6Z36nMK1hZYx6rvEW9HWZbhOg41oraqaaTE6gQ-KYA7gOEViTesl2XeWgns5ow98Y1lq1Xuc93vfx4qEg",
    "client_id": "6JLwA42YBTFo3URJemS8Nf8aLvga",
    "client_id_issued_at": "1655366026",
    "redirect_uris": [
        "https://www.google.com/redirects/redirect1",
        "https://www.google.com/redirects/redirect2"
    ],
    "grant_types": [
        "authorization_code",
        "refresh_token",
        "client_credentials"
    ],
    "response_types": [
        "code id_token"
    ],
    "application_type": "web",
    "id_token_signed_response_alg": "PS256",
    "request_object_signing_alg": "PS256",
    "scope": "openid bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration",
    "software_id": "7e7fbc58-036c-eb11-a837-000d3a8842e1",
    "token_endpoint_auth_method": "private_key_jwt",
    "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkdxaEtWVEFObkxNWXBHR2ZBdEoxTmhka2dqdyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZHItcmVnaXN0ZXIiLCJpYXQiOjE1NzE4MDgxNjcsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMjA1YTFlYmM5NDNmYmI2MjRiMTRmY2IyNDExOTYiLCJvcmdfaWQiOiIxMTdmYmM1OC0wMzZjLWViMTEtYTgzNy0wMDBkM2E4ODQyZTEiLCJvcmdfbmFtZSI6Ik1vY2sgQ29tcGFueSBJbmMuIiwiY2xpZW50X25hbWUiOiJNb2NrIFNvZnR3YXJlIiwiY2xpZW50X2Rlc2NyaXB0aW9uIjoiQSBtb2NrIHNvZnR3YXJlIHByb2R1Y3QgZm9yIHRlc3RpbmcgU1NBIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QyIl0sImxvZ29fdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L2xvZ29zL2xvZ28xLnBuZyIsInRvc191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvdG9zLmh0bWwiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3BvbGljeS5odG1sIiwiandrc191cmkiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3UzWldsZjlZdDQyZHlaZ0l2emt2cWIuandrcyIsInJldm9jYXRpb25fdXJpIjoiaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9pbWVzaDk0LzMxNzJlMmU0NTc1N2NkYTA4ZWMyNzI3ZjkwYjcyY2VkL3Jhdy9mZjBkM2VhYmU0Y2RkY2U0N2VlYzAyMjhmNTkyMTc1MjIzZGQ5MmIyL3dzbzItYXUtZGNyLWRlbW8uandrcyIsInNvZnR3YXJlX2lkIjoiN2U3ZmJjNTgtMDM2Yy1lYjExLWE4MzctMDAwZDNhODg0MmUxIiwic29mdHdhcmVfcm9sZXMiOiJkYXRhLXJlY2lwaWVudC1zb2Z0d2FyZS1wcm9kdWN0Iiwic2NvcGUiOiJvcGVuaWQgYmFuazphY2NvdW50cy5iYXNpYzpyZWFkIGJhbms6YWNjb3VudHMuZGV0YWlsOnJlYWQgYmFuazp0cmFuc2FjdGlvbnM6cmVhZCBiYW5rOnBheWVlczpyZWFkIGJhbms6cmVndWxhcl9wYXltZW50czpyZWFkIGNvbW1vbjpjdXN0b21lci5iYXNpYzpyZWFkIGNvbW1vbjpjdXN0b21lci5kZXRhaWw6cmVhZCBjZHI6cmVnaXN0cmF0aW9uIn0.llnci6b3k_eQtZQXf-RkJ0pjNiGNs6O8ImCNlJUgftuPYV8lCDxUWETlyuc4i1S0TTHZxNGMnmizKYKddjJqy2dryF1GA_8TadE0Jso3PRRdQWvf7RWcD27anXBj7YV9qahA2XWs0Ca7akbXLBuGk3enlUFdfv1WkoAbc3_2yiBXbUYdIVyQ4J0r1dRvPFm8f23AUdQxH3Bz666u_GYVZFEN_x5k9EsfdohINeFDCOLcJyFIwoQRe4P1PH8OHu0GFE0NzvDOfT1bc_kDzNF_o-j3UevelxFuncajqemdcpFuXc6KuDGN_oDN6u9j2LttjajFXhWJmhnDUI7V5hj1YQ"
}
```

### Update an application

Accredited Data Recipients use the DCR API to request the Data Holder to modify one or more attributes related to an existing application. 
The request relies on Mutual TLS authentication and application access token (Client Credentials grant type) for Accredited Data Recipients authentication.

The request has one path parameter named `ClientId`. It specifies the Client Id of the application that the Accredited Data Recipient wants to
modify. The Accredited Data Recipient submits a JWS payload that describes the characteristics of the client to be modified. This must include
all the claims, including the ones that will not be modified.

- If the client is successfully modified, the Data Holder responds with a JSON payload that describes the client that was created.
- If the `ClientId` is unknown, the Data Holder responds with an Unauthorized status code and immediately revokes the access token.
- If client modification is unsuccessful, the Data Holder responds with an error payload.

``` tab="Request"
curl -X PUT \
  https://<APIM_HOST>:8243/open-banking/0.1/register/TlKmycRL8YUiikAFiS6AFqaDNmwa\
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
  --cacert certfile \
  -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6InhJSTVtN3VLU2dTQnNEbGhBUnl3cVZjbzdJRSJ9.eyJpc3MiOiJNb2NrIENvbXBhbnkiLCJpYXQiOjE1NzIyMjUzMzYsImV4cCI6MTcwMzg0NzczMSwianRpIjoiMzc3NDdjZDEtYzEwNS00NTY5LTlmNzUtNGFkZjI4YjczZTMxIiwiYXVkIjoiaHR0cHM6Ly93d3cuaW5mb3NlYy5jZHIuZ292LmF1L3Rva2VuIiwicmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3d3dy5nb29nbGUuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZyI6IlBTMjU2IiwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJwcml2YXRlX2tleV9qd3QiLCJncmFudF90eXBlcyI6WyJhdXRob3JpemF0aW9uX2NvZGUiLCJyZWZyZXNoX3Rva2VuIiwidXJuOmlldGY6cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6and0LWJlYXJlciJdLCJyZXNwb25zZV90eXBlcyI6WyJjb2RlIGlkX3Rva2VuIl0sImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiUFMyNTYiLCJyZXF1ZXN0X29iamVjdF9zaWduaW5nX2FsZyI6IlBTMjU2Iiwic29mdHdhcmVfc3RhdGVtZW50IjoiZXlKaGJHY2lPaUpRVXpJMU5pSXNJbXRwWkNJNkltSTRabUZqWmpKbVpqTTVORFEwWmpjNE1XVXdZbVUxWkdJMFlqRTBaakUySWl3aWRIbHdJam9pU2xkVUluMC5leUpwYzNNaU9pSmpaSEl0Y21WbmFYTjBaWElpTENKcFlYUWlPakUxTnpFNE1EZ3hOamNzSW1WNGNDSTZNakUwTnpRNE16WTBOaXdpYW5ScElqb2lNMkpqTWpBMVlURmxZbU01TkRObVltSTJNalJpTVRSbVkySXlOREV4T1RZaUxDSnZjbWRmYVdRaU9pSXpRakJDTUVFM1FpMHpSVGRDTFRSQk1rTXRPVFE1TnkxRk16VTNRVGN4UkRBM1F6Z2lMQ0p2Y21kZmJtRnRaU0k2SWsxdlkyc2dRMjl0Y0dGdWVTQkpibU11SWl3aVkyeHBaVzUwWDI1aGJXVWlPaUpOYjJOcklGTnZablIzWVhKbElpd2lZMnhwWlc1MFgyUmxjMk55YVhCMGFXOXVJam9pUVNCdGIyTnJJSE52Wm5SM1lYSmxJSEJ5YjJSMVkzUWdabTl5SUhSbGMzUnBibWNnVTFOQklpd2lZMnhwWlc1MFgzVnlhU0k2SW1oMGRIQnpPaTh2ZDNkM0xtMXZZMnRqYjIxd1lXNTVMbU52YlM1aGRTSXNJbkpsWkdseVpXTjBYM1Z5YVhNaU9sc2lhSFIwY0hNNkx5OTNkM2N1WjI5dloyeGxMbU52YlM5eVpXUnBjbVZqZEhNdmNtVmthWEpsWTNReElpd2lhSFIwY0hNNkx5OTNkM2N1WjI5dloyeGxMbU52YlM5eVpXUnBjbVZqZEhNdmNtVmthWEpsWTNReUlsMHNJbXh2WjI5ZmRYSnBJam9pYUhSMGNITTZMeTkzZDNjdWJXOWphMk52YlhCaGJua3VZMjl0TG1GMUwyeHZaMjl6TDJ4dloyOHhMbkJ1WnlJc0luUnZjMTkxY21raU9pSm9kSFJ3Y3pvdkwzZDNkeTV0YjJOclkyOXRjR0Z1ZVM1amIyMHVZWFV2ZEc5ekxtaDBiV3dpTENKd2IyeHBZM2xmZFhKcElqb2lhSFIwY0hNNkx5OTNkM2N1Ylc5amEyTnZiWEJoYm5rdVkyOXRMbUYxTDNCdmJHbGplUzVvZEcxc0lpd2lhbmRyYzE5MWNta2lPaUpvZEhSd2N6b3ZMMnRsZVhOMGIzSmxMbTl3Wlc1aVlXNXJhVzVuZEdWemRDNXZjbWN1ZFdzdk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUwzTkdaMnRwTnpKUGFYRjNXazVHVDFwbk5rOWhhbWt1YW5kcmN5SXNJbkpsZG05allYUnBiMjVmZFhKcElqb2lhSFIwY0hNNkx5OW5hWE4wTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXBiV1Z6YURrMEx6TXhOekpsTW1VME5UYzFOMk5rWVRBNFpXTXlOekkzWmprd1lqY3lZMlZrTDNKaGR5OW1aakJrTTJWaFltVTBZMlJrWTJVME4yVmxZekF5TWpobU5Ua3lNVGMxTWpJelpHUTVNbUl5TDNkemJ6SXRZWFV0WkdOeUxXUmxiVzh1YW5kcmN5SXNJbk52Wm5SM1lYSmxYMmxrSWpvaU56UXdRek0yT0VZdFJVTkdPUzAwUkRJNUxVRXlSVUV0TURVeE5FRTJOa0l3UTBST0lpd2ljMjltZEhkaGNtVmZjbTlzWlhNaU9pSmtZWFJoTFhKbFkybHdhV1Z1ZEMxemIyWjBkMkZ5WlMxd2NtOWtkV04wSWl3aWMyTnZjR1VpT2lKaVlXNXJPbUZqWTI5MWJuUnpMbUpoYzJsak9uSmxZV1FnWW1GdWF6cGhZMk52ZFc1MGN5NWtaWFJoYVd3NmNtVmhaQ0JpWVc1ck9uUnlZVzV6WVdOMGFXOXVjenB5WldGa0lHSmhibXM2Y0dGNVpXVnpPbkpsWVdRZ1ltRnVhenB5WldkMWJHRnlYM0JoZVcxbGJuUnpPbkpsWVdRZ1kyOXRiVzl1T21OMWMzUnZiV1Z5TG1KaGMybGpPbkpsWVdRZ1kyOXRiVzl1T21OMWMzUnZiV1Z5TG1SbGRHRnBiRHB5WldGa0lHTmtjanB5WldkcGMzUnlZWFJwYjI0aWZRLkE1WGhCRlFQTUxTOGliMHlPcGVXQW5icnRyN2d2eVZaWjVoYm5ibUlfVDczVVBrUFhtd2QtVDBWSzFHbFFYRnlfYndOVkxYTG9mWTRwMlUyMkFHQTRnd2pyS05ZOE9Kc2Rkc3VQdTFLOHZvQTcwWmRoTVVIQ3JDdUNQTVg3TldHb2ZlY2FoTUlmV2lxYjhOYWFPSi0xclpuRjk1akNRbWY0SHlFWFlXQlhreUVxelROZkVYYkRtckQ2ZWZpb2RWczBkU0dONjJ0RExWWEwzVkNlX0cxYXZiMllFNXdRckpValBzcHpOcDlmTldDLTh4STBhd0pnSEpTcWFyWUQ3Vk1PT3ZjVExfMW1pbkpSOWxucGtwM04xZ0lTTWpDY2U4NHVaVEtQNnhZREU3c2RpMU9qbGF6VGxlV2t6d0xkakVGRUlFa2o3ZVhhUEdxcUxtVlBSQlBkdyJ9.MTsGy1vyuvdsRvsftzusruip-WbOhPcDyq2KtC-AbobwvzFEapoXvCRS2epdeiPOehXW6QDlEitATfrKSto-dwwvnCo7F3cPxd6Jv5j4RZBErxCrIiYJsTxrABILYJ8IvGj8rHzbRoRqb5lfhOxyHXTuaXhn5GyH5celsa2q8MTo0bwte0nL1J0PMnH7MLBUop7g2x8-TcwTKC3e2SPhoBwUWo5IYXRhMqSYU5y62HbIqggZahwuwUamg1Vt0H7wmmUiQZSAeN7o3usVi2XbYlNcITQPi9UiY4agA6Q1suv6k_qoBnM_OzMB9wr8W4mB3PmHO0mhUAtTLbI03Ix9hQ'
```

``` tab="Response"
{
    "client_name": "Mock Software",
    "client_description": "A mock software product for testing SSA",
    "client_uri": "https://www.mockcompany.com.au",
    "org_id": "3B0B0A7B-3E7B-4A2C-9497-E357A71D07C8",
    "org_name": "Mock Company Inc.",
    "logo_uri": "https://www.mockcompany.com.au/logos/logo1.png",
    "tos_uri": "https://www.mockcompany.com.au/tos.html",
    "policy_uri": "https://www.mockcompany.com.au/policy.html",
    "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/u3ZWlf9Yt42dyZgIvzkvqb.jwks",
    "revocation_uri": "https://gist.githubusercontent.com/imesh94/3172e2e45757cda08ec2727f90b72ced/raw/ff0d3eabe4cddce47eec0228f592175223dd92b2/wso2-au-dcr-demo.jwks",
    "recipient_base_uri": "https://www.mockcompany.com.au",
    "token_endpoint_auth_signing_alg": "PS256",
    "id_token_encrypted_response_alg": "RSA-OAEP",
    "id_token_encrypted_response_enc": "A256GCM",
    "software_roles": "data-recipient-software-product",
    "registration_access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IjZKTHdBNDJZQlRGbzNVUkplbVM4TmY4YUx2Z2EiLCJuYmYiOjE2NTU2OTI1MDksImF6cCI6IjZKTHdBNDJZQlRGbzNVUkplbVM4TmY4YUx2Z2EiLCJzY29wZSI6ImJhbms6YWNjb3VudHMuYmFzaWM6cmVhZCBiYW5rOmFjY291bnRzLmRldGFpbDpyZWFkIGJhbms6cGF5ZWVzOnJlYWQgYmFuazpyZWd1bGFyX3BheW1lbnRzOnJlYWQgYmFuazp0cmFuc2FjdGlvbnM6cmVhZCBjZHI6cmVnaXN0cmF0aW9uIGNvbW1vbjpjdXN0b21lci5iYXNpYzpyZWFkIGNvbW1vbjpjdXN0b21lci5kZXRhaWw6cmVhZCBwcm9maWxlIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoiMmh5ZjBBdGtkNkZqNHJ6bi12c0Q3R09uOGlLZ2NiYkhKVUpYTGxtcjFJcyJ9LCJleHAiOjE2NTU2OTYxMDksImlhdCI6MTY1NTY5MjUwOSwianRpIjoiYmFlZWVlYzktMzBiOC00OWYzLWFiZDAtOTM0NjIwZjUzNzJjIn0.upiri9U35QOQJ5_g9VX-Bz97-9ozd0nhVrmftpVDSKuOOSM0jv0F6lrw9oVBhPnmJYIlUwj3EWseu9my-F5EdJhwaLbiHTkdNAd-uE_y4qc20PQ5sglcJoU7N2JqSwA4STB31Y7ZODkiJU4o3fczBrg-YKv4iRiMBqrEmobPMYW8CHdhvg9mRTo_8JkeuBoGzhluvpQJf6r-9tzLWrxrd-wPVD5G_TB-CjxniSdhk5v5DoTb3kb2a1G_KfwMd6YXCSwMQRVvfC8ZONPyHuD3Li772SNBnnWUNB9pVYcw348jj7Djl16Rkcec6tEhX2oVyNt-mixOqkMrHpbHuH_Ycg",
    "client_id": "6JLwA42YBTFo3URJemS8Nf8aLvga",
    "client_id_issued_at": "1655366026",
    "redirect_uris": [
        "https://www.google.com/redirects/redirect1",
        "https://www.google.com/redirects/redirect2"
    ],
    "grant_types": [
        "client_credentials",
        "authorization_code",
        "refresh_token"
    ],
    "response_types": [
        "code id_token"
    ],
    "application_type": "web",
    "id_token_signed_response_alg": "PS256",
    "request_object_signing_alg": "PS256",
    "scope": "openid profile bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration",
    "software_id": "7e7fbc58-036c-eb11-a837-000d3a8842e1",
    "token_endpoint_auth_method": "private_key_jwt",
    "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkdxaEtWVEFObkxNWXBHR2ZBdEoxTmhka2dqdyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZHItcmVnaXN0ZXIiLCJpYXQiOjE2MzAyOTY2MzksImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMjA1YTFlYmM5NDNmYmI2MjRiMTRmY2IyNDExOTIiLCJvcmdfaWQiOiIzQjBCMEE3Qi0zRTdCLTRBMkMtOTQ5Ny1FMzU3QTcxRDA3QzgiLCJvcmdfbmFtZSI6Ik1vY2sgQ29tcGFueSBJbmMuIiwiY2xpZW50X25hbWUiOiJNb2NrIFNvZnR3YXJlIiwiY2xpZW50X2Rlc2NyaXB0aW9uIjoiQSBtb2NrIHNvZnR3YXJlIHByb2R1Y3QgZm9yIHRlc3RpbmcgU1NBIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QyIl0sImxvZ29fdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L2xvZ29zL2xvZ28xLnBuZyIsInRvc191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvdG9zLmh0bWwiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3BvbGljeS5odG1sIiwiandrc191cmkiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3UzWldsZjlZdDQyZHlaZ0l2emt2cWIuandrcyIsInJldm9jYXRpb25fdXJpIjoiaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9pbWVzaDk0LzMxNzJlMmU0NTc1N2NkYTA4ZWMyNzI3ZjkwYjcyY2VkL3Jhdy9mZjBkM2VhYmU0Y2RkY2U0N2VlYzAyMjhmNTkyMTc1MjIzZGQ5MmIyL3dzbzItYXUtZGNyLWRlbW8uandrcyIsInJlY2lwaWVudF9iYXNlX3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInNvZnR3YXJlX2lkIjoiN2U3ZmJjNTgtMDM2Yy1lYjExLWE4MzctMDAwZDNhODg0MmUxIiwic29mdHdhcmVfcm9sZXMiOiJkYXRhLXJlY2lwaWVudC1zb2Z0d2FyZS1wcm9kdWN0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBiYW5rOmFjY291bnRzLmJhc2ljOnJlYWQgYmFuazphY2NvdW50cy5kZXRhaWw6cmVhZCBiYW5rOnRyYW5zYWN0aW9uczpyZWFkIGJhbms6cGF5ZWVzOnJlYWQgYmFuazpyZWd1bGFyX3BheW1lbnRzOnJlYWQgY29tbW9uOmN1c3RvbWVyLmJhc2ljOnJlYWQgY29tbW9uOmN1c3RvbWVyLmRldGFpbDpyZWFkIGNkcjpyZWdpc3RyYXRpb24ifQ.iHyBEJXEXb-jsoUXnhdO6AuYHjbwzCHJkVhLqU2cssC-jM-LMlkfHZCoLL9T2EArqu0oBu2OJ3T9V2cj75TSwDMKmvWGjIbG6U5QPiHv8BLN1eQ0rm2e5xCsOBQofN-LcNz-a3VNzpQ6mp-GV8UFW30z0n4mxQI2XdQX3zSkH9nebNyq8p8QxjwrEKWgJk_RBaa5PxWTzAk5KUxq5CWhegDe5gmC8f1bVhcGkRMkmWLJSE-pC1PeraeWnYdS9xKuqoMRCVq0x3igcelNk_OS5gz_D-p0fL8oMxCJ3gKkx7al7Imv8KbFnKsypRzIExFT-9PP0Ldi0iAjEk7Pl115cQ"
}
```

### Delete an application

Accredited Data Recipients use the DCR API to request the Data Holder to delete an existing application. The request relies on Mutual TLS authentication
and application access token (Client Credentials grant type) for Accredited Data Recipient authentication.

The request has one path parameter named `ClientId`. It specifies the Client Id of the application that the Accredited Data Recipient wants to delete.

- If the request is successful and the `ClientId` matches the client to whom the Client Credentials grant access token was
  issued, the Data Holder must delete the client and invalidate long-lived access tokens that were issued to the client.
- If the `ClientId` is unknown, the Data Holder responds with an `Unauthorized` status code and immediately revokes the access token.

``` tab="Request"
curl -X DELETE \
  https://<APIM_HOME>:8243/open-banking/0.1/register/TlKmycRL8YUiikAFiS6AFqaDNmwa\
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  --cacert certfile \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
204 No Content
```