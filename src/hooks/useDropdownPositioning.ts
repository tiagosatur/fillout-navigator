import { useEffect, useState, type RefObject } from 'react';

interface Position {
  top: number;
  left: number;
}

interface UseDropdownPositioningProps {
  isOpen: boolean;
  triggerElement: HTMLElement | null | undefined;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export const useDropdownPositioning = ({
  isOpen,
  triggerElement,
  dropdownRef,
}: UseDropdownPositioningProps) => {
  const [position, setPosition] = useState<Position | null>(null);

  // Calculate position when dropdown opens or reset when closed
  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    if (isOpen && triggerElement) {
      // Use setTimeout to ensure the dropdown is rendered in the DOM first
      const timeoutId = setTimeout(() => {
        if (dropdownRef.current) {
          // First, measure the actual dropdown dimensions
          const dropdownRect = dropdownRef.current.getBoundingClientRect();
          const triggerRect = triggerElement.getBoundingClientRect();
          const gap = 8;

          // Get the main NavButton element (parent of the 3-dots)
          const navButton = triggerElement.closest('button');
          const navButtonRect = navButton
            ? navButton.getBoundingClientRect()
            : triggerRect;

          // Position above the button using actual measured height
          const top = navButtonRect.top - dropdownRect.height - gap;

          // Left-align with the main NavButton's left edge
          let left = navButtonRect.left;

          // Boundary detection using actual measured width
          if (left + dropdownRect.width > window.innerWidth - gap) {
            left = window.innerWidth - dropdownRect.width - gap;
          }

          if (left < gap) {
            left = gap;
          }

          setPosition({
            top: Math.max(gap, top), // Ensure it doesn't go off top of screen
            left,
          });
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, triggerElement, dropdownRef]);

  return { position };
};
