Non-Functional Requirement (NFR) specifies the quality attribute of a software system. They judge the software system 
based on Responsiveness, Usability, Security, Portability and other non-functional standards that are critical to the 
success of the software system. The non-functional requirements (NFRs) for the Consumer Data Right regime cover a number of considerations as:

- Custom Throttling
- Availability Requirements
- Performance Requirements
- Session Requirements

## Custom Throttling

Custom throttling allows system administrators to define dynamic rules for specific use cases. When a custom throttling
policy is created, it is possible to define any policy you like. This feature is required when certain traffic thresholds
need to be freely throttled or rejected by Data Holders without impacting their performance or availability requirements.
For more details on setting the traffic thresholds, refer to [Consumer Data Standards - Traffic Thresholds](https://consumerdatastandardsaustralia.github.io/standards/#traffic-thresholds).

In WSO2 Open Banking, the Traffic Manager component of the WSO2 API Manager acts as the global
throttling engine. This is based on the same technology as WSO2 Complex Event Processor (CEP), which uses the Siddhi query language.
Users are therefore able to create their own custom throttling policies by writing custom Siddhi queries.

The specific combination of attributes being checked in the policy needs to be defined as the key (also called the key template).
The key template usually includes a predefined format and a set of predefined parameters. It can contain a combination of allowed keys separated by a colon (:),
where each key must start with the prefix `$`. The following keys can be used to create custom throttling policies:
```
resourceKey, userId, apiContext, apiVersion, appTenant, apiTenant, appId, clientIp
```

## Availability Requirements

Availability describes the likelihood that a user will be able to access the system at a given point in time. While it can be expressed 
as a percentage of the time, the system is accessible for operation during some time period.

The availability requirement applies to both authenticated and unauthenticated endpoints.

The availability requirement does not include planned outages. Planned outages should be:

- In relation to the length and frequency of the data holder's other primary digital channels.
- Notified to data recipients with a wait time of at least a week for normal crashes.
- If the modification is necessary to fix a critical service or security issue, it may occur without notice.

!!! note
      Service availability for data holders and secondary data holders must be 99.5% per month.

## Performance Requirements

Defines how fast an API endpoint responds to individual API requests, from receipt of the request to delivery of the response.

It is recognized that various response times can be measured depending on which technical layer of an API implementation 
stack is instrumented, and that the Data Holder will not have control over all of the technical levels between the 
Data Recipient Software Product and the Data Holder.

In light of these considerations, the performance requirement for Data Holders is **95% of calls per hour responded to within a nominated threshold.**
 
??? tip "The nominated threshold for each end point will be according to the following table:"

    | Tier | Response Time |Applies To...|
    |---------|---------|---------|
    |High Priority|**1000ms**|All calls to the following end points: <ul><li>All InfoSec end points including Dynamic Client Registration</li><li>CDR Arrangement Revocation</li></ul>|
    |Low Priority|**1500ms**|Customer Present calls to the following end points: <ul><li>Get Account Detail</li><li>Get Account Balance</li><li>Get Bulk Balances</li><li>Get Balances For Specific Accounts</li><li>Get Transactions For Account</li><li>Get Transaction Detail</li><li>Get Payees</li><li>Get Payee Detail</li><li>Get Direct Debits For Account</li><li>Get Scheduled Payments For Account</li><li>Get Scheduled Payments Bulk</li><li>Get Scheduled Payments For Specific Accounts</li></ul>|
    |Large Payload|**6000ms**|Any Unattended calls to the following end points: <ul><li>Get Bulk Direct Debits</li><li>Get Direct Debits For Specific Accounts</li></ul>|

## Session Requirements

A unique session's expiry time should be specified according to the security profile's statements.
After a unique session expires, the Data Recipient Software Product is expected to establish a new session for the same 
customer as long as the authorization is still valid. For more details on security profile, refer to 
[Consumer Data Standards - Security Profile](https://consumerdatastandardsaustralia.github.io/standards/#security-profile).