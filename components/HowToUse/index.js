import NextLink from 'next/link';
import { Card, Code, Grid, Link, Snippet, Text } from '@geist-ui/core';

import {
  RoundedNumber,
  RoundedNumberContainer,
  StepContainer,
} from './HowToUseStyles';
import { HeadingText, StyledText } from '../GlobalComponents';

export default function HowToUse() {
  return (
    <>
      <HeadingText
        id="how-to-use"
        style={{ marginBottom: 0, marginTop: '1.3rem' }}
      >
        Add a feedback system to your website in <StyledText>three</StyledText>{' '}
        steps.
      </HeadingText>
      <Grid.Container mb={5} mt={3} gap={1.5} style={{ textAlign: 'center' }}>
        <Grid xs={24} sm={8}>
          <Card>
            <StepContainer>
              <RoundedNumberContainer>
                <RoundedNumber>1</RoundedNumber>
              </RoundedNumberContainer>
              <Text p>
                <NextLink href="/log-in" passHref>
                  <Link color underline>
                    Log-in
                  </Link>
                </NextLink>{' '}
                using Google or Github and add your website{' '}
                <NextLink href="/sites" passHref>
                  <Link color underline>
                    here.
                  </Link>
                </NextLink>
              </Text>
            </StepContainer>
          </Card>
        </Grid>
        <Grid xs={24} sm={8} width="100%">
          <Card>
            <StepContainer>
              <RoundedNumberContainer>
                <RoundedNumber>2</RoundedNumber>
              </RoundedNumberContainer>
              <Text p>
                Get your site ID from the dashboard.
                <br />
                Site ID looks like this: <Code>ke1irABCqUrgXa7eqDM5</Code> you
                can find it in the sites dashboard.
                <br />
              </Text>
            </StepContainer>
          </Card>
        </Grid>
        <Grid xs={24} sm={8}>
          <Card width="100%">
            <StepContainer>
              <RoundedNumberContainer>
                <RoundedNumber>3</RoundedNumber>
              </RoundedNumberContainer>
              <Text p mb={0}>
                Put this iframe anywhere in your website:
              </Text>
              <Snippet
                my={0.5}
                symbol=""
                text='<iframe src="https://feedback-app0.vercel.app/embed/SITE_ID" />'
                width="auto"
              />
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
            </StepContainer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
