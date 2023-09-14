# Configurations

## Enabling the Disclosure Option Management Feature

By default, this is enabled in WSO2 Open Banking CDS Toolkit.

Follow the steps below to enable ceasing data sharing for secondary users:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following configurations:

    ```
    [open_banking_cds.disclosure_options_management]
    enable = true
    ```
