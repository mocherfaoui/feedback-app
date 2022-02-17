import Head from 'next/head';
import NextLink from 'next/link';
import { Code,Link, Text } from '@geist-ui/core';
import IframeResizer from 'iframe-resizer-react';

import { useAuth } from '@/lib/auth';

import { Container, Flex } from '@/components/GlobalComponents';
import Icons from '@/components/Icons';
import Layout from '@/components/Layout';
import LoginButtons from '@/components/LoginButtons';

import { styled } from '@/stitches.config';

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Feedback App - Homepage</title>
      </Head>
      <Layout>
        <Container style={{ paddingTop: '2rem' }}>
          <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
            <Text h2 width="80%">
              Get instant feedback for your <GradientText>website</GradientText>{' '}
              or <GradientText>product</GradientText>
            </Text>
            <Text span type="secondary">
              Easily add user feedback to your website in one line of code.
            </Text>
            <Text span type="secondary">
              This website was created using Next.js, Firebase and deployed on
              Vercel.
            </Text>
            <Icons />
            <Text h3>No Trackers. No Ads. Just Feedback.</Text>
            <Text span type="secondary">
              Add feedback to your website without compromising your users'
              privacy.
            </Text>
            <Text h3 margin={0} mt={1}>
              How To Use
            </Text>
            <ol>
              <li>
                Log-in using Github or Google{' '}
                <div style={{ padding: '1rem 0' }}>
                  {!user ? (
                    <LoginButtons />
                  ) : (
                    <Text p b margin={0}>
                      You're already logged-in!
                    </Text>
                  )}
                </div>
              </li>
              <li>
                Add a site{' '}
                <NextLink href="/sites" passHref>
                  <Link underline color>here</Link>
                </NextLink>{' '}
                and get your site ID
              </li>
              <li>
                Add this iframe anywhere in your code:
                <br />
                <Code block width="auto">
                  {
                    '<iframe src="https://feedback-app0.vercel.app/embed/SITE_ID" />'
                  }
                </Code>
                <Text span>
                  If you want to add the iframe to multiple routes or make it
                  resizable see the full docs{' '}
                  <NextLink href="/docs" passHref>
                    <Link underline color>here</Link>
                  </NextLink>
                  .
                </Text>
              </li>
            </ol>
            <Text h3>Demo</Text>
            <Text span>This is how the embed will look like.</Text>
            <Text span>
              Give it a try! If you have any suggestion on what should be added
              or removed just write it away.
            </Text>
            <IframeResizer
              checkOrigin={false}
              title="Comments"
              src="https://feedback-app0.vercel.app/embed/ke1irGZRqUrgXa7eqAXL"
              style={{
                width: '1px',
                minWidth: '100%',
              }}
            />
          </Flex>
        </Container>
      </Layout>
    </>
  );
}

const GradientText = styled('span', {
  background: '#bdc3c7',
  background: '-webkit-linear-gradient(to right, #2c3e50, #bdc3c7)',
  background: 'linear-gradient(to right, #2c3e50, #bdc3c7)',
  backgroundSize: '100%',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
});
