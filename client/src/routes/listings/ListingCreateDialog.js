import React from 'react';
import * as R from 'ramda';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, SelectField, DateInputField, ModalContext } from '@8base/boost';
import { Query, graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const getPropertyOptions = (properties = []) =>
  properties.map(property => ({ value: property.id, label: property.title }));
const getUserOptions = (users = []) =>
  users.map(item => ({
    value: item.id,
    label: `${R.propOr('Unititled', 'firstName', item.user)} ${R.propOr('Unititled', 'lastName', item.user)}`,
  }));

const LISTING_CREATE_DIALOG_ID = 'LISTING_CREATE_DIALOG_ID';

class ListingCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    await this.props.listingCreate({ variables: { data } });

    this.context.closeModal(LISTING_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(LISTING_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Listing" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Query query={sharedGraphQL.PROPERTIES_LIST_QUERY}>
              {({ data, loading }) => (
                <Field
                  name="property"
                  label="Property"
                  placeholder="Select a property"
                  component={SelectField}
                  loading={loading}
                  options={loading ? [] : getPropertyOptions(data.propertiesList.items)}
                  stretch
                />
              )}
            </Query>
          </Grid.Box>
          <Grid.Box>
            <Query query={sharedGraphQL.BROKERS_LIST_QUERY}>
              {({ data, loading }) => (
                <Field
                  name="broker"
                  label="Broker"
                  placeholder="Select a broker"
                  component={SelectField}
                  loading={loading}
                  options={loading ? [] : getUserOptions(data.brokersList.items)}
                  stretch
                />
              )}
            </Query>
          </Grid.Box>
          <Query query={sharedGraphQL.CUSTOMERS_LIST_QUERY}>
            {({ data, loading }) => (
              <React.Fragment>
                <Grid.Box>
                  <Field
                    name="buyer"
                    label="Buyer"
                    placeholder="Select a buyer"
                    component={SelectField}
                    loading={loading}
                    options={loading ? [] : getUserOptions(data.customersList.items)}
                    stretch
                  />
                </Grid.Box>
                <Grid.Box>
                  <Field
                    name="seller"
                    label="Seller"
                    placeholder="Select a seller"
                    component={SelectField}
                    loading={loading}
                    options={loading ? [] : getUserOptions(data.customersList.items)}
                    stretch
                  />
                </Grid.Box>
              </React.Fragment>
            )}
          </Query>
          <Grid.Box>
            <Field
              name="status"
              label="Status"
              placeholder="Select a status"
              component={SelectField}
              options={[
                { label: 'Lead', value: 'Lead' },
                { label: 'Closing', value: 'Closing' },
                { label: 'Active', value: 'Active' },
                { label: 'Closed', value: 'Closed' },
                { label: 'Cancelled', value: 'Cancelled' },
              ]}
              stretch
            />
          </Grid.Box>
          <Grid.Box>
            <Field name="price" label="Price" type="text" placeholder="Price" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="closingDate" label="Closing Date" component={DateInputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="documents" label="Documents" component={FileInputField} maxFiles={3} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Listing
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={LISTING_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Listings" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

ListingCreateDialog = graphql(sharedGraphQL.LISTING_CREATE_MUTATION, {
  name: 'listingCreate',
  options: {
    refetchQueries: ['ListingsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Listing successfuly created',
    },
  },
})(ListingCreateDialog);

ListingCreateDialog.id = LISTING_CREATE_DIALOG_ID;

export { ListingCreateDialog };
