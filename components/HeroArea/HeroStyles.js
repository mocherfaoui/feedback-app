import { styled } from '@/stitches.config';

export const HeroContainer = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '100vw',
  backgroundColor: '#121217',
  padding: '.8rem 0',
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
export const StyledText = styled('span', {
  whiteSpace: 'nowrap',
  backgroundColor: 'rgb(255, 212, 64)',
  color: '#17171d',
  padding: '0 .3rem',
  borderRadius: '8px',
});
