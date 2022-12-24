import { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { RiMedalLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import {
  Avatar,
  Button,
  Card,
  Popover,
  Text,
} from '@geist-ui/core';
import { Edit2, Trash } from '@geist-ui/icons';
import { format, parseISO } from 'date-fns';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { useAuth } from '@/lib/auth';
import { createFeedback, deleteFeedback, updateFeedback } from '@/lib/db';

import { styled } from '@/stitches.config';

import DropdownMenu from './DropdownMenu';
import Reactions from './Reactions';
import { Flex, VerticalLine } from '../GlobalComponents';
import LoginButtons from '../LoginButtons';
import { MarkdownRender } from '../MarkdownRender';

const FeedbackEditor = dynamic(() => import('../FeedbackEditor'), {
  ssr: false,
});

export const Feedback = ({
  author,
  authorId,
  parentId = null,
  avatar,
  text,
  createdAt,
  updatedAt,
  rating,
  id,
  siteId,
  siteAuthorId,
  siteURL,
  route,
  mutate,
  replies,
  replyInput,
  setReplyInput,
  isDeleted,
  likes,
  dislikes,
}) => {
  const { user } = useAuth();
  const [edit, setEdit] = useState({
    isEditing: false,
    editPreview: text,
  });
  const [markdownPreview, setMarkdownPreview] = useState(`**@${author}** `);
  const [visibleReplies, setVisibleReplies] = useState(false);
  const [postingReply, setPostingReply] = useState(false);
  const editInputEl = useRef();
  const replyEl = useRef();
  const isAuthor = user && user.uid === authorId;
  const ownerBadge = authorId === siteAuthorId;
  const isSiteAdmin = user && user.uid === siteAuthorId;
  const replyId = parentId ? parentId : id;
  const isReplying = replyInput && replyInput.id === id;
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');

  const onReply = async (e) => {
    e.preventDefault();
    setPostingReply(true);
    const newReply = {
      siteId,
      siteAuthorId,
      route: route || '/',
      siteURL,
      author: user.name,
      authorId: user.uid,
      avatar: user.photoURL,
      text: replyEl.current.value,
      rating: 0,
      likes: [],
      dislikes: [],
      createdAt: new Date().toISOString(),
      status:
        user.uid === siteAuthorId || siteId === 'ke1irGZRqUrgXa7eqAXL'
          ? 'active'
          : 'pending',
      parentId: replyId,
    };
    await createFeedback(newReply);
    newReply.status !== 'pending' &&
      (await mutate().then(() => setPostingReply(false)));
    setReplyInput(null);
    setVisibleReplies(true);
  };
  const onDelete = async () => {
    await deleteFeedback(id);
    await mutate();
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    const newValues = {
      text: editInputEl.current.value,
      updatedAt: new Date().toISOString(),
    };
    await updateFeedback(id, newValues);
    await mutate().then(() => setEdit({ ...edit, isEditing: false }));
  };

  const dropdownActions = [
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit2 size={15} />,
      color: 'secondary',
      onClick: () => setEdit({ ...edit, isEditing: true }),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash size={20} />,
      color: 'error',
      onClick: onDelete,
    },
  ];

  if (!isAuthor) {
    dropdownActions = dropdownActions.filter((action) => action.id !== 'edit');
  }

  return (
    <>
      <Flex css={{ gap: '.5rem', alignItems: 'baseline' }}>
        <Text span small>
          <Avatar width="30px" height="30px" src={avatar} />
        </Text>
        <Flex css={{ flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <Flex css={{ flexDirection: 'column' }} id={id}>
            <Card className="feedback-card" width="100%" mb={0} key={id}>
              <Flex css={{ flexDirection: 'column' }}>
                <Flex css={{ justifyContent: 'space-between' }}>
                  <Flex css={{ flexDirection: 'column', gap: '.1rem' }}>
                    <Flex css={{ display: 'flex', alignItems: 'center' }}>
                      <Text b font={0.8} span>
                        {author}
                      </Text>
                      {ownerBadge && (
                        <Popover
                          py={0.6}
                          style={{ display: 'inline-flex' }}
                          content={
                            <Text b font={0.7} px={0.3} span>
                              Owner
                            </Text>
                          }
                          placement="top"
                          hideArrow
                          trigger="hover"
                        >
                          <RiMedalLine
                            size={23}
                            style={{ paddingLeft: '.3rem' }}
                          />
                        </Popover>
                      )}
                      {!parentId && (
                        <>
                          <Text span type="secondary" font={0.5} px={0.4}>
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
                            <Text type="secondary" font={0.8} my="auto" span>
                              {rating !== 0
                                ? `${rating} ${rating > 1 ? 'stars' : 'star'}`
                                : 'No rating'}
                            </Text>
                          </Text>
                        </>
                      )}
                    </Flex>
                    <Flex
                      css={{
                        fontSize: '$xs',
                        alignItems: 'center',
                        gap: '$1',
                      }}
                    >
                      <Text
                        span
                        title={
                          createdAt && format(parseISO(createdAt), 'E, PPP p O')
                        }
                        type="secondary"
                      >
                        {createdAt &&
                          timeAgo.format(
                            parseISO(createdAt),
                            'twitter-minute-now'
                          )}
                      </Text>
                      {updatedAt && (
                        <>
                          <Text type="secondary" span font={0.4}>
                            &bull;
                          </Text>
                          <Text
                            span
                            type="secondary"
                            title={
                              updatedAt &&
                              format(parseISO(updatedAt), 'E, PPP p O')
                            }
                          >
                            updated {timeAgo.format(parseISO(updatedAt))}
                          </Text>
                        </>
                      )}
                    </Flex>
                  </Flex>
                  {((!isDeleted && isAuthor) || isSiteAdmin) && (
                    <DropdownMenu actions={dropdownActions} />
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
                    <Flex css={{ marginBottom: '.7rem', gap: '.5rem' }}>
                      <Button
                        auto
                        scale={2 / 3}
                        type="warning"
                        htmlType="submit"
                      >
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
                  <FeedbackContent>
                    <MarkdownRender source={text} user={user} />
                  </FeedbackContent>
                )}
              </Flex>
            </Card>
            {!edit.isEditing && (
              <Flex css={{ gap: '1rem', alignItems: 'center' }}>
                <Reactions
                  feedbackId={id}
                  mutateFeedback={mutate}
                  reactions={{ likes, dislikes }}
                />
                <VerticalLine />
                <Button
                  padding={0}
                  type="abort"
                  auto
                  scale={2 / 3}
                  onClick={() => {
                    if (replyInput) {
                      setReplyInput(null);
                    } else {
                      setReplyInput({ id: id });
                    }
                  }}
                >
                  Reply
                </Button>
                {replies?.length > 0 && !parentId && (
                  <Button
                    type="abort"
                    auto
                    scale={2 / 3}
                    padding={0}
                    onClick={() => setVisibleReplies((prev) => !prev)}
                  >
                    {visibleReplies
                      ? replies.length > 1
                        ? `Hide Replies(${replies.length})`
                        : 'Hide Reply'
                      : replies.length > 1
                      ? `View Replies(${replies.length})`
                      : 'View Reply'}
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
          {isReplying && (
            <>
              <style>
                {`
              .reply-card > div { 
                padding: .7rem .7rem 0 0 !important;
              }
              `}
              </style>
              <Card
                className="reply-card"
                style={{
                  borderColor: '#D7DBDF',
                }}
              >
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
                      marginBottom: '.7rem',
                    }}
                  >
                    {user ? (
                      <>
                        <Button
                          icon={<AiOutlineSend />}
                          iconRight
                          auto
                          htmlType="submit"
                          type="success"
                          scale={2 / 3}
                          loading={postingReply}
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
                      </>
                    ) : (
                      <LoginButtons
                        scale={2 / 3}
                        size={{ xs: 24, sm: 8, md: 8 }}
                        direction="row-reverse"
                      />
                    )}
                  </Flex>
                </form>
              </Card>
            </>
          )}
          {replies.length > 0 &&
            visibleReplies &&
            replies.map((reply) => (
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
      </Flex>
    </>
  );
};
const FeedbackContent = styled('div', {
  my: '1rem',
  overflowWrap: 'break-word',
  lineHeight: '1rem',
  maxWidth: '65ch',
  fontSize: '.95rem',
  lineHeight: 1.77,
  '& > :first-child': {
    marginTop: 0,
  },
  '& > :last-child': {
    marginBottom: 0,
  },
});
