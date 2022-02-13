import { Badge, Button, Card, Text, Tooltip, User } from '@geist-ui/core';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { Flex } from '../GlobalComponents';
import Trash from '@geist-ui/icons/trash';
import { useAuth } from '@/lib/auth';
import { deleteFeedbackorSite } from '@/lib/db';
import { mutate } from 'swr';

export const Feedback = ({
  author,
  avatar,
  text,
  createdAt,
  isLast,
  authorId,
  siteAuthorId,
  id,
  feedbackApi,
}) => {
  const { user } = useAuth();
  const isUser = user && user.uid === authorId;
  const isAdmin = authorId === siteAuthorId;
  const superUser = user && user.uid === siteAuthorId;
  const onDelete = () => {
    deleteFeedbackorSite(id,'feedback');
    mutate(
      `${feedbackApi}`,
      async (data) => {
        return {
          feedback: data.feedback.filter((feedback) => feedback.id !== id),
        };
      },
      false
    );
  };
  return (
    <>
      <style>
        {`
      #feedback_del-btn-${id}{
        opacity:0;
      }
      #comment_card-${id}:hover #feedback_del-btn-${id}{
        opacity:1;
        transition: opacity 0.5s 0s ease;
      }
      `}
      </style>
      <Card mb={0} hoverable id={`comment_card-${id}`}>
        <Flex css={{ flexDirection: 'column' }}>
          <Flex>
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
            </User>
            {(isUser || superUser) && (
              <Tooltip
                style={{ marginLeft: 'auto' }}
                text="Delete Feedback?"
                hideArrow
                placement="topEnd"
              >
                <Button
                  id={`feedback_del-btn-${id}`}
                  scale={0.75}
                  auto
                  type="error"
                  icon={<Trash />}
                  onClick={onDelete}
                ></Button>
              </Tooltip>
            )}
          </Flex>
          <Text p mb={0}>
            {text}
          </Text>
        </Flex>
      </Card>
    </>
  );
};
