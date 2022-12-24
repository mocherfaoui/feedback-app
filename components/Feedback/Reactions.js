import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { Button, Popover } from '@geist-ui/core';
import { styled } from '@stitches/react';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';

import { Flex } from '../GlobalComponents';
import LoginButtons from '../LoginButtons';

const findUser = (reactions, userId) => {
  return reactions?.find((reaction) => reaction === userId);
};

export default function Reactions({ feedbackId, mutateFeedback, reactions }) {
  const { user } = useAuth();

  const doReaction = async (reactionType) => {
    switch (true) {
      case !!findUser(reactions[reactionType], user.uid):
        await updateFeedback(feedbackId, {
          [reactionType]: arrayRemove(user.uid),
        });
        await mutateFeedback();
        break;
      case !!findUser(
        reactions[reactionType === 'likes' ? 'dislikes' : 'likes'],
        user.uid
      ):
        await updateFeedback(feedbackId, {
          [reactionType === 'likes' ? 'dislikes' : 'likes']: arrayRemove(
            user.uid
          ),
        });
        await updateFeedback(feedbackId, {
          [reactionType]: arrayUnion(user.uid),
        });
        await mutateFeedback();
        break;
      default:
        await updateFeedback(feedbackId, {
          [reactionType]: arrayUnion(user.uid),
        });
        await mutateFeedback();
        break;
    }
  };

  const handleLike = async () => {
    if (!user) return;
    await doReaction('likes');
  };
  const handleDislike = async () => {
    if (!user) return;
    await doReaction('dislikes');
  };

  return (
    <Flex>
      <Flex css={{ gap: '.5em' }}>
        <WrapReactionButton>
          <ReactionContainer>
            <Button
              iconRight={
                findUser(reactions?.likes, user?.uid) ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike />
                )
              }
              auto
              padding={0}
              type="abort"
              onClick={handleLike}
            />
            <Counter>{reactions.likes?.length ?? 0}</Counter>
          </ReactionContainer>
        </WrapReactionButton>
        <WrapReactionButton>
          <ReactionContainer>
            <Button
              iconRight={
                findUser(reactions?.dislikes, user?.uid) ? (
                  <AiFillDislike />
                ) : (
                  <AiOutlineDislike />
                )
              }
              auto
              padding={0}
              type="abort"
              onClick={handleDislike}
            />
            <Counter>{reactions.dislikes?.length ?? 0}</Counter>
          </ReactionContainer>
        </WrapReactionButton>
      </Flex>
    </Flex>
  );
}

const WrapReactionButton = ({ children }) => {
  const { user } = useAuth();
  const popOverContent = () => (
    <Popover.Item>
      <LoginButtons
        scale={2 / 3}
        size={{ md: 24, sm: 24 }}
        direction="column"
        hideIcon
      />
    </Popover.Item>
  );
  return user ? (
    <>{children}</>
  ) : (
    <Popover content={popOverContent} placement="topStart">
      {children}
    </Popover>
  );
};

const Counter = styled('span', {
  fontSize: '.7rem',
  color: '$gray800',
  minWidth: '.8em',
});
const ReactionContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '.2em',
});
