import NextLink from 'next/link';
import { Button, Link, Snippet, Tooltip, useToasts } from '@geist-ui/core';
import Trash from '@geist-ui/icons/trash';
import { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { deleteFeedback, deleteSiteAndFeedbacks } from '@/lib/db';

import { Flex } from '../GlobalComponents';

export function STActionsArea({ siteId }) {
  return (
    <Flex css={{ gap: '1rem', alignItems: 'center' }}>
      <NextLink href="/site/[siteId]" as={`/site/${siteId}`} passHref>
        <Link target="_blank" color icon underline block>
          View Feedbacks
        </Link>
      </NextLink>
      <Snippet
        symbol=""
        text={`${siteId}`}
        type="lite"
        toastText="Site ID copied to clipboard!"
      />
      <DeleteButton siteId={siteId} name="site" />
    </Flex>
  );
}
export function FBActionsArea({ feedbackId, rowIndex }) {
  return (
    <>
      <NextLink
        href="/site/[rowIndex.siteId]#[feedbackId]"
        as={`/site/${rowIndex.siteId}#${feedbackId}`}
        passHref
      >
        <Link color block mr="1rem" padding=".5rem" target="_blank" icon>
          View Feedback
        </Link>
      </NextLink>
      <DeleteButton feedbackId={feedbackId} name="feedback" />
    </>
  );
}
function DeleteButton({ siteId, feedbackId, name }) {
  const auth = useAuth();
  const path = siteId ? 'sites' : feedbackId ? 'feedback' : null;
  const id = siteId ? siteId : feedbackId ? feedbackId : null;
  const { setToast } = useToasts();
  const onDelete = () => {
    if (path === 'sites') {
      deleteSiteAndFeedbacks(id);
    } else {
      deleteFeedback(id);
    }
    mutate(
      [`/api/${path}`, auth.user.token],
      async (data) => {
        return siteId
          ? { sites: data.sites.filter((site) => site.id !== siteId) }
          : {
              feedback: data.feedback.filter(
                (feedback) => feedback.id !== feedbackId
              ),
            };
      },
      false
    );
    setToast({
      text: `The ${name} was removed successfully!`,
      type: 'error',
    });
  };
  return (
    <>
      <Tooltip text={`Delete ${name}?`} hideArrow placement="top">
        <Button auto type="error" icon={<Trash />} onClick={onDelete}></Button>
      </Tooltip>
    </>
  );
}
