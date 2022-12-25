import { Button, Popover } from '@geist-ui/core';
import { MoreHorizontal } from '@geist-ui/icons';

export default function DropdownMenu({ actions }) {
  const dropdownContent = () =>
    actions.map((action) => (
      <Popover.Item key={action.id} padding={0}>
        <Button
          icon={action.icon}
          type={action.color}
          onClick={action.onClick}
          scale={0.85}
          width="100%"
          ghost
          style={{ border: 0, borderRadius: 0 }}
        >
          {action.label}
        </Button>
      </Popover.Item>
    ));

  return (
    <>
      <style>{`
        .feedback-dropdown > .inner {
            padding: .5rem 0 !important;
            min-width: 10em;
        }
    `}</style>
      <Popover
        content={dropdownContent}
        hideArrow
        placement="bottomEnd"
        portalClassName="feedback-dropdown"
      >
        <Button
          icon={<MoreHorizontal />}
          scale={2 / 3}
          auto
          ghost
          type="secondary"
          style={{
            border: 0,
            borderRadius: '50%',
            position: 'absolute',
            top: '5px',
            right: '5px',
          }}
          padding={0.6}
        />
      </Popover>
    </>
  );
}
