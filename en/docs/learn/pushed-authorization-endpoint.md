The Pushed Authorization Request (PAR) endpoint is an HTTP API at the authorization server. This endpoint accepts **HTTP POST** requests with
parameters in the HTTP request message body using the `application/x- www-form-urlencoded` format.

Unlike in the Authorization endpoint, in the Pushed Authorization endpoint, Data Recipients pushes authorisation 
details directly to the authorisation server and obtain a reference. The Data Recipients obtain `request_uri`, which is a reference 
to the authentication and authorization details sent in the pushed authorization request. Thereby, it prevents:
 
   - Intruders from intercepting the authorisation information sent in the `request_object`.
   - Authorisation request calls becoming large with the authorisation details signed in the JWT.

##PAR endpoint

Upon successful invocation of the `/par` endpoint, Data Recipients will receive a `request_uri` value with an expiration time.
Therefore, the reference is only valid until the expiration time for the subsequent authorization invocation.

Given below are sample request and response:

``` tab="Request"
curl --location --request POST 'https://localhost:8243/par' \
--header 'Accept: application/json' \
--header 'Cache-Control: no-cache' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
--data-urlencode 'request=<signed request object> \
--data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
--data-urlencode 'client_assertion=eyJraWQiOiJXX1RjblFWY0hBeTIwcTh6Q01jZEJ5cm9vdHciLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJVT05ZVGlGVll2a09mcUlyVkRxeTkwUmtMTU1hIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODI0My9wYXIiLCJpc3MiOiJVT05ZVGlGVll2a09mcUlyVkRxeTkwUmtMTU1hIiwiZXhwIjoxNjM4NjIzMjU5LCJqdGkiOiIzOTIxMzExMjE0OTEifQ.id6Yi6DS-KVnpKmHt9uZwN5X9gaFcZD6L0b9vrss_iA46RtpzlqRNeRdtMtoWYW1fKbqCvgz-gq-7HlzRBm9XO5CxTevCVliO-ObWju4Vyc9iLXYYBWpUo9H04HJkU8HUY3KPQDLtrijNBoEwOTv0zcEwxy-qVdkrT4F6t5eU6aZQf2MSiG-XdAd54vE-m2vx2pNsFE_ZLUXSv3YVfHuGFXzA21C0kumRhc4Mr1W3svzaNxHPb5E7w-61RXeJtnQY2WsgxmdYkSzg_rYJ1kAVfkZjW2l1KNP9uYpIewUMPnayiZ-RT1vDYCIcjnqbBOGrfStGASTg-2tFaWN8xI7eQ'
```

``` tab="Response"
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

The `request_uri` corresponds to the authorization request posted. This URI is a single-use reference to the respective request data
in the subsequent authorization request. The way the authorization process obtains the authorization request data is at
the discretion of the authorization server. There is no need to make the authorization
request data available to other parties via this URI.

###Expiration Time 

The `expires_in` is a JSON number that represents the lifetime of the `request_uri` in seconds as a positive integer. 
The `request_uri` lifetime is at the discretion of the authorization server but will typically be relatively short.

##Authorization web application

The Accredited Data Recipients obtain an authorization URL that redirects the customer to a web interface hosted by the Data Holder.
In this web application, the customer:

- Logs in using the login credentials.
- Views information that the Accredited Data Recipient requested to access.
- Selects the accounts that the Accredited Data Recipient can access.
- Provides consent to the Accredited Data Recipient to access the information.