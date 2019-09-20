import React from 'react';
import { compose } from 'recompose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown, Menu, Avatar } from '@8base/boost';
import { withAuth } from '@8base/react-sdk';
import * as R from 'ramda';

const USER_QUERY = gql`
  query User {
    user {
      email
      firstName
      id
      lastName
      avatar {
        id
        downloadUrl
      }
    }
  }
`;

class UserDropdown extends React.Component {
  logout = () => {
    const { auth } = this.props;

    auth.authClient.logout();
  };

  renderContent = ({ data, loading }) => {
    if (loading) {
      return null;
    }

    console.log(data);

    return (
      <Dropdown defaultOpen={false}>
        <Dropdown.Head>
          <Avatar
            src={R.path(['user', 'avatar', 'downloadUrl'], data)}
            name={R.path(['user', 'firstName'], data)}
            size="sm"
          />
        </Dropdown.Head>
        <Dropdown.Body pin="right">
          {({ closeDropdown }) => (
            <Menu>
              <Menu.Item
                onClick={async () => {
                  await this.logout();
                  closeDropdown();
                }}
              >
                Log Out
              </Menu.Item>
            </Menu>
          )}
        </Dropdown.Body>
      </Dropdown>
    );
  };

  render() {
    return <Query query={USER_QUERY}>{this.renderContent}</Query>;
  }
}

UserDropdown = compose(withAuth)(UserDropdown);

export { UserDropdown };
