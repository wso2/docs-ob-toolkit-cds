###Configuring MTLS Enforcement Executor

You can apply the `MTLSEnforcementExecutor` executor to check if a Mutual Transport Layer Security (MTLS) certificate is
present in the API request:

- The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor"
priority = 1
``` 

###Configuring certificate revocation validation

You can apply the `CertRevocationValidationExecutor` executor to perform the Online Certificate Status Protocol (OCSP) and
Certificate Revocation List (CRL) certificate revocation validation in the API request:

- The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.CertRevocationValidationExecutor"
priority = 2
```

!!!tip
    By default, WSO2 Open Banking API Manager executes the certificate revocation validation. However, you can set a proxy
    and execute the certificate revocation validation. In that case, configure the proxy in `<APIM_HOME>/repository/conf/deployment.toml`
    as follows:
    ```toml
    [open_banking.gateway.certificate_management.certificate.revocation.proxy]
    enabled = true
    host = "PROXY_HOSTNAME"
    port = 8080
    ```