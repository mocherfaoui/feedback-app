import { useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Grid,
  Link,
  Rating,
  Spacer,
  Text,
  Textarea,
  useMediaQuery,
} from '@geist-ui/core';
import useSWR from 'swr';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

import { Feedback } from '@/components/Feedback';
import { Flex } from '@/components/GlobalComponents';
import LoginButtons from '@/components/LoginButtons';
import SkeletonFeedback from '@/components/SkeletonElements/SkeletonFeedback';

import fetcher from '@/utils/fetcher';

export default function EmbeddedPage({ feedbackPage }) {
  const { user } = useAuth();
  const inputEl = useRef();
  const router = useRouter();
  const [, setLocked] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [replyInput, setReplyInput] = useState(null);
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

  const isXS = useMediaQuery('xs');
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
      text: inputEl.current.value.replace('\n', '\n\n'),
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
  if (!rootFeedbacks) {
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
        <Card>
          {
            <>
              <form onSubmit={addFeedback}>
                <Textarea
                  width="100%"
                  mb={1}
                  ref={inputEl}
                  placeholder="write something..."
                  disabled={!user}
                />
                {user ? (
                  <Flex css={{ alignItems: 'center' }}>
                    <Grid.Container direction="row" alignItems="center">
                      <Grid xs={9} sm={4}>
                        <Button
                          auto
                          scale={0.75}
                          htmlType="submit"
                          type="secondary"
                        >
                          Add Feedback
                        </Button>
                      </Grid>
                      <Grid xs={13} sm={5.5} font="1rem">
                        <Text span>Rate:</Text>
                        <Rating
                          ml={0.5}
                          value={ratingValue}
                          onLockedChange={setLocked}
                          onValueChange={setRatingValue}
                        />
                      </Grid>
                      {!feedbackPage && (
                        <>
                          <Grid xs={0} sm={0.7}>
                            <Text span>&bull;</Text>
                          </Grid>
                          <Grid xs sm pt={isXS && 1}>
                            <Text span ml={isXS && 'auto'}>
                              Logged-in as{' '}
                              <Link
                                underline
                                href="/user/settings"
                                target="_blank"
                              >
                                <Text b span>
                                  {user?.name}
                                </Text>
                              </Link>
                            </Text>
                          </Grid>
                        </>
                      )}
                    </Grid.Container>
                  </Flex>
                ) : (
                  <LoginButtons />
                )}
              </form>
              {rootFeedbacks?.length ? <Spacer /> : null}
            </>
          }
          {rootFeedbacks?.length ? (
            <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
              <style>{`
                .user.w-100 .names .name{
                  max-width:100%!important;
                }
                `}</style>
              {rootFeedbacks.map((_feedback) => (
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
        </Card>
      )}
    </>
  );
}
