import React from 'react';
import { Card, Heading } from '@8base/boost';

import { BrokerCreateDialog } from './BrokerCreateDialog';
import { BrokerDeleteDialog } from './BrokerDeleteDialog';
import { BrokersTable } from './BrokersTable';

const Brokers = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Brokers" />
    </Card.Header>

    <BrokerCreateDialog />
    <BrokerDeleteDialog />

    <Card.Body padding="none" stretch scrollable>
      <BrokersTable />
    </Card.Body>
  </Card>
);

export { Brokers };
