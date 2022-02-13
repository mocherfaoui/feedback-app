import { Flex } from './components/GlobalComponents';
import { IconContext } from 'react-icons/lib';
import { SiNextdotjs, SiFirebase, SiReact, SiVercel } from 'react-icons/si';
import { styled } from './stitches.config';

export default function Icons() {
  return (
    <>
      <style>
        {`
    .home_page-icons{
      display:block;
      width:2rem;
      height:auto;
    }
    `}
      </style>
      <Flex css={{ paddingBottom: '1rem', gap: '1rem' }}>
        <IconContext.Provider value={{ className: 'home_page-icons' }}>
          <IconWrapper>
            <SiNextdotjs />
          </IconWrapper>
          <IconWrapper>
            <SiFirebase />
          </IconWrapper>
          <IconWrapper>
            <SiReact />
          </IconWrapper>
          <IconWrapper>
            <SiVercel />
          </IconWrapper>
        </IconContext.Provider>
      </Flex>
    </>
  );
}
const IconWrapper = styled('div', {
  borderRadius: '50%',
  display: 'flex',
  padding: '1rem',
  background: '#fff',
  boxShadow: '0 30px 60px rgb(0 0 0 / 12%)',
});
