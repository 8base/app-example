import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/auth';

class CallbackContainer extends React.Component {
  async componentDidMount() {
    const { auth, history } = this.props;
    const { idToken, email, isEmailVerified } = await auth.getAuthorizedData();

    if (!isEmailVerified) {
      history.replace('/auth/confirm');
      return;
    }

    await auth.setAuthState({
      token: idToken,
      email,
    });

    history.replace('/');
  }

  render() {
    return <Loader stretch />;
  }
}

CallbackContainer = withAuth(CallbackContainer);

export { CallbackContainer };
