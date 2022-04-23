import { styled } from '@/stitches.config';

export const RoundedNumber = styled('div', {
  borderRadius: '50px',
  border: '1px solid $gray600',
  padding: '10px 18px 10px 18px;',
  marginBottom: '$3',
});
export const StepContainer = styled('div', {
  display: 'flex',
  alignContent: 'flex-start',
  flexDirection: 'column',
});
export const RoundedNumberContainer = styled('div', {
  display: 'flex',
  justify: 'center',
})
