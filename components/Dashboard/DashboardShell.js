import Head from 'next/head';
import { Container, Flex } from '@/components/GlobalComponents';
import { Button, Text } from '@geist-ui/core';

export default function DashboardShell({ children, pageName, visible }) {
  return (
    <>
      <Head>
        <title>{pageName}s Dashboard</title>
      </Head>
      <Container>
        <Flex
          css={{
            margin: '2rem 0',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text h2 style={{ margin: 0 }}>
            My {pageName}s
          </Text>
          {
            (pageName === 'Site' ? (
              <Button auto type="secondary" onClick={visible}>
                Add {pageName}
              </Button>
            ) : null)
          }
        </Flex>
        {children}
      </Container>
    </>
  );
}
