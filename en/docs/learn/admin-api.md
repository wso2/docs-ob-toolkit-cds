Sign in to the API Publisher as a user whose role includes `Internal/publisher`. Follow the steps given below: 

1. Sign in to the API Publisher portal at `https:// <WSO2_OB_APIM_HOST>:9443/publisher` with `creator/publisher` privileges.
   You can use the credentials for `mark@gold.com`.
     ![sign_into](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. 
     ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.8.0/cds-admin-1.8.0.yaml` file.

5. Click **Next**.

6. Set the **Endpoint** as follows:
     ```
     https://<WSO2_OB_APIM_HOST>:9443/cds-admin-api/au100
     ```
7. Click **Create** to create the API

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel.
     ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. 
     ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Once you get the message that the API is successfully updated, use the left menu panel and select **API Configurations > Runtime**.
      
     ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)

12. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

13. Now, select the **Custom Policy** option.

14. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.8.0/cds-admin-endpoint-insequence-1.8.0.xml` file.

15. Click **Select**.

16. Scroll down and click **SAVE**.

17. Go to **Deployments** using the left menu pane.
     
      ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

18. Select the API Gateway type 

      ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)
  
19. Click **Deploy**.

20. Go to **Overview** using the left menu pane.
      
      ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

21. Click **Publish**. 

      ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

## Invoke Metrics API

### GET Metrics - GET /admin/metrics

This end point allows the Australian Competition & Consumer Commission to obtain operational statistics from the 
Data Holder on the operation of their CDR compliant implementation. The statistics obtainable from this end point are 
determined by the non-functional requirements for the CDR regime.

This is the only endpoint available in the API. A sample request and response are as follows:

``` tab="Request"
curl -k -X GET "https://<APIM_HOST>:8243/cds-au/v1/admin/metrics?period=ALL" -H "accept: application/json" -H "x-v: 1" -H "Authorization: Bearer <USER_ACCESS_TOKEN> "
```

``` tab="Response"
{
  "data": {
    "requestTime": "string",
    "availability": {
      "currentMonth": 0,
      "previousMonths": [
        0
      ]
    },
    "performance": {
      "currentDay": 0,
      "previousDays": [
        0
      ]
    },
    "invocations": {
      "unauthenticated": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "highPriority": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "lowPriority": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "unattended": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "largePayload": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "secondary": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "largeSecondary": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      }
    },
    "averageResponse": {
      "unauthenticated": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "highPriority": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "lowPriority": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "unattended": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "largePayload": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "secondary": {
        "primary": {
          "currentDay": 0,
          "previousDays": [
            0
          ]
        },
        "secondary": {
          "currentDay": 0,
          "previousDays": [
            0
          ]
        }
      },
      "largeSecondary": {
        "primary": {
          "currentDay": 0,
          "previousDays": [
            0
          ]
        },
        "secondary": {
          "currentDay": 0,
          "previousDays": [
            0
          ]
        }
      }
    },
    "sessionCount": {
      "currentDay": 0,
      "previousDays": [
        0
      ]
    },
    "averageTps": {
      "currentDay": 0,
      "previousDays": [
        0
      ]
    },
    "peakTps": {
      "currentDay": 0,
      "previousDays": [
        0
      ]
    },
    "errors": {
      "currentDay": 0,
      "previousDays": [
        0
      ]
    },
    "rejections": {
      "authenticated": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "unauthenticated": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      }
    },
    "customerCount": 0,
    "recipientCount": 0,
    "secondaryHolder": {
      "errors": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      },
      "rejections": {
        "currentDay": 0,
        "previousDays": [
          0
        ]
      }
    }
  },
  "links": {
    "self": "string"
  },
  "meta": {}
}
```

!!!tip
     For more details on the response payload, see [Consumer Data Standards - Get Metrics](https://consumerdatastandardsaustralia.github.io/standards/#get-metrics).

### Metadata Update - POST /admin/register/metadata

Indicate that a critical update to the metadata for Accredited Data Recipients has been made and should be obtained.

If the Data Holder supports Private Key JWT client authentication to authenticate the CDR Register, authorisation 
requires the following scope: [admin:metadata:update](https://consumerdatastandardsaustralia.github.io/standards/#authorisation-scopes).
Otherwise, the scope is not applicable when the Data Holder supports Self-Signed JWT client authentication to authenticate the CDR Register.

!!!note
    This operation may only be called by the CDR Register.



