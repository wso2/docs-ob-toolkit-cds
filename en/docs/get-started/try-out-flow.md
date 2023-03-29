This document provides step by step instructions to deploy, subscribe, and invoke the Consumer Data Standards API. 

## Deploying Consumer Data Standards API

1. Sign in to the [API Publisher Portal](https://localhost:9443/publisher) with the credentials for `mark@gold.com`. ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/consumer-data-standards-1.8.0.yaml` directory.

5. Click **Next**.

6. Set the **Endpoint** as follows:
   ```
   https://localhost:9443/api/openbanking/cds/backend/services
   ```
7. Click **Create** to create the API. ![create-api](../assets/img/get-started/quick-start-guide/create-api.png)

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Toggle the **Schema Validation** button to enable Schema Validation for all APIs except for the Dynamic Client Registration API. ![schema-validation](../assets/img/get-started/quick-start-guide/schema-validation.png)

12. Add a custom policy. Follow the instructions given below according to the API Manager version you are using:

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.0.0..."

        1. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)
        
        2. Now, select the **Custom Policy** option.
        
        3. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/cds-dynamic-endpoint-insequence-1.8.0.xml` insequence file. ![accounts_insequence](../assets/img/get-started/quick-start-guide/accounts-insequence.png)
         
        4. Click **Select**. 
        
        5. Scroll down and click **SAVE**.

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.1.0..."

        1. Go to **Develop -> API Configurations -> Policies** in the left menu pane.<br><br>
        <div style="width:40%">
        ![select_policies](../assets/img/get-started/quick-start-guide/select-policies.png)
        </div>

        2. On the **Policy List** card, click on **Add New Policy**.

        3. Fill in the **Create New Policy**.

        4. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/cds-dynamic-endpoint-insequence-1.8.0.xml` insequence file.

        5. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: <br><br>
        <div style="width:35%">
        ![successful](../assets/img/get-started/quick-start-guide/successful.png)
        </div>

        6. Expand the API endpoint you want from the list of API endpoints. For example: ![expand_api_endpoint](../assets/img/get-started/quick-start-guide/expand-api-endpoint.png)

        7. Expand the HTTP method from the API endpoint you selected. For example: ![expand_http_method](../assets/img/get-started/quick-start-guide/expand-http-method.png)

        8. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request_flow](../assets/img/get-started/quick-start-guide/request-flow.png)

        9. Select **Apply to all resources** and click **Save**.

        10. Scroll down and click **Save**.

13. Go to **Deployments** using the left menu pane. 

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)
    
14. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

15. Click **Deploy**.

16. Go to **Overview** using the left menu pane. 

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

17. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

### Summarized information for configuring APIs

Given below is a summary of configurations to follow when deploying the APIs in the toolkit.

| API | Swagger definition (yaml file) | Endpoint type| Message mediation (sequence file) |
|-----|--------------------------------|--------------|---------------------------------- |
| Consumer Data Standards API v1.8 | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/consumer-data-standards-1.8.0.yaml` | HTTP/REST Endpoint <br/> `https://localhost:9443/api/openbanking/cds/backend/services` | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/cds-dynamic-endpoint-insequence-1.8.0.xml` |
| Dynamic Client Registration API v0.2 | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/DynamicClientRegistration/0.2/au-dcr-swagger.yaml` | HTTP/REST Endpoint <br/> ` https://localhost:9446/api/openbanking/dynamic-client-registration` | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/DynamicClientRegistration/0.2/au-dcr-insequence-0.2.xml` |

## Subscribing to Consumer Data Standards API

1. The deployed API is now available in the Developer Portal at <https://localhost:9443/devportal>.

2. Select the **ConsumerDataStandards V1.8** API.
 
3. Locate **Subscriptions** from the left menu pane. 

    ![select_subscriptions](../assets/img/get-started/quick-start-guide/select-subscriptions.png)
    
4. From the **Application** dropdown, select the application that you want to be subscribed to the Consumer Data Standards API V1.8. ![select_application](../assets/img/get-started/quick-start-guide/select-application.png)

5. Click **Subscribe**.

## Invoking Consumer Data Standards API
   
### Authorizing a consent

The Accredited Data Recipient application redirects the bank customer to authenticate and approve/deny application-provided consents.

