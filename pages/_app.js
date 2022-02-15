import { CssBaseline, GeistProvider } from '@geist-ui/core';

import 'inter-ui/inter.css';

import { globalStyles } from '@/stitches.config';

import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <GeistProvider>
      <AuthProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </AuthProvider>
    </GeistProvider>
  );
}

export default MyApp;
