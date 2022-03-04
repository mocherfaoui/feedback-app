import { Link } from '@geist-ui/core';

import { styled } from '@/stitches.config';

export const Navbar = styled('header', {
  display: 'block',
  padding: '1rem 0',
  backgroundColor: 'rgb(18, 18, 23)',
  color: '#fff',
  '@sm': {
    fontSize: '1.3rem',
  },
});

export const MenuLink = styled(Link, {
  alignItems: 'center!important',
  gap: '.3rem',
  /* margin: '0 1rem!important' */
});
export const MenuWrapper = styled('div', {
  '@sm': {
    position: 'absolute',
    top: '70px',
    zIndex: '2000',
    width: '100%',
  },
});

export const DesktopMenuItems = styled('div', {
  display: 'flex',
  gap: '1rem',
  cursor: 'pointer',
  '@sm': { display: 'none' },
});
export const MobileMenuItems = styled('div', {
  display: 'none',
  variants: {
    isOpen: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        height: '100vh',
        width: 'auto',
        background: 'rgb(18, 18, 23)',
        padding: '1rem',
        fontSize: '1.3rem',
      },
      false: {
        display: 'none',
      },
    },
  },
});
