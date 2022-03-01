import { TextLoop } from 'react-text-loop-next';
import { Button, Card, Note, Text, useMediaQuery } from '@geist-ui/core';
import { motion } from 'framer-motion';

import { HeroContainer, HeroCTA, StyledText } from './HeroStyles';
import { Flex } from '../GlobalComponents';

const mockdata = require('../../public/mockdata.json');

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default function HeroArea({ scrollTo }) {
  const isMobile = useMediaQuery('mobile');
  return (
    <HeroContainer>
      {[...Array(7)]
        .map((u) => [Math.random() * -100, randomIntFromInterval(5, 15)])
        .map((u, i) => (
          <motion.div
            animate={{
              x: [-120 + u[0], 0 + u[0]].map((x) =>
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
              {mockdata.slice(0 + 8 * i, 8 + 8 * i).map((u, i) => (
                <Note
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
            py={0.6}
            type="dark"
            width="90vw"
            style={{
              maxWidth: '700px',
              textAlign: 'center',
              backgroundColor: '#17171d',
            }}
          >
            <Text h2 font={isMobile ? 1.5 : 2}>
              Get instant feedback for your{' '}
              <TextLoop>
                <StyledText>blog</StyledText>
                <StyledText>store</StyledText>
              </TextLoop>
            </Text>
            <Text p margin={0} mt={1} font={isMobile ? 0.9 : 1}>
              Easily add user feedback to your website in one line of code.
            </Text>
            <Button type="success-light" pr={1} mt={1} onClick={scrollTo}>
              Get Started
            </Button>
          </Card>
        </Flex>
      </HeroCTA>
    </HeroContainer>
  );
}
