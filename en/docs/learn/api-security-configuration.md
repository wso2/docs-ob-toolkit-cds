###Configuring MTLS Enforcement Executor

You can apply the `MTLSEnforcementExecutor` executor to check if a Mutual Transport Layer Security (MTLS) certificate is
present in the API request:

- The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor"
priority = 1
``` 

###Configuring MTLS when TLS is terminated at the load balancer (APIM)

When TLS is terminated at the load balancer before reaching the WSO2 API Manager Gateway, the load balancer must forward
the client certificate as an HTTP header. The gateway reads the certificate from this header.

Configure the following in `<APIM_HOME>/repository/conf/deployment.toml`:

```toml
[open_banking.gateway.certificate_management]
# The HTTP header name from which the gateway reads the client transport certificate.
# This must match the header name the load balancer uses to forward the certificate.
client_transport_cert_header_name = "x-wso2-mutual-auth-cert"
# Set to true if the certificate in the header is URL-encoded.
url_encode_client_transport_cert_header_enabled = true
```

!!!note
The default header name is `x-wso2-mutual-auth-cert`. Ensure the load balancer injects the PEM-encoded client
certificate into this header. If the certificate is URL-encoded by the load balancer, set
`url_encode_client_transport_cert_header_enabled = true`.

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

###Configuring MTLS when TLS is terminated at the load balancer (IS)

When TLS is terminated at the load balancer before reaching the WSO2 Identity Server, the load balancer must
forward the client certificate as an HTTP header. The Identity Server reads the certificate from this header.

Configure the following in `<IS_HOME>/repository/conf/deployment.toml`:

```toml
[oauth.mutualtls]
# The HTTP header name from which the Identity Server reads the client transport certificate.
# This must match the header name the load balancer (or API Manager gateway) uses to forward the certificate.
client_certificate_header = "x-wso2-mutual-auth-cert"
```

Additionally, configure the Open Banking-specific MTLS settings:

```toml
[open_banking.identity.mutualtls]
# Set to true if the certificate forwarded in the header is URL-encoded.
# This is required when the API Manager gateway URL-encodes the certificate before forwarding it to IS.
client_certificate_encode = true
# Specify the JWKS URI for the transport certificate validation.
transport_jwks_uri = "software_jwks_endpoint"
```