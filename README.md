# 8base App Example

## Server Setup

* Sign up 8base account;
* Install 8base CLI `npm install -g 8base`;
* Login using CLI `8base login`;
* Go to the server directory `cd server`;
* Install dependencies `npm install`;
* Deploy custom functions `8base deploy`;
* Import schema and data via `8base import -f=EXPORT.JSON`;

## Client Setup

* Go to the client directory `cd client`;
* Install dependencies `npm install`;
* Create .env file `cp .env.example .env`;
* Get 8base API endpoint for your account;
* Enter value from the step 2 to the `REACT_APP_8BASE_API_ENDPOINT` variable;
* Start app via `npm start`;
* Login to the app with your 8base credentials;
* Explore it.
