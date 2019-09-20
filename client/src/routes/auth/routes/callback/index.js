import React from 'react';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base/react-sdk';

class CallbackContainer extends React.Component {
  async componentDidMount() {
    const { auth, history } = this.props;
    const { idToken } = await auth.authClient.getAuthorizedData();

    await auth.authClient.setState({ token: idToken });
    history.replace('/');
  }

  render() {
    return <Loader stretch />;
  }
}

CallbackContainer = withAuth(CallbackContainer);

export { CallbackContainer };
