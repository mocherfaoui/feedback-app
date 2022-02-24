import { useForm } from 'react-hook-form';
import Head from 'next/head';
import {
  Avatar,
  Button,
  Grid,
  Input,
  Note,
  Text,
  Toggle,
} from '@geist-ui/core';

import { useAuth } from '@/lib/auth';
import { updateUsernameForFeedbacks } from '@/lib/db';
import { withProtected } from '@/hooks/routes';

import { Container, Flex } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

function UserSettings() {
  const {
    user,
    loading,
    linkOrUnlinkGoogle,
    linkOrUnlinkGithub,
    updateUsername,
  } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
  const onNameChange = async ({ displayName }) => {
    await updateUsername(displayName);
    await updateUsernameForFeedbacks(user.uid, displayName);
    reset({ displayName: '' });
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
          <Grid mb={1}>
            <Note type="warning" filled padding={0.5}>
              At least one account should be connected.
            </Note>
          </Grid>
          <Grid pt={1} margin={0}>
            <Text h5>Accounts linked:</Text>
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
          </Grid>
          <Grid>
            <Text h5 pt={1} mb={1} margin={0}>
              Change display name:
            </Text>
            <form
              onSubmit={handleSubmit(onNameChange)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '.8rem',
              }}
            >
              <Input
                htmlType="text"
                placeholder="your new dispaly name"
                width="100%"
                {...register('displayName', {
                  required: true,
                })}
              />
              <Button auto scale={2 / 3} htmlType="submit" type="warning">
                Update
              </Button>
            </form>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
}
export default withProtected(UserSettings);
