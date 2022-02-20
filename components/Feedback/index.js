import { useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  Text,
  User,
} from '@geist-ui/core';
import Edit2 from '@geist-ui/icons/edit2';
import MoreVertical from '@geist-ui/icons/moreVertical';
import Trash from '@geist-ui/icons/trash';
import { format, parseISO } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { useAuth } from '@/lib/auth';
import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/db';

import { Flex } from '../GlobalComponents';
import { MarkdownRender } from '../MarkdownRender';

export const Feedback = ({
  author,
  avatar,
  text,
  createdAt,
  updatedAt,
  rating,
  authorId,
  id,
  siteId,
  siteAuthorId,
  siteURL,
  route,
  mutate,
  replies,
  parentId = null,
  replyInput,
  setReplyInput,
}) => {
  const { user } = useAuth();
  const [editFeedback, setEditFeedback] = useState(false);
  const editInputEl = useRef();
  const replyEl = useRef();
  const isUser = user && user.uid === authorId;
  const isAdmin = authorId === siteAuthorId;
  const superUser = user && user.uid === siteAuthorId;
  const replyId = parentId ? parentId : id;
  const isReplying = replyInput && replyInput.id === id;
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');

  const onReply = async (e) => {
    e.preventDefault();
    const newReply = {
      siteId,
      siteAuthorId,
      route: route || '/',
      siteURL,
      author: user.name,
      authorId: user.uid,
      avatar: user.photoURL,
      text: replyEl.current.value,
      rating: null,
      createdAt: new Date().toISOString(),
      status:
        user.uid === siteAuthorId || siteId === 'ke1irGZRqUrgXa7eqAXL'
          ? 'active'
          : 'pending',
      parentId: replyId,
    };
    await createFeedback(newReply);
    newReply.status !== 'pending' ? await mutate() : null;
    setReplyInput(null);
  };
  const onDelete = async () => {
    await deleteFeedback(id);
    await mutate();
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const newValues = {
        text: editInputEl.current.value,
        updatedAt: new Date().toISOString(),
      };
      await updateFeedback(id, newValues);
      await mutate();
    } catch {
    } finally {
      setEditFeedback(false);
    }
  };
  return (
    <>
      <Card width="100%" mb={0} hoverable id={id} key={id}>
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
                      <Text
                        span
                        style={{
                          display: 'flex',
                          gap: '.3rem',
                          alignItems: 'center',
                        }}
                      >
                        <Text b font={0.9} my="auto" span>
                          {rating}/5
                        </Text>
                        <AiFillStar size="1.1rem" />
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
                  timeAgo.format(parseISO(createdAt), 'twitter-minute-now')}
              </Text>
              {updatedAt && (
                <Text
                  type="secondary"
                  small
                  title={updatedAt && format(parseISO(updatedAt), 'E, PPP p O')}
                >
                  {' '}
                  &bull; updated {timeAgo.format(parseISO(updatedAt))}
                </Text>
              )}
            </User>
            {(isUser || superUser) && (
              <ButtonDropdown
                scale={1 / 3}
                auto
                icon={<MoreVertical />}
                style={{ height: 'max-content' }}
                className="btn-dropdown"
              >
                {isUser && (
                  <ButtonDropdown.Item
                    type="warning"
                    onClick={() => setEditFeedback(true)}
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
          {editFeedback ? (
            <form onSubmit={onUpdate}>
              <TextareaAutosize
                style={{
                  width: '100%',
                  resize: 'none',
                  border: 0,
                  margin: '1.5rem 0',
                }}
                defaultValue={text}
                ref={editInputEl}
              />
              <Flex css={{ marginTop: '.5rem', gap: '.5rem' }}>
                <Button auto scale={2 / 3} type="warning" htmlType="submit">
                  Update
                </Button>
                <Button
                  auto
                  scale={2 / 3}
                  type="default"
                  onClick={() => setEditFeedback(false)}
                >
                  Cancel
                </Button>
              </Flex>
            </form>
          ) : (
            <>
              <MarkdownRender source={text} user={user} />
              {user && (
                <Flex>
                  <Button
                    mt={2}
                    type="secondary"
                    auto
                    scale={2 / 3}
                    onClick={() => setReplyInput({ id: id })}
                  >
                    Reply
                  </Button>
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Card>
      {isReplying && (
        <Card>
          <form onSubmit={onReply}>
            <TextareaAutosize
              style={{
                width: '100%',
                resize: 'none',
                border: 0,
              }}
              minRows={2}
              placeholder="your reply goes here..."
              ref={replyEl}
              defaultValue={`**@${author}** `}
            />
            <Flex
              css={{
                flexDirection: 'row-reverse',
                gap: '.5rem',
                paddingTop: '1rem',
              }}
            >
              <Button auto htmlType="submit" type="success" scale={2 / 3}>
                Post
              </Button>
              <Button
                auto
                type="default"
                scale={2 / 3}
                onClick={() => setReplyInput(null)}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </Card>
      )}
      {replies.length > 0 && (
        <Flex
          style={{ marginLeft: '2.5rem', flexDirection: 'column', gap: '1rem' }}
        >
          {replies.map((reply) => (
            <Feedback
              key={reply.id}
              replies={[]}
              {...reply}
              parentId={id}
              replyInput={replyInput}
              setReplyInput={setReplyInput}
              mutate={mutate}
            />
          ))}
        </Flex>
      )}
    </>
  );
};
