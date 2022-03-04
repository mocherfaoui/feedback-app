import { useState } from 'react';
import NextLink from 'next/link';
import { Avatar, Link, Popover, useBodyScroll } from '@geist-ui/core';
import LogOut from '@geist-ui/icons/logOut';
import Settings from '@geist-ui/icons/settings';
import { Cross as Hamburger } from 'hamburger-react';

import { useAuth } from '@/lib/auth';

import {
  DesktopMenuItems,
  MenuLink,
  MenuWrapper,
  MobileMenuItems,
  Navbar,
} from './HeaderStyle';
import { Container, Flex } from '../GlobalComponents';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, signout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [, setHidden] = useBodyScroll(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
    setHidden((prev) => !prev);
  };
  const router = useRouter();
  const isHomePage = router.asPath === '/';
  return (
    <Navbar
      css={{
        backgroundColor: !isHomePage && '#f7f7f7',
        color: !isHomePage && '#000',
      }}
    >
      <Container>
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <NavMenu isOpen={isOpen} handleToggle={handleToggle} />
        </Flex>
      </Container>
      <MenuWrapper>
        <MobileMenuItems isOpen={isOpen} css={{backgroundColor: !isHomePage &&'#f7f7f7'}}>
          <Menu user={user} />
          {user && (
            <>
              <NextLink href="/user/settings" passHref>
                <MenuLink>Settings</MenuLink>
              </NextLink>
              <NextLink href="/" passHref>
                <MenuLink onClick={() => signout()}>Log Out</MenuLink>
              </NextLink>
            </>
          )}
        </MobileMenuItems>
      </MenuWrapper>
    </Navbar>
  );
}
function NavMenu({ isOpen, handleToggle }) {
  const { user, signout } = useAuth();
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
      {user && (
        <DesktopMenuItems>
          <Popover content={popOverContent}>
            <Avatar src={user?.photoURL} />
          </Popover>
        </DesktopMenuItems>
      )}
      <Hamburger toggled={isOpen} toggle={handleToggle} />
    </>
  );
}
const Menu = ({ user }) => {
  return (
    <>
      {user && (
        <>
          <NextLink href="/sites" passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedbacks</Link>
          </NextLink>
        </>
      )}
      <NextLink href="/docs" passHref>
        <Link>Docs</Link>
      </NextLink>
      <NextLink href="/about" passHref>
        <Link>About</Link>
      </NextLink>
    </>
  );
};
