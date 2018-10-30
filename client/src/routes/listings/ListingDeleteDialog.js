import React from 'react';
import * as R from 'ramda';
import { Form } from '@8base/forms';
import { Dialog, Button, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const LISTING_DELETE_DIALOG_ID = 'LISTING_DELETE_DIALOG_ID';

class ListingDeleteDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = R.memoize((id) => async () => {
    await this.props.listingDelete({ variables: { id }});

    this.context.closeModal(LISTING_DELETE_DIALOG_ID);
  });

  onClose = () => {
    this.context.closeModal(LISTING_DELETE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting }) => (
    <form onSubmit={ handleSubmit }>
      <Dialog.Header title="Delete Listing" onClose={ this.onClose } />
      <Dialog.Body scrollable>
        Are you really want to delete listing?
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={ submitting } onClick={ this.onClose }>Cancel</Button>
        <Button color="red" type="submit" text="Delete Listing" disabled={ invalid } loading={ submitting } />
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
      <Dialog.Plate id={ LISTING_DELETE_DIALOG_ID } size="sm">
        { this.renderContent }
      </Dialog.Plate>
    );
  }
}

ListingDeleteDialog = graphql(sharedGraphQL.LISTING_DELETE_MUTATION, {
  name: 'listingDelete',
  options: {
    refetchQueries: ['ListingsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Broker successfuly deleted'
    },
  },
})(ListingDeleteDialog);

ListingDeleteDialog.id = LISTING_DELETE_DIALOG_ID;

export { ListingDeleteDialog };
