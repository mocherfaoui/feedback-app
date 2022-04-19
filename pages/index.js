import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import NextLink from 'next/link';
import { Code, Link, Text } from '@geist-ui/core';
import IframeResizer from 'iframe-resizer-react';

import { useAuth } from '@/lib/auth';

import { Container, Flex } from '@/components/GlobalComponents';
import HeroArea from '@/components/HeroArea';
import Layout from '@/components/Layout';
import LoginButtons from '@/components/LoginButtons';

export default function Home() {
  const { user } = useAuth();
  const [isSSR, setIsSSR] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  });
  const scrollTo = () => {
    const howTo = document.getElementById('how-to-use');
    howTo.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <Layout pageTitle="Feedback App - Homepage">
      <HeroArea scrollTo={scrollTo} />
      <Container style={{ paddingTop: '2rem' }}>
        <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
          <Text h3>No Trackers. No Ads. Just Feedback.</Text>
          <Text span type="secondary">
            Add feedback to your website without compromising your users'
            privacy.
          </Text>
          <Text h3 margin={0} mt={1} id="how-to-use">
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
                <Link underline color>
                  here
                </Link>
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
                  <Link underline color>
                    here
                  </Link>
                </NextLink>
                .
              </Text>
            </li>
          </ol>
          <Text h3>Demo</Text>
          <Text span>This is how the embed will look like.</Text>
          <Text span>
            Give it a try! If you have any suggestion on what should be added or
            removed just write it away.
          </Text>
          <div ref={ref}>
            {inView && !isSSR && (
              <IframeResizer
                checkOrigin={false}
                title="Comments"
                src={`/embed/ke1irGZRqUrgXa7eqAXL`}
                style={{
                  width: '1px',
                  minWidth: '100%',
                }}
              />
            )}
          </div>
        </Flex>
      </Container>
    </Layout>
  );
}