1. Generate the request object by signing the following JSON payload using supported algorithms.

    ``` tab="Format"
    {
      "kid": "<CERTIFICATE_FINGERPRINT>",
      "alg": "<SUPPORTED_ALGORITHM>",
      "typ": "JWT"
    }
    {
      "aud": "<This is the audience that the ID token is intended for. Example, https://<IS_HOST>:9446/oauth2/token>",
      "iss": "<CLIENT_ID>",
      "scope": "openid bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read",
      "claims": {
        "sharing_duration": 60000,
          "id_token": {
            "acr": {
              "values": [
                "urn:cds.au:cdr:3"
            ],
            "essential": true
          }
        },
        "userinfo": {}
       },
       "response_type": "code id_token",
       "redirect_uri": "<CLIENT_APPLICATION_REDIRECT_URI>",
       "state": "suite",
       "exp": <EPOCH_TIME_OF_TOKEN_EXPIRATION>,
       "nonce": "<PREVENTS_REPLAY_ATTACKS>",
       "client_id": "<CLIENT_ID>"
      }
    ```
    
    ``` tab="Sample"
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsImlzcyI6IjNuendiMVZ1YVVJU3p1ak5lNlFqRHhsZ25Da2EiLCJzY29wZSI6Im9wZW5pZCBiYW5rOmFjY291bnRzLmJhc2ljOnJlYWQgYmFuazphY2NvdW50cy5kZXRhaWw6cmVhZCBiYW5rOnRyYW5zYWN0aW9uczpyZWFkIiwiY2xhaW1zIjp7InNoYXJpbmdfZHVyYXRpb24iOjYwMDAwLCJpZF90b2tlbiI6eyJhY3IiOnsidmFsdWVzIjpbInVybjpjZHMuYXU6Y2RyOjMiXSwiZXNzZW50aWFsIjp0cnVlfX0sInVzZXJpbmZvIjp7fX0sInJlc3BvbnNlX3R5cGUiOiJjb2RlIGlkX3Rva2VuIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInN0YXRlIjoic3VpdGUiLCJleHAiOjE3Mzk2NDA1MzIsIm5vbmNlIjoiOGZjNGNiYjQtMjg3Yi00MmFhLWExZDAtNjdkY2U2ZmM3NDc5IiwiY2xpZW50X2lkIjoiM256d2IxVnVhVUlTenVqTmU2UWpEeGxnbkNrYSJ9.nrLPRvsFq_D0hEEvKKqN6m1uiQUV4cJK3Oy0YeY9BK5aaOgVJ43ni5ObGCuUnarBnRoxQQC4_wgqa54qI5KDjz_PV0ntMsUDlwhSIrGiy31zI4RqUogiF70ITClnPN6g1fQFQchjb7EQcwmrV5OXkJgNI-Ly3R7MKgyECcWINRvPsS15dwd9XBy_2HSkEyDRipAb5oPFLT-GLyvE2YlHiHXatf1Dj6vFpeKWoCQ0sN6djZBVoH7NExkQ7TSY5RIc9eHCyWZDD4puj9FtRXBYJw0My8L5CgfpPUngbcAut1oYz9tsvYiRb_adjbZ87-r_RlQqhGtH15ccf7cxx_CDvg
    ```

