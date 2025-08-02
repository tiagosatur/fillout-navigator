import React, { useRef } from 'react';
import {
  Info,
  FileText,
  CheckCircle,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
import { BACKGROUND_COLORS, ICON_COLORS } from '@/styles/theme';
import type { BaseButtonProps, PageAction, PageActionHandler } from '@/types';
import { getButtonStyle } from './NavButton.helpers';
import { SettingsDropdown } from '../SettingsDropdown/SettingsDropdown';

const iconPurposes = {
  info: Info,
  details: FileText,
  other: FileText,
  ending: CheckCircle,
  plus: Plus,
} as const;

// 'info' | 'details' | 'other' | 'ending' | 'plus';
export type PageIconTypes = keyof typeof iconPurposes;

interface NavButtonProps extends BaseButtonProps {
  label: string;
  icon: PageIconTypes;
  isActive?: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  pageId?: string;
  isDropdownOpen?: boolean;
  onDropdownToggle?: () => void;
  pageActions?: PageAction[];
  onPageAction?: PageActionHandler;
}

export const NavButton = ({
  label,
  icon,
  isActive = false,
  isFocused = false,
  onClick,
  className = '',
  onFocus,
  onKeyDown,
  pageId,
  isDropdownOpen = false,
  onDropdownToggle,
  pageActions,
  onPageAction,
}: NavButtonProps) => {
  const Icon = iconPurposes[icon];
  const buttonStyle = getButtonStyle(isActive, isFocused);
  const settingButtonRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative'>
      <button
        className={`
          flex items-center gap-1.5 py-1.5 px-2.5 h-[32px] flex-shrink-0 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-blue-500
          ${buttonStyle.border}
          ${buttonStyle.boxShadow}
          ${className}`}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        style={{
          backgroundColor: buttonStyle.backgroundColor,
          color: buttonStyle.textColor,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = BACKGROUND_COLORS.HOVER;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
          }
        }}
      >
        <Icon size={16} color={buttonStyle.iconColor} strokeWidth={2} />
        <span className='text-sm font-medium whitespace-nowrap'>{label}</span>

        {isActive && (
          <div
            ref={settingButtonRef}
            role='button'
            tabIndex={0}
            aria-label='Page settings dropdown'
            onClick={(e) => {
              e.stopPropagation();
              onDropdownToggle?.();
            }}
            className='ml-1 p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer'
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDropdownToggle?.();
              }
            }}
          >
            <MoreHorizontal size={12} color={ICON_COLORS.DEFAULT} />
          </div>
        )}
      </button>

      {pageId && pageActions && onPageAction && (
        <SettingsDropdown
          isOpen={isDropdownOpen}
          onClose={() => onDropdownToggle?.()}
          pageId={pageId}
          triggerElement={settingButtonRef.current}
          pageActions={pageActions}
          onPageAction={onPageAction}
        />
      )}
    </div>
  );
};
