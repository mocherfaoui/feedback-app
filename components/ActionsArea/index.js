import { useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Link,
  Modal,
  Snippet,
  Text,
  Tooltip,
  useToasts,
} from '@geist-ui/core';
import Trash from '@geist-ui/icons/trash';
import { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { deleteFeedback, deleteSiteAndFeedbacks } from '@/lib/db';

import { Flex } from '../GlobalComponents';

export function STActionsArea({ siteId, siteName }) {
  const [snippetModal, setSnippetModal] = useState(false);
  const closeSnippetModal = () => setSnippetModal(false);
  return (
    <Flex css={{ gap: '1rem', alignItems: 'center' }}>
      <NextLink href="/site/[siteId]" as={`/site/${siteId}`} passHref>
        <Link target="_blank" color icon underline block>
          View Feedbacks
        </Link>
      </NextLink>
      <Button type="secondary" ghost auto onClick={() => setSnippetModal(true)}>
        View Snippet
      </Button>
      <Modal
        visible={snippetModal}
        onClose={closeSnippetModal}
        width="min-content"
      >
        <Flex
          css={{
            position: 'absolute',
            right: '10px',
            top: '0',
            cursor: 'pointer',
          }}
          onClick={closeSnippetModal}
        >
          <Text span font="1.8rem">
            &times;
          </Text>
        </Flex>
        <Modal.Title>Snippet</Modal.Title>
        <Modal.Content>
          <Text>
            To implement feedback system for <b>{siteName}</b>, copy the snippet
            below and paste it anywhere in your website. Preferably after the
            content of the page.
          </Text>
          <Snippet
            symbol=""
            text={`https://feedback-app0.vercel.app/embed/${siteId}`}
            type="lite"
            toastText="Snippet copied to clipboard!"
          />
          <Text>
            If you want to make the snippet work for multiple routes, you can
            pass a unique slug, read more{' '}
            <NextLink href="/docs" passHref>
              <Link target="_blank" underline color icon>
                here.
              </Link>
            </NextLink>
          </Text>
        </Modal.Content>
      </Modal>
      <DeleteButton siteId={siteId} name="site" />
    </Flex>
  );
}
export function FBActionsArea({ feedbackId, rowIndex }) {
  return (
    <>
      <NextLink
        href={`/site/${rowIndex.siteId}#${feedbackId}`}
        as={`/site/${rowIndex.siteId}#${feedbackId}`}
        passHref
      >
        <Link
          color
          block
          mr="1rem"
          href={`/site/${rowIndex.siteId}`}
          target="_blank"
          icon
        >
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
