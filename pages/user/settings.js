import Head from 'next/head';
import { Avatar, Grid, Note,Text, Toggle } from '@geist-ui/core';

import { useAuth } from '@/lib/auth';
import { withProtected } from '@/hooks/routes';

import { Container, Flex } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

function UserSettings() {
  const { user, loading, linkOrUnlinkGoogle, linkOrUnlinkGithub } = useAuth();

  const oneAuth = user?.providers?.length === 1;
  const isGoogle = user?.providers?.some((el) => el.name === 'google.com');
  const isGithub = user?.providers?.some((el) => el.name === 'github.com');
  const onGoogleAuthChange = (e) => {
    const checked = e.target.checked;
    linkOrUnlinkGoogle(checked);
  };
  const onGithubAuthChange = (e) => {
    const checked = e.target.checked;
    linkOrUnlinkGithub(checked);
  };
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <Container css={{ marginTop: '1.5rem' }}>
        <Flex
          css={{ alignItems: 'center', flexDirection: 'column', gap: '1rem' }}
        >
          <Avatar src={user?.photoURL} width="100px" height="100px" />
          <Text h4>{user?.name}</Text>
        </Flex>
        <Grid.Container mx="auto" xs={24} sm={12} font="1rem">
          <Grid>
            <Text h5>Accounts linked:</Text>
            <Note type="warning" filled padding={0.5}>
              At least one account should be connected.
            </Note>
          </Grid>
          <Grid xs={24} my={1}>
            <Text span>Link Google</Text>
            <Toggle
              scale={1.5}
              py={0}
              mx={0.7}
              disabled={loading || (isGoogle && oneAuth)}
              onChange={onGoogleAuthChange}
              checked={isGoogle}
            />
          </Grid>
          <Grid xs={24} my={1}>
            <Text span>Link Github</Text>
            <Toggle
              scale={1.5}
              py={0}
              mx={0.7}
              disabled={loading || (isGithub && oneAuth)}
              onChange={onGithubAuthChange}
              checked={isGithub}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
}
export default withProtected(UserSettings);
