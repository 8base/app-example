import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Paper, Link, Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { DateTime } from 'luxon';

import * as sharedGraphQL from 'shared/graphql';

import { ListingCreateDialog } from './ListingCreateDialog';
import { ListingEditDialog } from './ListingEditDialog';
import { ListingShareDialog } from './ListingShareDialog';
import { ListingDeleteDialog } from './ListingDeleteDialog';

let ListingsTable = ({ listings, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(10, 1fr) 60px">
      <Table.HeaderCell>Property</Table.HeaderCell>
      <Table.HeaderCell>Broker</Table.HeaderCell>
      <Table.HeaderCell>Buyer</Table.HeaderCell>
      <Table.HeaderCell>Seller</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Closing Date</Table.HeaderCell>
      <Table.HeaderCell>Created At</Table.HeaderCell>
      <Table.HeaderCell>Updated At</Table.HeaderCell>
      <Table.HeaderCell>Documents</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={ listings.loading } data={ R.pathOr([], ['listingsList', 'items'], listings) } action="Create Listing" onActionClick={() => openModal(ListingCreateDialog.id)}>
      {
        (listing) => (
          <Table.BodyRow columns="repeat(10, 1fr) 60px" key={ listing.id }>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['property', 'title'], listing) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['broker', 'user', 'firstName'], listing) } { R.pathOr('Unititled', ['broker', 'user', 'lastName'], listing) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['buyer', 'user', 'firstName'], listing) } { R.pathOr('Unititled', ['buyer', 'user', 'lastName'], listing) }
            </Table.BodyCell>
            <Table.BodyCell>
              { R.pathOr('Unititled', ['seller', 'user', 'firstName'], listing) } { R.pathOr('Unititled', ['seller', 'user', 'lastName'], listing) }
            </Table.BodyCell>
            <Table.BodyCell>
              { listing.status }
            </Table.BodyCell>
            <Table.BodyCell>
              {
                listing.closingDate
                  ?
                  DateTime.fromISO(listing.closingDate).toFormat('ff')
                  :
                  'none'
              }
            </Table.BodyCell>
            <Table.BodyCell>
              { DateTime.fromISO(listing.createdAt).toFormat('ff') }
            </Table.BodyCell>
            <Table.BodyCell>
              { DateTime.fromISO(listing.updatedAt).toFormat('ff') }
            </Table.BodyCell>
            <Table.BodyCell>
              <Dropdown defaultOpen={ false }>
                <Dropdown.Head>
                  { listing.documents.items.length } documents
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  <Paper padding="sm">
                    {
                      listing.documents.items.map(({ filename, downloadUrl }) => <Link key={ downloadUrl } target="_blank" href={ downloadUrl } size="sm">{ filename }</Link>)
                    }
                  </Paper>
                </Dropdown.Body>
              </Dropdown>
            </Table.BodyCell>
            <Table.BodyCell>
              { listing.price }
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
                        <Menu.Item onClick={ () => { openModal(ListingEditDialog.id, {  initialValues: listing }); closeDropdown(); } }>Edit</Menu.Item>
                        <Menu.Item onClick={ () => { openModal(ListingShareDialog.id, { id: listing.id }); closeDropdown(); } }>Share</Menu.Item>
                        <Menu.Item onClick={ () => { openModal(ListingDeleteDialog.id, { id: listing.id }); closeDropdown(); } }>Delete</Menu.Item>
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

ListingsTable = compose(
  withModal,
  graphql(sharedGraphQL.LISTINGS_LIST_QUERY, { name: 'listings' }),
)(ListingsTable);

export { ListingsTable };
