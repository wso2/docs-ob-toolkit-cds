The page explains how to deploy the Administration API and try out the flow.

1. Sign in to the API Publisher portal at `https:// <APIM_HOST>:9443/publisher` with `creator/publisher` privileges.
     
     ![sign_into](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. 
     
     ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.8.0/cds-admin-1.8.0.yaml` file.

5. Click **Next**.

6. Click **Create** to create the API

7. After the API is successfully created, go to **Portal Configurations** using the left menu panel.
     ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. 
     ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

9. Click **Save**.

10. Once you get the message that the API is successfully updated, use the left menu panel and select **API Configurations > Runtime**.
      
     ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)

11. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

12. Now, select the **Custom Policy** option.

13. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.8.0/cds-admin-endpoint-insequence-1.8.0.xml` file.

14. Click **Select**.

15. Scroll down and click **SAVE**.

16. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

17. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

18. Go to **Deployments** using the left menu pane.
     
      ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

19. Select the API Gateway type 

      ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)
  
20. Click **Deploy**.

21. Go to **Overview** using the left menu pane.
      
      ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

22. Click **Publish**. 

      ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)

## Invoke Metrics API

### Get Metrics

**GET /admin/metrics**

This endpoint allows the Australian Competition & Consumer Commission to obtain operational statistics from the 
Data Holder on the operation of their CDR compliant implementation. The statistics obtainable from this endpoint are 
determined by the non-functional requirements for the CDR regime.

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

### Metadata Update

**POST /admin/register/metadata**

The CDR Register invokes this endpoint to update the Data Holders regarding critical updates of the Accredited Data Recipients' metadata.

If the Data Holder supports Private Key JWT client authentication to authenticate the CDR Register, authorisation 
requires the following scope: [admin:metadata:update](https://consumerdatastandardsaustralia.github.io/standards/#authorisation-scopes).
Otherwise, the scope is not applicable when the Data Holder supports Self-Signed JWT client authentication to authenticate the CDR Register.

!!!note
    This operation may only be called by the CDR Register.



