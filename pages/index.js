import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Text } from '@geist-ui/core';
import IframeResizer from 'iframe-resizer-react';

import Features from '@/components/Features';
import { Container, Flex } from '@/components/GlobalComponents';
import HeroArea from '@/components/HeroArea';
import HowToUse from '@/components/HowToUse';
import Layout from '@/components/Layout';

export default function Home() {
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
      <Container style={{ paddingTop: '2.5rem' }}>
        <HowToUse />
        <Features />
        <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
          <Text h3 margin={0} mt={2}>Demo</Text>
          <Text span>
            This is how the embed will look like.
            <br />
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
