import { useCallback } from 'react';
import type { PageType } from './usePageManager/usePageManager';

interface UseKeyboardNavigationProps {
  pages: PageType[];
  focusedPageId: string | null;
  onFocus: (pageId: string | null) => void;
  onMenuClick: (pageId: string) => void;
  reorderPages: (startIndex: number, endIndex: number) => void;
}

export const useKeyboardNavigation = ({
  pages,
  focusedPageId,
  onFocus,
  onMenuClick,
  reorderPages,
}: UseKeyboardNavigationProps) => {
  const keyDown = useCallback(
    (pageId: string) => (e: React.KeyboardEvent) => {
      const isSpaceKey = e.key === ' ';
      const isEnterKey = e.key === 'Enter';
      const isArrowLeft = e.key === 'ArrowLeft';
      const isArrowRight = e.key === 'ArrowRight';
      const isArrowKey = isArrowLeft || isArrowRight;
      const hasModifiers = e.ctrlKey || e.altKey || e.shiftKey;
      const isInDragMode = focusedPageId === pageId;

      // Only enter drag selection mode with Space key (no modifiers)
      if (isSpaceKey && !hasModifiers) {
        e.preventDefault();
        onFocus(pageId); // Enter drag selection mode
        return;
      }

      // Enter key should just click the button (normal behavior)
      if (isEnterKey) {
        e.preventDefault();
        onMenuClick(pageId);
        return;
      }

      // Arrow keys for reordering (only if already in drag mode)
      if (isInDragMode && isArrowKey) {
        e.preventDefault();
        const currentIndex = pages.findIndex((p) => p.id === pageId);
        const newIndex = isArrowLeft ? currentIndex - 1 : currentIndex + 1;

        if (newIndex >= 0 && newIndex < pages.length) {
          reorderPages(currentIndex, newIndex);
        }
      }
    },
    [focusedPageId, pages, onFocus, onMenuClick, reorderPages]
  );

  return {
    keyDown,
  };
};
