# Configuration

## Enabling Secondary User Accounts

Follow the below instructions to enable the secondary user account feature:		

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following configurations:

    ```toml
    [open_banking_cds.secondary_user_accounts]
    enable = true
    ```