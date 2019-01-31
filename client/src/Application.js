import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { WebAuth0AuthClient } from '@8base/web-auth0-auth-client';
import { EightBaseAppProvider } from '@8base/app-provider';
import { EightBaseBoostProvider, AsyncContent } from '@8base/boost';
import { ToastContainer, toast } from 'react-toastify';

import { ProtectedRoute } from 'shared/components';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

import { MainPlate, ContentPlate, Nav } from './components';
import { Auth } from './routes/auth';
import { Brokers } from './routes/brokers';
import { Customers } from './routes/customers';
import { Properties } from './routes/properties';
import { Listings } from './routes/listings';

const { REACT_APP_8BASE_API_ENDPOINT } = process.env;

const AUTH_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const AUTH_DOMAIN = 'auth.8base.com';

const auth0WebClient = new WebAuth0AuthClient({
  domain: AUTH_DOMAIN,
  clientId: AUTH_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`,
  logoutRedirectUri: `${window.location.origin}/auth`,
});

class Application extends React.PureComponent {
  renderContent = ({ loading }) => (
    <AsyncContent loading={loading} stretch>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route>
          <MainPlate>
            <Nav.Plate color="BLUE">
              <Nav.Item icon="Group" to="/brokers" label="Brokers" />
              <Nav.Item icon="Customers" to="/customers" label="Customers" />
              <Nav.Item icon="House" to="/properties" label="Properties" />
              <Nav.Item icon="Contract" to="/listings" label="Listings" />
            </Nav.Plate>
            <ContentPlate>
              <Switch>
                <ProtectedRoute exact path="/brokers" component={Brokers} />
                <ProtectedRoute exact path="/customers" component={Customers} />
                <ProtectedRoute exact path="/properties" component={Properties} />
                <ProtectedRoute exact path="/listings" component={Listings} />
                <Redirect to="/brokers" />
              </Switch>
            </ContentPlate>
          </MainPlate>
        </Route>
      </Switch>
    </AsyncContent>
  );

  onRequestSuccess = ({ operation }) => {
    const message = operation.getContext()[TOAST_SUCCESS_MESSAGE];

    if (message) {
      toast.success(message);
    }
  };

  onRequestError = ({ graphQLErrors }) => {
    const hasGraphQLErrors = Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach(error => {
        toast.error(error.message);
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <EightBaseBoostProvider>
          <EightBaseAppProvider
            uri={REACT_APP_8BASE_API_ENDPOINT}
            authClient={auth0WebClient}
            onRequestSuccess={this.onRequestSuccess}
            onRequestError={this.onRequestError}
          >
            {this.renderContent}
          </EightBaseAppProvider>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </EightBaseBoostProvider>
      </BrowserRouter>
    );
  }
}

export { Application };
