When you implement an open banking architecture, it is not entirely about securely exposing banking APIs to 
Data Recipients. Banks need to manage and allow Data Recipients to provide services to their customers. There are key 
requirements to consider when you implement an open banking architecture. This section explains how WSO2 Open 
Banking addresses the open banking requirements in the solution:

![open banking requirements](../assets/img/get-started/open-banking-requirements/open-banking-requirements.png)

## How WSO2 Open Banking delivers open banking requirements

1. **Dynamic Client Registration** - Dynamic Client Registration (DCR) is the process of verifying a Data Recipient when they register 
with a bank to provide services to customers. It is important since the Data Recipient has access to the customer's 
financial information via their applications. WSO2 Open Banking provides dynamic client registration for Data Recipients.
 
2. **Consent Management** - The ability to or action by an end user to update or make changes to Consent that they have 
granted. The solution includes a fully-featured consent management module that:

    - securely exposes consent data through an API
    - provides in-built consent management user interfaces for customers and bank staff
    - manages the entire consent life cycle

!!! tip
    CDS refers to the consumer's consent as a *Sharing Arrangement*.  It implies the consent setup with the Accredited
    Data Recipient and the related authorization granted at the Data Holder.

   <br/>  A consent goes through a phased life cycle as follows: ![lifecycle of a consent](../assets/img/get-started/open-banking-requirements/consent-lifecycle.png)

 - **Consent provision**: The accredited data recipients will send a consent request to the Data Holder with the purpose
   to consume a defined Data Holder's consumer data set.

   - **Consent grant**: The act of establishing permission by a consumer to a Data Holder to authorize access to the 
     consumer data by Accredited Data Recipients.

   - **Consent verification**: The Data Holder verifies whether the customer has approved the Accredited Data Recipient 
     to access the information. If the bank customer has rejected the consent, the bank must detect and stop the 
     application from invoking the banking APIs.

   - **Consent revocation**: A customer can revoke the consent via consent management applications. It can either be 
       done by the customer themselves or by a bank representative upon the customer’s request.

   - **Consent expiration**: When the consent validity period expires, the bank sets the consent status as expired. 
      For the Accredited Data Recipient application to access the customer’s financial information again, the customer needs to 
      regrant the consent.

3. **Consumer Authentication** - Consumer authentication is an authentication mechanism with a layered defence. 
     When a user initiates a payment or accesses information via a Data Recipient application, it authenticates 
     the user using the following factors one at a time:
   ![authentication factors](../assets/img/get-started/open-banking-requirements/authentication-factors.png)
  
     - Knowledge    : something you know – passwords, PINs, code words, etc.
     - Possession	: something you have – typically smart phones, token devices, etc.
     - Inherence	: something you are – fingerprints, facial recognition, iris or retina scans

    The solution supports multifactor authentication and identifier-first authentication. In addition, you can extend 
    the existing authenticators or write new authenticators in accordance with your open banking standard.

5. **Developer Portal** - The solution offers a customizable Developer Portal that enables application developers to 
publish, republish, subscribe, and test APIs.
 
6. **Banking Systems Integration** - The solution uses the integration capabilities of [WSO2 Micro Integrator](https://apim.docs.wso2.com/en/4.0.0/integrate/integration-overview/) 
to help banks connect their core banking systems and overcome the challenges of legacy technology. With the help of 
the Micro Integrator, WSO2 Open Banking can support:
     - different message protocols (HTTP/TCP), message types (REST/SOAP), and formats (ISO 8583, ISO 20022).
     - mediation between a legacy or digital core and other banking systems, and the bank’s library of open banking APIs.

7. **Data Analytics** - The solution to mediate between the bank’s systems and modern analytics systems. Analytics allows 
banks to monitor user patterns and behaviours and to identify fraudulent activities.

8. **API Security** - Data Recipients invoke APIs to access customer’s financial information. Therefore, API security plays 
a vital role in open banking to mitigate data theft. The solution has built-in support for global industry-standards 
such as OpenID Connect Financial Grade API (FAPI), OAuth 2.0, Electronic Identification and Trust Services (eIDAS).

     API security can be categorised into two main levels:

     - Application layer security -     Validates Data Recipients against the certificates issued by competent authorities. 
     For example: open banking directories, Qualified Trust Service Providers (QTSPs).
    
     Also, the solution supports OAuth2 security implementations such as Private key JWT authentication, 
     client-credentials grant type, and authorization code grant type.
    
     - Transport layer security - Secures the communication between the Data Recipient, and the bank using Mutual Transport 
     Layer Security (MTLS). 

9. **User Experience** - The solution provides an enhanced user experience for the banks, Data Recipients, and customers with 
self-explanatory and simple actions.

10. **Premium APIs and Monetization** - Using the capabilities in WSO2 API Manager, WSO2 Open Banking allows:
     - banks to publish highly-performant custom APIs for Data Recipients. 
     - banks to expose their performance and compliance data by integrating into analytics engines.
     - banks to plug in any billing engines with subscription-based freemium, tiered pricing, or per-request pricing.

11. **Standards-based API Templates** - WSO2 API Manager offers standard API management capabilities, and you can customize 
the API templates according to your open banking and other requirements.

## Open Banking Approaches

Open banking is a global trend that has been adopted by different regions and countries differently. In a broader 
context, open banking approaches can be categorised into two types:

 1. Market-driven approach
 2. Regulatory-driven approach

Let’s compare the two approaches:

| Market-driven approach    | Regulator-driven approach |
| ----------------------    | ------------------------- |  
| Policy-makers, instead of regulators, introduce measures to promote the Open-API framework to initiate open banking.    | Regulatory entities analyse the market and define the implementation guidelines for open banking. |  
| In most countries, only the big banks tend to embrace the initiative. Therefore, the lower part of the demographics won’t get to take advantage.       | Set timelines for the banks to expose and third-parties to consume banking APIs. Once the timelines are met, everyone in the demographics can take advantage.       |  
| Addresses market requirements. | Addresses market requirements.     | 

In conclusion, both approaches address the market requirements of the respective region/country. However, reports show 
that the regulatory-driven approach is much cleaner and standardizes open banking growth. It helps all the banks to 
securely expose their banking APIs to Data Recipient applications at a given time offering all their customers to make 
use of it.
