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
