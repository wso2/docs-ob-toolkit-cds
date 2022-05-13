The pushed authorization request endpoint is an HTTP API at the authorization server that accepts HTTP "POST" requests with
parameters in the HTTP request message body using the "application/x- www-form-urlencoded" format.

Unlike in the Authorisation endpoint, in the Pushed Authorisation endpoint, Data Recipients pushes authorisation 
details directly to the authorisation server and obtains a reference. The Data Recipients obtain `request_uri` which is a reference 
to the authentication and authorization details sent in the pushed authorization request. Thereby, it prevents:
 
   - Intruders from intercepting the authorisation information sent in the `request_object`.
   - Authorisation request calls becoming large with the authorisation details signed in the JWT.

###PAR endpoint

Upon successful invocation of the `/par` endpoint, Data Recipients will receive a `request_uri` value with an expiration time.
Therefore, the reference is only valid until the expiration time for the subsequent authorization invocation.

Given below is a successful response:

```
{
    "request_uri": "urn:ietf:params:oauth:request_uri:bwc4JK-ESC0w8acc191e-Y1LTC2",
    "expires_in": 60
}
```

This same `request_uri` value is used in the subsequent authorization request as well.

??? tip "Click here to see configurations related to the Pushed Authorization web application..."
1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add the following configurations that allow you to change the format and the expiration time of the `request_uri` reference:

    ```
    [open_banking.push_authorisation]
    expiry_time=60
    request_uri_sub_string="substring"
    ```

    !!! note
        You can change the format of the request_uri using the `request_uri_sub_string` tag.
        
        ```
        {
            "request_uri": "urn:<substring>:bwc4JK-ESC0w8acc191e-Y1LTC2",
            "expires_in": 60
        }
        ```

###Request URI

The `request_uri` corresponding to the authorization request posted. This URI is a single-use reference to the respective request data
in the subsequent authorization request. The way the authorization process obtains the authorization request data is at
the discretion of the authorization server. There is no need to make the authorization
request data available to other parties via this URI.

###Expiration Time 

The `expires_in` is a JSON number that represents the lifetime of the `request_uri` in seconds as a positive integer. 
The `request_uri` lifetime is at the discretion of the authorization server but will typically be relatively short.