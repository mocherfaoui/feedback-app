import Head from 'next/head';
import { Button, Display, Text } from '@geist-ui/core';

import { Container, Flex } from '@/components/GlobalComponents';

export default function DashboardShell({ children, pageName, visible }) {
  return (
    <>
      <Head>
        <title>{pageName}s Dashboard</title>
      </Head>
      <style>{`
      .resp-table.display .content{
        overflow-x:auto;
      }
      .resp-table.display .caption{
        margin:0;
      }
      `}</style>
      <Container>
        <Flex
          css={{
            margin: '2rem 0',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text h3 margin={0}>
            Manage {pageName}s
          </Text>
          {pageName === 'Site' ? (
            <Button auto type="secondary" onClick={visible}>
              Add {pageName}
            </Button>
          ) : null}
        </Flex>
        <Display shadow width="100%" className="resp-table" mb={0}>
          {children}
        </Display>
      </Container>
    </>
  );
}
