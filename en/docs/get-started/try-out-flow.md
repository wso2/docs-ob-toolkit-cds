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
7. Click **Create** to create the API. ![create-accounts](../assets/img/get-started/quick-start-guide/create-accounts.png)

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Toggle the **Schema Validation** button to enable Schema Validation for all APIs except for the Dynamic Client Registration API. ![schema-validation](../assets/img/get-started/quick-start-guide/schema-validation.png)

12. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

13. Now, select the **Custom Policy** option.

14. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/1.8.0/cds-dynamic-endpoint-insequence-1.8.0.xml` insequence file. ![accounts_insequence](../assets/img/get-started/quick-start-guide/accounts-insequence.png)
 
15. Click **Select**. 

16. Scroll down and click **SAVE**.

19. Go to **Deployments** using the left menu pane. 

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)
    
20. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

21. Click **Deploy**.

22. Go to **Overview** using the left menu pane. 

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

23. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

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
      "aud": "https://localhost:9446/oauth2/token",
      "iss": "3nzwb1VuaUISzujNe6QjDxlgnCka",
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
       "redirect_uri": "https://wso2.com",
       "state": "suite",
       "exp": 1739640532,
       "nonce": "8fc4cbb4-287b-42aa-a1d0-67dce6fc7479",
       "client_id": "3nzwb1VuaUISzujNe6QjDxlgnCka"
      }
    ```
    
    ``` tab="Sample"
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsImlzcyI6IjNuendiMVZ1YVVJU3p1ak5lNlFqRHhsZ25Da2EiLCJzY29wZSI6Im9wZW5pZCBiYW5rOmFjY291bnRzLmJhc2ljOnJlYWQgYmFuazphY2NvdW50cy5kZXRhaWw6cmVhZCBiYW5rOnRyYW5zYWN0aW9uczpyZWFkIiwiY2xhaW1zIjp7InNoYXJpbmdfZHVyYXRpb24iOjYwMDAwLCJpZF90b2tlbiI6eyJhY3IiOnsidmFsdWVzIjpbInVybjpjZHMuYXU6Y2RyOjMiXSwiZXNzZW50aWFsIjp0cnVlfX0sInVzZXJpbmZvIjp7fX0sInJlc3BvbnNlX3R5cGUiOiJjb2RlIGlkX3Rva2VuIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInN0YXRlIjoic3VpdGUiLCJleHAiOjE3Mzk2NDA1MzIsIm5vbmNlIjoiOGZjNGNiYjQtMjg3Yi00MmFhLWExZDAtNjdkY2U2ZmM3NDc5IiwiY2xpZW50X2lkIjoiM256d2IxVnVhVUlTenVqTmU2UWpEeGxnbkNrYSJ9.nrLPRvsFq_D0hEEvKKqN6m1uiQUV4cJK3Oy0YeY9BK5aaOgVJ43ni5ObGCuUnarBnRoxQQC4_wgqa54qI5KDjz_PV0ntMsUDlwhSIrGiy31zI4RqUogiF70ITClnPN6g1fQFQchjb7EQcwmrV5OXkJgNI-Ly3R7MKgyECcWINRvPsS15dwd9XBy_2HSkEyDRipAb5oPFLT-GLyvE2YlHiHXatf1Dj6vFpeKWoCQ0sN6djZBVoH7NExkQ7TSY5RIc9eHCyWZDD4puj9FtRXBYJw0My8L5CgfpPUngbcAut1oYz9tsvYiRb_adjbZ87-r_RlQqhGtH15ccf7cxx_CDvg
    ```

2. The Data Holder sends the request to the consumer stating the accounts and information that the application wishes to access. 
This request is in the format of a URL as follows. 

    Update the placeholders with relevant values and run the following in a browser to prompt the invocation of the authorize API. 
    
    ```
    https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20op
    enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```

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

In this section, you will be generating an access token using the authorization code generated in the section [above](authorizing-a-consent).

