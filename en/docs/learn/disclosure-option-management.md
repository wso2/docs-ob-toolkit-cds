# Disclosure Option Management

Data Holders must provide joint account holders with [Disclosure Option Management (DOMS)](https://d61cds.notion.site/Joint-account-disclosure-option-management-service-365dcb00593b4cd89864da6d59732ff4).

In a joint account, there are equal rights for all the owners of the account. The primary difference between a normal account and a joint account is that both people who own the account have full control over it. One can create consent on behalf of both owners and the other party should approve that. This is how the consent is managed in a joint account.

This feature provides the ability for joint account holders to block the sharing of data from their bank accounts as required. This is to ensure that every joint account holder of each account has the right to cease the disclosure of account data.

The bank is expected to invoke this endpoint when there is a change in the DOMS status in the DOMS dashboard of the bank.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server CDS Toolkit Level 1.0.0.8** onwards. For more information on updating, see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

# Endpoints

## Updating Disclosure Options

This API should be implemented to call the open banking endpoint once the disclosure option has been changed by the user on the bank.

Bank is expected to send a PUT request to the following endpoint in case of change of DOMS status from the Bank’s DOMS dashboard. The endpoint is secured by basic authentication.

```
PUT https://<HOST>.com/api/openbanking/account-type-mgt/account-type-management/update-disclosure-options
```

Sample request is given below:

```
curl--location--request
PUT 'https://localhost:9446/api/openbanking/account-type-mgt/account-type-management/disclosure-options' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--data '{
"data": [
    {
        "accountID": "6500001232",
        "disclosureOption": "pre-approval"
    },
    {
        "accountID": "3008001234",
        "disclosureOption": "no-sharing"
    }
]
}'
```

Sample responses are given below:

```
200, message = "Account disclosure options successfully updated."
400, message = "Bad Request. Request body validation failed."
```

## Consent Search API

For each consent, it is necessary to display the accounts that cannot be shared in the User Interface of the consent manager. The data for the Consent Manager UI is obtained from the consent search API.

Consequently, the information about non-sharable accounts needs to be incorporated into the response of the consent search API.

Once the `getaccounts` endpoint is called the array of `ConsentMappingResources` get displayed along with the `domsStatus` for each account. If the `domsStatus` has been changed to `no-sharing`, in the Account Selection page the relevant joint accounts are unable to select.

```
GET https://<HOST>:9446/api/openbanking/consent/admin/search?userIDs=admin@wso2.com@carbon.super
```

A sample request is given below:

```
curl --location 'https://localhost:9446/api/openbanking/consent/admin/search?userIDs=admin%40wso2.com%40carbon.super%0A' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw=='
```