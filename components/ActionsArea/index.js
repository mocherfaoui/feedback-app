import { useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Link,
  Modal,
  Snippet,
  Text,
  Tooltip,
  useTheme,
  useToasts,
} from '@geist-ui/core';
import { Code, MoreVertical } from '@geist-ui/icons';
import Trash from '@geist-ui/icons/trash';
import { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { deleteFeedback, deleteSiteAndFeedbacks } from '@/lib/db';

import DropdownMenu from '../Feedback/DropdownMenu';
import { Flex } from '../GlobalComponents';

export function STActionsArea({ siteId, siteName }) {
  const [snippetModal, setSnippetModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const closeDeleteModal = () => setDeleteModal(false);
  const closeSnippetModal = () => setSnippetModal(false);

  const dropdownActions = [
    {
      id: 'view-snippet',
      label: 'View Snippet',
      icon: <Code size={15} />,
      color: 'secondary',
      onClick: () => setSnippetModal(true),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash size={20} />,
      color: 'error',
      onClick: () => setDeleteModal(true),
    },
  ];

  return (
    <>
      <Flex>
        <Button
          onClick={() => window.open(`/site/${siteId}`)}
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          type=""
        >
          View Feedbacks
        </Button>
        <DropdownMenu
          trigger={<Trigger />}
          actions={dropdownActions}
          dropdownOffset={4}
        />
      </Flex>
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
      <DeleteModal
        id={siteId}
        type="site"
        visible={deleteModal}
        onClose={closeDeleteModal}
      />
    </>
  );
}

const Trigger = () => (
  <Button
    auto
    icon={<MoreVertical size={15} />}
    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
  />
);

export function FBActionsArea({ feedbackId, rowIndex }) {
  const [deleteModal, setDeleteModal] = useState(false);

  const closeDeleteModal = () => setDeleteModal(false);

  return (
    <>
      <Flex>
        <Button
          onClick={() => window.open(`/site/${rowIndex.siteId}`)}
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          type=""
        >
          View Feedback
        </Button>
        <Button
          type="error"
          icon={<Trash />}
          auto
          ghost
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={() => setDeleteModal(true)}
        />
      </Flex>
      <DeleteModal
        id={feedbackId}
        type="feedback"
        visible={deleteModal}
        onClose={closeDeleteModal}
      />
    </>
  );
}
function DeleteModal({ id, type, visible, onClose }) {
  const auth = useAuth();
  const { palette } = useTheme();
  const isSite = type === 'site';
  const path = isSite ? 'sites' : 'feedback';
  const { setToast } = useToasts();
  const onDelete = () => {
    if (isSite) {
      deleteSiteAndFeedbacks(id);
    } else {
      deleteFeedback(id);
    }
    mutate(
      [`/api/${path}`, auth.user.token],
      async (data) => {
        return isSite
          ? { sites: data.sites.filter((site) => site.id !== id) }
          : {
              feedback: data.feedback.filter((feedback) => feedback.id !== id),
            };
      },
      false
    );
    onClose();
    setToast({
      text: `The ${type} was removed successfully!`,
      type: 'error',
    });
  };
  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Delete {type}</Modal.Title>
      <Modal.Content>
        <Text style={{ textAlign: 'center' }}>
          Are you sure you want to delete this {type}?
        </Text>
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action
        onClick={onDelete}
        style={{ background: palette.error, color: '#fff' }}
      >
        Delete
      </Modal.Action>
    </Modal>
  );
}
