import TextareaAutosize from 'react-textarea-autosize';
import { Link, Popover, Tabs, Text } from '@geist-ui/core';
import Info from '@geist-ui/icons/info';

import { Flex } from '../GlobalComponents';
import { MarkdownRender } from '../MarkdownRender';

export default function FeedbackEditor({
  defaultValue,
  placeholder,
  previewSource,
  inputRef,
  onChange,
}) {
  return (
    <>
      <style>
        {`
        .feedback-editor header .scroll-container{
              padding:0;
        }
        `}
      </style>
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
            minRows={1}
            onChange={onChange}
            defaultValue={defaultValue}
            ref={inputRef}
            placeholder={placeholder}
          />
        </Tabs.Item>
        <Tabs.Item label="Preview" value="2">
          <MarkdownRender source={previewSource} />
        </Tabs.Item>
      </Tabs>
      <Flex css={{ justifyContent: 'end' }}>
        <Popover
          trigger="hover"
          placement="left"
          hideArrow
          content={
            <Text px={0.5} style={{ display: 'flex' }} b span small>
              Supports Markdown
            </Text>
          }
        >
          <Link underline href="https://commonmark.org/help/" target="_blank">
            <Info size={16} />
          </Link>
        </Popover>
      </Flex>
    </>
  );
}
