import { useAuth } from '@/lib/auth';
import { Table, Text, Popover, Toggle, Tag, Code } from '@geist-ui/core';
import { format, parseISO } from 'date-fns';
import { FBActionsArea, STActionsArea } from '../ActionsArea';
import { updateFeedback } from '@/lib/db';
import { mutate } from 'swr';

export function SitesDashboard({ sites }) {
  const createdAt = (rowData) => {
    return <Text>{format(parseISO(rowData), 'PPpp')}</Text>;
  };
  const ActionsArea = (rowData) => {
    return <STActionsArea siteId={rowData} />;
  };
  return (
    <Table data={sites}>
      <Table.Column prop="name" label="Name" />
      <Table.Column prop="url" label="Site Link" />
      <Table.Column prop="createdAt" label="Date Added" render={createdAt} />
      <Table.Column prop="id" render={ActionsArea} label="actions" />
    </Table>
  );
}
export function FeedbackDashboard({ feedback }) {
  const ActionsArea = (rowData) => {
    return <FBActionsArea feedbackId={rowData} />;
  };
  const auth = useAuth();
  const toggleButton = (rowData, rowIndex) => {
    const isChecked = rowData === 'active';
    const toggleFeedback = async () => {
      await updateFeedback(rowIndex.id, {
        status: isChecked ? 'pending' : 'active',
      });
      mutate(['/api/feedback', auth.user.token]);
    };
    const popOver = () => (
      <Text px={1} small>
        Approve this feedback?
      </Text>
    );
    const type = rowData === 'pending' ? 'warning' : 'success';
    return (
      <>
        {!(auth.user.uid !== rowIndex.siteAuthorId) ? (
          <Popover
            content={!isChecked && popOver}
            trigger="hover"
            placement="top"
          >
            {rowData === 'pending' && (
              <Toggle
                onChange={toggleFeedback}
                checked={isChecked}
                disabled={isChecked}
                mr={1}
              />
            )}
          </Popover>
        ) : null}
        <Tag type={type} invert>
          {rowData}
        </Tag>
      </>
    );
  };
  const renderRoute = (rowData) => {
    return <Code>{rowData}</Code>;
  };
  const renderAuthor = (rowData) => {
    return <Text b>{rowData}</Text>;
  };
  return (
    <Table data={feedback} emptyText="N/A">
      <Table.Column prop="author" label="author" render={renderAuthor} />
      <Table.Column prop="text" label="feedback" />
      <Table.Column prop="route" label="route" render={renderRoute} />
      <Table.Column
        prop="status"
        render={toggleButton}
        label="Feedback Status"
      />
      <Table.Column prop="id" render={ActionsArea} label="actions" />
    </Table>
  );
}
