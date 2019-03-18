import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import * as R from 'ramda';
import { Paper, Link, TableBuilder, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { Query } from 'react-apollo';
import { DateTime } from 'luxon';

import * as sharedGraphQL from 'shared/graphql';

import { ListingCreateDialog } from './ListingCreateDialog';
import { ListingEditDialog } from './ListingEditDialog';
import { ListingShareDialog } from './ListingShareDialog';
import { ListingDeleteDialog } from './ListingDeleteDialog';

const LISTINGS_TABLE_COLUMNS = [
  { name: 'property', title: 'Property', sortEnable: false },
  { name: 'broker', title: 'Broker', sortEnable: false },
  { name: 'buyer', title: 'Buyer', sortEnable: false },
  { name: 'seller', title: 'Seller', sortEnable: false },
  { name: 'status', title: 'Status' },
  { name: 'closingDate', title: 'Closing Date' },
  { name: 'createdAt', title: 'Created At' },
  { name: 'updatedAt', title: 'Updated At' },
  { name: 'documents', title: 'Documents', sortEnable: false },
  { name: 'price', title: 'Price' },
  { name: 'actions', width: '60px', sortEnable: false },
];

class ListingsTable extends React.Component {
  onActionClick = () => {
    const { openModal } = this.props;

    openModal(ListingCreateDialog.id)
  };

  renderCell = (column, data) => {
    const { openModal } = this.props;

    let rendered = String(data[column.name]);

    switch (column.name) {
      case 'property': {
        rendered = R.pathOr('Unititled', ['property', 'title'], data);
        break;
      }
      case 'broker': 
      case 'buyer': 
      case 'seller': {
        rendered = `${R.pathOr('Unititled', [column.name, 'user', 'firstName'], data)} ${R.pathOr('Unititled', [column.name, 'user', 'lastName'], data)}`;
        break;
      }
      case 'closingDate': {
        rendered =  data.closingDate ? DateTime.fromISO(data.closingDate).toFormat('ff') : 'none';
        break;
      }
      case 'createdAt':
      case 'updatedAt': {
        rendered = DateTime.fromISO(data[column.name]).toFormat('ff');
        break;
      }
      case 'documents': {
        rendered = (
          <Dropdown defaultOpen={ false }>
            <Dropdown.Head>
              { R.pathOr(0, ['documents', 'items', 'length'], data) } documents
            </Dropdown.Head>
            <Dropdown.Body pin="right">
              <Paper padding="sm">
                {
                  R.pathOr([], ['documents', 'items'], data).map(({ filename, downloadUrl }) => (
                    <Link key={ downloadUrl } target="_blank" href={ downloadUrl } size="sm">{ filename }</Link>
                  ))
                }
              </Paper>
            </Dropdown.Body>
          </Dropdown>
        );
        break;
      }
      case 'actions': {
        rendered = (
          <Dropdown defaultOpen={ false }>
            <Dropdown.Head>
              <Icon name="More" color="LIGHT_GRAY2" />
            </Dropdown.Head>
            <Dropdown.Body pin="right">
              {
                ({ closeDropdown }) => (
                  <Menu>
                    <Menu.Item onClick={ () => { openModal(ListingEditDialog.id, {  initialValues: data }); closeDropdown(); } }>Edit</Menu.Item>
                    <Menu.Item onClick={ () => { openModal(ListingShareDialog.id, { id: data.id }); closeDropdown(); } }>Share</Menu.Item>
                    <Menu.Item onClick={ () => { openModal(ListingDeleteDialog.id, { id: data.id }); closeDropdown(); } }>Delete</Menu.Item>
                  </Menu>
                )
              }
            </Dropdown.Body>
          </Dropdown>
        );

        break;
      }
      default: {
        break;
      }
    }

    return rendered;
  }

  renderTable = ({ data, loading }) => {
    const { tableState, onChange } = this.props;

    const total = R.pathOr(null, ['listingsList', 'count'], data);

    const tableData = R.pathOr([], ['listingsList', 'items'], data);
    const finalTableState = R.assocPath(['pagination', 'total'], total, tableState);

    return (
      <TableBuilder
        columns={ LISTINGS_TABLE_COLUMNS }
        data={ tableData }
        loading={ loading }
        action="Create Listing"
        onActionClick={ this.onActionClick }
        tableState={ finalTableState }
        onChange={ onChange }
        renderCell={ this.renderCell }
        withPagination
      />
    );
  };

  render() {
    const { tableState } = this.props;

    const skip = (tableState.pagination.page - 1) * tableState.pagination.pageSize;
    const first = tableState.pagination.pageSize;
    const orderBy = R.propOr([], 'sort', tableState).map(({ name, order }) => `${name}_${order}`);

    return (
      <Query query={sharedGraphQL.LISTINGS_LIST_QUERY} variables={{ orderBy, skip, first }}>
        {this.renderTable}
      </Query>
    );
  }
}

ListingsTable = compose(
  withModal,
  withStateHandlers({ tableState: { pagination: { page: 1, pageSize: 20 }}}, {
    onChange: ({ tableState }) => (value) => ({
      tableState: {
        ...tableState,
        ...value,
      },
    })
  }),
)(ListingsTable);

export { ListingsTable };
