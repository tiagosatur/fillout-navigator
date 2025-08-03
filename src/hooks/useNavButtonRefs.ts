import { useRef, useEffect, createRef, useCallback } from 'react';
import type { NavButtonRef } from '@/components/Navigator/components/NavButton/NavButton';

interface Page {
  id: string;
}

export const useNavButtonRefs = (pages: Page[]) => {
  // Track refs to all NavButtons for dropdown coordination
  const navButtonRefs = useRef<
    Map<string, React.RefObject<NavButtonRef | null>>
  >(new Map());

  // Cleanup refs for removed pages
  useEffect(() => {
    const currentPageIds = new Set(pages.map((page) => page.id));
    const refsToDelete: string[] = [];

    navButtonRefs.current.forEach((_, pageId) => {
      if (!currentPageIds.has(pageId)) {
        refsToDelete.push(pageId);
      }
    });

    refsToDelete.forEach((pageId) => {
      navButtonRefs.current.delete(pageId);
    });
  }, [pages]);

  // Get or create ref for a specific page
  const getNavButtonRef = useCallback((pageId: string) => {
    if (!navButtonRefs.current.has(pageId)) {
      navButtonRefs.current.set(pageId, createRef<NavButtonRef>());
    }
    return navButtonRefs.current.get(pageId)!;
  }, []);

  // Close all dropdowns except the specified one
  const closeOtherDropdowns = useCallback((exceptPageId: string) => {
    navButtonRefs.current.forEach((ref, id) => {
      if (id !== exceptPageId && ref.current) {
        ref.current.closeDropdown();
      }
    });
  }, []);

  // Close all dropdowns
  const closeAllDropdowns = useCallback(() => {
    navButtonRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.closeDropdown();
      }
    });
  }, []);

  return {
    getNavButtonRef,
    closeOtherDropdowns,
    closeAllDropdowns,
  };
};
