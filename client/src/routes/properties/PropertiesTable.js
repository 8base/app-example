import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { DateTime } from 'luxon';

import * as sharedGraphQL from 'shared/graphql';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';
import { PropertyDeleteDialog } from './PropertyDeleteDialog';

let PropertiesTable = ({ properties, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(10, 1fr) 60px">
      <Table.HeaderCell>Pictures</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
      <Table.HeaderCell>Created At</Table.HeaderCell>
      <Table.HeaderCell>Updated At</Table.HeaderCell>
      <Table.HeaderCell>Bedrooms</Table.HeaderCell>
      <Table.HeaderCell>Sq Footage</Table.HeaderCell>
      <Table.HeaderCell>Bathrooms</Table.HeaderCell>
      <Table.HeaderCell>Garage</Table.HeaderCell>
      <Table.HeaderCell>Pool</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ properties.loading } data={ R.pathOr([], ['propertiesList', 'items'], properties) } action="Create Property" onActionClick={() => openModal(PropertyCreateDialog.id)}>
      {
        (property) => (
          <Table.BodyRow columns="repeat(10, 1fr) 60px" key={ property.id }>
            <Table.BodyCell>
              { property.pictures.items.length > 0 && <img src={ property.pictures.items[0].downloadUrl } alt="" style={{ width: '5rem', height: '5rem' }} /> }
            </Table.BodyCell>
            <Table.BodyCell>
              { property.title }
            </Table.BodyCell>
            <Table.BodyCell>
              { property.description }
            </Table.BodyCell>
            <Table.BodyCell>
              { DateTime.fromISO(property.createdAt).toFormat('ff') }
            </Table.BodyCell>
            <Table.BodyCell>
              { DateTime.fromISO(property.updatedAt).toFormat('ff') }
            </Table.BodyCell>
            <Table.BodyCell>
              { property.bedrooms }
            </Table.BodyCell>
            <Table.BodyCell>
              { property.sqFootage }
            </Table.BodyCell>
            <Table.BodyCell>
              { property.bathrooms }
            </Table.BodyCell>
            <Table.BodyCell>
              { `${property.garage}` }
            </Table.BodyCell>
            <Table.BodyCell>
              { `${property.pool}` }
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
                        <Menu.Item onClick={ () => { openModal(PropertyEditDialog.id, { initialValues: property }); closeDropdown(); } }>Edit</Menu.Item>
                        <Menu.Item onClick={ () => { openModal(PropertyDeleteDialog.id, { id: property.id }); closeDropdown(); } }>Delete</Menu.Item>
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

PropertiesTable = compose(
  withModal,
  graphql(sharedGraphQL.PROPERTIES_LIST_QUERY, { name: 'properties' }),
)(PropertiesTable);

export { PropertiesTable };
