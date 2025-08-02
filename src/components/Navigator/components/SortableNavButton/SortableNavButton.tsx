import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavButton } from '../NavButton/NavButton';
import type { PageIconTypes } from '../NavButton/NavButton';
import type { PageAction, PageActionHandler } from '@/types';

interface SortableNavButtonProps {
  id: string;
  label: string;
  icon: PageIconTypes;
  isActive?: boolean;
  isFocused?: boolean;
  onClick: () => void;
  onFocus: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  isDropdownOpen?: boolean;
  onDropdownToggle?: () => void;
  pageActions: PageAction[];
  onPageAction: PageActionHandler;
}

export const SortableNavButton = ({
  id,
  label,
  icon,
  isActive,
  isFocused,
  onClick,
  onFocus,
  onKeyDown,
  isDropdownOpen,
  onDropdownToggle,
  pageActions,
  onPageAction,
}: SortableNavButtonProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const disableListenersToAllowSelectDropdownItems = isDropdownOpen
    ? {}
    : listeners;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...disableListenersToAllowSelectDropdownItems}
      className={`touch-none ${isDragging ? 'z-50' : ''}`}
      tabIndex={-1}
    >
      <NavButton
        label={label}
        icon={icon}
        isActive={isActive}
        isFocused={isFocused}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        pageId={id}
        isDropdownOpen={isDropdownOpen}
        onDropdownToggle={onDropdownToggle}
        pageActions={pageActions}
        onPageAction={onPageAction}
        className={isDragging ? 'pointer-events-none' : ''}
      />
    </div>
  );
};
