import Head from 'next/head';

import { styled } from '@/stitches.config';

import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Container>
        <Header />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
}
const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  main: {
    pt: '60px',
    '@sm': { pt: '80px!important' },
  },
});
