import { Link, Text } from '@geist-ui/core';
import { Container, Flex } from '../GlobalComponents';
import { FooterContainer } from './FooterStyles';

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Flex css={{justifyContent:'center'}}>
          <Link underline href="/newissue" target="_blank" style={{ textAlign: 'center' }}>
            <Text b>If you came across any bug click here to open an issue.</Text>
          </Link>
        </Flex>
      </Container>
    </FooterContainer>
  );
}
