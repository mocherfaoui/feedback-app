import { SiGoogle } from 'react-icons/si';
import { Button, Grid } from '@geist-ui/core';
import Github from '@geist-ui/icons/github';

import { useAuth } from '@/lib/auth';

export default function LoginButtons() {
  const auth = useAuth();
  return (
    <Grid.Container gap={1} direction='row'>
      <Grid xs={24} sm={12} md={9}>
      <Button
        loading={auth.loading}
        width='100%'
        type="secondary"
        icon={<Github />}
        onClick={() => auth.signinWithGithub()}
      >
        Continue with Github
      </Button>
      </Grid>
      <Grid xs sm md={9}>
      <Button
        loading={auth.loading}
        width='100%'
        type="secondary"
        ghost
        icon={<SiGoogle />}
        onClick={() => auth.signinWithGoogle()}
      >
        Continue with Google
      </Button>
      </Grid>
    </Grid.Container>
  );
}
