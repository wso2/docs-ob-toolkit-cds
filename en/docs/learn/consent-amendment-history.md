Consent Amendment history is a feature that is supported in the CDS Toolkit, and any change that is performed on an 
active consent is considered as an amendment. This specific feature can be utilized to retrieve details related to consent 
amendment history.

The following are a few consent core service methods that support the CDS Toolkit and which perform amendments on the 
active consents. Built-in support is there to persist previous consent that existed before the amendment, as consent history.

- amendDetailedConsent()
- revokeConsentWithReason()

The [Asynchronous Event Executor](https://ob.docs.wso2.com/en/latest/develop/custom-event-executor/#writing-a-custom-event-executor) 
is utilized for the consent amendment history persistence when the above core service methods are successfully invoked.
A dedicated event executor is available to persist this consent amendment data to the database asynchronously.