2. The Data Holder sends the request to the consumer stating the accounts and information that the application wishes to access. 
This request is in the format of a URL as follows. 

    Update the placeholders with relevant values and run the following in a browser to prompt the invocation of the authorize API. 
    
    ```
     https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=<YOUR_SCOPE>
     &redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```
    
    !!!note
        For more details on authorization scope, see [Consumer Data Standards - Authorization Scope](https://consumerdatastandardsaustralia.github.io/standards/#authorisation-scopes).

3. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a 
user that has a `subscriber` role. 

4. The page displays the data requested by the consent such as permissions, transaction period, and expiration date. ![select accounts](../assets/img/get-started/quick-start-guide/consent-page-select-accounts.png)  

5. At the bottom of the page, a list of bank accounts that the Accredited Data Recipient application wishes to access is displayed.

6. Select one or more accounts from the list and click **Confirm**. ![confirm_consent](../assets/img/get-started/quick-start-guide/consent-page-confirm.png)

7. Upon providing consent, an authorization code is generated on the web page of the **redirect_uri**. See the sample given below:

    ```
    https://wso2.com/#code=5591c5a0-14d0-3ca9-bec2-c1efe86e32ce&id_token=eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiWC14OFhwV2I3cGIyYnU2NHVLYktTUSIsInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiJuLTBTNl9XekEyTSIsInNpZCI6ImM5MDViNmFhLTBiNWEtNGM4Ni04NWYzLTk0MTI5YWRlMTVjNiIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJjX2hhc2giOiJ5Y3lhNHBBN2ZfSW9uQzlpaWl1TnZ3Iiwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjoiNjFmOWEzNTctNDE2MC00OGE2LTg0NWMtYzM3ZjEwN2ZlNjQ4Iiwic19oYXNoIjoiMWNIaVdBMVN2NmpKc0t6SDRFbnk1QT09XHJcbiIsImF6cCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJleHAiOjE2Mjg3NTMxODIsImlhdCI6MTYyODc0OTU4Mn0.mGgNWc12T8a5pW6QQRF6RXoVci0ToHLCttLiCGY6KraHMzGmRFUm6jz6Clbxk_447DdoKONAqY_2uCQCRkudjMk_7sTCV-DxOIbFYctrTiU01CvjKLbNcr8tjHaaIp8rhft1K0q3h0kVxyRoo3A1WQDBJFpp2jWqqJMyjShzEf6bbojtpBw2kyAazInhnm4XFSYchGPDF7XP-vRwCHNG532dg0kXvUrdA9B7RQGnQlay296rN1pRN-GTnC6_io_anf6a5Q3ovuaxcODnbb540hnjty3scPISj38La21iQTWEBTGlBUPnXs10pXjzCmib5wng37rXV8PDslbMfRqMhg&state=YWlzcDozMTQ2&session_state=507a0e617fe39feae18795b746c09fc44dd7e8658348a6c1ce2e91778224a5a4.IFBUQh0silRELhJocuhouw
    ```

   The authorization code from the below URL is in the code parameter (code=`5591c5a0-14d0-3ca9-bec2-c1efe86e32ce`).
   
### Generating user access token   

In this section, you will be generating an access token using the authorization code generated in the section [above](#authorizing-a-consent).

1. Generate the client assertion by signing the following JSON payload using supported algorithms. 

    !!! note
        If you have configured the [OB certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox),

        - Use the [transport private key](../../assets/attachments/transport-certs/obtransport.key) and
          [transport public certificate](../../assets/attachments/transport-certs/obtransport.pem) for Transport layer security testing purposes.
        - Use the [signing certificate](../../assets/attachments/signing-certs/obsigning.pem) and
          [signing private keys](../../assets/attachments/signing-certs/obsigning.key) for signing purposes.

    ``` tab="Format"
    Format:
    {
    "alg": "<The algorithm used for signing.>",
    "kid": "<The thumbprint of the certificate.>",
    "typ": "JWT"
    }
     
    {
    "iss": "<This is the issuer of the token. For example, client ID of your application>",
    "sub": "<This is the subject identifier of the issuer. For example, client ID of your application>",
    "exp": <This is the epoch time of the token expiration date/time>,
    "iat": <This is the epoch time of the token issuance date/time>,
    "jti": "<This is an incremental unique value>",
    "aud": "<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>"
    }
     
    <signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise, the private signature of the application certificate is used.>
    ```
    
    ``` tab="Sample"
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiZXhwIjoxNjI4Nzc0ODU1LCJpYXQiOjE2Mjg3NDQ4NTUsImp0aSI6IjE2Mjg3NDQ4NTUxOTQifQ.PkKRSDtkCyXabzLgGwAoy5C3jSORVU8X8sGDVrKpetPnjbCNx2wPlH-PzWUU1n05gdC7lDmoU21nsKLF_nE3iC-9hKEy4YsvJ7PFjNBPMOMUYDhRh9PCkPnec6f042zonb_ZifBq8r1aScUDoZ1L0hq7yjfZubwReFCWbESQ8PauuBuHRl7__kWvglthfgruQ7TTiIWiM60LWYct5TQWSF1IDcYGy03l-9OV5l260JBHPT4heLXzUQTarsh0PoWpv09xYLu8uGCexEt-HtRH8qwJGiFi5PiCA09_KyWVqbrcdjBloCmD5Kiqa1X0AnEbf9kKs0fqvcl7NN5-yVQUjg
    ```

2. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.
    
    ```
    curl -X POST \
    https://localhost:9446/oauth2/token \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=authorization_code&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=<CLIENT_ASSERTION>&code=<CODE_FROM_ABOVE_STEP>&scope=openid%20accounts&redirect_uri=<REDIRECT_URI>'
    ```

3. Upon successful token generation, you can obtain a token as follows:

    ``` json
     {
        "access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJpbWVzaHVAd3NvMi5jb21AY2FyYm9uLnN1cGVyIiwiYXV0IjoiQVBQTElDQVRJT05fVVNFUiIsImF1ZCI6Ik1RMVZTelhEX2kzYV9iM24weE10YzdQVXVmd2EiLCJuYmYiOjE2NTA1MTM5MzcsImF6cCI6Ik1RMVZTelhEX2kzYV9iM24weE10YzdQVXVmd2EiLCJzY29wZSI6ImJhbms6YWNjb3VudHMuYmFzaWM6cmVhZCBiYW5rOmFjY291bnRzLmRldGFpbDpyZWFkIGNvbW1vbjpjdXN0b21lci5iYXNpYzpyZWFkIGNvbW1vbjpjdXN0b21lci5kZXRhaWw6cmVhZCBvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiIyaHlmMEF0a2Q2Rmo0cnpuLXZzRDdHT244aUtnY2JiSEpVSlhMbG1yMUlzIn0sImV4cCI6MTY1MDUxNzUzNywiaWF0IjoxNjUwNTEzOTM3LCJqdGkiOiIzNDQwYzdjZS1lODJkLTQ1NTgtYmQ0NC0xM2YxOGM1MDIxZmYiLCJjb25zZW50X2lkIjoiY2MwMjUwYzQtNWQyNS00ZDhhLWFmNGItZGFmNDdhNWE1YjM3In0.oiWyWGzv-tnLqoeuhEICOnYFyYo1f_Ix178whrWQhs-dcr4HsKjZpEiDpi1Snfz0nFV9fBC2lyn9aoSIgSkcs859GlnKP33pKQ948OC8okJi5JJ6hLs626o9nWxMftxMYBDIy-OTxa6RDmPvnUFqDbkxVDrF0q_M14M250yRtVXzCHaI5t2l6wxZTgnqF8XdAGoEVVoo_j3_9CbmYBAmsDnrZKY0X4_KZ8LGaIQp6h-7uU3RvK_zHIIMDPfQ3TR4B8WCSXdOJV0S3s9mXRBNU5C5TEMIhQEZz6quXzmuAaE1gTroJKYstryjykyHJkILLmVlIEn4Isk3CRVOtKXkhg",
        "refresh_token": "1c8ab391-deaf-38e9-8b10-9739c3e47214",
        "cdr_arrangement_id": "cc0250c4-5d25-4d8a-af4b-daf47a5a5b37",
        "scope": "bank:accounts.basic:read bank:accounts.detail:read common:customer.basic:read common:customer.detail:read openid",
        "id_token": "eyJraWQiOiJHcWhLVlRBTm5MTVlwR0dmQXRKMU5oZGtnanciLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.oZRHhMTcZ1UAYISEZDhdZhQvegHqLJD-roNX5cfzpnWqd8-3UAQOBkN6oNKB6c8c-B-m9zklN4SI8T9CjzE8wHrfHxp9wiLiElXp16lGcPb_Ll4X2RJV4ScoEYXiDXbg0obb-OmPv2QCQ8fU9QpJxesHLnOQEYyDSy_Fhz81SM3qSKN3Z267qZlYMuYrJs_cBwqgn30Ur5I1yrfNYPjVEngVtdaF5jwAhtLWVB7jPLa_om0IcYykzWvmhBgQpLouRTSKvV3eIJuUYuQzP4hLWqFjCHL8WtzjiqI9dKpLrv4UGwOI_TJOu5VjCiyX2kT3GHkWVHwwf02cOTCbb_Xdxw.AvGimFwlUg4gTXlb.rdAeuP52k1w2ALA6vG6zJ0ntYCUTH_7yuP-PsqgSGllcnbvwI4h8pznugkcAsGOk5uE7-VztagdgFZbXIJZ1yzjklqBFl8YWSpH44JVQCwvl6SbroUSvTbaUPR32rueDp9Bx2qrbKWHRiIAayjLRSdGhtSCctprBeslh-NYGiLxRwgJBkHftqmruybenOhbBAbXBcqhktDfg31GmMJNbhHI9ZFZF_K1mdfKNhWzuY3URhOk1hkMxvGEIB9745uDpWV4UNd5cPJJCLrCGyahvi7864KPSeyVeaOSXXFWFkfTj8JvmTTK7qw9yuC72kvgnOIma65iB3oT3iYXuAQO4GQUOVpXFUNeawU0_CrMZVskMftOawY_be8JCzcsKj4ljykBC888H-LI_Ssad0a2s9NrcmKbYRS7rNGNLQGhvNfgwKvotbwhgxWxeBFPPNcGhyjfgpcQe8BcjTa-vWKPjrsr68QM6I9Bj9mGOLD8d31ZWQQlfe9N3m5I90A6Aag7EW7kkS30simqYyGBGKOSQ1n4bkFTtvmGjPKRx8pmFZM1CJvvAHS_wW_hxUvVAvXS8Jjp23K7mzi9W8SlXor7zyo9ssc1u1y1K_PUzpBxuKdgA3Y57kXrHdvEkotZOAyROjxH03TnJzQ3rzcW8ZSNCSH1bxGczBk-wPwSe.4JUZsGWWJB5bCHPIbxuCwg",
        "token_type": "Bearer",
        "expires_in": 3600
     }
    ```
   
### Invoking Accounts API

Once the consumer approves the account consent, the Accredited Data Recipient application is eligible to access the account details of the consumer.

The application can now invoke the **GET/ accounts** endpoint available in the CDS API. This retrieves a 
full list of accounts that the consumer has authorised the application to access. The Account Ids returned are used to retrieve 
other resources for a specific AccountId.

1. A sample request looks as follows:
    
    ```
    curl -X GET \
    https://localhost:8243/cds-au/v1/banking/accounts' \
    -H 'x-v: 2'
    -H 'x-min-v: 1'
    -H 'x-fapi-interaction-id: 430a9796-2cf0-ba37-e99b-3d44d0263fde'
    -H 'x-fapi-auth-date: Tue, 78 Jan 1312 80:05:73 GMT'
    -H 'x-fapi-customer-ip-address: ut incididunt'
    -H 'x-cds-client-headers: TFXbY7qlgHKbMHEwmjrTJ2t5Tq/y7DVssP=='
    -H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
    -H 'Accept: application/json' \
    -H 'charset: UTF-8' \
    -H 'Content-Type: application/json; charset=UTF-8'
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    ```

2. The request retrieves the account information for all the accounts related to the bank customer. Given below is a sample response:
    
    ```
     {
        "data": {
            "accounts": [
                {
                    "accountId": "bOdbKX3AmiL774gkw40tAuSxlWS4ic2njE2kA_PUO0S36EJMygrh9r-5qid-zC5ybs_-FJaWVjrMIT6eebj8yM0ngWwicI91pdyPjM28r62G3zWu0LrUfBXN34V3E-wS",
                    "creationDate": "2019-05-01T15:43:00.12345Z",
                    "displayName": "account_1",
                    "nickname": "Alpha",
                    "openStatus": "OPEN",
                    "isOwned": true,
                    "maskedNumber": "1234",
                    "productCategory": "TRANS_AND_SAVINGS_ACCOUNTS",
                    "productName": "Product name"
                },
                {
                    "accountId": "bOdbKX3AmiL774gkw40tAuSxlWS4ic2njE2kA_PUO0S36EJMygrh9r-5qid-zC5ybs_-FJaWVjrMIT6eebj8yA_1IfEkgzFJJXf1UWh-kKJnyY9_KWEAtY5Emejdqr9x",
                    "creationDate": "2019-05-01T15:43:00.12345Z",
                    "displayName": "account_1",
                    "nickname": "Alpha",
                    "openStatus": "OPEN",
                    "isOwned": true,
                    "maskedNumber": "1234",
                    "productCategory": "TRANS_AND_SAVINGS_ACCOUNTS",
                    "productName": "Product name"
                },
                {
                    "accountId": "bOdbKX3AmiL774gkw40tAuSxlWS4ic2njE2kA_PUO0S36EJMygrh9r-5qid-zC5ybs_-FJaWVjrMIT6eebj8yCiPL8bWO0iOUvYK_mkw_991Gd4u8nzCSyfzelMXBuSC",
                    "creationDate": "2019-05-01T15:43:00.12345Z",
                    "displayName": "account_1",
                    "nickname": "Alpha",
                    "openStatus": "OPEN",
                    "isOwned": true,
                    "maskedNumber": "1234",
                    "productCategory": "TRANS_AND_SAVINGS_ACCOUNTS",
                    "productName": "Product name"
                }
            ]
        },
        "links": {
            "self": "https://api.alphabank.com/cds-au/1.2.0/banking/accounts",
            "first": "https://api.alphabank.com/cds-au/1.2.0/banking/accounts/1",
            "prev": "https://api.alphabank.com/cds-au/1.2.0/banking/accounts/1",
            "next": "https://api.alphabank.com/cds-au/1.2.0/banking/accounts/2",
            "last": "https://api.alphabank.com/cds-au/1.2.0/banking/accounts/3"
        },
        "meta": {
            "totalRecords": 10,
            "totalPages": 10
        }

     }
    ```