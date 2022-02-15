import NextLink from 'next/link';
import { Button, Card, Link, Text } from '@geist-ui/core';

import { Flex } from '../GlobalComponents';

export function SitesEmptyState({ visible }) {
  return (
    <>
      <Card py={1}>
        <Flex
          css={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <Text h3 margin={0}>
            You haven't added any sites.
          </Text>
          <Text h5 margin={0} type="secondary">
            Welcome! Let's get started.
          </Text>
          <Button mt={1} type="secondary" onClick={visible}>
            Add your first Site
          </Button>
        </Flex>
      </Card>
    </>
  );
}
export function FeedbackEmptyState() {
  return (
    <>
      <Card py={1}>
        <Flex
          css={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <Text h3>You didn't leave or receive any feedback</Text>
          <Text p margin={0}>
            Add a website{' '}
            <NextLink href="/sites" passHref>
              <Link underline>here</Link>
            </NextLink>{' '}
            and test it out!
          </Text>
        </Flex>
      </Card>
    </>
  );
}
