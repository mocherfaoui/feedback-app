import TextareaAutosize from 'react-textarea-autosize';
import { Link, Popover, Tabs, Text } from '@geist-ui/core';
import Info from '@geist-ui/icons/info';

import { styled } from '@/stitches.config';

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
      <Tabs hideDivider initialValue="1" className="feedback-editor">
        <Tabs.Item label="Edit" value="1">
          <TextareaAutosize
            style={{
              width: '100%',
              resize: 'none',
              border: 0,
              marginTop: '1rem',
              padding: 0,
              fontSize:'.9rem'
            }}
            minRows={1}
            onChange={onChange}
            defaultValue={defaultValue}
            ref={inputRef}
            placeholder={placeholder}
          />
          <TextAreaFooter className="textarea_footer">
            <Popover
              trigger="hover"
              placement="left"
              hideArrow
              content={
                <Text px={0.5} style={{ display: 'flex' }} b span font={0.7}>
                  Supports Markdown
                </Text>
              }
            >
              <Link
                underline
                href="https://commonmark.org/help/"
                target="_blank"
              >
                <Info size={16} />
              </Link>
            </Popover>
          </TextAreaFooter>
        </Tabs.Item>
        <Tabs.Item label="Preview" value="2">
          <MarkdownRender source={previewSource} />
        </Tabs.Item>
      </Tabs>
    </>
  );
}
const TextAreaFooter = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  borderBottom: '1px solid #eaeaea',
});
