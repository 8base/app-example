import React from 'react';
import { Card, Heading } from '@8base/boost';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';
import { PropertyShareDialog } from './PropertyShareDialog';
import { PropertyDeleteDialog } from './PropertyDeleteDialog';
import { PropertiesTable } from './PropertiesTable';

const Properties = () => (
  <Card.Plate padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Properties" />
    </Card.Header>

    <PropertyCreateDialog />
    <PropertyEditDialog />
    <PropertyShareDialog />
    <PropertyDeleteDialog />

    <Card.Body padding="none" stretch>
      <PropertiesTable />
    </Card.Body>
  </Card.Plate>
);

export { Properties };
