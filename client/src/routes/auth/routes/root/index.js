import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/react-sdk';

class AuthContainer extends React.Component {
  async componentDidMount() {
    const { auth } = this.props;

    console.log(auth);
    await auth.authClient.authorize({ mode: 'login' });
  }

  render() {
    return <Loader stretch />;
  }
}

AuthContainer = withAuth(AuthContainer);

export { AuthContainer };
