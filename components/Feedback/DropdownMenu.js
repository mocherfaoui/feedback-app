import { Button, Popover } from '@geist-ui/core';

export default function DropdownMenu({
  actions,
  trigger,
  dropdownOffset = 12,
}) {
  const dropdownContent = () =>
    actions?.map((action, index) => (
      <>
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
        {index < actions.length - 1 && <Popover.Item line margin={0} />}
      </>
    ));

  return (
    <>
      <style>{`
        .dropdown-menu > .inner {
            padding: .2rem 0 !important;
            min-width: 10em;
        }
    `}</style>
      <Popover
        content={dropdownContent}
        hideArrow
        placement="bottomEnd"
        portalClassName="dropdown-menu"
        offset={dropdownOffset}
      >
        {trigger}
      </Popover>
    </>
  );
}
