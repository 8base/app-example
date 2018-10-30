# 8base App Example

## Server Setup

* Sign up 8base account;
* Install 8base `yarn global add 8base`;
* Login to the 8base `8base login`;
* Go to the server directory `cd server`;
* Install dependencies `yarn`;
* Deploy custom functions `8base deploy`;
* Import schema and data via `8base import -f="./EXPORT.JSON"`;

## Client Setup

* Go to the client directory `cd client`;
* Install dependencies `yarn`;
* Create .env file `cp .env.example .env`;
* Get 8base API endpoint for your account;
* Enter value from the step 2 to the `REACT_APP_8BASE_API_ENDPOINT` variable;
* Start app via `yarn start`;
* Login to the app with your 8base credentials;
* Explore it.