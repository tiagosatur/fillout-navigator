import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDropdownPositioning } from '@/hooks';
import type { PageAction, PageActionHandler } from '@/types';
import { DropdownButton } from './DropdownButton';

const DROPDOWN_STYLES = {
  WIDTH: 'w-56',
  Z_INDEX: 'z-[50]',
  HIDDEN_POSITION: { top: '-9999px', left: '-9999px' },
  FOCUS_DELAY: 0,
} as const;

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
  pageName: string;
  triggerElement?: HTMLElement | null;
  pageActions: PageAction[];
  onPageAction: PageActionHandler;
}

export const SettingsDropdown = ({
  isOpen,
  onClose,
  pageId,
  pageName,
  triggerElement,
  pageActions,
  onPageAction,
}: SettingsDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const { position } = useDropdownPositioning({
    isOpen,
    triggerElement,
    dropdownRef,
  });

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;

      const clickedElement = event.target as Node;
      const dropdown = dropdownRef.current;
      const trigger = triggerElement;

      const isClickOutsideDropdown =
        dropdown && !dropdown.contains(clickedElement);
      const isClickOutsideTrigger =
        trigger && !trigger.contains(clickedElement);

      if (isClickOutsideDropdown && isClickOutsideTrigger) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, triggerElement]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        // Focus on settings button
        if (triggerElement) {
          triggerElement.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Focus first button when dropdown opens and is positioned
  useEffect(() => {
    if (isOpen && position && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [isOpen, position]);

  if (!isOpen) {
    return null;
  }

  const handleActionClick = (actionId: string) => {
    onPageAction(pageId, actionId);
    onClose();
  };

  const handleLastItemTab = (e: React.KeyboardEvent, isLastButton: boolean) => {
    if (e.key === 'Tab' && !e.shiftKey && isLastButton) {
      onClose();
      const navButton = triggerElement?.closest('button');
      if (navButton) {
        navButton.focus();
      }
    }
  };

  const positionStyle = position
    ? { top: `${position.top}px`, left: `${position.left}px`, opacity: 1 }
    : { ...DROPDOWN_STYLES.HIDDEN_POSITION, opacity: 0 };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className={`fixed ${DROPDOWN_STYLES.WIDTH} bg-white border border-gray-200 rounded-lg shadow-lg ${DROPDOWN_STYLES.Z_INDEX} cursor-pointer`}
      style={positionStyle}
    >
      {/* Header */}
      <div className='px-4 py-3 border-b border-gray-100'>
        <h3 className='font-semibold text-gray-900'>Settings</h3>
      </div>

      {/* Actions */}
      <div className='py-2'>
        {pageActions.map((action, index) => (
          <DropdownButton
            key={action.id}
            action={action}
            isFirst={index === 0}
            isLast={index === pageActions.length - 1}
            firstButtonRef={index === 0 ? firstButtonRef : undefined}
            onActionClick={handleActionClick}
            onLastItemTab={handleLastItemTab}
          />
        ))}
      </div>
    </div>
  );

  return createPortal(dropdownContent, document.body);
};
