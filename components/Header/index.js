import {
  MenuLink,
  Navbar,
  MenuWrapper,
  DesktopMenuItems,
  MobileMenuItems,
} from './HeaderStyle';
import { Avatar, Link, Popover } from '@geist-ui/core';
import { Container, Flex } from '../GlobalComponents';
import NextLink from 'next/link';
import { useAuth } from '@/lib/auth';
import Settings from '@geist-ui/icons/settings';
import LogOut from '@geist-ui/icons/logOut';
import { Cross as Hamburger } from 'hamburger-react';
import { useState } from 'react';

export default function Header() {
  const { user, signout } = useAuth();
  const [isOpen, setOpen] = useState(false);

  return (
    <Navbar>
      <Container>
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <NavMenu isOpen={isOpen} setOpen={setOpen} />
        </Flex>
      </Container>
      <MenuWrapper>
        <MobileMenuItems isOpen={isOpen}>
          <Menu user={user} />
          {user && (
            <>
              <NextLink href="/user/settings" passHref>
                <MenuLink>Settings</MenuLink>
              </NextLink>
              <NextLink href="/">
                <MenuLink onClick={() => signout()}>Log Out</MenuLink>
              </NextLink>
            </>
          )}
        </MobileMenuItems>
      </MenuWrapper>
    </Navbar>
  );
}
function NavMenu({ isOpen, setOpen }) {
  const { user, signout } = useAuth();
  const content = () => (
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
      <NextLink href="/">
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
          <Popover content={content}>
            <Avatar src={user?.photoURL} />
          </Popover>
        </DesktopMenuItems>
      )}
      <Hamburger toggled={isOpen} toggle={setOpen} />
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
