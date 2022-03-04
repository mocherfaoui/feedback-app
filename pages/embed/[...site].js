import { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  Card,
  Grid,
  Rating,
  Text,
  useMediaQuery,
} from '@geist-ui/core';
import Plus from '@geist-ui/icons/plus';
import useSWR from 'swr';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

import { Feedback } from '@/components/Feedback';
import { Flex } from '@/components/GlobalComponents';
import LoginButtons from '@/components/LoginButtons';
import SkeletonFeedback from '@/components/SkeletonElements/SkeletonFeedback';

import fetcher from '@/utils/fetcher';

const FeedbackEditor = dynamic(() => import('../../components/FeedbackEditor'), {
  ssr: false,
});

export default function EmbeddedPage({ feedbackPage }) {
  const { user } = useAuth();
  const inputEl = useRef();
  const router = useRouter();
  const [feedbackInput, setFeedbackInput] = useState(false);
  const [, setLocked] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [replyInput, setReplyInput] = useState(null);
  const [markdownPreview, setMarkdownPreview] = useState(null);
  const isMobile = useMediaQuery('mobile');
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData, mutate } = useSWR(feedbackApi, fetcher);
  const site = siteData?.site;
  const rootFeedbacks = feedbackData?.feedback.filter(
    (feedback) => feedback.parentId === null
  );
  const getReplies = (feeddbackId) =>
    feedbackData?.feedback
      .filter((feedback) => feedback.parentId === feeddbackId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addFeedback = async (e) => {
    e.preventDefault();
    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || '/',
      siteURL: site.url,
      author: user.name,
      authorId: user.uid,
      avatar: user.photoURL,
      text: inputEl.current.value,
      rating: ratingValue,
      createdAt: new Date().toISOString(),
      status:
        user.uid === site.authorId || siteId === 'ke1irGZRqUrgXa7eqAXL'
          ? 'active'
          : 'pending',
      parentId: null,
    };
    inputEl.current.value = '';
    setRatingValue(null);
    await createFeedback(newFeedback);
    newFeedback.status !== 'pending' && (await mutate());
  };
  if (!feedbackData) {
    return <SkeletonFeedback />;
  }
  return (
    <>
      <Head>
        <title>
          {site?.length !== 0
            ? site && site.name + ' Feedbacks'
            : '404 Not Found'}
        </title>
      </Head>
      {site?.length === 0 ? (
        <Text h3>This website was not found. Please reverify the ID.</Text>
      ) : (
        <>
          <Card mb={1}>
            <Flex
              css={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text span b>
                Feedbacks({rootFeedbacks?.length})
              </Text>
              <Grid.Container gap={1} alignItems="center">
                <Grid xs sm={4.5} ml="auto">
                  <Button
                    ml="auto"
                    scale={2 / 3}
                    icon={<Plus />}
                    iconRight
                    type="default"
                    ghost
                    auto
                    onClick={() => setFeedbackInput((prev) => !prev)}
                  >
                    Add Feedback
                  </Button>
                </Grid>
                {user && !feedbackPage && (
                  <Grid xs={3.8} sm={2}>
                    <Avatar
                      ml="auto"
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open('/user/settings')}
                      src={user?.photoURL}
                    />
                  </Grid>
                )}
              </Grid.Container>
            </Flex>
          </Card>
          <>
            <style>{`
            .feedback-editor header .scroll-container{
              padding:0;
              }
              .feedback-editor .content textarea:focus + .textarea_footer{
                border-bottom:1px solid;
                transition: .3s ease-in-out all;
              }
              .feedback-editor > .content{
                padding:1rem 0;
              }
            `}</style>
            {feedbackInput && (
              <Card mb={1}>
                <form onSubmit={addFeedback}>
                  <FeedbackEditor
                    onChange={(e) => setMarkdownPreview(e.target.value)}
                    inputRef={inputEl}
                    defaultValue={markdownPreview}
                    placeholder="write something..."
                    previewSource={markdownPreview}
                  />
                  {user ? (
                    <Flex css={{ alignItems: 'center' }}>
                      <Grid.Container
                        direction="row-reverse"
                        alignItems="center"
                        justify="flex-start"
                      >
                        <Grid xs sm={4.5} justify="flex-end">
                          <Grid xs={0} sm>
                            <Button
                              auto
                              scale={0.75}
                              type="abort"
                              onClick={() => setFeedbackInput(false)}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid xs sm>
                            <Button
                              ml={isMobile && 'auto'}
                              icon={<AiOutlineSend />}
                              iconRight
                              auto
                              scale={0.75}
                              htmlType="submit"
                              type="success"
                            >
                              Post
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid
                          ml="auto"
                          xs={13.5}
                          sm={5.5}
                          mr={isMobile && 'auto'}
                          font="1rem"
                        >
                          <Text span>Rate:</Text>
                          <Rating
                            ml={0.5}
                            value={ratingValue}
                            onLockedChange={setLocked}
                            onValueChange={setRatingValue}
                          />
                        </Grid>
                      </Grid.Container>
                    </Flex>
                  ) : (
                    <LoginButtons />
                  )}
                </form>
              </Card>
            )}
          </>
          {rootFeedbacks?.length ? (
            <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
              <style>{`
                .img-display .caption{
                    margin-top:1rem;
                  }
                  .btn-dropdown details summary{
                    border:0;
                  }
                  .btn-dropdown details{
                    border-radius: 6px;
                  }
                  .feedback-card > div{
                    padding:.7rem .7rem 0 !important;
                  }
                `}</style>
              {site &&
                rootFeedbacks.map((_feedback) => (
                  <Feedback
                    key={_feedback.id}
                    {..._feedback}
                    feedbackApi={feedbackApi}
                    mutate={mutate}
                    replies={getReplies(_feedback.id)}
                    route={route}
                    siteId={siteId}
                    siteAuthorId={site.authorId}
                    siteURL={site.url}
                    replyInput={replyInput}
                    setReplyInput={setReplyInput}
                  />
                ))}
            </Flex>
          ) : (
            <Text h5 margin={0} mt={2} style={{ textAlign: 'center' }}>
              There are no feedbacks to show.
              <br />
              Be the first to add one!
            </Text>
          )}
        </>
      )}
    </>
  );
}
