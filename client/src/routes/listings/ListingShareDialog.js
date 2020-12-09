import React from 'react';
import { Form, Field } from '@8base-react/forms';
import { Dialog, Grid, Button, InputField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const LISTING_SHARE_DIALOG_ID = 'LISTING_SHARE_DIALOG_ID';

class ListingShareDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = id => async data => {
    await this.props.listingShare({ variables: { id, email: data.email } });

    this.context.closeModal(LISTING_SHARE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(LISTING_SHARE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Share Listing" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="email" label="Email" type="email" placeholder="test@8base.com" component={InputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={pristine || invalid} loading={submitting}>
          Share Listing
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return <Form onSubmit={this.createOnSubmit(args.id)}>{this.renderFormContent}</Form>;
  };

  render() {
    return (
      <Dialog id={LISTING_SHARE_DIALOG_ID} size="sm">
        {this.renderForm}
      </Dialog>
    );
  }
}

ListingShareDialog = graphql(sharedGraphQL.LISTING_SHARE_MUTATION, {
  name: 'listingShare',
  options: {
    refetchQueries: ['ListingsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Listing successfuly shared',
    },
  },
})(ListingShareDialog);

ListingShareDialog.id = LISTING_SHARE_DIALOG_ID;

export { ListingShareDialog };
