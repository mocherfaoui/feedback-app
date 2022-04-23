import NextLink from 'next/link';
import { Code, Grid, Link, Snippet, Text } from '@geist-ui/core';

import {
  RoundedNumber,
  RoundedNumberContainer,
  StepContainer,
} from './HowToUseStyles';
import { HeadingText, StyledText } from '../GlobalComponents';

export default function HowToUse() {
  return (
    <>
      <HeadingText id="how-to-use">
        Add a feedback system to your website in <StyledText>three</StyledText>{' '}
        steps.
      </HeadingText>
      <Grid.Container
        gap={1.5}
        style={{ marginTop: '1.8rem', textAlign: 'center' }}
      >
        <Grid xs={24} sm={8}>
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
        </Grid>
        <Grid xs={24} sm={8} width='100%'>
          <StepContainer>
            <RoundedNumberContainer>
              <RoundedNumber>2</RoundedNumber>
            </RoundedNumberContainer>
            <Text p>
              Get your site ID from the dashboard.
              <br />
              Site ID looks like this: <Code>ke1irABCqUrgXa7eqDM5</Code> you can find it in the sites dashboard.
              <br />
            </Text>
          </StepContainer>
        </Grid>
        <Grid xs={24} sm={8}>
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
              width="300px"
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
        </Grid>
      </Grid.Container>
    </>
  );
}
