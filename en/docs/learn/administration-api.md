WSO2 Open Banking supports collecting operational statistics from the Data Holder on the operation of their Consumer 
Data Right (CDR) compliant implementation. The Data Holders are required to expose some endpoints for the 
Australian Competition and Consumer Commission (ACCC), so the ACCC may obtain operational statistics in API performance, 
API availability, and API errors. 

### Get Metrics 

**GET /admin/metrics**

This endpoint allows the Australian Competition & Consumer Commission to obtain operational statistics from the
Data Holder on the operation of their CDR compliant implementation. The statistics obtainable from this endpoint are
determined by the non-functional requirements for the CDR regime.

!!!tip
    For more information, see [Consumer Data Standards - Get Metrics](https://consumerdatastandardsaustralia.github.io/standards/#get-metrics).

### Metadata Update

**POST /admin/register/metadata**

Indicates that important metadata for certified data recipients has been updated and needs to be retrieved.

If the Data Holder supports Private Key JWT client authentication to authenticate the CDR Register, authorisation
requires the following scope: [admin:metadata:update](https://consumerdatastandardsaustralia.github.io/standards/#authorisation-scopes).
Otherwise, the scope is not applicable when the Data Holder supports Self-Signed JWT client authentication to authenticate the CDR Register.

!!!note
     This operation may only be called by the CDR Register.
