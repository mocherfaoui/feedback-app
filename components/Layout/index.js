import { styled } from '@/stitches.config';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ children }) {
  return (
    <>
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
    pt: '55px',
    '@sm': { pt: '80px!important' },
  },
});
