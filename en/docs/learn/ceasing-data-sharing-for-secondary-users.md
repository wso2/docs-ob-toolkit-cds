# Ceasing Data Sharing for Secondary Users

This allows an account holder to indicate that they no longer approve disclosure initiated by a secondary user to a particular accredited party. For more information, see [Ceasing Secondary User Sharing – Consumer Data Standards Australia](https://cdr-support.zendesk.com/hc/en-us/articles/5465006047375).

Enabling this feature stops data sharing for secondary accounts on all consents created with different Accredited Data Recipients (ADRs) maintained by the blocked legal entity. So that the relevant secondary accounts will be unavailable for the consents related to ADRs maintained by the blocked legal entities during the consent creation and consent amendment flows.

This feature allows an account holder to perform the following two activities.

1. The account holder can view and manage all accounts, secondary users, legal entities and their sharing status in the consent manager dashboard.

2. The account holder can block a legal entity to cease the disclosure initiated by a secondary user for a particular account to that legal entity so that during the consent creation and amendment flows, the relevant secondary account will be unavailable for consents arising through the aforementioned legal entity and all the ADRs under that legal entity.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server CDS Toolkit Level 1.0.0.8** onwards. For more information on updating, see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

## Updating the sharing status for a legal entity

```
PUT https://<HOST>/api/openbanking/account-type-mgt/account-type-management/legal-entitiy
```

This endpoint allows an account holder to update a legal entity sharing status.

- To block the sharing status of a legal entity for a particular secondary account holder and a specific account, the account holder must set the `legalEntitySharingStatus` attribute to `blocked`.
- To unblock the sharing status of a legal entity for a particular secondary account holder and a specific account, the account holder should set the `legalEntitySharingStatus` attribute to `active`.

A sample request is given below:

```
{
   "data": [
      {
         "secondaryUserID": "admin@wso2.com@carbon.super",
         "accountID": "30080098763500",
         "legalEntityID": "DR_81",
         "legalEntitySharingStatus": "blocked"
      },
      {
         "secondaryUserID": "admin@wso2.com@carbon.super",
         "accountID": "30080098763500",
         "legalEntityID": "DR_82",
         "legalEntitySharingStatus": "active"
      }
   ]
}
```

Sample responses are given below:

```
Case 01 : OK - HTTP RESPONSE CODE : 200
Case 02 : Bad Request - HTTP RESPONSE CODE : 400
```

## Retrieving all users, accounts, legal entities and their sharing status

```
GET https://<HOST>/api/openbanking/account-type-mgt/account-type-management/legal-entity-list/{userID}
```

This endpoint retrieves all users, accounts, legal entities, and their sharing status bound to the account holder in the consent manager dashboard.

To get the expected response the claim `legal_entity_name` should be specified in the  SSA.

Given below are sample responses for the above-mentioned endpoint. 

Case 01 : OK - HTTP RESPONSE CODE : 200

```
{
   "userID": "amy@gold.com",
   "secondaryUsers": [
      {
         "secondaryUserID": "admin@wso2.com",
         "accounts": [
            {
               "accountID": "30080098763500",
               "legalEntities": [
                  {
                     "legalEntityID": "DR_81",
                     "legalEntityName": "Data_Recipient_81",
                     "legalEntitySharingStatus": "blocked"
                  }
               ]
            },
            {
               "accountID": "7500101550",
               "legalEntities": [
                  {
                     "legalEntityID": "DR_81",
                     "legalEntityName": "Data_Recipient_81",
                     "legalEntitySharingStatus": "active"
                  }
               ]
            }
         ]
      }
   ]
}
```

Case 02 : Bad Request - HTTP RESPONSE CODE : 400 
