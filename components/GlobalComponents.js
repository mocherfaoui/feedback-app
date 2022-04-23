import { Note } from '@geist-ui/core';

import { styled } from '@/stitches.config';

export const Container = styled('div', {
  maxWidth: '56rem',
  margin: '0 auto',
  padding: '0 1rem',
});
export const Flex = styled('div', {
  display: 'flex',
});
export const FormError = styled(Note, {
  padding: '.5rem!important',
  margin: '.3rem 0!important',
  textAlign: 'start',
});
export const StyledText = styled('span', {
  whiteSpace: 'nowrap',
  backgroundColor: 'rgb(255, 212, 64)',
  color: '#17171d',
  padding: '.3rem .4rem',
  borderRadius: '7px',
});
export const HeadingText = styled('h2', {
  fontSize: '2rem',
  marginBottom: '$8',
  textAlign: 'center',
  '@sm': {
    fontSize: '1.5rem',
  },
});
