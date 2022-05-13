During the consent authorization process, the Data Holder redirect customers to provide consent for Accredited Data Recipients
to access their banking information. The process is as follows:

1. Accredited Data Recipient requests to access the banking information of a customer.
2. Data Holder validates the Accredited Data Recipients request.
3. The Data Holder redirects the requested information (containing the information the Accredited Data Recipients application wants to access)
to the customer.
4. The Data Holder authenticates the customer. See below for the default login page of the consent page:
 
    ![login-consent-page](../assets/img/learn/consent-manager/login-of-consent-page.png)
    
5. A list of bank accounts and the information that the Accredited Data Recipient wishes to access are displayed.
    ![select accounts](../assets/img/learn/consent-manager/consent-page-select-accounts.png)  
    
6. The customer can view the information before consenting or denying it. For example,
    ![grant consent](../assets/img/learn/consent-manager/consent-page-confirm.png) 
 
##Consent Authorization in WSO2 Open Banking 

Following components perform the consent authorization:

###Authorization endpoint
Before the Accredited Data Recipient application accesses the customer's banking information, the Accredited Data Recipients
sends an authorization request to get the customer's consent for it. The authorization request contains a request object. 
This request object is a self-contained JWT, which helps banks to validate the Accredited Data Recipient.

The method of sending the authorization request can vary as follows:

- **Send the authorization details in the authorization URL**

The Accredited Data Recipients share the request object containing the authorization details to the authorization server and obtain the 
authorization URL.

- **Send the authorization details as a reference in the authorization URL**

The Accredited Data Recipients push authorization details directly to the authorization server and obtain a reference. 
This method is also known as **Pushed Authorization**. The reference is notated by the claim; `request_uri`. Thereby, it prevents:
                                                                                         
- Intruders from intercepting the authorization information sent in the request_object
- Authorization request calls becoming bulky with the authorization details signed in the JWT

and protects the confidentiality and integrity of the authorization details when passing through an Accredited Data Recipients application.

###Pushed Authorization web application
The TPPs obtain `request_uri` which is a reference to the authentication and authorization details sent in the 
pushed authorization request.

- **Pushed Authorization - /par endpoint**

Upon successful invocation of the `/par` endpoint, TPPs will receive a `request_uri` value with an expiration time. 
Therefore, the reference is only valid until the expiration time for the subsequent authorization invocation.

Given below is a sample request and a response:

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

###Authorization web application 
The Accredited Data Recipients obtain an authorization URL that redirects the customer to a web interface hosted by the Data Holder. 
In this web application, the customer:

- Logs in using the login credentials. 
- Views information that the Accredited Data Recipient requested to access.
- Selects the accounts that the Accredited Data Recipient can access.
- Provides consent to the Accredited Data Recipient to access the information.
