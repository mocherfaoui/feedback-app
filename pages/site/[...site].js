import { Card } from '@geist-ui/core';

import { Container } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

import EmbeddedPage from '../embed/[...site]';

export default function FeedbackPage() {
  return (
    <Layout>
      <Container css={{ marginTop: '1rem' }}>
        <Card>
          <EmbeddedPage feedbackPage />
        </Card>
      </Container>
    </Layout>
  );
}
