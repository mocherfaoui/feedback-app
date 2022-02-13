import Head from 'next/head';
import { Container } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import Icons from '@/Icons';
import { Text } from '@geist-ui/core';

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
