import React from 'react';
import { Form } from '@8base-react/forms';
import { Dialog, Button, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const BROKER_DELETE_DIALOG_ID = 'BROKER_DELETE_DIALOG_ID';

class BrokerDeleteDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = id => async () => {
    await this.props.brokerDelete({ variables: { id } });

    this.context.closeModal(BROKER_DELETE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(BROKER_DELETE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Delete Broker" onClose={this.onClose} />
      <Dialog.Body scrollable>Are you really want to delete broker?</Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="danger" type="submit" disabled={invalid} loading={submitting}>
          Delete Broker
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderContent = ({ args }) => {
    return <Form onSubmit={this.createOnSubmit(args.id)}>{this.renderFormContent}</Form>;
  };

  render() {
    return (
      <Dialog id={BROKER_DELETE_DIALOG_ID} size="sm">
        {this.renderContent}
      </Dialog>
    );
  }
}

BrokerDeleteDialog = graphql(sharedGraphQL.BROKER_DELETE_MUTATION, {
  name: 'brokerDelete',
  options: {
    refetchQueries: ['BrokersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Broker successfuly deleted',
    },
  },
})(BrokerDeleteDialog);

BrokerDeleteDialog.id = BROKER_DELETE_DIALOG_ID;

export { BrokerDeleteDialog };
