import React from 'react';
import type { PageAction } from '@/types';

const BUTTON_STYLES = {
  BASE: 'w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
  DESTRUCTIVE: 'text-red-600 hover:bg-red-50 focus:bg-red-50',
  NORMAL: 'text-gray-700',
} as const;

const ICON_COLORS = {
  DESTRUCTIVE: '#DC2626',
  NORMAL: '#6B7280',
} as const;

interface DropdownButtonProps {
  action: PageAction;
  isFirst: boolean;
  isLast: boolean;
  firstButtonRef?: React.RefObject<HTMLButtonElement | null>;
  onActionClick: (actionId: string) => void;
  onLastItemTab: (e: React.KeyboardEvent, isLastButton: boolean) => void;
}

export const DropdownButton = ({
  action,
  isFirst,
  isLast,
  firstButtonRef,
  onActionClick,
  onLastItemTab,
}: DropdownButtonProps) => {
  const Icon = action.icon;
  const isDestructive = action.variant === 'destructive';

  return (
    <React.Fragment key={action.id}>
      <button
        ref={isFirst ? firstButtonRef : undefined}
        onClick={() => onActionClick(action.id)}
        onKeyDown={(e) => onLastItemTab(e, isLast)}
        className={`${BUTTON_STYLES.BASE} ${
          isDestructive ? BUTTON_STYLES.DESTRUCTIVE : BUTTON_STYLES.NORMAL
        }`}
      >
        <Icon
          size={16}
          color={isDestructive ? ICON_COLORS.DESTRUCTIVE : ICON_COLORS.NORMAL}
        />
        <span className='text-sm font-medium'>{action.label}</span>
      </button>

      {action.separator && <div className='my-1 border-t border-gray-100' />}
    </React.Fragment>
  );
};
