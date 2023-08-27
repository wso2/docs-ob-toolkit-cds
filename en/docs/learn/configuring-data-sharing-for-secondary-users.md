# Configuring Data Sharing for Secondary Users

WSO2 Open Banking supports secondary user data-sharing obligations. This requirement is introduced to the Consumer Data Specification via Decision Proposal 160: Secondary Users. 

The feature allows users who have been nominated as a secondary user to an account by an account holder, to share data from those secondary user accounts with third parties.

An account holder can nominate secondary users for a certain account to share data from that account with third-party service providers on his behalf. Data holders should enable the nomination of secondary users. It is up to data holders to determine the norms and regulations that must be followed.

The secondary users should be able to include secondary accounts in a data-sharing arrangement and account holders should have a means to withdraw data sharing of secondary accounts from such data-sharing arrangements and to be notified about the authorization, withdrawal and expiration of such data-sharing arrangements.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server CDS Toolkit Level 1.0.0.8** onwards. For more information on updating, see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

## Integrating with the bank back-end

### Secondary Account Update API

The Secondary Account Update API is defined below.

The bank needs to invoke this endpoint to update the open banking solution regarding status changes happening on secondary user accounts. This endpoint persists the received secondary user related information in the `OB_ACCOUNT_METADATA` table. When persisting the `accountID` of the secondary account and `secondaryUserID` parameters are used as a combined key and metadata will be stored as key-value pairs.

```
PUT - api/openbanking/account-type-mgt/account-type-management/secondary-accounts
```

This endpoint is secured with basic authentication.

A sample request is given below:

```
curl --location --request PUT 'https://<IS_HOME>:9446/api/openbanking/account-type-mgt/account-type-management/secondary-accounts' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'Content-Type: application/json' \
--data-raw '{
   "data": [
      {
         "accountID":"30080098763500",
         "secondaryUserID":"admin@wso2.com",
         "otherAccountsAvailability":true,
         "secondaryAccountInstructionStatus":"active"
      },
      {
         "accountID":"30080098763501",
         "secondaryUserID":"admin@wso2.com",
         "otherAccountsAvailability":true,
         "secondaryAccountInstructionStatus":"inactive"
      }
   ]
}'
```

# Consent search API Modifications

A new search query parameter named `secondaryAccountInfo` is introduced to the consent search API. The value of the `secondaryAccountInfo` parameter will be set to `true` to search for secondary account bounded consents related to a particular account holder. This search API will be used to obtain data needed for the secondary account consent page in the consent management dashboard. Then account holders will be able to view and manage such consents through the dashboard. 

A sample request is given below:

```
GET https://<WSO2_OB_IAM_HOME>:9446/api/openbanking/consent/admin/search?secondaryAccountInfo=true?userIDs=<ACCOUNT_OWNER_USER_ID>
```

A sample response is given below:

```json
{
   "clientId": "dIwYnqkohTHwOI1bUG0VpWxVNCoa",
   "currentStatus": "authorized",
   "createdTimestamp": 1683569588,
   "recurringIndicator": true,
   "authorizationResources": [...],
   "updatedTimestamp": 1683569588,
   "validityPeriod": 1683629555,
   "consentAttributes": {
      "ExpirationDateTime": "1683629555",
      "commonAuthId": "1a25530b-cf2a-4341-8b27-5fd0a2d5557c",
      "sharing_duration_value": "60000"
      "consentId": "85d14688-abe5-4cc0-98c3-7f6af1d0a5e2",
      "consentMappingResources": [....],
      "secondaryAccountInfo": [{
         "secondaryAccountUser": ”user1@gold.com @carbon.super”,
         "secondaryAccountOwner": "owner1@gold.com@carbon.super",
         "activeAccounts": [300800987],
         "inactiveAccounts": [7005567]
      },
      { ......
      },
      ]
   
   }
}
```

# Modifications to the Account Selection Page

With this feature enabled, the consent account selection page shows the eligible and ineligible secondary accounts based on the data filtered by `OBCDSAuthServletImpl`. Eligible accounts will be selectable to bind to consent and ineligible accounts will be disabled for selection and a descriptive message will be shown for them on why they are disabled and instructing how to request sharing rights from the account holder.

    ![unavailable accounts](../assets/img/learn/account-management/unavailable-accounts.png)
