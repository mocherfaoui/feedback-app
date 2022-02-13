import { styled } from '@/stitches.config';
import { Link } from '@geist-ui/core';

export const Navbar = styled('header', {
  display: 'block',
  padding: '1rem 0',
  backgroundColor: '#f7f7f7',
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
        height: 'max-content',
        width: 'auto',
        background: '#f7f7f7',
        padding: '1rem',
      },
      false: {
        display: 'none',
      },
    },
  },
});
