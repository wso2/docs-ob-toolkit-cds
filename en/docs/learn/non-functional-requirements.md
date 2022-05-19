## Availability Requirements

The definition of a period of unavailability is any period of time when any of the API end points defined in the 
standard is unable to reliably provide a successful response to an appropriately constructed request.

The availability requirement applies to both authenticated and unauthenticated endpoints.

The availability requirement does not include planned outages. Planned outages should be:

- Commensurate in length and frequency to other primary digital channels offered by the data holder
- Published to Data Recipients with at least one week lead time for normal outages
- May occur without notification if the change is to resolve a critical service or security issue

## Performance Requirements

API endpoint performance will be measured in response time of individual API requests from receipt of request to delivery of response.

It is understood that different response times can be measured depending on which technical layer of an API implementation 
stack is instrumented and that not all of the technical layers between the Data Recipient and the Data Holder
will be in the control of the Data Holder. As this is implementation specific it is expected that the Data Holder will 
ensure that the measurement of response time occurs as close to the Data Recipient as practicable.

In light of these considerations, the performance requirement for Data Holders is **95% of calls per hour responded to within a nominated threshold.**
 
??? tip "The nominated threshold for each endpoint will be according to the following table:"

    | Tier | Response Time |Applies To...|
    |---------|---------|---------|
    |High Priority|**1000ms**|All calls to the following endpoints: <ul><li>All InfoSec end points including Dynamic Client Registration</li><li>CDR Arrangement Revocation</li></ul>|
    |Low Priority|**1500ms**|Customer Present calls to the following endpoints: <ul><li>Get Account Detail</li><li>Get Account Balance</li><li>Get Bulk Balances</li><li>Get Balances For Specific Accounts</li><li>Get Transactions For Account</li><li>Get Transaction Detail</li><li>Get Payees</li><li>Get Payee Detail</li><li>Get Direct Debits For Account</li><li>Get Scheduled Payments For Account</li><li>Get Scheduled Payments Bulk</li><li>Get Scheduled Payments For Specific Accounts</li></ul>|
    |Large Payload|**6000ms**|Any Unattended calls to the following endpoints: <ul><li>Get Bulk Direct Debits</li><li>Get Direct Debits For Specific Accounts</li></ul>|