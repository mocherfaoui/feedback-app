import { Link, Text } from '@geist-ui/core';

import { Container } from '@/components/GlobalComponents';
import Icons from '@/components/Icons';
import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout pageTitle="About this project">
      <Container css={{ paddingTop: '2rem' }}>
        <Text p>
          This is a hobby project that was created using Next.js, Firebase and
          deployed on Vercel.
          <br />
          <Link
            icon
            underline
            target="_blank"
            href="https://github.com/mocherfaoui/feedback-app"
          >
            View source code on Github.
          </Link>
        </Text>
        <Icons />
      </Container>
    </Layout>
  );
}
