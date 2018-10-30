import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/auth';
import * as R from 'ramda';

class CallbackContainer extends React.Component {
  async componentDidMount() {
    const { auth, history } = this.props;

    const authResult = await auth.parseHash();

    const idToken = R.prop('idToken', authResult);

    auth.setAuthState({ idToken });

    history.replace('/');
  }

  render() {
    return (
      <Loader stretch />
    );
  }
};

CallbackContainer = withAuth(CallbackContainer);

export { CallbackContainer };