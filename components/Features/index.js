import { IconContext } from 'react-icons';
import { HiOutlineCode } from 'react-icons/hi';
import { MdOutlineMoneyOff, MdOutlineShield } from 'react-icons/md';
import { Card, Grid, Text } from '@geist-ui/core';

import { FeatureContainer } from './FeaturesStyles';
import { HeadingText, StyledText } from '../GlobalComponents';

export default function Features() {
  return (
    <>
      <HeadingText css={{ mt: '3rem', mb: 0 }}>
        Focus on building what's <StyledText>important</StyledText> to you.
      </HeadingText>
      <Text font={1.05} p type="secondary" style={{ textAlign: 'center' }}>
        don't waste time creating another feedback system
      </Text>
      <Grid.Container mb={5} mt={3} justify="center" gap={1.5}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }}>
            <Card>
              <FeatureContainer>
                <Text span>
                  <HiOutlineCode />
                </Text>
                <Text h4 margin={0}>
                  Easy to set-up
                </Text>
                <Text span>
                  You only need to add one line of code to your website and
                  you're all good!
                </Text>
              </FeatureContainer>
            </Card>
          </Grid>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }}>
            <Card width="100%">
              <FeatureContainer>
                <Text span>
                  <MdOutlineShield />
                </Text>
                <Text h4 margin={0}>
                  Secure and Ad-free
                </Text>
                <Text span>No trackers. No ads.</Text>
              </FeatureContainer>
            </Card>
          </Grid>
          <Grid xs={24} sm={8} style={{ textAlign: 'center' }}>
            <Card>
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
            </Card>
          </Grid>
        </IconContext.Provider>
      </Grid.Container>
    </>
  );
}
