# Deploy Custom Throttling Policies

Custom throttling allows system administrators to define dynamic rules for specific use cases. When a custom throttling policy is created, it is possible to define any policy you like. This feature is required when certain traffic thresholds need to be freely throttled or rejected by Data Holders without impacting their performance or availability requirements. For more details on setting the traffic thresholds, refer to [Consumer Data Standards - Traffic Thresholds](https://consumerdatastandardsaustralia.github.io/standards/#traffic-thresholds).

This page explains how to deploy a custom throttling policy for the Consumer Data Standards API.

1. Sign in to the Admin portal at `https://<APIM_HOST>:9443/admin` with administrator privileges.

   ![sign\_into](/en/1.0.0/assets/images/sign-in-admin-c77ef2eb91159b2618821f72486fd3a7.png)

2. Go to **Rate Limiting Policies** and select the **Custom Policies** tab.

   ![select\_custom\_policies](/en/1.0.0/assets/images/select-custom-policies-78340bc5f8992891506d6e71d83de548.png)

3. To add a new policy, click **Define Policy**.

   ![select\_custom\_policies](/en/1.0.0/assets/images/add-policy-6ab223b79d8453d79021c4fce8bb8804.png)

4. Enter the following policy details and click **Add**.

   Click here to see the full list of Custom Throttling Policies...

   | Policy Name  | Siddhi Query                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
   | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | AllConsumers | `FROM RequestStream SELECT messageID, regex:find('^\/cds-au', apiContext) AS isEligible, str:concat(apiContext,':',cast(map:get(propertiesMap,'authorizationStatus'),'string')) as throttleKey, propertiesMap INSERT INTO EligibilityStream; FROM EligibilityStream[isEligible==true]#throttler:timeBatch(5 sec, 0) select throttleKey, (count(messageID) >= 300) as isThrottled, expiryTimeStamp group by throttleKey INSERT ALL EVENTS into ResultStream;` |

   ![define\_policy](/en/1.0.0/assets/images/define-policy-cf509d836ed2f181d5cb2ff2185620ac.png)

   note

   As shown in the above Siddhi query, the throttle key must match the key template format. If there is a mismatch between the key template format and the throttle key, requests will not be throttled.
