import Layout from '@/components/Layout';
import { Container } from '@/components/GlobalComponents';
import EmbeddedPage from '../embed/[...site]';

export default function FeedbackPage() {
  return (
    <Layout>
      <Container css={{marginTop:'1rem'}}>
        <EmbeddedPage feedbackPage/>
      </Container>
    </Layout>
  );
}
