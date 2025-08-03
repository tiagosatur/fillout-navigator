import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef } from 'react';
import { NavButton, type NavButtonRef } from '../NavButton/NavButton';
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
  pageActions: PageAction[];
  onPageAction: PageActionHandler;
  onDropdownOpen?: (pageId: string) => void;
}

export const SortableNavButton = forwardRef<
  NavButtonRef,
  SortableNavButtonProps
>(
  (
    {
      id,
      label,
      icon,
      isActive,
      isFocused,
      onClick,
      onFocus,
      onKeyDown,
      pageActions,
      onPageAction,
      onDropdownOpen,
    }: SortableNavButtonProps,
    ref
  ) => {
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

    // We'll need to get dropdown state from NavButton if needed for drag behavior
    // For now, keeping listeners enabled always
    const disableListenersToAllowSelectDropdownItems = listeners;

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
          ref={ref}
          label={label}
          icon={icon}
          isActive={isActive}
          isFocused={isFocused}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          pageId={id}
          pageActions={pageActions}
          onPageAction={onPageAction}
          onDropdownOpen={onDropdownOpen}
          className={isDragging ? 'pointer-events-none' : ''}
        />
      </div>
    );
  }
);

SortableNavButton.displayName = 'SortableNavButton';
