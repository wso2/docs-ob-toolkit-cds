# Configuring Data Sharing for Business Nominated Representatives

This requirement is introduced to the Consumer Data Specification on 22 December 2020 via Competition and Consumer (Consumer Data Right) Amendment Rules (No. 3) 2020. 

## Nominated Representatives

Non-individual consumers can nominate individuals as nominated representatives who can share Consumer Data Right (CDR) data and manage data sharing on their behalf. Non-individual consumers can make and revoke such nominations.

A non-individual consumer needs to nominate at least one individual as a nominated representative for CDR data to be shared on their behalf.

The nominated representative is responsible for interacting with the data holder and the ADR on behalf of the business. They can give consent for the data holder to share data with the ADR, amend or revoke consent, and manage the data sharing relationship.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server CDS Toolkit Level 1.0.0.8** onwards. For more information on updating, see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

## Integrating with the Bank Backend

The bank's back end endpoint for retrieving the user's accounts list returns a response of the shareable account in the following format:

```json
{
   "account_id":"143-000-B1234",
   "display_name":"business_account_1",
   "accountId":"143-000-B1234",
   "accountName":"business_account_1",
   "authorizationMethod":"single",
   "nickName":"not-working",
   "customerAccountType":"Business",
   "profileName":"Organization A",
   "profileId":"00001",
   "type":"TRANS_AND_SAVINGS_ACCOUNTS",
   "isEligible":true,
   "isJointAccount":false,
   "jointAccountConsentElectionStatus":false,
   "isSecondaryAccount":false,
   "businessAccountInfo":{
   "AccountOwners":[
      {
         "memberId":"user1@wso2.com@carbon.super",
         "meta":{}
      },
      {
         "memberId":"user2@wso2.com@carbon.super",
         "meta":{}
      }
   ],
   "NominatedRepresentatives":[
      {
         "memberId":"nominatedUser1@wso2.com@carbon.super",
         "meta":{}
      },
      {
         "memberId":"nominatedUser2@wso2.com@carbon.super",
         "meta":{}
      },
      {
         "memberId":"admin@wso2.com@carbon.super",
         "meta":{}
      }
   ]
   }
}
```

The `customerAccountType` and `businessAccountInfo` properties will be added for the business nominated representative feature.

## Managing Nominated Representative Permissions

### Creating and updating permissions

```
PUT https://<IS_HOST>/cds/account-metadata/business-stakeholders
```

This endpoint is secured with basic authentication.

A sample request is given below:

```json
{
   "data": [
      {
         "accountID": "143-000-B1234",
         "accountOwners": [
            "accountOwner1@wso2.com@carbon.super",
            "accountOwner2@wso2.com@carbon.super"
         ],
         "nominatedRepresentatives": [
            {
               "name": "nominatedRep1@wso2.com@carbon.super",
               "permission": "AUTHORIZE"
            },
            {
               "name": "nominatedRep2@wso2.com@carbon.super",
               "permission": "AUTHORIZE"
            },
            {
               "name": "nominatedRep2@wso2.com@carbon.super",
               "permission": "VIEW"
            }
         ]
      }
   ]
}
```

### Revoking permissions

This endpoint is secured with basic authentication.

```
DELETE https://<IS_HOST>/cds/account-metadata/business-stakeholders
```

A sample request is given below:

```json
{
   "data": [
      {
         "accountID": "143-000-B1234",
         "accountOwners": [
            "accountOwner1@wso2.com@carbon.super"
         ],
         "nominatedRepresentatives": [
            "nominatedRep1@wso2.com@carbon.super"
         ]
      }
   ]
}
```

### Retrieve stakeholder permissions

This endpoint is secured with basic authentication.

```
GET https://<IS_HOST>/cds/account-metadata/business-stakeholders/permission?userId=nominatedRep1@wso2.com&accountId=143-000-B1234
```

A sample response is given below:

```json
{
   "userId": "nominatedRep1@wso2.com@carbon.super",
   "permissionStatus": {
      "143-000-B1234": "AUTHORIZE"
   }
}
```

### Retrieving stakeholder profile type (as business or individual)

This endpoint is secured with basic authentication.

```
GET https://<IS_HOST>/cds/account-metadata/business-stakeholders/profiles?userId=nominatedRep1@wso2.com
```

A sample response is given below:

```
{
   "UserId": "user1@wso2.com@carbon.super",
   "userProfiles": [
      "business",
      "individual"
   ]
}
```
