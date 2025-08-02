import { Fragment, useRef, useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SortableContext } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import {
  useScrollRight,
  useDragAndDrop,
  useKeyboardNavigation,
  usePageManager,
  usePageActions,
} from '@/hooks';
import { DragOverlayNavButton } from '@/components/Navigator/components/DragOverlayNavButton/DragOverlayNavButton';
import { SortableNavButton } from '@/components/Navigator/components/SortableNavButton/SortableNavButton';
import { PageSeparator } from '@/components/Navigator/components/PageSeparator/PageSeparator';

export const Navigator = () => {
  const {
    pages,
    activePageId,
    onMenuClick,
    onAddPage,
    onAddPageAfter,
    focusedPageId,
    onFocus,
    reorderPages,
    removePage,
    renamePage,
    moveToFirst,
  } = usePageManager();

  // Dropdown state management
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Scroll state management
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { hasAddedMiddlePage } = useScrollRight(containerRef, [pages.length]);

  const {
    activeId,
    activePage,
    pageIds,
    handleDragStart,
    handleDragEnd,
    sensors,
    collisionDetection,
    sortingStrategy,
  } = useDragAndDrop({ pages, reorderPages });

  const { keyDown } = useKeyboardNavigation({
    pages,
    focusedPageId,
    onFocus,
    onMenuClick,
    reorderPages,
  });

  const addPageAfter = useCallback(
    (index: number) => {
      onAddPageAfter(index);
      hasAddedMiddlePage(true);
      onFocus(null);
    },
    [onAddPageAfter, hasAddedMiddlePage, onFocus]
  );

  const addPage = useCallback(() => {
    onAddPage();
    hasAddedMiddlePage(false);
    onFocus(null);
  }, [onAddPage, hasAddedMiddlePage, onFocus]);

  // Scroll functions using native scroll
  const scrollLeft = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, []);

  // Check scroll position based on native scroll
  const checkScrollPosition = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Update scroll state when pages change and on scroll events
  useEffect(() => {
    checkScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [pages.length, checkScrollPosition]);

  const toggleDropdown = useCallback((pageId: string) => {
    setOpenDropdownId((prev) => (prev === pageId ? null : pageId));
  }, []);

  // Use page actions hook
  const { pageActions, handlePageAction } = usePageActions({
    pages,
    pageManager: { moveToFirst, renamePage, removePage },
    onCloseDropdown: () => setOpenDropdownId(null),
  });

  return (
    <div className='relative flex items-center h-full'>
      {/* Left scroll arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className='absolute left-0 z-20 flex items-center justify-center w-8 h-8 bg-white/90 border border-gray-200 rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer'
          aria-label='Scroll left'
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Right scroll arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className='absolute right-0 z-20 flex items-center justify-center w-8 h-8 bg-white/90 border border-gray-200 rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer'
          aria-label='Scroll right'
        >
          <ChevronRight size={16} />
        </button>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={containerRef}
          className='flex items-center h-full overflow-x-auto px-4 scrollbar-hide'
        >
          <SortableContext items={pageIds} strategy={sortingStrategy}>
            {pages.map((page, index) => {
              const isEnd = index === pages.length - 1;
              const key = `page-button-${page.id}`;

              return (
                <Fragment key={key}>
                  <SortableNavButton
                    id={page.id}
                    label={page.label}
                    icon={page.icon}
                    isActive={activePageId === page.id}
                    isFocused={focusedPageId === page.id}
                    onClick={() => onMenuClick(page.id)}
                    onFocus={() => onFocus(page.id)}
                    onKeyDown={keyDown(page.id)}
                    isDropdownOpen={openDropdownId === page.id}
                    onDropdownToggle={() => toggleDropdown(page.id)}
                    pageActions={pageActions}
                    onPageAction={handlePageAction}
                  />
                  <PageSeparator
                    onAddPageAfter={() => addPageAfter(index)}
                    onAddPage={addPage}
                    isEnd={isEnd}
                  />
                </Fragment>
              );
            })}
          </SortableContext>
        </div>

        <DragOverlayNavButton
          activeId={activeId}
          activePage={activePage}
          activePageId={activePageId}
        />
      </DndContext>
    </div>
  );
};
