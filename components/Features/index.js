import { IconContext } from 'react-icons';
import { HiOutlineCode } from 'react-icons/hi';
import { MdOutlineMoneyOff,MdOutlineShield } from 'react-icons/md';
import { Grid, Text } from '@geist-ui/core';

import { FeatureContainer } from './FeaturesStyles';
import { HeadingText, StyledText } from '../GlobalComponents';

export default function Features() {
  return (
    <>
      <HeadingText css={{ mt: '3.5rem', mb: 0 }}>
        Focus on building what's <StyledText>important</StyledText> to you.
      </HeadingText>
      <Text font={1.05} p type="secondary" style={{ textAlign: 'center' }}>
        don't waste time creating another feedback system
      </Text>
      <Grid.Container my={2.5} justify="center" gap={1.5}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }}>
            <FeatureContainer>
              <Text span>
                <HiOutlineCode />
              </Text>
              <Text h4 margin={0}>
                Easy to set-up
              </Text>
              <Text span>
                You only need to add one line of code to your website and you're
                all good!
              </Text>
            </FeatureContainer>
          </Grid>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }} mx="auto">
            <FeatureContainer>
              <Text span>
                <MdOutlineShield />
              </Text>
              <Text h4 margin={0}>
                Secure and Ad-free
              </Text>
              <Text span>No trackers. No ads.</Text>
            </FeatureContainer>
          </Grid>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }}>
            <FeatureContainer>
              <Text span>
                <MdOutlineMoneyOff />
              </Text>
              <Text h4 margin={0}>
                Free to use
              </Text>
              <Text span>
                It is 100% free for the moment, more features will be added.
              </Text>
            </FeatureContainer>
          </Grid>
        </IconContext.Provider>
      </Grid.Container>
    </>
  );
}
