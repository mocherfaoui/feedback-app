import { styled } from '@/stitches.config';

export const HeroContainer = styled('div', {
  paddingTop: '5px',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '100vw',
  backgroundColor: '#121217',
  paddingBottom: '.8rem',
  '& > div:first-child > :first-child': {
    paddingTop: '0!important',
  },
});
export const HeroCTA = styled('div', {
  position: 'absolute',
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});