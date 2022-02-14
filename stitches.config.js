import { createStitches, globalCss } from '@stitches/react';

export const { styled, getCssText, css } = createStitches({
  theme: {
    fontSizes: {
      1: '1rem',
      2: '1.5rem',
    },
  },
  utils: {
    juct: (value) => ({
      justifyContent: value,
    }),
  },
  media: {
    sm: '(max-width: 640px)',
    md: '(max-width: 768px)',
    lg: '(max-width: 1024px)',
    xl: '(max-width: 1280px)',
  },
});
export const globalStyles = globalCss({
  '#__next': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  iframe: {
    border: 0,
  },
});
