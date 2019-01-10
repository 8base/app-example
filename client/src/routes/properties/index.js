import React from 'react';
import { Card, Heading } from '@8base/boost';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';
import { PropertyDeleteDialog } from './PropertyDeleteDialog';
import { PropertiesTable } from './PropertiesTable';

const Properties = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Properties" />
    </Card.Header>

    <PropertyCreateDialog />
    <PropertyEditDialog />
    <PropertyDeleteDialog />

    <Card.Body padding="none" stretch>
      <PropertiesTable />
    </Card.Body>
  </Card>
);

export { Properties };
