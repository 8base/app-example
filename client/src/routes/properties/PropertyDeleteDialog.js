import React from 'react';
import * as R from 'ramda';
import { Form } from '@8base/forms';
import { Dialog, Button, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const PROPERTY_DELETE_DIALOG_ID = 'PROPERTY_DELETE_DIALOG_ID';

class PropertyDeleteDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = R.memoizeWith((id) => async () => {
    await this.props.propertyDelete({ variables: { id }});

    this.context.closeModal(PROPERTY_DELETE_DIALOG_ID);
  });

  onClose = () => {
    this.context.closeModal(PROPERTY_DELETE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="Delete Property" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        Are you really want to delete property?
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="danger" type="submit" disabled={ invalid } loading={ submitting }>Delete Property</Button>
      </Dialog.Footer>
    </form>
  );

  renderContent = ({ args }) => {
    return (
      <Form onSubmit={ this.createOnSubmit(args.id) }>
        { this.renderFormContent }
      </Form>
    );
  };

  render() {
    return (
      <Dialog id={ PROPERTY_DELETE_DIALOG_ID } size="sm">
        { this.renderContent }
      </Dialog>
    );
  }
}

PropertyDeleteDialog = graphql(sharedGraphQL.PROPERTY_DELETE_MUTATION, {
  name: 'propertyDelete',
  options: {
    refetchQueries: ['PropertiesList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Property successfuly deleted'
    },
  },
})(PropertyDeleteDialog);

PropertyDeleteDialog.id = PROPERTY_DELETE_DIALOG_ID;

export { PropertyDeleteDialog };
