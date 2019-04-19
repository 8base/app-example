import React from 'react';
import {
  Card,
  Heading,
  Column,
  Text,
} from '@8base/boost';
import styled from 'react-emotion';

const Container = styled('div')`
  width: 400px;
`;

const Confirm = () => (
  <Column alignItems="center" justifyContent="center">
    <Container>
      <Card>
        <Card.Header>
          <Heading type="h4">
            Email confirmation
          </Heading>
        </Card.Header>
        <Card.Body>
          <Text color="GRAY1" lineHeight="lg">
            We sent a confirmation email. Click on the link inside to confirm your account!
          </Text>
        </Card.Body>
      </Card>
    </Container>
  </Column>
);

export { Confirm };

