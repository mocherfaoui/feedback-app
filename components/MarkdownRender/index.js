/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown';
import {
  Code,
  Display,
  Divider,
  Image,
  Link,
  Spacer,
  Text,
} from '@geist-ui/core';
import remarkGfm from 'remark-gfm';

const MDXComponents = {
  h1: ({ node, ...props }) => (
    <Text h1 {...props}>
      {props.children}
    </Text>
  ),
  h2: ({ node, ...props }) => (
    <Text h2 {...props}>
      {props.children}
    </Text>
  ),
  h3: ({ node, ...props }) => (
    <Text h3 {...props}>
      {props.children}
    </Text>
  ),
  h4: ({ node, ...props }) => (
    <Text h4 {...props}>
      {props.children}
    </Text>
  ),
  p: ({ node, ...props }) => <Text font={.9} {...props}>{props.children}</Text>,
  em: ({ node, ...props }) => (
    <Text em {...props}>
      {props.children}
    </Text>
  ),
  hr: ({ node, ...props }) => <Divider {...props} />,
  b: ({ node, ...props }) => (
    <Text b {...props}>
      {props.children}
    </Text>
  ),
  del: ({ node, ...props }) => (
    <Text del {...props}>
      {props.children}
    </Text>
  ),
  blockquote: ({ node, ...props }) => (
    <Text blockquote {...props}>
      {props.children}
    </Text>
  ),
  a: ({ node, ...props }) => (
    <Link color underline icon href={props.href} target="_blank" {...props}>
      {props.children}
    </Link>
  ),
  image: ({ node, ...props }) => (
    <Display margin={0} shadow caption={props.alt} className="img-display">
      <Image height="200px" alt={props.alt} src={props.src} {...props} />
    </Display>
  ),
  code: ({ node, inline, ...props }) =>
    inline ? (
      <Code {...props}>{props.children}</Code>
    ) : (
      <Code block {...props}>
        {props.children}
      </Code>
    ),
};
export function MarkdownRender({ source }) {
  return (
    <ReactMarkdown
      children={source}
      components={{
        h1: MDXComponents.h1,
        h2: MDXComponents.h2,
        h3: MDXComponents.h3,
        p: MDXComponents.p,
        b: MDXComponents.b,
        em: MDXComponents.em,
        blockquote: MDXComponents.blockquote,
        a: MDXComponents.a,
        img: MDXComponents.image,
        code: MDXComponents.code,
        hr: MDXComponents.hr,
        br: MDXComponents.br,
      }}
      remarkPlugins={[remarkGfm]}
      disallowedElements={['pre']}
      unwrapDisallowed
    />
  );
}
