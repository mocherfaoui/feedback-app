import { Feedback } from '@/components/Feedback';
import { Text, Card, Textarea, Button, Spacer, Link } from '@geist-ui/core';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import { Flex } from '@/components/GlobalComponents';
import LoginButtons from '@/components/LoginButtons';
import SkeletonFeedback from '@/components/SkeletonElements/SkeletonFeedback';
import { useAuth } from '@/lib/auth';
import { useRef } from 'react';
import { createFeedback } from '@/lib/db';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import Head from 'next/head';

export default function EmbeddedPage({ feedbackPage }) {
  const { user, loading } = useAuth();
  const inputEl = useRef();
  const router = useRouter();
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);
  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;
  const onSubmit = (e) => {
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
      createdAt: new Date().toISOString(),
      status: user.uid === site.authorId ? 'active' : 'pending',
    };
    inputEl.current.value = '';

    createFeedback(newFeedback);
    newFeedback.status !== 'pending' &&
      mutate(
        feedbackApi,
        async (data) => ({
          feedback: [newFeedback, ...data.feedback],
        }),
        false
      );
  };
  if (!allFeedback) {
    return <SkeletonFeedback />;
  }
  console.log(site?.length);
  return (
    <>
      <Head>
        <title>
          {site?.length!==0 ? site && site.name + ' Feedbacks' : '404 Not Found'}
        </title>
      </Head>
      {site?.length===0 ? (
        <Text h3>This website was not found. Please reverify the ID.</Text>
      ) : (
        <Card>
          {
            <>
              <form onSubmit={onSubmit}>
                <Textarea
                  width="100%"
                  mb={1}
                  ref={inputEl}
                  placeholder="write something..."
                  disabled={!user}
                />
                {user ? (
                  <Flex css={{ alignItems: 'center' }}>
                    <Button scale={0.75} htmlType="submit" type="secondary">
                      Add Feedback
                    </Button>
                    {!feedbackPage && (
                      <Text span ml={1}>
                        Logged-in as{' '}
                        <Link underline href="/user/settings" target="_blank">
                          {user?.name}
                        </Link>
                      </Text>
                    )}
                  </Flex>
                ) : (
                  <LoginButtons />
                )}
              </form>
              {allFeedback?.length ? <Spacer /> : null}
            </>
          }
          {allFeedback?.length ? (
            <Flex css={{ flexDirection: 'column', gap: '1rem' }}>
              {allFeedback.map((_feedback) => (
                <Feedback
                  key={_feedback.id}
                  {..._feedback}
                  feedbackApi={feedbackApi}
                />
              ))}
            </Flex>
          ) : (
            <Text h5 margin={0} mt={1} style={{ textAlign: 'center' }}>
              There are no feedbacks for this website.
              <br />
              Be the first to add one!
            </Text>
          )}
        </Card>
      )}
    </>
  );
}
