import Head from 'next/head';
import { Loading } from '@geist-ui/core';

import { Flex } from '../GlobalComponents';

export default function LoadingState() {
  return (
    <>
      <Head>
        <title>loading...</title>
      </Head>
      <Flex css={{ height: '100vh' }}>
        <Loading>Loading</Loading>
      </Flex>
    </>
  );
}
