import { SiGoogle } from 'react-icons/si';
import { Button, Divider, Grid } from '@geist-ui/core';
import Github from '@geist-ui/icons/github';

import { useAuth } from '@/lib/auth';

export default function LoginButtons({
  direction,
  scale,
  logInPage,
  hideIcon = false,
  size = { xs: 24, sm: 12, md: 9 },
}) {
  const auth = useAuth();
  return (
    <Grid.Container gap={1} direction={direction ? direction : 'row'}>
      <Grid xs={size.xs} sm={size.sm} md={logInPage ? 24 : size.md}>
        <Button
          loading={auth.loading}
          width="100%"
          scale={scale ?? 1}
          type="secondary"
          icon={hideIcon ? '' : <Github />}
          onClick={() => auth.signinWithGithub()}
        >
          Continue with Github
        </Button>
      </Grid>
      {logInPage && (
        <Grid xs sm md={logInPage ? 24 : 9}>
          <Divider width="100%" h={2}>
            OR
          </Divider>
        </Grid>
      )}
      <Grid xs={size.xs} sm={size.sm} md={logInPage ? 24 : size.md}>
        <Button
          loading={auth.loading}
          width="100%"
          type="secondary"
          ghost
          scale={scale ?? 1}
          icon={hideIcon ? '' : <SiGoogle />}
          onClick={() => auth.signinWithGoogle()}
        >
          Continue with Google
        </Button>
      </Grid>
    </Grid.Container>
  );
}
