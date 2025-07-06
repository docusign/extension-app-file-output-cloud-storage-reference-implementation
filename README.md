# File Output Cloud Storage Extension App Reference Implementation
## Introduction
This reference implementation simulates an external service that writes files to cloud storage. It stores files locally or with the cloud provider of choice (AWS, Azure, or GCP). This reference implementation is useful for:
- Reviewing the format of requests to and responses from an external service that implements the file output cloud storage extension
- Seeing how the extension functions when invoked from a [Maestro workflow](https://support.docusign.com/s/document-item?bundleId=yff1696971835267&topicId=dnx1696972415150.html)

## Authentication
This reference implementation supports two [authentication](https://developers.docusign.com/extension-apps/build-an-extension-app/it-infrastructure/authorization/) flows:
* [Authorization Code Grant](https://developers.docusign.com/extension-apps/build-an-extension-app/it-infrastructure/authorization/#authorization-code-grant): Required for public extension apps
* [Client Credentials Grant](https://developers.docusign.com/extension-apps/build-an-extension-app/it-infrastructure/authorization/#client-credentials-grant): Available to private extension apps. See [Choosing private distribution instead of public](https://developers.docusign.com/extension-apps/extension-apps-101/choosing-private-distribution/).

*Private extension apps can use either authentication method, but public extension apps must use Authorization Code Grant.*

## Hosted version (no setup required)
You can use the hosted version of this reference implementation by directly uploading the appropriate manifest file located in the [manifests/hosted/](manifests/hosted) folder to the Docusign Developer Console. See [Upload your manifest and create the extension app](#3-upload-your-manifest-and-create-the-extension-app).

**Note:** The provided manifest includes `clientId` and `clientSecret` values used in the sample authentication connection. These do not authenticate to a real system, but the hosted reference implementation requires these exact values.

## Choose your setup: Local or cloud deployment
If you want to run the app locally using Node.js and ngrok, follow the [Local setup instructions](#local-setup-instructions) below.

If you want to deploy the app to the cloud using Docker and Terraform, see [Deploying an extension app to the cloud with Terraform](terraform/README.md). This includes cloud-specific setup instructions for the following cloud providers:
- [Amazon Web Services](https://aws.amazon.com/)
- [Microsoft Azure](https://azure.microsoft.com/)
- [Google Cloud Platform](https://cloud.google.com/)

## Local setup instructions

### 1. Clone the repository
Run the following command to clone the repository:
```bash
git clone https://github.com/docusign/extension-app-file-output-cloud-storage-reference-implementation.git
```

### 2. Generate secret values
- If you already have values for `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE`, you may skip this step.

The easiest way to generate a secret value is to run the following command:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

You will need values for `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE`.

### 3. Set the environment variables for the cloned repository
- If you're running this in a development environment, create a copy of `example.development.env` and save it as `development.env`.
- If you're running this in a production environment, create a copy of `example.production.env` and save it as `production.env`.
- Replace `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE` in `development.env` or `production.env` with your generated values. These values will be used to configure the sample proxy's mock authentication server.
- Set the `clientId` value in the manifest.json file to the same value as `OAUTH_CLIENT_ID`.
- Set the `clientSecret` value in the manifest.json file to the same value as `OAUTH_CLIENT_SECRET`.
### 4. [Install and configure Node.js and npm on your machine.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
### 5. Install dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```
### 6. Running the proxy server
#### Development mode:
Start the proxy server in development mode by running the command:
```bash
npm run dev
```

This will create a local server on the port in the `development.env` file (port 3000 by default) that listens for local changes that trigger a rebuild.

#### Production mode:
Start the proxy server in production mode by running the commands:
```bash
npm run build
npm run start
```

This will start a production build on the port in the `production.env` file (port 3000 by default).
## Set up ngrok
### 1. [Install and configure ngrok for your machine.](https://ngrok.com/docs/getting-started/)
### 2. Start ngrok
Run the following command to create a publicly accessible tunnel to your localhost:

```bash
ngrok http <PORT>
```

Replace `<PORT>` with the port number in the `development.env` or `production.env` file.

### 3. Save the forwarding address
Copy the `Forwarding` address from the response. You’ll need this address in your `manifest.json` file.

```bash
ngrok

Send your ngrok traffic logs to Datadog: https://ngrok.com/blog-post/datadog-log

Session Status                online
Account                       email@domain.com (Plan: Free)
Update                        update available (version 3.3.1, Ctrl-U to update)
Version                       3.3.0
Region                        United States (us)
Latency                       60ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://bbd7-12-202-171-35.ngrok-free.app -> http:

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

In this example, the `Forwarding` address to copy is `https://bbd7-12-202-171-35.ngrok-free.app`.
## Create an extension app
### 1. Prepare your app manifest
Choose a manifest from the [manifests](manifests/) folder based on the appropriate [authentication](#authentication) use case. Replace `<PROXY_BASE_URL>` in your manifest.json file with the ngrok forwarding address in the following sections:
- `connections.params.customConfig.tokenUrl`
- `connections.params.customConfig.authorizationUrl`
- `actions.params.uri`
   * Replace this value for all of the actions.
### 2. Navigate to the [Developer Console](https://devconsole.docusign.com/apps)
Log in with your Docusign developer credentials. You can sign up for a free developer account [here](https://www.docusign.com/developers/sandbox).
### 3. Upload your manifest and create the extension app
To [create your extension app](https://developers.docusign.com/extension-apps/build-an-extension-app/create/), select **Create App > By editing the manifest**. In the app manifest editor that opens, upload your manifest file or paste into the editor itself; then select **Validate**. Once the editor validates your manifest, select **Create App.**
### 4. Test the extension app
This reference implementation simulates an external cloud storage service. After you have created an extension app in the Developer Console that connects to the reference implementation, you can run tests that send requests to it. Requests from the calling application are saved to the [logs](logs/) folder. The reference implementation sends responses to the calling application. This reference implementation processes the file output cloud storage extension's action and capabilities as follows:
- Write File: Writes the file contents supplied in the request to the location specified in the request. If you run the reference implementation locally, the file will be written to the local machine. The reference implementation supports the use of variables in folder and file names.
- List Drives: Returns mock data.
- List Directory Contents: Returns mock data.
#### [Integration tests](https://developers.docusign.com/extension-apps/build-an-extension-app/test/integration-tests/)
You can run these tests from the Developer Console to test each supported action and capability for the extension. These tests allow you to construct the request body and see the response.
#### [Functional tests](https://developers.docusign.com/extension-apps/build-an-extension-app/test/functional-tests/)
This type of test shows how the extension functions when invoked from an [extension point](https://developers.docusign.com/extension-apps/extension-apps-101/concepts/extensions-and-extension-points/#extension-points). For file output cloud storage, the extension point is a [Maestro workflow](https://support.docusign.com/s/document-item?bundleId=yff1696971835267&topicId=dnx1696972415150.html).
