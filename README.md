# Automatic Video Labeling Using Amazon Rekognition Service

This was a part of a prototype used in an internal "onboarding" program (PoC/demo session), and later used as source code for a set of blog posts.

This repo is related to the (Angular 10) User Interface module (SPA Front-End), focused on AWS Amplify service.

Created by Marcelo França.

Mentoring by Juliano Baeta.

## Setup

### TL;DR;

```
git clone
npm i -g @aws-amplify/cli
npm install
amplify init
amplify add hosting
amplify import auth
amplify publish
```

Then, copy the info from `src\aws.exports.js` to `src\environments\aws-exports.js` and `src\environments\aws-exports.prod.js`.

And edit `src\environments\environment.ts` and `src\environments\environment.prod.ts` changing `apiUrl` accordingly...

Finally, look out for `Hosting endpoint: https://<something>.cloudfront.net` as an output from Amplify CLI...

Or `ng serve -o`!

### References

* [AWS Organizations]( https://aws.amazon.com/organizations/ )
* [Managing SSO in AWS Accounts]( https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-accounts.html )
* [Configuring AWS CLI for Single Sign-On]( https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html )
* [Named Profiles]( https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html )
* [AWS Amplify]( https://aws.amazon.com/amplify/ )

File #1 located at ~/.aws/credentials (Linux & Mac) or %USERPROFILE%\.aws\credentials (Windows) 

Example (named profiles with session tokens for SSO):

```
[default]
aws_access_key_id=XYZEXAMPLE1
aws_secret_access_key=blaBlaBlaEXAMPLEKEY
[tenant1]
aws_access_key_id=XYZEXAMPLE2
aws_secret_access_key=blaBlaBlaEXAMPLEKEY
aws_session_token=blablabla//////////...==
[tenant2]
aws_access_key_id=XYZEXAMPLE3
aws_secret_access_key=blaBlaBlaEXAMPLEKEY
aws_session_token=blablabla//////////...==
```

Note that each profile can specify different credentials — perhaps from different IAM users — and can also specify different AWS Regions and output formats.

Considering you've run `aws configure sso`...

File #2 located at ~/.aws/config (Linux & Mac) or %USERPROFILE%\.aws\config (Windows) 

Example (named profiles with SSO information such as AWS Account Id, Role and Region):

```
[default]
region = us-east-2
output = json
[profile tenant1]
sso_start_url = https://myssolink.awsapps.com/start
sso_region = us-east-2
sso_account_id = <Account Id1>
sso_role_name = <Role Name>
region = us-east-2
output = json
[profile tenant2]
sso_start_url = https://myssolink.awsapps.com/start
sso_region = us-east-2
sso_account_id = <Account Id2>
sso_role_name = <Role Name>
region = us-east-2
output = json
```

Note the pattern "[profile profile-name], where 'profile-name' relates to the previous file (#1)!

## Provisioning

Considering you've run `git clone`...

### First Part (back-end still does not exist)...

```
[aws sso login --profile tenant1 | tenant2]
[edit credentials, copy & paste]
[npm i -g @aws-amplify/cli]
[amplify configure --usage-data-off]
[del src\amplify]
[del src\aws-exports.js]
amplify init | amplify pull
amplify add hosting
amplify publish
[take a note of the Hosting endpoint: e.g. https://<domain>.cloudfront.net]
```
### Second part (with Cognito's User Pool already created)...

You will need the API Gateway's **ApiEndpoint**, e.g. *https://\<domain\>.execute-api.us-east-2.amazonaws.com/api*

You will also need Cognito's **UserPoolClientId**, **UserPoolId** and **UserPoolDomain**.

```
[aws sso login --profile tenant1 | tenant2]
[edit credentials, copy & paste]
amplify import auth
amplify publish
```

Do not forget to `publish` again, in order to update the file aws-exports.js with Cognito's information.

And remember to move/edit to folder src\environments...

According to code (configurations/production/fileReplacements) in file angular.json...

### Single Page Application (SPA)

* Enter a name for the project: appAWSomeBlog
* Build Command: ng build --prod
* Do you plan on modifying this backend? Yes
* Do you want to use an AWS profile? Yes
* Please choose the profile you want to use (Use arrow keys): tenant1 | tenant2
* Amazon CloudFront and S3
* PROD (S3 with CloudFront using HTTPS)
* hosting bucket name: awsomeblog-<tenant1|tenant2>-hostingbucket
* Cognito User Pool only

## How to Build

Run `ng build` to build the project.

The build artifacts will be stored in the `dist/` directory. 

Use the `--prod` flag for a production build.

### Configuring

* [Update Back-End (SAM template) with the CloudFront domain - and redeploy;]
* Update the **environment's files** (aws-exports.js and aws-exports.prod.js) in src\environments - and redeploy (see below);

### Updating the Application

```
[aws sso login --profile tenant1 | tenant2]
[edit credentials, copy & paste]
amplify publish -c
```

Note the '-c' to invalidate the distribution's cache.

### Testing Locally (Running)

```
ng serve -o
```

### Decomissioning
```
amplify delete
```

Note that you may need to manually delete the S3 bucket files and the bucket itself.

### Additional Info

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

## Contact

Marcelo França - www.linkedin.com/in/mafranca