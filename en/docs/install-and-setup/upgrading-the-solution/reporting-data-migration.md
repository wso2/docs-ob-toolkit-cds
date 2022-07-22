## Prerequisite

1. Stop the WSO2 Open Banking Business Intelligence 2.0.0 server if it is running.
2. Download and install the WSO2 Streaming Integrator 4.0.0 distribution from [here](https://wso2.com/integration/streaming-integrator/).
3. Backup your `openbank_ob_reporting_statsdb` and `openbank_ob_reporting_summarizeddb` databases of your OBBI 2.0.0 setup. 

## Set up Open Banking Accelerator and CDS Toolkit for Streaming Integrator

Set up WSO2 Open Banking Business Intelligence Accelerator and WSO2 Open Banking Business Intelligence CDS Toolkit 
as follows:

!!! note          
    - `<SI_HOME>` refers to the root directory of WSO2 Streaming Integrator.
    - `<OB_BI_ACCELERATOR_HOME>` refers to the root directory of WSO2 Open Banking Business Intelligence Accelerator.
    - `<OB_BI_TOOLKIT_HOME>` refers to the root directory of WSO2 Open Banking Business Intelligence CDS Toolkit.

1. Copy and extract the `wso2-obbi-accelerator-3.0.0.zip` accelerator file in the root directory of WSO2 Streaming 
   Integrator.
    
2. Run the `merge.sh` script in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:

    ```
    ./merge.sh
    ```
   
3. Copy and extract the `wso2-obbi-toolkit-cds-1.0.0.zip` toolkit file in the root directory of WSO2 Streaming 
   Integrator.

4. Run the `merge.sh` script in `<SI_HOME>/<OB_BI_TOOLKIT_HOME>/bin`. 

    ```
    ./merge.sh
    ```
   
5. Replace the existing `deployment.yaml` file in the Streaming Integrator as follows:
    - Go to the `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/repository/resources` directory.
    - Rename `wso2si-4.0.0-deployment.yaml` to `deployment.yaml`.
    - Copy the `deployment.yaml` file to the `<SI_HOME>/conf/server` directory to replace the existing file.

6. Open the `<SI_HOME>/conf/server/deployment.toml` file, and configure the hostnames and databases related
   properties accordingly.     
    - When configuring database-related properties, point to your existing Open Banking 2.0 databases.
   
7. Exchange the public certificates between servers. 
        
    ??? "Click here to see how it is done..."
    
         a. Go to the `<SI_HOME>/resources/security` directory and export the public certificate of the Streaming 
            Integrator:
           
        ``` shell
        keytool -export -alias wso2carbon -keystore wso2carbon.jks -file publickeySI.pem
        ```
            
         b. Go to the `<IS_HOME>/repository/resources/security` directory and import the public certificate of the 
            Streaming Integrator to the truststore of the Identity Server:
            
         ``` shell
         keytool -import -alias wso2 -file publickeySI.pem -keystore client-truststore.jks -storepass wso2carbon
         ```
            
          c. Go to the `<IS_HOME>/repository/resources/security` directory and export the public certificate of the 
             Identity Server:
            
          ``` shell
          keytool -export -alias wso2carbon -keystore wso2carbon.jks -file publickeyIAM.pem
          ```
            
          d. Go to the `<SI_HOME>/resources/security` directory and import the public certificate of the Identity 
             Server to the truststore of the Streaming Integrator:
            
          ``` shell
          keytool -import -alias wso2 -file publickeyIAM.pem -keystore client-truststore.jks -storepass wso2carbon
          ```

           e. Go to the `<APIM_HOME>/repository/resources/security` directory and repeat step b,c, and d.

## Upgrading to WSO2 Streaming Integrator 4.0.0

To migrate the reporting data and tables from the Open Banking 2.0 setup to 3.0.

1. Go to the `wso2-openbanking-migration-1.0.0/openbanking-migration-resources/reporting-migration-scripts/au` directory.

2. Open the `configure.properties` file and configure the following.
    - Databases-related properties and database names
    - Access token encryption configurations

    !!! tip
        Your existing access token encryption configurations are available in 
        the `<WSO2_OB2_IAM_HOME>/repository/conf/finance/open-banking.xml` file,
        under the `<BIServer> <Reporting> <TokenEncryption>` tags.
   
3. Run the `wso2-openbanking-migration-1.0.0/openbanking-migration-resources/reporting-migration-scripts/au/migrate.sh`
   script.

    ```shell
    ./migrate.sh
    ```

    !!!note "Only for Oracle Databases:"
        Execute the `openbanking-migration-resources/reporting-migration-scripts/au/reporting-oracle-2.0.0_to_3.0.0_runtime.sql` 
        script in against your `openbank_ob_reporting_statsdb` database.

    !!!tip 
        You may drop the following tables of `OB_REPORTING_DB` as they are not required for Open Banking 3.0:

         - `AUTHENTICATION_RAW_DATA`
         - `CDS_SESSION_RAW_DATA`
         - `ACCESS_TOKEN_RAW_DATA`
         - `APP_REG_RAW_DATA`
   
4. Start the Streaming Integrator and try out publishing data. 
   For more information, see [Try Out Data Publishing](../../get-started/data-publishing-try-out.md).
