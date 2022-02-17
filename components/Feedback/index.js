import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  Text,
  Textarea,
  User,
} from '@geist-ui/core';
import Edit2 from '@geist-ui/icons/edit2';
import MoreVertical from '@geist-ui/icons/moreVertical';
import Trash from '@geist-ui/icons/trash';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

import { useAuth } from '@/lib/auth';
import { deleteFeedback, updateFeedback } from '@/lib/db';

import { Flex } from '../GlobalComponents';

export const Feedback = ({
  author,
  avatar,
  text,
  createdAt,
  updatedAt,
  authorId,
  siteAuthorId,
  id,
  feedbackApi,
  mutate,
}) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputEl = useRef();
  const isUser = user && user.uid === authorId;
  const isAdmin = authorId === siteAuthorId;
  const superUser = user && user.uid === siteAuthorId;
  const onDelete = async () => {
    await deleteFeedback(id);
    await mutate();
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const newValues = {
        text: inputEl.current.value.replace('\n', '\n\n'),
        updatedAt: new Date().toISOString(),
      };
      await updateFeedback(id, newValues);
      await mutate();
    } catch {
    } finally {
      setVisible(false);
    }
  };
  return (
    <>
      <Card mb={0} hoverable id={id} key={id}>
        <Flex css={{ flexDirection: 'column' }}>
          <Flex css={{ justifyContent: 'space-between' }}>
            <User
              src={avatar}
              name={
                <Flex css={{ display: 'flex', alignItems: 'center' }}>
                  {author}
                  {isAdmin && (
                    <Badge ml={0.4} font=".7rem">
                      Owner
                    </Badge>
                  )}
                </Flex>
              }
              px={0}
            >
              <Text
                title={createdAt && format(parseISO(createdAt), 'E, PPP p O')}
                small
                type="secondary"
              >
                {createdAt &&
                  formatDistanceToNow(parseISO(createdAt), { addSuffix: true })}
              </Text>
              {updatedAt && (
                <Text
                  small
                  title={updatedAt && format(parseISO(updatedAt), 'E, PPP p O')}
                >
                  {' '}&bull; updated {' '}
                  {formatDistanceToNow(parseISO(createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              )}
            </User>
            {(isUser || superUser) && (
              <ButtonDropdown scale={2 / 3} auto icon={<MoreVertical />}>
                {isUser && (
                  <ButtonDropdown.Item
                    type="warning"
                    onClick={() => setVisible(true)}
                  >
                    <Edit2 size={15} />
                  </ButtonDropdown.Item>
                )}
                <ButtonDropdown.Item type="error" onClick={onDelete}>
                  <Trash size={15} />
                </ButtonDropdown.Item>
              </ButtonDropdown>
            )}
          </Flex>
          {visible ? (
            <form onSubmit={onUpdate}>
              <Textarea width="100%" initialValue={text} mt={1} ref={inputEl} />
              <Flex css={{ marginTop: '1rem', gap: '1rem' }}>
                <Button type="warning" htmlType="submit">
                  Update
                </Button>
                <Button type="default" onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </Flex>
            </form>
          ) : (
            <Text p mb={0}>
              {text}
            </Text>
          )}
        </Flex>
      </Card>
    </>
  );
};
