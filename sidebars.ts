// Generated once from the `nav:` of the pre-migration en/mkdocs.yml (commit 90bf8ef, since deleted).
// The migration tooling is not part of this repository: edit this file by hand from now on.
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get Started',
      className: 'sidebar-section-icon-get-started',
      collapsed: true,
      items: [
        {type: 'doc', id: 'get-started/open-banking', label: 'Open Banking'},
        {type: 'doc', id: 'get-started/open-banking-requirements', label: 'Open Banking Requirements'},
        {type: 'doc', id: 'get-started/regulations-and-standards', label: 'Regulations and Standards'},
        {type: 'doc', id: 'get-started/wso2-open-banking-cds-toolkit', label: 'WSO2 Open Banking CDS Toolkit'},
        {type: 'doc', id: 'get-started/about-this-release', label: 'About this Release'},
        {
          type: 'category',
          label: 'Quick Start Guide',
          items: [
            {type: 'doc', id: 'get-started/quick-start-guide', label: 'Get Started'},
            {type: 'doc', id: 'get-started/set-up-toolkits', label: 'Set up Toolkits'},
            {type: 'doc', id: 'get-started/configure-users-and-roles', label: 'Configure Users and Roles'},
            {type: 'doc', id: 'get-started/configure-sms-otp-authenticator', label: 'Configure SMS OTP Authenticator'},
            {type: 'doc', id: 'get-started/dynamic-client-registration', label: 'Dynamic Client Registration'},
            {type: 'doc', id: 'get-started/try-out-flow', label: 'Tryout Flow'},
            {type: 'doc', id: 'get-started/data-publishing-try-out', label: 'Data Publishing'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Install and Setup',
      className: 'sidebar-section-icon-install-and-setup',
      collapsed: true,
      items: [
        {type: 'doc', id: 'install-and-setup/prerequisites', label: 'Prerequisites'},
        {type: 'doc', id: 'install-and-setup/setting-up-servers', label: 'Setting up servers'},
        {type: 'doc', id: 'install-and-setup/setting-up-databases', label: 'Setting up databases'},
        {type: 'doc', id: 'install-and-setup/configuring-identity-server-for-ob', label: 'Configuring Identity Server'},
        {type: 'doc', id: 'install-and-setup/configuring-api-manager-for-ob', label: 'Configuring API Manager'},
        {type: 'doc', id: 'install-and-setup/configuring-users-and-roles', label: 'Configuring Users and Roles'},
        {type: 'doc', id: 'install-and-setup/configuring-sms-otp-authenticator', label: 'Configuring SMS OTP Authenticator'},
        {type: 'doc', id: 'install-and-setup/upgrading-the-solution', label: 'Upgrading the solution'},
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      className: 'sidebar-section-icon-learn',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'learn/consent-management', label: 'Introduction'},
            {type: 'doc', id: 'learn/consent-amendment-history', label: 'Consent Amendment History'},
          ],
        },
        {
          type: 'category',
          label: 'Consent Authorization',
          items: [
            {type: 'doc', id: 'learn/consent-authorization-intro', label: 'Introduction'},
            {type: 'doc', id: 'learn/pushed-authorization-endpoint', label: 'Pushed Authorization Endpoint'},
          ],
        },
        {type: 'doc', id: 'learn/token-authentication', label: 'Token Authentication'},
        {
          type: 'category',
          label: 'Dynamic Client Registration',
          items: [
            {type: 'doc', id: 'learn/dynamic-client-registration', label: 'Introduction'},
            {type: 'doc', id: 'learn/dynamic-client-registration-configuration', label: 'Configuration'},
          ],
        },
        {type: 'doc', id: 'learn/consumer-authentication', label: 'Consumer Authentication'},
        {type: 'doc', id: 'learn/metadata-cache-management', label: 'Metadata Cache Management'},
        {type: 'doc', id: 'learn/administration-api', label: 'Administration API'},
        {type: 'doc', id: 'learn/arrangement-revocation-api', label: 'Arrangement Revocation API'},
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'learn/api-security', label: 'Introduction'},
            {type: 'doc', id: 'learn/api-security-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'Data Publishing',
          items: [
            {type: 'doc', id: 'learn/data-publishing', label: 'Introduction'},
            {type: 'doc', id: 'learn/data-publishing-tryout', label: 'Tryout'},
          ],
        },
        {type: 'doc', id: 'learn/non-functional-requirements', label: 'Non Functional Requirements'},
        {
          type: 'category',
          label: 'Account Management',
          items: [
            {
              type: 'category',
              label: 'Data Sharing for Business Nominated Representatives',
              items: [
                {type: 'doc', id: 'learn/configuring-data-sharing-for-business-nominated-representatives', label: 'Introduction'},
                {type: 'doc', id: 'learn/configuring-data-sharing-for-business-nominated-representatives-configuration', label: 'Configuration'},
              ],
            },
            {
              type: 'category',
              label: 'Disclosure Option Management',
              items: [
                {type: 'doc', id: 'learn/disclosure-option-management', label: 'Introduction'},
                {type: 'doc', id: 'learn/disclosure-option-management-configuration', label: 'Configuration'},
              ],
            },
            {
              type: 'category',
              label: 'Data Sharing for Secondary Users',
              items: [
                {type: 'doc', id: 'learn/configuring-data-sharing-for-secondary-users', label: 'Introduction'},
                {type: 'doc', id: 'learn/configuring-data-sharing-for-secondary-users-configuration', label: 'Configuration'},
              ],
            },
            {
              type: 'category',
              label: 'Ceasing Data Sharing for Secondary Users',
              items: [
                {type: 'doc', id: 'learn/ceasing-data-sharing-for-secondary-users', label: 'Introduction'},
                {type: 'doc', id: 'learn/ceasing-data-sharing-for-secondary-users-configuration', label: 'Configuration'},
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Try out',
      className: 'sidebar-section-icon-try-out',
      collapsed: true,
      items: [
        {type: 'doc', id: 'try-out/dynamic-client-registration-flow', label: 'Dynamic Client Registration'},
        {type: 'doc', id: 'try-out/account-and-transaction-flow', label: 'Account and Transaction flow'},
        {type: 'doc', id: 'try-out/admin-api', label: 'Administration API'},
        {type: 'doc', id: 'try-out/arrangement-revocation-api-flow', label: 'Arrangement Revocation API'},
        {type: 'doc', id: 'try-out/consent-manager', label: 'Consent Manager'},
        {type: 'doc', id: 'try-out/consent-amendment-history', label: 'Consent Amendment History Retrieval'},
        {type: 'doc', id: 'try-out/custom-throttling-policies', label: 'Deploy Custom Throttling Policies'},
      ],
    },
  ],
};

export default sidebars;
