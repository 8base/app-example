import React from 'react';
import { Form } from '@8base-react/forms';
import { Dialog, Button, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CUSTOMER_DELETE_DIALOG_ID = 'CUSTOMER_DELETE_DIALOG_ID';

class CustomerDeleteDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = id => async () => {
    await this.props.customerDelete({ variables: { id } });

    this.context.closeModal(CUSTOMER_DELETE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(CUSTOMER_DELETE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Delete Customer" onClose={this.onClose} />
      <Dialog.Body scrollable>Are you really want to delete customer?</Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="danger" type="submit" disabled={invalid} loading={submitting}>
          Delete Customer
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderContent = ({ args }) => {
    return <Form onSubmit={this.createOnSubmit(args.id)}>{this.renderFormContent}</Form>;
  };

  render() {
    return (
      <Dialog id={CUSTOMER_DELETE_DIALOG_ID} size="sm">
        {this.renderContent}
      </Dialog>
    );
  }
}

CustomerDeleteDialog = graphql(sharedGraphQL.CUSTOMER_DELETE_MUTATION, {
  name: 'customerDelete',
  options: {
    refetchQueries: ['CustomersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Customer successfuly deleted',
    },
  },
})(CustomerDeleteDialog);

CustomerDeleteDialog.id = CUSTOMER_DELETE_DIALOG_ID;

export { CustomerDeleteDialog };