1. Generate the client assertion by signing the following JSON payload using supported algorithms. 

    !!! note
        If you have configured the [OB certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox), 
        download the certificate and keys attached [here](../../assets/attachments/Certificates.zip), and use them for signing and transports layer security testing purposes.

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
        "access_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsIm5iZiI6MTYyODc0NjU5MiwiYXpwIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsInNjb3BlIjoiYWNjb3VudHMgY29uc2VudF9pZGRjNjRlMjdjLTcxMzktNDQwZS04YjRmLWNkNzBjNjQ5ZTA5NiBvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiJ2WW9VWVJTUTdDZ29ZeE5NV1dPekM4dU5mUXJpczRwWFFYMFptaXRSeHpzIn0sImV4cCI6MTYyODc1MDE5MiwiaWF0IjoxNjI4NzQ2NTkyLCJqdGkiOiI3NTA4MmEzYS1iNDllLTRjZjEtYjI4Ni1lMWJiYTYwZTViNTYiLCJjb25zZW50X2lkIjoiZGM2NGUyN2MtNzEzOS00NDBlLThiNGYtY2Q3MGM2NDllMDk2In0.MhNpi0C2vASqrigTE1qGjK_7PY722H4PjzOSwMKcmFo7YgIFIBQdtj2BRJN0y7WAOFYGqh5lUFKMJWrXXtOyo0-6pWheluQfmOMiTyqOzA7WcTZAwYUzeoRmgWtR_LCYNwzm1O7CcNeavLGucLkCmpTW9Xvn3dKkk0XFonzrrCH9QqMrA0iQP6vYgH5wH4rDxcK_6Vk1r0X33sHVM-k4ifbcIzZekUdJIgNQfK1Qosslmvm1LZfEZ1vi63cfkc0IexNW6jJYvvZxdYJVz42EKKIqR_Z_HBs8umamqhUqKAkcv7Q76bNNPpM1iBJK-eDVf8yfIr9243fyictuqhP-2Q",
        "refresh_token": "98dfa00b-a2a4-3ba0-9af2-4fac26f317b3",
        "scope": "accounts openid",
        "id_token": "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiUEFGdl9WZFdqREp0bFYyN1U1NEJYdyIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJjX2hhc2giOiJac2l4aVM4c2RBZFJhVHVHZjlYbmxBIiwic3ViIjoiYWRtaW5Ad3NvMi5jb21AY2FyYm9uLnN1cGVyIiwibmJmIjoxNjI4NzQ2NTkyLCJhenAiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2Mjg3NTAxOTIsImlhdCI6MTYyODc0NjU5Miwibm9uY2UiOiJuLTBTNl9XekEyTSJ9.VRMfZouZTRm0QotoN0g95QjH7qKG_KwLExJyyb6AGbFewulyjwyPTJsHIj7D19ZZuNL14KqdCw51X3QjDXjLuvE6oas12EpKwHBuAAJjRtLf7NbbRPFok8Qlq011U_qNfYgcFubOQ5bXTr1QpwIU8imExvRxYS5UzsGyvluQ9hzjmRZM5cfwJ7hck71joX45Ue3E2tIvWxqyU13EJOyD3gd2QuhM6GSq3oWk8S0N_y7ACWLEHM8nzBUXiRo03D4DIacnmiZeicjIiim-SzF70tDJe70qy_nqbgf6VGqdAAIXyMXAvKxF5QWwYd5seMvt5o-_hCsI6DV69FawGJcbVQ",
        "token_type": "Bearer",
        "expires_in": 3600
    }
    ```
   
### Invoking Consumer Data Standards API

Once the consumer approves the account consent, the Accredited Data Recipient application is eligible to access the account details of the consumer.

The application can now invoke the **GET/ accounts** endpoint available in the CDS API. This retrieves a 
full list of accounts that the consumer has authorised the application to access. The Account Ids returned are used to retrieve 
other resources for a specific AccountId.

1. A sample request looks as follows:
    
    ```
    curl -X GET \
    https://localhost:8243/open-banking/v3.1/aisp/accounts' \
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
        "Data": {
            "Account": [
                {
                    "AccountId": "30080012343456",
                    "Status": "Enabled",
                    "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                    "Currency": "GBP",
                    "AccountType": "Personal",
                    "AccountSubType": "CurrentAccount",
                    "Nickname": "Bills",
                    "OpeningDate": "2020-01-16T06:06:06+00:00",
                    "MaturityDate": "2025-04-16T06:06:06+00:00",
                    "Account": [
                        {
                            "SchemeName": "SortCodeAccountNumber",
                            "Identification": "30080012343456",
                            "Name": "Mr Kevin",
                            "SecondaryIdentification": "00021"
                        }
                    ]
                },
                {
                    "AccountId": "30080012343789",
                    "Status": "Enabled",
                    "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                    "Currency": "GBP",
                    "AccountType": "Personal",
                    "AccountSubType": "CurrentAccount",
                    "Nickname": "Bills",
                    "OpeningDate": "2020-01-16T06:06:06+00:00",
                    "MaturityDate": "2025-04-16T06:06:06+00:00",
                    "Account": [
                        {
                            "SchemeName": "SortCodeAccountNumber",
                            "Identification": "30080012343789",
                            "Name": "Mr Kevin",
                            "SecondaryIdentification": "00021"
                        }
                    ]
                }
            ]
        },
        "Links": {
            "Self": "https://api.alphabank.com/open-banking/v3.1/accounts"
        },
        "Meta": {
            "TotalPages": 1
        }
    }
    ```