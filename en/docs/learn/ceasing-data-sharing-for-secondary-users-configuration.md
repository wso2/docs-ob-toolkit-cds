# Configurations

## Enabling the ceasing data sharing feature for secondary users

By default, this is enabled in WSO2 Open Banking CDS Toolkit.

Follow the steps below to enable ceasing data sharing for secondary users:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the `[open_banking_cds.secondary_user_accounts]` tag.

3. Add the following configuration:

    ```toml
    ceasing_secondary_user_sharing_enable = true
    ```