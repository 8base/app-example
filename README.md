# 8base App Example

## Server Setup

* Sign up 8base account;
* Install 8base CLI `npm install -g 8base`;
* Login using CLI `8base login`;
* Go to the server directory `cd server`;
* Select workspace `8base configure`;
* Install dependencies `npm install`;
* Deploy custom functions `8base deploy`;
* Import schema and data via `8base import -f=DEMO.JSON --data=false`. This will take aroud 2 minutes;

## Client Setup

* Go to the client directory `cd client`;
* Install dependencies `npm install`;
* Get 8base API endpoint for your account;
* Start app via `cross-env REACT_APP_8BASE_API_ENDPOINT=%YOUR_ENDPOINT% npm start`;
* Login to the app with your 8base credentials;
* Explore it.

## Getting logs

To get logs from the `listingShare` custom function use `8base logs listingShare`. Learn more about local development tools in our <a href="https://docs.8base.com/8base-console/custom-functions" target="_blank">docs</a>.
