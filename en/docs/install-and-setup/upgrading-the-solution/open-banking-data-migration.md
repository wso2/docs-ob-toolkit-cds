!!! tip "Before you begin:"
    Back up all the databases before performing the migration.

1. To create the required database tables:
    - Run the relevant SQL script in the `<IS_HOME>/dbscripts/open-banking/consent` directory against
      the `openbank_openbankingdb` database.
    - If you have enabled the Consent Amendment History feature in your OB 2.0 setup, run the relevant SQL script in the 
      `<IS_HOME>/dbscripts/open-banking/consent-history` directory against the `openbank_openbankingdb` database.
2. Download the WSO2 Open Banking Migration Client Tool v1.0.0 from <a href="https://uk.ob.docs.wso2.com/en/latest/assets/attachments/wso2-openbanking-migration-1.0.0.zip" download> here</a>.
3. Copy the `wso2-openbanking-migration-1.0.0/openbanking-migration-resources` directory to `<IS_HOME>`.
4. Copy the `wso2-openbanking-migration-1.0.0/dropins/com.wso2.openbanking.migration-1.0.0.jar` file to `<IS_HOME>/repository/components/dropins`.
5. Open the `wso2-openbanking-migration-1.0.0/openbanking-migration-resources/migration-config.yaml` file and
   set the `migrationEnable` property to `true`.

    !!!note "If you have enabled the Consent Amendment History feature in your OB 2.0 setup"
        Enable migrating the Consent History data in `migration-config.yaml` as follows:

        - Locate the `ConsentMigrator` tag for `spec: "AU"` 
        - Set `consent_history_enabled` to `true`

        ```
              -
                name: "ConsentMigrator"
                spec: "AU"
                order: 1
                parameters:
                  schema: "ob"
                  token_expiry_time: "84600"
                  expired_custom_status: "Expired"
                  consent_history_enabled: "true"
        ```

6. Start the Identity Server with the following command:
   
    ```
       sh wso2server.sh -DobMigrationSpec=AU
    ```
   
7. Stop the server.

    !!! warning
        If a failure occurred during the migration process, delete all the migrated data from the tables that 
        were generated during migration.

8. Remove the `<IS_HOME>/repository/components/dropins/com.wso2.openbanking.migration-1.0.0.jar` file.
9. Remove the `<IS_HOME>/openbanking-migration-resources` directory.
10. Start the Identity Server and API Manager servers.
