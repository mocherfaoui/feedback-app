import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, Link, Popover, Text, useBodyScroll } from '@geist-ui/core';
import LogOut from '@geist-ui/icons/logOut';
import Settings from '@geist-ui/icons/settings';
import { Cross as Hamburger } from 'hamburger-react';

import { useAuth } from '@/lib/auth';
import useScrollingUp from '@/hooks/useScrollingUp';

import {
  DesktopMenuItems,
  HeaderWrapper,
  LogInButton,
  MenuLink,
  MobileMenuItems,
  Navbar,
} from './HeaderStyle';
import { Container, Flex } from '../GlobalComponents';

export default function Header() {
  const { user, signout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [, setHidden] = useBodyScroll(false);
  const { scrollingUp: isScrolled, setScrollingUp } = useScrollingUp();
  const handleToggle = () => {
    setOpen((prev) => !prev);
    setHidden((prev) => !prev);
  };
  const router = useRouter();
  const isHomePage = router.asPath === '/';
  return (
    <HeaderWrapper
      isOpen={isOpen}
      isScrolled={isScrolled}
      css={{
        backgroundColor: !isHomePage ? '#f7f7f7' : 'rgb(18, 18, 23)',
        color: !isHomePage ? '#000' : '#fff',
      }}
    >
      <Navbar isOpen={isOpen}>
        <Container>
          <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <NavMenu isOpen={isOpen} handleToggle={handleToggle} />
          </Flex>
        </Container>
      </Navbar>
      <MobileMenuItems isOpen={isOpen}>
        <Menu user={user} />
        {user ? (
          <>
            <NextLink href="/user/settings" passHref>
              <MenuLink>Settings</MenuLink>
            </NextLink>
            <NextLink href="/" passHref>
              <MenuLink onClick={() => signout()}>Log Out</MenuLink>
            </NextLink>
          </>
        ) : (
          <NextLink href="/sign-in" passHref>
            <MenuLink>Log in</MenuLink>
          </NextLink>
        )}
      </MobileMenuItems>
    </HeaderWrapper>
  );
}
function NavMenu({ isOpen, handleToggle }) {
  const { user, signout } = useAuth();
  const router = useRouter();
  const isHomePage = router.asPath === '/';
  const [firstName, lastName] = user?.name?.split(' ') ?? [];
  const popOverContent = () => (
    <Flex
      css={{
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 .8rem',
        width: 'max-content',
        gap: '.8rem',
      }}
    >
      <NextLink href="/user/settings" passHref>
        <MenuLink>
          <Settings />
          Settings
        </MenuLink>
      </NextLink>
      <NextLink href="/" passHref>
        <MenuLink onClick={() => signout()}>
          <LogOut />
          Log Out
        </MenuLink>
      </NextLink>
    </Flex>
  );
  return (
    <>
      <style type="text/css">
        {`
        .hamburger-react{
            display:none;
        }
        @media screen and (max-width: 640px){
            .hamburger-react{
                display:inline-block;
            }
        }
        `}
      </style>
      <Flex css={{ gap: '1.5rem' }}>
        <NextLink href="/" passHref>
          <Link>Home</Link>
        </NextLink>
        <DesktopMenuItems>
          <Menu user={user} />
        </DesktopMenuItems>
      </Flex>
      {user ? (
        <DesktopMenuItems>
          <Popover
            content={popOverContent}
            style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
          >
            <Text span>{firstName}</Text>
            <Avatar src={user?.photoURL} />
          </Popover>
        </DesktopMenuItems>
      ) : (
        <LogInButton
          onClick={() => router.push('/sign-in')}
          auto
          ghost={isHomePage ?? false}
          type="secondary"
        >
          Log in
        </LogInButton>
      )}
      <Hamburger toggled={isOpen} toggle={handleToggle} size={20} />
    </>
  );
}
const Menu = () => {
  return (
    <>
      <NextLink href="/sites" passHref>
        <Link>Sites</Link>
      </NextLink>
      <NextLink href="/feedback" passHref>
        <Link>Feedbacks</Link>
      </NextLink>
      <NextLink href="/docs" passHref>
        <Link>Docs</Link>
      </NextLink>
      <NextLink href="/about" passHref>
        <Link>About</Link>
      </NextLink>
    </>
  );
};
