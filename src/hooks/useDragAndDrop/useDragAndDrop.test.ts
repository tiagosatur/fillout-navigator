import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDragAndDrop } from './useDragAndDrop';
import type { PageType } from '../usePageManager/usePageManager';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

// Mock @dnd-kit modules
vi.mock('@dnd-kit/core', async () => {
  const actual = await vi.importActual('@dnd-kit/core');
  return {
    ...actual,
    useSensor: vi.fn(),
    useSensors: vi.fn(() => []),
  };
});

vi.mock('@dnd-kit/sortable', async () => {
  const actual = await vi.importActual('@dnd-kit/sortable');
  return {
    ...actual,
    sortableKeyboardCoordinates: vi.fn(),
  };
});

const mockPages: PageType[] = [
  { id: 'page-1', label: 'Page 1', icon: 'info' },
  { id: 'page-2', label: 'Page 2', icon: 'details' },
  { id: 'page-3', label: 'Page 3', icon: 'other' },
  { id: 'page-4', label: 'Page 4', icon: 'ending' },
];

const mockReorderPages = vi.fn();

// Helper functions to create mock events
const createMockDragStartEvent = (activeId: string): DragStartEvent =>
  ({
    active: {
      id: activeId,
      data: { current: {} },
      rect: { current: { initial: null, translated: null } },
    },
  } as DragStartEvent);

const createMockDragEndEvent = (
  activeId: string,
  overId?: string | null
): DragEndEvent =>
  ({
    active: {
      id: activeId,
      data: { current: {} },
      rect: { current: { initial: null, translated: null } },
    },
    over: overId
      ? {
          id: overId,
          data: { current: {} },
          rect: { current: null },
        }
      : null,
  } as DragEndEvent);

const setup = (pages: PageType[] = mockPages) => {
  return renderHook(() =>
    useDragAndDrop({
      pages,
      reorderPages: mockReorderPages,
    })
  );
};

