import Head from 'next/head';
import { Code, Link, Note,Text } from '@geist-ui/core';

import { Container } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

export default function DocsPage() {
  return (
    <Layout>
      <Head>
        <title>Documentation</title>
      </Head>
      <Container css={{ paddingTop: '2rem' }}>
        <Text h3>Getting Started</Text>
        <Text p>
          To get started adding feedback to your site, get the site ID from the
          sites dashboard and insert this iframe anywhere in your code:
          <Code
            block
          >{`<iframe src="https://feedback-app0.vercel.app/embed/SITE_ID" />`}</Code>
        </Text>
        <Text h3>Multiple Routes</Text>
        <Text p>
          If you want to add feedback to multiple routes in a single site,
          forward a unique slug for that route.
          <Code
            block
          >{`<iframe src="https://feedback-app0.vercel.app/embed/SITE_ID/ROUTE" />`}</Code>
          This is recommended if you want to add it to a blogpost or product
          page.
        </Text>
        <Text h3>Automatic Resizing</Text>
        <Text p>
          When embedding your feedback iframe, you might want it to
          automatically resize the height to its contents. This can be achieved
          using{' '}
          <Link
            href="https://github.com/davidjbradshaw/iframe-resizer"
            target="_blank"
            underline
            color
          >
            iframe-resizer
          </Link>
          . For example, if you are using React, you can add{' '}
          <Link
            href="https://github.com/davidjbradshaw/iframe-resizer-react"
            target="_blank"
            underline
            color
          >
            iframe-resizer-react
          </Link>{' '}
          and do something like this. This library is{' '}
          <Link
            href="https://bundlephobia.com/result?p=iframe-resizer-react@1.0.4"
            target="_blank"
            underline
            color
          >
            5.8kB
          </Link>{' '}
          minified + gzipped with no dependencies.
          <Code block>
            {`<IframeResizer
              checkOrigin={false}
              title="Comments"
              src={'https://feedback-app0.vercel.app/embed/SITE_ID'}
              style={{
                width: '1px',
                minWidth: '100%',
              }}
            />`}
          </Code>
        </Text>
        <Text h3>API</Text>
        <Text p>
          If you'd like to completely customize the look of your feedback, you
          can use our API. Simply make a <Code>GET</Code> request to{' '}
          <Code>/api/feedback/SITE_ID</Code>. Here's an example using React and{' '}
          <Link href="https://swr.vercel.app/" target="_blank" underline color>
            SWR
          </Link>
          .
          <Code block>{`import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Feedback () {
  const API = 'https://feedback-app0.vercel.app/api/feedback/SITE_ID';
  const { data, error } = useSWR(API, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return {data.feedback.map(feedback => (
      <p>{feedback.author}</p>
      <p>{feedback.createdAt}</p>
      <p>{feedback.text}</p>
  ))}
}`}</Code>
        </Text>
        <Note>
          By using the API instead of the embed you'll lose the ability to add a
          feedback directly from your website.
        </Note>
      </Container>
    </Layout>
  );
}
