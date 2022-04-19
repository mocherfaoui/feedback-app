import { Grid, Text } from '@geist-ui/core';

import { withPublic } from '@/hooks/routes';

import { Container } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import LoginButtons from '@/components/LoginButtons';

function SignInPage() {
  return (
    <Layout pageTitle="Log-in">
      <Container css={{ marginTop: '2rem' }}>
        <Grid.Container mx="auto" xs={24} sm={10} font="1rem">
          <Grid xs={24} my={1}>
            <Text style={{ textAlign: 'center', fontWeight: '600' }} font={1.5}>
              Log in
            </Text>
          </Grid>
          <Grid xs={24}>
            <LoginButtons direction="column" logInPage />
          </Grid>
          <Grid xs={24} mt={2.5} style={{ textAlign: 'center' }}>
            <Text small>Email access will be added soon.</Text>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
}
export default withPublic(SignInPage);
