import Head from 'next/head';
import { Spinner, Text } from '@geist-ui/core';

import { useAuth } from '@/lib/auth';

import { styled } from '@/stitches.config';

export default function LoadingState() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>{user ? 'Loading...' : 'Redirecting...'}</title>
      </Head>
      <LoadingStateContainer>
        <Text span px={1} font={1.1}>
          {user
            ? 'Loading'
            : 'Not logged-in, redirecting...'}
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
