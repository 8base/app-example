import React, { useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { Loader } from '@8base/boost';
import { withAuth } from '@8base-react/auth';

import { USER_QUERY, USER_SIGNUP_MUTATIONS } from 'shared/graphql';
import { HIDE_TOAST_ERROR_MESSAGE } from 'shared/constants';

const { REACT_APP_AUTH_PROFILE_ID } = process.env;

export const CallbackContainer = withAuth(({ auth }) => {
  const history = useHistory();
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      const { idToken, email, firstName, lastName } = await auth.authClient.getAuthorizedData();

      auth.authClient.setState({ token: idToken, email });

      try {
        await client.query({
          query: USER_QUERY,
          context: {
            [HIDE_TOAST_ERROR_MESSAGE]: true,
          },
        });
      } catch (err) {
        await client.mutate({
          mutation: USER_SIGNUP_MUTATIONS,
          variables: {
            authProfileId: REACT_APP_AUTH_PROFILE_ID,
            user: {
              email,
              firstName,
              lastName,
            },
          },
        });
      } finally {
        history.replace('/');
      }
    };

    fetchData();
  }, [auth.authClient, client, history]);

  return <Loader stretch />;
});
