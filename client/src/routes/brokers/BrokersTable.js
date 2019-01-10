import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { BrokerCreateDialog } from './BrokerCreateDialog';
import { BrokerDeleteDialog } from './BrokerDeleteDialog';

let BrokersTable = ({ brokers, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Listings</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ brokers.loading } data={ R.pathOr([], ['brokersList', 'items'], brokers) }  action="Create Broker" onActionClick={() => openModal(BrokerCreateDialog.id)}>
      {
        (broker) => (
          <Table.BodyRow columns="repeat(4, 1fr) 60px" key={ broker.id }>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'firstName'], broker) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'lastName'], broker) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'email'], broker) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr(0, ['listings', 'count'], broker) }
            </Table.BodyCell>
            <Table.BodyCell>
              <Dropdown defaultOpen={ false }>
                <Dropdown.Head>
                  <Icon name="Dots" size="sm" color="LIGHT_GRAY2" />
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  {
                    ({ closeDropdown }) => (
                      <Menu>
                        <Menu.Item onClick={ () => { openModal(BrokerDeleteDialog.id, { id: broker.id }); closeDropdown(); } }>Delete</Menu.Item>
                      </Menu>
                    )
                  }
                </Dropdown.Body>
              </Dropdown>
            </Table.BodyCell>
          </Table.BodyRow>
        )
      }
    </Table.Body>
  </Table>
);

BrokersTable = compose(
  withModal,
  graphql(sharedGraphQL.BROKERS_LIST_QUERY, { name: 'brokers' }),
)(BrokersTable);

export { BrokersTable };
