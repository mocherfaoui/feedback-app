import { createStitches, globalCss } from '@stitches/react';

export const { styled, getCssText, css, keyframes } = createStitches({
  theme: {
    fontSizes: {
      1: '1rem',
      2: '1.25rem',
    },
  },
  utils: {
    justify: (value) => ({
      justifyContent: value,
    }),
    m: (value) => ({
      margin: value,
    }),
    mt: (value) => ({
      marginTop: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (value) => ({
      padding: value,
    }),
    pt: (value) => ({
      paddingTop: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
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
