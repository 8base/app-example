import React from 'react';
import { Card, Heading } from '@8base/boost';

import { ListingCreateDialog } from './ListingCreateDialog';
import { ListingEditDialog } from './ListingEditDialog';
import { ListingShareDialog } from './ListingShareDialog';
import { ListingDeleteDialog } from './ListingDeleteDialog';
import { ListingsTable } from './ListingsTable';

const Listings = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Listings" />
    </Card.Header>

    <ListingCreateDialog />
    <ListingEditDialog />
    <ListingShareDialog />
    <ListingDeleteDialog />

    <Card.Body padding="none" stretch>
      <ListingsTable />
    </Card.Body>
  </Card>
);

export { Listings };
