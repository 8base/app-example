import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, CheckboxField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const PROPERTY_EDIT_DIALOG_ID = 'PROPERTY_EDIT_DIALOG_ID';

class PropertyEditDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = (id) => async (data) => {
    await this.props.propertyUpdate({ variables: { data: { ...data, id } }});

    this.context.closeModal(PROPERTY_EDIT_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(PROPERTY_EDIT_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="Edit Property" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          {
            <Grid.Box>
              <Field name="pictures" label="Pictures" component={ FileInputField } maxFiles={ 20 } />
            </Grid.Box>
          }
          <Grid.Box>
            <Field name="title" label="Title" type="text" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="description" label="Description" type="text" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="bedrooms" label="Bedrooms" type="text" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="sqFootage" label="Sq Footage" type="text" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="bathrooms" label="Bathrooms" type="text" component={ InputField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="garage" label="Garage" component={ CheckboxField } />
          </Grid.Box>
          <Grid.Box>
            <Field name="pool" label="Pool" component={ CheckboxField } />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="primary" type="submit" disabled={ pristine || invalid } loading={ submitting }>Update Property</Button>
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form type="UPDATE" tableSchemaName="Properties" onSubmit={ this.createOnSubmit(args.initialValues.id) } initialValues={ args.initialValues }>
        { this.renderFormContent }
      </Form>
    );
  };

  render() {
    return (
      <Dialog id={ PROPERTY_EDIT_DIALOG_ID } size="sm">
        { this.renderForm }
      </Dialog>
    );
  }
}

PropertyEditDialog = graphql(sharedGraphQL.PROPERTY_UPDATE_MUTATION, {
  name: 'propertyUpdate',
  options: {
    refetchQueries: ['PropertiesList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Property successfuly updated'
    },
  },
})(PropertyEditDialog);

PropertyEditDialog.id = PROPERTY_EDIT_DIALOG_ID;

export { PropertyEditDialog };