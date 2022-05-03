# Consumer Authentication

**Consumer Authentication** is a mechanism used to authenticate a user that accesses banking information via an 
Accredited Data Recipient validation application. Authentication can be configured using two or more of the following 
factors to minimise fraudulent activities by preventing identity theft. It authenticates the user using the 
following factors one at a time:

  - Knowledge : something you know – passwords, PINs, code words, etc.
  - Possession : something you have – typically smart phones, token devices, etc.
  - Inherence : something you are – fingerprints, facial recognition, iris or retina scans.

![authentication factors](../assets/img/get-started/open-banking-requirements/authentication-factors.png)

##Identifier-first Authentication

Identifier-first authentication allows identifying the individuals prior to authenticating them. It retrieves 
the identity of the user without using authentication information and uses that identity to control the authentication 
flow.

You can implement identifier-first authentication using a custom local authenticator. For more information, see 
[Identifier-first Flow Handler](https://is.docs.wso2.com/en/latest/learn/identifier-first-flow-handler/#configuring-identifier-first-handler-in-the-login-flow). 
WSO2 Open Banking consists of an identifier-first authenticator by default.
