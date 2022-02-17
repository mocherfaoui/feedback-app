import { useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
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
  rating,
  authorId,
  siteAuthorId,
  id,
  mutate,
}) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
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
              className="w-100"
              src={avatar}
              name={
                <Flex css={{ display: 'flex', alignItems: 'center' }}>
                  {author}
                  {isAdmin && (
                    <Badge ml={0.4} font=".7rem">
                      Owner
                    </Badge>
                  )}
                  {rating && (
                    <>
                      <Text span px={0.5}>
                        &bull;
                      </Text>
                      <Text span style={{display:'flex',gap:'.3rem',alignItems:'center'}}>
                        {rating}/5 <AiFillStar size='1.3rem'/>
                      </Text>
                    </>
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
                  type="secondary"
                  small
                  title={updatedAt && format(parseISO(updatedAt), 'E, PPP p O')}
                >
                  {' '}
                  &bull; updated{' '}
                  {formatDistanceToNow(parseISO(updatedAt), {
                    addSuffix: true,
                  })}
                </Text>
              )}
            </User>
            {(isUser || superUser) && (
              <ButtonDropdown
                scale={2 / 3}
                auto
                icon={<MoreVertical />}
                style={{ height: 'max-content' }}
              >
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
