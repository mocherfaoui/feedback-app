import Head from 'next/head';
import { Spinner, Text } from '@geist-ui/core';

import { styled } from '@/stitches.config';

export default function LoadingState() {
  return (
    <>
      <Head>
        <title>Verifying...</title>
      </Head>
      <LoadingStateContainer>
        <Text span px={1} font={1.1}>
          Verifying authentication status...
        </Text>
        <Spinner scale={1.2} />
      </LoadingStateContainer>
    </>
  );
}
export const LoadingStateContainer = styled('div', {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '$2',
});
