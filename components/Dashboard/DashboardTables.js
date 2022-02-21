import { Button, Code, Dot, Link, Popover, Table, Text } from '@geist-ui/core';
import Check from '@geist-ui/icons/check';
import { format, parseISO } from 'date-fns';
import { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { updateFeedbackStatus } from '@/lib/db';

import { FBActionsArea, STActionsArea } from '../ActionsArea';

export function SitesDashboard({ sites }) {
  const createdAt = (rowData) => {
    return <Text>{format(parseISO(rowData), 'PP p')}</Text>;
  };
  const ActionsArea = (rowData) => {
    return <STActionsArea siteId={rowData} />;
  };
  return (
    <>
      <style>{`
    .created_at-w100 .cell{
      width:max-content;
    }
    `}</style>
      <Table data={sites}>
        <Table.Column prop="name" label="Name" />
        <Table.Column prop="url" label="Site Link" />
        <Table.Column
          prop="createdAt"
          label="Date Added"
          render={createdAt}
          className="created_at-w100"
        />
        <Table.Column prop="id" render={ActionsArea} label="actions" />
      </Table>
    </>
  );
}
export function FeedbackDashboard({ feedback }) {
  const ActionsArea = (rowData, rowIndex) => {
    return <FBActionsArea feedbackId={rowData} rowIndex={rowIndex} />;
  };
  const auth = useAuth();
  const toggleButton = (rowData, rowIndex) => {
    const isChecked = rowData === 'active';
    const toggleFeedback = async () => {
      await updateFeedbackStatus(rowIndex.id, {
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
        <Dot type={type}>{rowData}</Dot>
        {!(auth.user.uid !== rowIndex.siteAuthorId) ? (
          <Popover
            content={!isChecked && popOver}
            trigger="hover"
            placement="top"
          >
            {rowData === 'pending' && (
              <Button
                type="success"
                onClick={toggleFeedback}
                ml={1}
                auto
                icon={<Check />}
              ></Button>
            )}
          </Popover>
        ) : null}
      </>
    );
  };
  const renderRoute = (rowData) => {
    return <Code>{rowData}</Code>;
  };
  const renderURL = (rowData) => {
    return <Text span>{rowData}</Text>;
  };
  const renderAuthor = (rowData) => {
    return <Text b>{rowData}</Text>;
  };
  return (
    <>
      <style>{`
    .no-wrap .cell{
      flex-flow:row nowrap!important;
    }
    `}</style>
      <Table data={feedback} emptyText="N/A">
        <Table.Column prop="author" label="author" render={renderAuthor} />
        <Table.Column prop="text" label="feedback" />
        <Table.Column prop="siteURL" label="site name" render={renderURL} />
        <Table.Column prop="route" label="route" render={renderRoute} />
        <Table.Column
          prop="status"
          render={toggleButton}
          label="Feedback Status"
        />
        <Table.Column
          prop="id"
          render={ActionsArea}
          label="actions"
          className="no-wrap"
        />
      </Table>
    </>
  );
}
