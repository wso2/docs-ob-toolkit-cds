Now you have started the servers, let’s create the users and define their permissions and  roles.
 
## Sign in to the Identity Server
 
1. Sign in to the Management Console of WSO2 Identity Server at [https://localhost:9446/carbon](https://localhost:9446/carbon)

2. Use the default super admin credentials as follows:
    - Username: admin@wso2.com
    - Password: wso2123
    
    !!!note
        The above login credentials are for testing purposes only. It is recommended to change the login credentials in 
        a production environment.
   
## Create new user roles

1. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add**. ![add_user_roles](../assets/img/get-started/quick-start-guide/go-to-add-user-roles.png)
2. Click **Add New Role**.
3. Create the following user roles:   

    | Domain | Role| Permissions | Description |
    |--------|--------|--------|---------------|
    |Internal|approverRole|Admin permissions| To approve applications when you register applications using the signup workflow. |
    |Internal|CustomerCareOfficerRole|No permissions required | To log in to the Consent Manager portal as a customer care officer. |

    i. Creating **approverRole**:
    
      - Select the **INTERNAL** domain and enter the role name as **approverRole**:
      
        ![enter_approver_role_details](../assets/img/get-started/quick-start-guide/enter-role-details-approver-role.png)
      
      - Click **Next >**.
      
      - Select the check box next to **Admin Permissions**.
      
        ![select_approver_permissoions](../assets/img/get-started/quick-start-guide/select-permissions.png)
            
      - Scroll down and click **Finish**.
      
    ii. Creating **CustomerCareOfficerRole**:
    
      - Select the **INTERNAL** domain and enter the role name as **CustomerCareOfficerRole**:
      
        ![enter_customercareofficer_role_details](../assets/img/get-started/quick-start-guide/enter-role-details-customercareofficer_role.png)
      
      - Click **Finish**.
 
## Create new users and assign roles

1. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add**.
2. Click **Add New User**.
3. Create the following users:
 
    | Domain | User| Permissions|
    |--------|--------|--------|
    |Primary|mark@gold.com|Internal/creator, Internal/publisher|
    |Primary|ann@gold.com|Internal/CustomerCareOfficer|
    |Primary|tom@gold.com|Internal/approverRole|

    i. Enter user details and click **Next >**. 
    
    ![add_new_user](../assets/img/get-started/quick-start-guide/add-new-user.png)
    
    ii. Select user roles for each user as per the table above: 
    
    ![set_new_user_roles](../assets/img/get-started/quick-start-guide/set-new-user-roles.png)
        
    iii. Click **Finish**.

## Configuring SMS OTP Authenticator

1. Sign in to the [Management Console](https://localhost:9446/carbon) as an administrator

2. Adding SMS OTP Identity Provider:

     - Navigate to the Main menu to access the Identity menu and select **Identity Providers** -> **Add**.
     
        ![add_identity_providers](../assets/img/get-started/quick-start-guide/go-to-add-identity-providers.png)

     - Fill the **Basic Information** section and name this identity provider as **SMSAuthentication**

        ![sms_authentication_idp](../assets/img/get-started/quick-start-guide/sms-authentication-idp.png)

     - Expand the **Federated Authenticators** -> **SMS OTP Configuration** section

        ![expand_federated_authenticators](../assets/img/get-started/quick-start-guide/expand-federated-authenticators.png)

     - Select both the **Enable** and **Default** checkboxes. This is to enable and make the SMSAuthentication authenticator the default one

        ![config_sms_otp](../assets/img/get-started/quick-start-guide/config-sms-otp.png)

     - Add the following sample configurations and click **Register**

        ```
         SMS URL : https://api.twilio.com/2010-04-01/Accounts/AC34f40df03e20fb6498b3fcee256ebd3b/SMS/Messages.json
         HTTP Headers : Authorization: Basic QUMzNGY0MGRmMDNlMjBmYjY0OThiM2ZjZWUyNTZlYmQzYjo1ZmFkM2VkYzg4YWM1NTNiMmFiZjc4 NWI1MmM4MWFkYg==
         HTTP Payloads : Body=$ctx.msg&To=$ctx.num&From=+1 210-880-1806
         HTTP Method : POST
        ```
       
3. Configuring Account Lock:

    - Navigate to the Identity menu and select **Identity Providers** -> **Resident** -> **Login Attempt Security** -> **Account Lock**

        ![select_resident_identity](../assets/img/get-started/quick-start-guide/go-to-resident-identity-providers.png)

       ![security_account_lock](../assets/img/get-started/quick-start-guide/login-security-account-lock.png)
    
    - Select the **Lock User Accounts** checkbox

       ![maximum_login_attempts](../assets/img/get-started/quick-start-guide/maximum-failed-login-attempts.png)

    - Configure the **Maximum Failed Login Attempts** (default 5)

    - Scroll down and click **Update**

4. Making mobile phone a mandatory claim:

    - Navigate to the Identity menu and select **Claims** -> **List** -> **http://wso2.org/claims** -> **Mobile** -> **Edit**

        ![select_claims_lists](../assets/img/get-started/quick-start-guide/go-to-claims-lists.png)

      ![edit_mobile_claim](../assets/img/get-started/quick-start-guide/edit-mobile-claim.png)

    - Select the **Required** checkbox

        ![update_claim_details](../assets/img/get-started/quick-start-guide/update-local-claim-details.png)

    - Scroll down and click **Update**

5. In the authentication flow, if you login as an admin user, it will prompt for the mobile number in the first
   attempt to login. Mobile number should be given in the format of the following example - 94714564567

6. Test  scenarios can include attempting to login using invalid usernames more than allowed number of times, attempting
   invalid OTPs more than allowed number of times, etc.

7. Open `<IS_HOME>/repository/conf/deployment.toml` file and configure the authenticator configs as follows.

   ```
   [authentication.custom_authenticator]
   name = "OBIdentifierExecutor"
   ```
    
 