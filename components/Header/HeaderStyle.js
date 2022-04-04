import { Link } from '@geist-ui/core';

import { styled } from '@/stitches.config';

export const Navbar = styled('header', {
  display: 'block',
  padding: '1rem 0',
  '@sm': {
    fontSize: '1.3rem',
  },
  variants: {
    isOpen: {
      true: {
        backgroundColor: 'transparent!important',
        color: '#fff!important',
      },
    },
  },
});

export const MenuLink = styled(Link, {
  alignItems: 'center!important',
  gap: '.3rem',
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
        zIndex: 1000,
        height: '100vh',
        width: 'auto',
        padding: '1rem',
        fontSize: '1.3rem',
        color: '#fff',
      },
      false: {
        display: 'none',
      },
    },
  },
});
export const HeaderWrapper = styled('div', {
  position: 'fixed',
  top: 0,
  zIndex: 1000,
  width: '100%',
  fontWeight: 'bold',
  transition: 'top .25s ease-out',
  variants: {
    isOpen: {
      true: {
        position: 'fixed',
        top: 0,
        '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)':
          {
            backgroundColor: 'rgba(32, 34, 36, 0.75)!important',
            backdropFilter: 'saturate(180%) blur(20px)',
          },
      },
    },
    isScrolled: {
      true: {
        top: 0,
        '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)':
          {
            backgroundColor: 'rgba(32, 34, 36, 0.75)',
            backdropFilter: 'saturate(180%) blur(20px)',
          },
      },
      false: { top: '-80px' },
    },
  },
});
