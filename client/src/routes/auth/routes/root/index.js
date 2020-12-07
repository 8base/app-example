import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base-react/auth';

class AuthContainer extends React.Component {
  async componentDidMount() {
    const { auth } = this.props;
    console.log(auth, 'auth');

    await auth.authClient.authorize();
  }

  render() {
    return <Loader stretch />;
  }
}

AuthContainer = withAuth(AuthContainer);

export { AuthContainer };
