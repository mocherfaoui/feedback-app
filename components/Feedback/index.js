import { useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { HiReply } from 'react-icons/hi';
import { RiMedalLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  Popover,
  Text,
  User,
} from '@geist-ui/core';
import { Edit2, MoreVertical, Send, Trash } from '@geist-ui/icons';
import { format, parseISO } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { useAuth } from '@/lib/auth';
import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/db';

import { Flex } from '../GlobalComponents';
import { MarkdownRender } from '../MarkdownRender';

const FeedbackEditor = dynamic(() => import('../FeedbackEditor'));

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
  const [edit, setEdit] = useState({
    isEditing: false,
    editPreview: text,
  });
  const [markdownPreview, setMarkdownPreview] = useState(`**@${author}** `);
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
      setEdit({ ...edit, isEditing: false });
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
                  <Text font={.9} span>{author}</Text>
                  {isAdmin && (
                    <Popover
                      content={
                        <Text b small px={.3} span>
                          Owner
                        </Text>
                      }
                      placement='top'
                      hideArrow
                      trigger="hover"
                    >
                      <Text span margin={0} pl={0.3} font={1.2}>
                        <RiMedalLine />
                      </Text>
                    </Popover>
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
                    onClick={() => setEdit({ ...edit, isEditing: true })}
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
          {edit.isEditing ? (
            <form onSubmit={onUpdate}>
              <FeedbackEditor
                onChange={(e) =>
                  setEdit({ ...edit, editPreview: e.target.value })
                }
                defaultValue={edit.editPreview}
                inputRef={editInputEl}
                previewSource={edit.editPreview}
              />
              <Flex css={{ marginTop: '.5rem', gap: '.5rem' }}>
                <Button auto scale={2 / 3} type="warning" htmlType="submit">
                  Update
                </Button>
                <Button
                  auto
                  scale={2 / 3}
                  type="abort"
                  onClick={() => setEdit({ ...edit, isEditing: false })}
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
                    icon={<HiReply />}
                    type="default"
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
            <FeedbackEditor
              onChange={(e) => setMarkdownPreview(e.target.value)}
              inputRef={replyEl}
              placeholder="your reply goes here..."
              defaultValue={markdownPreview}
              previewSource={markdownPreview}
            />
            <Flex
              css={{
                flexDirection: 'row-reverse',
                gap: '.5rem',
              }}
            >
              <Button
                icon={<Send />}
                iconRight
                auto
                htmlType="submit"
                type="success"
                scale={2 / 3}
              >
                Post
              </Button>
              <Button
                auto
                type="abort"
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
          style={{ marginLeft: '1.7rem', flexDirection: 'column', gap: '1rem' }}
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
