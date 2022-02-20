import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Grid,
  Link,
  Rating,
  Spacer,
  Tabs,
  Text,
  useMediaQuery,
} from '@geist-ui/core';
import useSWR from 'swr';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

import { Feedback } from '@/components/Feedback';
import { Flex } from '@/components/GlobalComponents';
import LoginButtons from '@/components/LoginButtons';
import { MarkdownRender } from '@/components/MarkdownRender';
import SkeletonFeedback from '@/components/SkeletonElements/SkeletonFeedback';

import fetcher from '@/utils/fetcher';

export default function EmbeddedPage({ feedbackPage }) {
  const { user } = useAuth();
  const inputEl = useRef();
  const router = useRouter();
  const [, setLocked] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [replyInput, setReplyInput] = useState(null);
  const [markdownPreview, setMarkdownPreview] = useState(null);
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

  const isMobile = useMediaQuery('mobile');
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
              <style>{`
            .feedback-editor header .scroll-container{
              padding:0;
            }
            `}</style>
              <form onSubmit={addFeedback}>
                <Tabs hideDivider initialValue="1" className="feedback-editor">
                  <Tabs.Item label="Edit" value="1">
                    <TextareaAutosize
                      style={{
                        width: '100%',
                        resize: 'none',
                        border: 0,
                        margin: '1.8rem 0',
                        padding: 0,
                      }}
                      minRows={2}
                      onChange={(e) => setMarkdownPreview(e.target.value)}
                      defaultValue={markdownPreview}
                      ref={inputEl}
                      placeholder="write something..."
                    />
                  </Tabs.Item>
                  <Tabs.Item label="Preview" value="2">
                    <MarkdownRender source={markdownPreview} />
                  </Tabs.Item>
                </Tabs>

                <Flex css={{ justifyContent: 'end' }}>
                  <Text mb={1} b small>
                    <Link
                      icon
                      underline
                      href="https://commonmark.org/help/"
                      target="_blank"
                    >
                      Supports Markdown
                    </Link>
                  </Text>
                </Flex>
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
                      <Grid
                        ml={isMobile && 'auto'}
                        xs={13}
                        sm={5.5}
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
                      {!feedbackPage && (
                        <>
                          <Grid xs={0} sm={0.7}>
                            <Text span>&bull;</Text>
                          </Grid>
                          <Grid xs sm pt={isMobile && 1}>
                            <Text span ml={isMobile && 'auto'}>
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
                .user.w-100 .names{
                  gap:.3rem;
                }
                .img-display .caption{
                    margin-top:1rem;
                  }
                  .btn-dropdown details summary{
                    border:0;
                  }
                  .btn-dropdown details{
                    border-radius: 6px;
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
        </Card>
      )}
    </>
  );
}
