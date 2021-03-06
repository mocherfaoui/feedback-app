import { Link, Text } from '@geist-ui/core';

import { FooterContainer } from './FooterStyles';
import { Container, Flex } from '../GlobalComponents';

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Flex css={{ justifyContent: 'center' }}>
          <Link
            underline
            icon
            href="/newissue"
            target="_blank"
            style={{ textAlign: 'center' }}
          >
            <Text b>
              If you came across any problem click here to open an issue.
            </Text>
          </Link>
        </Flex>
      </Container>
    </FooterContainer>
  );
}
