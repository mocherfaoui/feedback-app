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
      <Header />
      <MainContainer>
        <main>{children}</main>
      </MainContainer>
      <Footer />
    </>
  );
}
const MainContainer = styled('div', {
  main: {
    pt: '60px',
    '@sm': { pt: '80px!important' },
  },
});
