import React from 'react';
import * as R from 'ramda';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const PROPERTY_SHARE_DIALOG_ID = 'PROPERTY_SHARE_DIALOG_ID';

class PropertyShareDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = R.memoize((id) => async (data) => {
    await this.props.propertyShare({ variables: { id, email: data.email }});

    this.context.closeModal(PROPERTY_SHARE_DIALOG_ID);
  });

  onClose = () => {
    this.context.closeModal(PROPERTY_SHARE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="Share Property" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="email" label="Email" type="email" placeholder="test@8base.com" component={ InputField } />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="red" type="submit" text="Share Property" disabled={ pristine || invalid } loading={ submitting } />
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form onSubmit={ this.createOnSubmit(args.id) }>
        { this.renderFormContent }
      </Form>
    );
  };

  render() {
    return (
      <Dialog.Plate id={ PROPERTY_SHARE_DIALOG_ID } size="sm">
        {this.renderForm}
      </Dialog.Plate>
    );
  }
}

PropertyShareDialog = graphql(sharedGraphQL.PROPERTY_SHARE_MUTATION, {
  name: 'propertyShare',
  options: {
    refetchQueries: ['PropertiesList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Property successfuly shared'
    },
  },
})(PropertyShareDialog);

PropertyShareDialog.id = PROPERTY_SHARE_DIALOG_ID;

export { PropertyShareDialog };