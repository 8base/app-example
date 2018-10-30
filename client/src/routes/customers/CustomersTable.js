import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Button, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { CustomerCreateDialog } from './CustomerCreateDialog';
import { CustomerDeleteDialog } from './CustomerDeleteDialog';

let CustomersTable = ({ customers, openModal, closeModal }) => (
  <Table.Plate>
    <Table.Header columns="repeat(5, 1fr) 60px">
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Purchases</Table.HeaderCell>
      <Table.HeaderCell>Sales</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ customers.loading } data={ R.pathOr([], ['customersList', 'items'], customers) }>
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
              <Dropdown.Plate defaultOpen={ false }>
                <Dropdown.Head>
                  <Icon name="Dots" color="LIGHT_GRAY2" />
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  {
                    ({ closeDropdown }) => (
                      <Menu.Plate>
                        <Menu.Item onClick={ () => { openModal(CustomerDeleteDialog.id, { id: customer.id }); closeDropdown(); } }>Delete</Menu.Item>
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
      <Button onClick={ () => openModal(CustomerCreateDialog.id) }>Create Customer</Button>
    </Table.Footer>
  </Table.Plate>
);

CustomersTable = compose(
  withModal,
  graphql(sharedGraphQL.CUSTOMERS_LIST_QUERY, { name: 'customers' }),
)(CustomersTable);

export { CustomersTable };
