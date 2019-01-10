import React from 'react';
import { Card, Heading } from '@8base/boost';

import { CustomerCreateDialog } from './CustomerCreateDialog';
import { CustomerDeleteDialog } from './CustomerDeleteDialog';
import { CustomersTable } from './CustomersTable';

const Customers = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Customers" />
    </Card.Header>

    <CustomerCreateDialog />
    <CustomerDeleteDialog />

    <Card.Body padding="none" stretch>
      <CustomersTable />
    </Card.Body>
  </Card>
);

export { Customers };
