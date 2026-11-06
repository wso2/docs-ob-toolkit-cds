# Administration API

The page explains how to deploy the Administration API and try out the flow.

1. Sign in to the API Publisher portal at `https:// <APIM_HOST>:9443/publisher` with `creator/publisher` privileges.

   ![sign\_into](/en/latest/assets/images/sign-in-af55224a99febbeb33b9a33f7dbde670.png)

2. In the homepage, go to **REST API** and select **Import Open API**.

   ![let\&#39;s\_get\_started](/en/latest/assets/images/lets-get-started-285da24b2b0bc7883dcc6833839feb42.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](/en/latest/assets/images/create-an-api-1af65adad3cc1a2e66da827f329a784b.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.24.0/consumer-data-standards-admin-1.24.0.yaml` file.

5. Click **Next**.

6. Click **Create** to create the API

7. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](/en/latest/assets/images/portal-configurations-4aa0e19c2e3a09e88b7fbadd086f8977.png)

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](/en/latest/assets/images/business-plan-cd635503187f9d37541c5b351330be3e.png)

9. Click **Save**.

10. Go to **Develop -> API Configurations -> Policies** in the left menu pane to add a custom policy.<br /><br />

    ![select\_policies](/en/latest/assets/images/select-policies-5d7935fd04a408753ac9bb83df15cd74.png)

11. On the **Policy List** card, click on **Add New Policy**.

12. Fill in the **Create New Policy**.

13. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/consumerdatastandards.org.au/CDSAdminAPIs/1.24.0/cds-admin-api-insequence-1.24.0.xml` file.

14. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below:<br /><br />

    ![successful](/en/latest/assets/images/successful-2cfca6cc1ecdd161d44574d0fe646cef.png)

15. Expand the API endpoint you want from the list of API endpoints. For example: ![expand\_api\_endpoint](/en/latest/assets/images/expand-api-endpoint-d9710cb23518ffe38b4930bc072059da.png)

16. Expand the HTTP method from the API endpoint you selected. For example: ![expand\_http\_method](/en/latest/assets/images/expand-http-method-5e3de2528e564cbf5e72813572b998fe.png)

17. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request\_flow](/en/latest/assets/images/request-flow-4aa869e47a0c2e5864d6a12c6b929ca3.png)

18. Select **Apply to all resources** and click **Save**.

19. Scroll down and click **Save**.

20. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select\_endpoints](/en/latest/assets/images/select-endpoints-167a237b1d1125806e21098f966c2a6f.png)

21. Add a **Dynamic Endpoint**. ![add\_dynamic\_endpoint](/en/latest/assets/images/add_dynamic_endpoint-ac2976771f6f516f6f6de1261f908a90.png)

22. Go to **Deployments** using the left menu pane.

    ![select\_deployments](/en/latest/assets/images/select-deployments-f81ba4844ddbfe4a10d7aaa7cdf54051.png)

23. Select the API Gateway type

    ![api\_gateway](/en/latest/assets/images/dcr-api-gateway-2973cf919ba6e071a3c40ffdf16179ac.png)

24. Click **Deploy**.

25. Go to **Overview** using the left menu pane.

    ![select\_overview](/en/latest/assets/images/select-overview-a5ce904a426813c5c8877cbdb8787018.png)

26. Click **Publish**.

    ![publish\_api](/en/latest/assets/images/publish-api-4cdc5546c7864335fd0d27fd60c14cd5.png)

## Invoke Admin API[​](#invoke-admin-api "Direct link to Invoke Admin API")

### Get Metrics[​](#get-metrics "Direct link to Get Metrics")

**GET /admin/metrics**

This endpoint allows the Australian Competition & Consumer Commission to obtain operational statistics from the Data Holder on the operation of their CDR compliant implementation. The statistics obtainable from this endpoint are determined by the non-functional requirements for the CDR regime.

* Request
* Response

```
curl -k -X GET "https://<APIM_HOST>:8243/cds-au/v1/admin/metrics?period=ALL" -H "accept: application/json" -H "x-v: 1" -H "Authorization: Bearer <USER_ACCESS_TOKEN> "
```

```
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

tip

For more details on the response payload, see [Consumer Data Standards - Get Metrics](https://consumerdatastandardsaustralia.github.io/standards/#get-metrics).

### Metadata Update[​](#metadata-update "Direct link to Metadata Update")

**POST /admin/register/metadata**

The CDR Register invokes this endpoint to update the Data Holders regarding critical updates of the Accredited Data Recipients' metadata.

If the Data Holder supports Private Key JWT client authentication to authenticate the CDR Register, authorisation requires the following scope: [admin:metadata<!-- -->:update](https://consumerdatastandardsaustralia.github.io/standards/#authorisation-scopes). Otherwise, the scope is not applicable when the Data Holder supports Self-Signed JWT client authentication to authenticate the CDR Register.

note

This operation may only be called by the CDR Register.
