WSO2 Open Banking CDS Toolkit provides the capability for Data Holders to fulfill reporting requirement. 
The Data Holders are expected to submit bi-annual report forms to both the Australian Competition and Consumer Commission (ACCC) 
and the Office of the Australian Information Commissioner (OAIC). For more information, see [CDR-Reporting Forms](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0/reporting-forms-rule-94).

##Reporting Items 

The reports that Data Holders submit contain the following reporting items. These are relevant to product data sharing obligations:

1. Details of the Data Holder

2. Summary of CDR Complaint Data
    - Total number of CDR consumer complaints received.
    - Number of CDR consumer complaints received for each complaint type, in accordance with your complaints handling process:
        - Number of CDR consumer complaints resolved that were reported in this reporting period.
        - Number of CDR consumer complaints resolved that were reported in previous reporting periods.
    - Average number of days taken to resolve CDR consumer complaints through internal dispute resolution.
    - Number of CDR consumer complaints referred to a recognised external dispute resolution scheme.
    - Total number of complaints made to you by other CDR participants in relation to compliance.

3. Number of Data Requests
    - Number of product data requests received.
    - Number of consumer data requests received from eligible CDR consumers.
    - Number of consumer data requests received from accredited persons on behalf of eligible CDR consumers.

4. Refusals to Disclose
    - Number of times you have refused to disclose CDR data.
    - Set out each of the CDR Rules or data standards relied upon to refuse disclosure of that data.
    - For each CDR Rule or data standard identified in response to the above item, state the number of times you relied on that particular 
      CDR rule or data standard to refuse to disclose CDR data.
    
##Reporting Database

WSO2 Open Banking CDS Toolkit uses a Siddhi app to publish the data to the databases. This app is known as `GetInvocationDataApp.siddhi`.
Once this app successfully publishes the data, it is stored in the database referred to as the `ob_reporting_db` datasource, 
and Data Holders can manipulate this stored data when preparing reports.

##Data Reporting API

WSO2 Open Banking CDS Toolkit introduces an API to obtain API invocation details such as the errors occurred during APIs and the error types.
Using the Data Reporting API, the Data Holders can retrieve statistics on API invocation data for a requested period which are required for regulatory reporting. 

1. Deploying the `GetInvocationDataApp.Siddhi`, which is required to publish data related to data reporting:
    - Copy the `<SI_HOME>/resources/finance/cds-siddhi-files/GetInvocationDataApp.siddhi` file to the `<SI_HOME>/deployment/siddhi-files directory`.
    - Restart the Streaming Integrator,Identity Server and API Manager Servers respectively.

2. Invoking the API:
    - Set the date range by changing the values in the `fromDate` and `toDate` parameters in the request.
       
        ???Tip "Given below is a sample request and response"
            
            ```tab="Request"
            curl --location --request POST \
            http://<SI_HOST>:8007/InvocationData/StatusCheckStream \
            -H 'Content-Type: application/json' \
            -d '{
              "event":{
                 "name":"checkStatus",
                 "fromDate":"2020-01-00 12:00:00.000",
                 "toDate":"2021-06-30 12:00:00.000"
              }
            }'
            ```
   
            ```tab="Response"
            {
              "event":{
                 "MESSAGE_ID":"180911cb-d48a-48ee-9b74-57d88a0aa510",
                 "TOTAL_INVOCATIONS":3412,
                 "FAULTY_INVOCATIONS":{
                    "TOO_MANY_REQUESTS":512,
                    "FORBIDDEN":8,
                    "BAD_REQUEST":23,
                    "UNAUTHORIZED":63
                 }
              }
            }
            ```

##Data Reporting

As a part of CDR Data Reporting, the CDS Toolkit captures CDS Rule violations that happen during API invocations and 
combines them into the response of the above Data Reporting API.

???Tip "Given below is a sample request to retrieve bi-annual reporting data...."

    ```tab="Request"
    curl --location --request POST 'http://<WSO2_OB_BI_HOST>:8007/InvocationData/StatusCheckStream'
    --header 'Content-Type: application/json'
    --data-raw '
    {
       "event":{
          "name":"checkStatus",
          "fromDate":"2021-01-01 12:00:00.000",
          "toDate":"2021-06-30 12:00:00.000"
       }
    }'
    ```
    
    ```tab="Response"
    {
       "event":{
          "MESSAGE_ID":"20b57e9c-b7c7-4bce-98bd-46ea7491278a",
          "RECEIVED_REQUESTS":{
             "TOTAL_CALLS":53,
             "PRODUCT_ENDPOINT_CALLS":39,
             "CONSUMER_DATA_REQUESTS_BY_USER":3,
             "CONSUMER_DATA_REQUESTS_BY_ADR":11
          },
          "FAULTY_INVOCATIONS":{
             "TOO_MANY_REQUESTS":16,
             "FORBIDDEN":0,
             "BAD_REQUEST":5,
             "UNAUTHORIZED":3,
             "NOT_FOUND":0,
             "NOT_ACCEPTABLE":3,
             "UNPROCESSABLE":0
          },
          "CDR_RULE_VIOLATIONS":{
             "INVALID_ADR_STATUS":2,
             "INVALID_ADR_SOFTWARE_PRODUCT_STATUS":3,
             "INVALID_CONSENT_STATUS":4,
             "CONSENT_IS_REVOKED":6,
             "UNSUPPORTED_VERSION":3,
             "INVALID_BANKING_ACCOUNT":1,
             "UNAVAILABLE_BANKING_ACCOUNT":0,
             "INVALID_RESOURCE":0
          }
       }
    }
    ```
    
    !!!Note
        You need to capture the data required for the following rules from the banking backend. The scenarios are as follows:
         
          - `unavailable_banking_account`: The consent is valid for the given account but certain data sharing is restricted 
               due to other business validations in the bank backend.
          - `invalid_resource`: Trying to access an invalid resource excluding an account. For example, TransactionID. 
        
        To capture data for the above scenarios, banks should reply with the correct error code otherwise those numbers will not be captured in the response.