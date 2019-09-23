import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/app-provider';

class AuthContainer extends React.Component {
  async componentDidMount() {
    const { auth } = this.props;

    await auth.authClient.authorize();
  }

  render() {
    return (
      <Loader stretch />
    );
  }
}

AuthContainer = withAuth(AuthContainer);

export { AuthContainer };
