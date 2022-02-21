import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import { withProtected } from '@/hooks/routes';

import DashboardShell from '@/components/Dashboard/DashboardShell';
import { FeedbackDashboard } from '@/components/Dashboard/DashboardTables';
import { FeedbackEmptyState } from '@/components/EmptyState';
import Layout from '@/components/Layout';
import { SkeletonTable } from '@/components/SkeletonElements/SkeletonTable';

import fetcher from '@/utils/fetcher';

function FeedbackPage() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
  return (
    <Layout>
      <DashboardShell pageName="Feedback">
        {!data ? (
          <SkeletonTable />
        ) : data.feedback?.length ? (
          <FeedbackDashboard feedback={data.feedback} />
        ) : (
          <FeedbackEmptyState />
        )}
      </DashboardShell>
    </Layout>
  );
}
export default withProtected(FeedbackPage);
