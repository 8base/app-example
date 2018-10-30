import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Button, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { BrokerCreateDialog } from './BrokerCreateDialog';
import { BrokerDeleteDialog } from './BrokerDeleteDialog';

let BrokersTable = ({ brokers, openModal, closeModal }) => (
  <Table.Plate>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Listings</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ brokers.loading } data={ R.pathOr([], ['brokersList', 'items'], brokers) }>
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
              <Dropdown.Plate defaultOpen={ false }>
                <Dropdown.Head>
                  <Icon name="Dots" color="LIGHT_GRAY2" />
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  {
                    ({ closeDropdown }) => (
                      <Menu.Plate>
                        <Menu.Item onClick={ () => { openModal(BrokerDeleteDialog.id, { id: broker.id }); closeDropdown(); } }>Delete</Menu.Item>
                      </Menu.Plate>
                    )
                  }
                </Dropdown.Body>
              </Dropdown.Plate>
            </Table.BodyCell>
          </Table.BodyRow>
        )
      }
    </Table.Body>
    <Table.Footer justifyContent="center">
      <Button onClick={ () => openModal(BrokerCreateDialog.id) }>Create Broker</Button>
    </Table.Footer>
  </Table.Plate>
);

BrokersTable = compose(
  withModal,
  graphql(sharedGraphQL.BROKERS_LIST_QUERY, { name: 'brokers' }),
)(BrokersTable);

export { BrokersTable };
