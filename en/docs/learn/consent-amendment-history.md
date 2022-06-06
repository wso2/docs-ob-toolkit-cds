Any change that is performed on an active consent is considered as an amendment. WSO2 Open Banking CDS Toolkit provides
the Consent Amendment History feature to utilize and retrieve details related to the consent amendment history.

The [Asynchronous Event Executor](https://ob.docs.wso2.com/en/latest/develop/custom-event-executor/#writing-a-custom-event-executor) 
is utilized for the consent amendment history persistence, and a dedicated event executor is available to persist this 
consent amendment data to the database asynchronously.

The CDS Toolkit provides the Consent Amendment History feature during CDS consent amendment flow, consent revocation from 
the CDR Arrangement API and consent dashboard, and joint account withdrawal from the consent dashboard.