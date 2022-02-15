import Head from 'next/head';
import { Text } from '@geist-ui/core';

import { Container } from '@/components/GlobalComponents';
import Icons from '@/components/Icons';
import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About this project</title>
      </Head>
      <Container css={{ paddingTop: '2rem' }}>
        <Text p>
          This is a hobby project that was created using Next.js, Firebase and
          deployed on Vercel.
        </Text>
        <Icons />
      </Container>
    </Layout>
  );
}
