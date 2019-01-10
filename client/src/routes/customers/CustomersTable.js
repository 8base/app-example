import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { CustomerCreateDialog } from './CustomerCreateDialog';
import { CustomerDeleteDialog } from './CustomerDeleteDialog';

let CustomersTable = ({ customers, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(5, 1fr) 60px">
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Purchases</Table.HeaderCell>
      <Table.HeaderCell>Sales</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ customers.loading } data={ R.pathOr([], ['customersList', 'items'], customers) } action="Create Customer" onActionClick={() => openModal(CustomerCreateDialog.id)}>
      {
        (customer) => (
          <Table.BodyRow columns="repeat(5, 1fr) 60px" key={ customer.id }>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'firstName'], customer) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'lastName'], customer) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['user', 'email'], customer) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr(0, ['purchases', 'count'], customer) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr(0, ['sales', 'count'], customer) }
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
                        <Menu.Item onClick={ () => { openModal(CustomerDeleteDialog.id, { id: customer.id }); closeDropdown(); } }>Delete</Menu.Item>
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

CustomersTable = compose(
  withModal,
  graphql(sharedGraphQL.CUSTOMERS_LIST_QUERY, { name: 'customers' }),
)(CustomersTable);

export { CustomersTable };
