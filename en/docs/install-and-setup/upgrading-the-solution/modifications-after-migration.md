This page explains the modifications that need to be performed after the upgrade/migration process.

## Open Banking Internal Scopes

Configure open banking internal scopes as follows:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Make sure the allowed scopes list contain the following: 

      ``` toml
      [oauth]
      allowed_scopes = ["OB_.*", "profile"]
      ```
