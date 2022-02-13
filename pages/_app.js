import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { AuthProvider } from '../lib/auth';
import 'inter-ui/inter.css';
import { globalStyles } from '@/stitches.config';

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
