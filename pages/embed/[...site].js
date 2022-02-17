import { useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, Link,Spacer, Text, Textarea } from '@geist-ui/core';
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
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData, mutate } = useSWR(feedbackApi, fetcher);
  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;
  const onSubmit = async (e) => {
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
      status:
        user.uid === site.authorId || siteId === 'ke1irGZRqUrgXa7eqAXL'
          ? 'active'
          : 'pending',
    };
    inputEl.current.value = '';

    await createFeedback(newFeedback);
    newFeedback.status !== 'pending' && await mutate();
  };
  if (!allFeedback) {
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
                          <Text b span>
                            {user?.name}
                          </Text>
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
                  mutate={mutate}
                />
              ))}
            </Flex>
          ) : (
            <Text h5 margin={0} mt={2} style={{ textAlign: 'center' }}>
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
