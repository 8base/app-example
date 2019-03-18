import React from 'react';
import * as R from 'ramda';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, SelectField, ModalContext, DateInputField } from '@8base/boost';
import { graphql, Query } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const getPropertyOptions = (properties = []) => properties.map((property) => ({ value: property.id, label: property.title }));
const getUserOptions = (users = []) => users.map((item) => ({ value: item.id, label: `${R.pathOr('Unititled', ['user', 'firstName'], item)} ${R.pathOr('Unititled', ['user', 'lastName'], item)}` }));

const LISTING_EDIT_DIALOG_ID = 'LISTING_EDIT_DIALOG_ID';

class ListingEditDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = R.memoize((id) => async (data) => {
    await this.props.listingUpdate({ variables: { data: { ...data, id } }});

    this.context.closeModal(LISTING_EDIT_DIALOG_ID);
  });

  onClose = () => {
    this.context.closeModal(LISTING_EDIT_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="Edit Listing" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Query query={ sharedGraphQL.PROPERTIES_LIST_QUERY }>
              {
                ({ data, loading }) => (
                  <Field
                    name="property"
                    label="Property"
                    placeholder="Select a property"
                    component={ SelectField }
                    loading={ loading }
                    options={ loading ? [] : getPropertyOptions(data.propertiesList.items) }
                    stretch
                  />
                )
              }
            </Query>
          </Grid.Box>
          <Grid.Box>
            <Query query={ sharedGraphQL.BROKERS_LIST_QUERY }>
              {
                ({ data, loading }) => (
                  <Field
                    name="broker"
                    label="Broker"
                    placeholder="Select a broker"
                    component={ SelectField }
                    loading={ loading }
                    options={ loading ? [] : getUserOptions(data.brokersList.items) }
                    stretch
                  />
                )
              }
            </Query>
          </Grid.Box>
          <Query query={ sharedGraphQL.CUSTOMERS_LIST_QUERY }>
            {
              ({ data, loading }) => (
                <React.Fragment>
                  <Grid.Box>
                    <Field
                      name="buyer"
                      label="Buyer"
                      placeholder="Select a buyer"
                      component={ SelectField }
                      loading={ loading }
                      options={ loading ? [] : getUserOptions(data.customersList.items) }
                      stretch
                    />
                  </Grid.Box>
                  <Grid.Box>
                    <Field
                      name="seller"
                      label="Seller"
                      placeholder="Select a seller"
                      component={ SelectField }
                      loading={ loading }
                      options={ loading ? [] : getUserOptions(data.customersList.items) }
                      stretch
                    />
                  </Grid.Box>
                </React.Fragment>
              )
            }
          </Query>
          <Grid.Box>
            <Field
              name="status"
              label="Status"
              placeholder="Select a status"
              component={ SelectField }
              options={ [
                { label: 'Lead', value: 'Lead' },
                { label: 'Closing', value: 'Closing' },
                { label: 'Active', value: 'Active' },
                { label: 'Closed', value: 'Closed' },
                { label: 'Cancelled', value: 'Cancelled' },
              ] }
              stretch
            />
          </Grid.Box>
          <Grid.Box>
            <Field name="price" label="Price" type="text" placeholder="Price" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="closingDate" label="Closing Date" component={ DateInputField } />
          </Grid.Box>
          {
            <Grid.Box>
              <Field name="documents" label="Documents" component={ FileInputField } maxFiles={ 3 } />
            </Grid.Box>
          }
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="primary" type="submit" disabled={ pristine || invalid } loading={ submitting }>Update Listing</Button>
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form type="UPDATE" tableSchemaName="Listings" onSubmit={ this.createOnSubmit(args.initialValues.id) } initialValues={ args.initialValues }>
        { this.renderFormContent }
      </Form>
    );
  };

  render() {
    return (
      <Dialog id={ LISTING_EDIT_DIALOG_ID } size="sm">
        { this.renderForm }
      </Dialog>
    );
  }
}

ListingEditDialog = graphql(sharedGraphQL.LISTING_UPDATE_MUTATION, {
  name: 'listingUpdate',
  options: {
    refetchQueries: ['ListingsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Listing successfuly updated'
    },
  },
})(ListingEditDialog);

ListingEditDialog.id = LISTING_EDIT_DIALOG_ID;

export { ListingEditDialog };