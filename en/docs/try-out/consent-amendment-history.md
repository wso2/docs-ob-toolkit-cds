#Consent Amendment History Retrieval

This endpoint is to retrieve the consent amendment history when the CDR Arrangement ID and basic authentication details are provided as query parameters. For more
details, see [Consent Amendment History](../learn/consent-amendment-history.md).


The Data Holder sends the request to the customer stating the current consent and an array of consent history data objects.
This request is in the format of a URL as follows:

Update the placeholders with relevant values and run the following in a browser to prompt the consent amendment history data.

``` tab="Request"
https://<IS_HOST>:9446/api/openbanking/consent/admin/consent-amendment-history?cdrArrangementID=<CDR_ARRANGEMENT_ID>&UserID=<USER_ID>
```

``` tab="Response"
{
   "consentAmendmentHistory":[
      {
         "amendedTime":1647415438,
         "previousConsentData":{
            "validityPeriod":1678951431,
            "expirationDateTime":"1678951431",
            "clientId":"2ShrqDY9ubabwiV2y1TDYfnn3Aca",
            "userList":[
               {
                  "accountList":[
                     "6500001232"
                  ],
                  "authType":"linked_member",
                  "userId":"ann@gold.com@carbon.super"
               },
               {
                  "accountList":[
                     "6500001232"
                  ],
                  "authType":"linked_member",
                  "userId":"amy@gold.com@carbon.super"
               },
               {
                  "accountList":[
                     "6500001232",
                     "30080012343456"
                  ],
                  "authType":"primary_member",
                  "userId":"admin@wso2.com@carbon.super"
               }
            ],
            "currentStatus":"authorized",
            "permissions":[
               "bank:accounts.basic:read",
               "bank:accounts.detail:read",
               "bank:payees:read",
               "bank:transactions:read",
               "common:customer.detail:read",
               "common:customer.basic:read",
               "bank:regular_payments:read"
            ],
            "createdTimestamp":1647328956,
            "consentType":"CDR_ACCOUNTS",
            "updatedTimestamp":1647415438,
            "sharingDuration":"31536000"
         },
         "historyId":"3eaf52d6-c3d3-41e0-9549-c3a2e175ce8d",
         "amendedReason":"JAMAccountWithdrawal"
      },
      {
         "amendedTime":1647332312,
         "previousConsentData":{
            "validityPeriod":1678868302,
            "expirationDateTime":"1678868302",
            "clientId":"2ShrqDY9ubabwiV2y1TDYfnn3Aca",
            "userList":[
               {
                  "accountList":[
                     "30080012343456"
                  ],
                  "authType":"primary_member",
                  "userId":"admin@wso2.com@carbon.super"
               }
            ],
            "currentStatus":"authorized",
            "permissions":[
               "bank:accounts.basic:read",
               "bank:accounts.detail:read",
               "bank:payees:read",
               "bank:transactions:read",
               "common:customer.detail:read",
               "common:customer.basic:read",
               "bank:regular_payments:read"
            ],
            "createdTimestamp":1647328956,
            "consentType":"CDR_ACCOUNTS",
            "updatedTimestamp":1647332312,
            "sharingDuration":"31536000"
         },
         "historyId":"f63cac1d-fc98-4daf-bd71-3e638cd5b559",
         "amendedReason":"ConsentAmendmentFlow"
      },
      {
         "amendedTime":1647329172,
         "previousConsentData":{
            "validityPeriod":1678865162,
            "expirationDateTime":"1678865162",
            "clientId":"2ShrqDY9ubabwiV2y1TDYfnn3Aca",
            "userList":[
               {
                  "accountList":[
                     "6500001232"
                  ],
                  "authType":"linked_member",
                  "userId":"ann@gold.com@carbon.super"
               }
            }
         }
```