describe('useDragAndDrop', () => {
  beforeEach(() => {
    mockReorderPages.mockClear();
  });

  describe('initial state', () => {
    it('should initialize with correct default state', () => {
      const { result } = setup();

      expect(result.current.activeId).toBeNull();
      expect(result.current.activePage).toBeUndefined();
      expect(result.current.pageIds).toEqual([
        'page-1',
        'page-2',
        'page-3',
        'page-4',
      ]);
    });

    it('should generate pageIds array from pages', () => {
      const customPages = [
        { id: 'a', label: 'A', icon: 'info' },
        { id: 'b', label: 'B', icon: 'details' },
      ] as PageType[];

      const { result } = setup(customPages);

      expect(result.current.pageIds).toEqual(['a', 'b']);
    });

    it('should handle empty pages array', () => {
      const { result } = setup([]);

      expect(result.current.pageIds).toEqual([]);
      expect(result.current.activePage).toBeUndefined();
    });

    it('should provide configuration objects', () => {
      const { result } = setup();

      expect(result.current.sensors).toBeDefined();
      expect(result.current.collisionDetection).toBeDefined();
      expect(result.current.sortingStrategy).toBeDefined();
    });
  });

  describe('handleDragStart', () => {
    it('should set activeId when drag starts', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart(createMockDragStartEvent('page-2'));
      });

      expect(result.current.activeId).toBe('page-2');
    });

    it('should find the correct activePage when drag starts', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart(createMockDragStartEvent('page-3'));
      });

      expect(result.current.activePage).toEqual({
        id: 'page-3',
        label: 'Page 3',
        icon: 'other',
      });
    });

    it('should handle non-existent page ID in drag start', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart(
          createMockDragStartEvent('non-existent')
        );
      });

      expect(result.current.activeId).toBe('non-existent');
      expect(result.current.activePage).toBeUndefined();
    });
  });

  describe('handleDragEnd', () => {
    it('should call reorderPages with correct indices on successful drag', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('page-1', 'page-3')
        );
      });

      expect(mockReorderPages).toHaveBeenCalledWith(0, 2); // page-1 (index 0) to page-3 (index 2)
    });

    it('should clear activeId after drag end', () => {
      const { result } = setup();

      // First set an activeId
      act(() => {
        result.current.handleDragStart(createMockDragStartEvent('page-1'));
      });

      expect(result.current.activeId).toBe('page-1');

      // Then end the drag
      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('page-1', 'page-2')
        );
      });

      expect(result.current.activeId).toBeNull();
    });

    it('should not call reorderPages when dragging to same position', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('page-2', 'page-2')
        );
      });

      expect(mockReorderPages).not.toHaveBeenCalled();
    });

    it('should not call reorderPages when source page not found', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('non-existent-source', 'page-2')
        );
      });

      expect(mockReorderPages).not.toHaveBeenCalled();
    });

    it('should not call reorderPages when target page not found', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('page-1', 'non-existent-target')
        );
      });

      expect(mockReorderPages).not.toHaveBeenCalled();
    });

    it('should not call reorderPages when both pages not found', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('non-existent-source', 'non-existent-target')
        );
      });

      expect(mockReorderPages).not.toHaveBeenCalled();
    });

    it('should handle drag end without over target', () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd(createMockDragEndEvent('page-1', null));
      });

      expect(mockReorderPages).not.toHaveBeenCalled();
      expect(result.current.activeId).toBeNull(); // Should still clear activeId
    });
  });

  describe('edge cases', () => {
    it('should handle single page array', () => {
      const singlePage = [
        { id: 'only-page', label: 'Only Page', icon: 'info' },
      ] as PageType[];
      const { result } = setup(singlePage);

      expect(result.current.pageIds).toEqual(['only-page']);

      // Try to drag the only page
      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('only-page', 'only-page')
        );
      });

      expect(mockReorderPages).not.toHaveBeenCalled(); // Same position, no reorder
    });

    it('should handle pages array changes', () => {
      const { result, rerender } = renderHook(
        ({ pages }) =>
          useDragAndDrop({ pages, reorderPages: mockReorderPages }),
        {
          initialProps: { pages: mockPages },
        }
      );

      expect(result.current.pageIds).toHaveLength(4);

      // Update with fewer pages
      const updatedPages = mockPages.slice(0, 2);
      rerender({ pages: updatedPages });

      expect(result.current.pageIds).toHaveLength(2);
      expect(result.current.pageIds).toEqual(['page-1', 'page-2']);
    });

    it('should handle activePage after pages array changes', () => {
      const { result, rerender } = renderHook(
        ({ pages }) =>
          useDragAndDrop({ pages, reorderPages: mockReorderPages }),
        {
          initialProps: { pages: mockPages },
        }
      );

      // Start dragging page-3
      act(() => {
        result.current.handleDragStart(createMockDragStartEvent('page-3'));
      });

      expect(result.current.activePage?.id).toBe('page-3');

      // Remove page-3 from pages array
      const updatedPages = mockPages.filter((p) => p.id !== 'page-3');
      rerender({ pages: updatedPages });

      expect(result.current.activePage).toBeUndefined(); // Should not find the page anymore
      expect(result.current.activeId).toBe('page-3'); // But activeId should remain until drag ends
    });
  });

  describe('integration behavior', () => {
    it('should work correctly through a complete drag cycle', () => {
      const { result } = setup();

      // 1. Start drag
      act(() => {
        result.current.handleDragStart(createMockDragStartEvent('page-4'));
      });

      expect(result.current.activeId).toBe('page-4');
      expect(result.current.activePage?.label).toBe('Page 4');

      // 2. End drag at different position
      act(() => {
        result.current.handleDragEnd(
          createMockDragEndEvent('page-4', 'page-1')
        );
      });

      expect(mockReorderPages).toHaveBeenCalledWith(3, 0); // page-4 (index 3) to page-1 (index 0)
      expect(result.current.activeId).toBeNull();
    });
  });
});
