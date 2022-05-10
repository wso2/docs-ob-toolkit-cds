WSO2 Open Banking CDS Toolkit contains TOML-based configurations. All the server-level configurations of the Identity 
Server instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the open banking flow for WSO2 Identity Server.

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the Identity Server:

    ``` toml
    [server]	
    hostname = "<IS_HOST>"	 
    ```
   
4. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
database server, and the JDBC driver. 

    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, 
    see [Setting up databases](setting-up-databases.md).

    ```toml tab='shared_db'
    [database.shared_db]
    url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
   
    ```toml tab='identity_db'
    [database.identity_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
     
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='user'
    [database.user]
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2OB_DB'
    [[datasource]]
    id="WSO2OB_DB"
    url = "jdbc:mysql://localhost:3306/openbank_openbankingdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. Configure the authentication endpoints with the hostname of the Identity Server.

    ``` toml
    [authentication.endpoints]	
    login_url = "https://<IS_HOST>:9446/authenticationendpoint/login.do"	
    retry_url = "https://<IS_HOST>:9446/authenticationendpoint/retry.do"
    ```
   
    ``` toml
    [oauth.endpoints]	
    oauth2_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"	
    oidc_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
    ```
   
6. Configure the following endpoints for the `token_revocation` event listener:
 
    - Configure `TokenEndpointAlias` with the hostname of the Identity Server.
    - Configure `notification_endpoint` with the hostname of the API Manager.  

    ``` toml
    [[event_listener]]	
    id = "token_revocation"	
    ...
    [event_listener.properties]
    TokenEndpointAlias= "https://<IS_HOST>:9446/oauth2/token"	
    notification_endpoint = "https://<APIM_HOST>:9443/internal/data/v1/notify"	
    ```

7. Add and configure the following tags:
    - `signing_certificate_kid`: Configure the `kid` value for the signing certificate of the bank. The same value is 
    configured as the `kid` value of the ID Token.
    - `client_transport_cert_as_header_enabled`: To send the client certificate as a transport header, set this to `true`.

    ``` toml
    [open_banking.identity]
    signing_certificate_kid="123"
    client_transport_cert_as_header_enabled = true
    ```

8. Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

    ``` toml
    [authentication.adaptive.event_publisher]	
    url = "http://<IS_HOST>:8006/"
    ```

9. Update access control configurations for the `consentmgr` resource as follows: 

    ``` toml
    [[resource.access_control]]
    context = "(.*)/consentmgr(.*)"
    secure="false"
    http_method="GET,DELETE"
    ```

10. Add and configure the following tags:

    - `enable` : To enable metadata caching, set the value to `true`.
    - `update_period` : Configure the fetch time for periodical cache update in minutes.
    - `data_recipient_discovery_url` : Configure the endpoint provided by ACCC for retrieving the statuses of Data Recipients.
    - `dcr_internal_url` : Configure the `<IS_HOST>` placeholder with the hostname of the Identity Server.
    - `apim_application_search_url` : Configure the `<APIM_HOST>` placeholder with the hostname of the API Manager. This endpoint will
      return a list of client applications. For more details, see
      [list of client applications](https://apim.docs.wso2.com/en/latest/reference/product-apis/admin-apis/admin-v2/admin-v2/#tag/Applications/paths/~1applications/get).
    - `http_request_retry_count` : Configure the retry count for HTTP request failures, when polling the `data_recipient_discovery_url`.
    - `dataholder_responsibilities.bulk_execution` : To execute data holder responsibilities as an overnight bulk operation, set the value to `true`.
    - `dataholder_responsibilities.bulk_execution_hour` : To define the maximum number of bulk execution hours and this is in 24-Hour(0 -23) time format.

      ```
      [open_banking_cds.metadata_cache]
      enable=true
      update_period=5
      data_recipients_discovery_url="https://api.cdr.gov.au/cdr-register/v1/banking/data-recipients"
      dcr_internal_url="https://<IS_HOST>:9446/api/openbanking/dynamic-client-registration/register"
      apim_application_search_url="https://<APIM_HOST>:9443/api/am/admin/v2/applications"
      http_request_retry_count=2
      dataholder_responsibilities.bulk_execution=true
      dataholder_responsibilities.bulk_execution_hour=12
      ```
      ```
      [open_banking.service_activator.subscribers]
      subscriber="com.wso2.openbanking.cds.identity.metadata.periodical.updater.internal.MetadataScheduledTaskObserver"
      ```
    
11. Configure the endpoints to retrieve sharable accounts. This is required when displaying the accounts on 
the consent page.

    ``` toml
    [open_banking_cds.consent_management]
    sharable_account_retrieve_endpoint = "http://<APIM_HOST>:9763/api/openbanking/cds/backend/services/bankaccounts/bankaccountservice/sharable-accounts"
    ```

12. To generate the self link in the consent JSON response, configure the URLs of the exposed APIs as follows:
   
    ``` toml
    [open_banking_cds.consent]
    account_consent_self_link = "https://<APIM_HOST>:8243/cds-au/{version}/banking/accounts"
    ```

13. In the consent re-authentication step of the Accounts flow, during authorisation, the PSU is allowed to change the 
selected account. To enable this feature and update the account bound to the consent, set the following property to true:

    ``` toml
    [open_banking_cds.consent]
    acc_update_by_psu_enabled = true
    ```

14. Enable Request-URI validation that validates `AccountID` in the request against the `AccountID` in consent during 
account retrieval. By default, this is disabled and the configuration is set to `false`.

    ``` toml
    [open_banking_cds.consent]
    Validate_acc_id_on_retrieval_enabled = true
    ```
    
15. If you want to use the [Data publishing](../learn/data-publishing.md) feature:

    - Enable the feature and configure the `server_url` and `auth_url` properties with the hostname of WSO2 Streaming 
    Integrator.

    ``` toml
    [open_banking.data_publishing]	
    enable = true	
    username="$ref{super_admin.username}@carbon.super"	
    password="$ref{super_admin.password}"	
    server_url = "{tcp://<SI_HOST>:7612}"	
    ```   

## Starting servers

1. Go to the `<IS_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./wso2server.sh
    ``` 
    