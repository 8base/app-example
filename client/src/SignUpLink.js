import {
  ApolloLink,
  Observable,
  createOperation,
} from 'apollo-link';
import gql from 'graphql-tag';
import { UserNotExistErrorCode } from '@8base/error-codes';
import * as R from 'ramda';

const SIGNUP_MUTATION = gql`
  mutation UserSignUpMutation($user: UserCreateInput!, $authProfileId: ID) {
    userSignUp(user: $user, authProfileId: $authProfileId) {
      id
    }
  }
`;

let signUpPromise = null;

const hasUserNotExistError = R.any(R.propEq('code', UserNotExistErrorCode));

export class SignUpLink extends ApolloLink {
  constructor({ getAuthState, authProfileId }) {
    super();

    this.getAuthState = getAuthState;
    this.authProfileId = authProfileId;
    this.fetching = false;
  }

  request(operation, forward) {
    return new Observable(observer => {
      let subscription = null;

      const subscriber = {
        next: data => {
          const errors = data.errors || [];

          if (hasUserNotExistError(errors)) {
            handleUserNotExistError();
          } else {
            observer.next(data);
          }
        },
        error: error => {
          const batchedErrors = R.pathOr([error], ['response', 'parsed', 'errors'], error);

          if (hasUserNotExistError(batchedErrors)) {
            handleUserNotExistError();
          } else {
            observer.error(error);
          }
        },
        complete: () => {
          if (!this.fetching) {
            observer.complete();
          }
        },
      };

      const handleUserNotExistError = () => {
        this.sendSignUp(operation, forward)
          .then(() => {
            if (subscription) {
              subscription.unsubscribe();
            }

            subscription = forward(operation).subscribe(subscriber);
          })
          .catch(error => {
            observer.error(error);
          });
      };

      subscription = forward(operation).subscribe(subscriber);

      return subscription;
    });
  }

  sendSignUp(operation, forward) {
    const { email } = this.getAuthState();

    this.fetching = true;

    if (!signUpPromise) {
      signUpPromise = new Promise((resolve, reject) => {
        const signUpOperation = createOperation(
          operation.getContext(),
          {
            query: SIGNUP_MUTATION,
            variables: {
              user: {
                email,
              },
              authProfileId: this.authProfileId,
            },
          },
        );

        forward(signUpOperation).subscribe({
          error: reject,
          next: data => {
            if (data.data && R.path(['data', 'userSignUp', 'id'], data)) {
              resolve();
            } else {
              reject();
            }
          },
          complete: () => {
            this.fetching = false;
          },
        });
      });
    }

    return signUpPromise;
  }
}

