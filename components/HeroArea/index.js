import { TextLoop } from 'react-text-loop-next';
import { Button, Card, Note, Text } from '@geist-ui/core';
import { motion } from 'framer-motion';

import { styled } from '@/stitches.config';

import { HeroContainer, HeroCTA } from './HeroStyles';
import mockData from './mockData';
import { Flex, StyledText } from '../GlobalComponents';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default function HeroArea({ scrollTo }) {
  return (
    <HeroContainer>
      {[...Array(7)]
        .map((u) => [Math.random() * -100, randomIntFromInterval(5, 15)])
        .map((u, i) => (
          <motion.div
            animate={{
              x: [-120 + u[0], u[0]].map((x) =>
                i % 2 == 0 ? x : x * -1 - 240 - u[0] * -1
              ),
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            key={'key-animate-' + i}
            style={{ flexGrow: 1, flexShrink: 0 }}
          >
            <Flex
              style={{
                padding: '.5rem',
                paddingBottom: 0,
                overflow: 'hidden',
                maxHeight: '422px',
                flexBasis: 'auto',
                width: '160vw',
              }}
            >
              {mockData.slice(0 + 8 * i, 8 + 8 * i).map((u, i) => (
                <Note
                  font={1.1}
                  filled
                  mx={0.3}
                  padding={0.5}
                  label={false}
                  key={i}
                  style={{
                    flexGrow: 1,
                    flexShrink: 0,
                    opacity: 0.3,
                    boxSizing: 'border-box',
                    maxWidth: 'fit-content',
                  }}
                >
                  {u.feedback}
                </Note>
              ))}
            </Flex>
          </motion.div>
        ))}
      <HeroCTA>
        <Flex
          css={{
            flexDirection: 'column',
          }}
        >
          <Card
            py={0.5}
            type="dark"
            width="90vw"
            style={{
              maxWidth: '690px',
              textAlign: 'center',
              backgroundColor: '#17171d',
            }}
          >
            <HeadingText h1 mb={1.5} mt={0}>
              Get instant feedback for your{' '}
              <TextLoop>
                <StyledText>blog</StyledText>
                <StyledText>store</StyledText>
              </TextLoop>
            </HeadingText>
            <Text p margin={0} my={0.8} font={1.1}>
              Easily add user feedback to your website in one line of code.
            </Text>
            <Button
              type="default"
              pr={1}
              mt={0.5}
              onClick={scrollTo}
              style={{ color: '#000', fontWeight: 'bold', fontSize: '1rem' }}
            >
              Get Started
            </Button>
          </Card>
        </Flex>
      </HeroCTA>
    </HeroContainer>
  );
}
const HeadingText = styled(Text, {
  fontSize: '2.5rem',
  '@sm': {
    fontSize: '1.6rem',
  },
});
