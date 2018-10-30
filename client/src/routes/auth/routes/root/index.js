import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/auth';

class AuthContainer extends React.Component {
  componentDidMount() {
    const { auth } = this.props;

    auth.authorize({ mode: 'login' });
  }

  render() {
    return (
      <Loader stretch />
    );
  }
}

AuthContainer = withAuth(AuthContainer);

export { AuthContainer };