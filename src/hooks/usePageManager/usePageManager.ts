import React, { useCallback } from 'react';
import type { PageIconTypes } from '@/components/Navigator/components/NavButton/NavButton';

export type PageType = {
  id: string;
  label: string;
  icon: PageIconTypes;
};

export const usePageManager = () => {
  const firstPageId = crypto.randomUUID();

  const [pages, setPages] = React.useState<PageType[]>([
    { id: firstPageId, label: 'Info', icon: 'info' as PageIconTypes },
    {
      id: crypto.randomUUID(),
      label: 'Details',
      icon: 'details' as PageIconTypes,
    },
    { id: crypto.randomUUID(), label: 'Other', icon: 'other' as PageIconTypes },
    {
      id: crypto.randomUUID(),
      label: 'Ending',
      icon: 'ending' as PageIconTypes,
    },
  ]);

  const [activePageId, setActivePageId] = React.useState<string | null>(
    firstPageId
  );
  const [focusedPageId, setFocusedPageId] = React.useState<string | null>(null);

  const onFocus = useCallback((pageId: string | null) => {
    setFocusedPageId(pageId);
  }, []);

  const onAddPage = useCallback(() => {
    const pageId = crypto.randomUUID();
    const pageNumber = pages.length + 1;
    const newPage = {
      id: pageId,
      label: `Page ${pageNumber}`,
      icon: 'details' as PageIconTypes,
    };
    setPages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
  }, [pages.length]);

  const onMenuClick = useCallback((pageId: string) => {
    setActivePageId(pageId);
  }, []);

  const removePage = useCallback(
    (id: string) => {
      setPages((prev) => {
        const newPages = prev.filter((p) => p.id !== id);
        // Update active page if the removed page was active
        if (activePageId === id) {
          if (newPages.length > 0) {
            setActivePageId(newPages[0].id);
          } else {
            setActivePageId(null); // Clear active page when no pages remain
          }
        }
        return newPages;
      });

      // Clear focus if the focused page was removed
      setFocusedPageId((prev) => (prev === id ? null : prev));
    },
    [activePageId]
  );

  const reorderPages = useCallback((startIndex: number, endIndex: number) => {
    setPages((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const renamePage = useCallback((id: string, newLabel: string) => {
    setPages((prev) =>
      prev.map((page) => (page.id === id ? { ...page, label: newLabel } : page))
    );
  }, []);

  const moveToFirst = useCallback((id: string) => {
    setPages((prev) => {
      const pageIndex = prev.findIndex((page) => page.id === id);
      if (pageIndex <= 0) return prev; // Already first or not found

      const result = Array.from(prev);
      const [removed] = result.splice(pageIndex, 1);
      result.unshift(removed);
      return result;
    });
  }, []);

  const onAddPageAfter = useCallback(
    (index: number) => {
      // Generate unique ID to avoid conflicts after deletions
      const pageId = crypto.randomUUID();
      const pageNumber = pages.length + 1;
      const newPage = {
        id: pageId,
        label: `Page ${pageNumber}`,
        icon: 'details' as PageIconTypes,
      };

      setPages((prev) => {
        const newPages = [...prev];
        newPages.splice(index + 1, 0, newPage);
        return newPages;
      });
      setActivePageId(newPage.id);
    },
    [pages.length]
  );

  return {
    pages,
    activePageId,
    onMenuClick,
    onFocus,
    focusedPageId,
    onAddPageAfter,
    onAddPage,
    removePage,
    reorderPages,
    renamePage,
    moveToFirst,
  };
};
