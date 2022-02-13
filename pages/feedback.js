import DashboardShell from '@/components/Dashboard/DashboardShell';
import { FeedbackDashboard } from '@/components/Dashboard/DashboardTables';
import { FeedbackEmptyState } from '@/components/EmptyState';
import Layout from '@/components/Layout';
import { SkeletonTable } from '@/components/SkeletonElements';
import { withProtected } from '@/hooks/routes';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { Display } from '@geist-ui/core';
import useSWR from 'swr';

function FeedbackPage() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
  return (
    <Layout>
      <DashboardShell pageName="Feedback">
        <Display shadow width="100%">
          {!data ? (
            <SkeletonTable />
          ) : data.feedback?.length ? (
            <FeedbackDashboard feedback={data.feedback} />
          ) : (
            <FeedbackEmptyState />
          )}
        </Display>
      </DashboardShell>
    </Layout>
  );
}
export default withProtected(FeedbackPage);
