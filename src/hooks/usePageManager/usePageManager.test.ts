import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePageManager, type PageType } from './usePageManager';

// Mock crypto.randomUUID to make tests predictable
const mockUUID = vi.fn();
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: mockUUID,
  },
});

const setup = () => {
  const { result } = renderHook(() => usePageManager());

  return { result };
};

describe('usePageManager', () => {
  beforeEach(() => {
    mockUUID.mockReset();
    // Return predictable UUIDs for testing
    mockUUID
      .mockReturnValueOnce('initial-page-1')
      .mockReturnValueOnce('initial-page-2')
      .mockReturnValueOnce('initial-page-3')
      .mockReturnValueOnce('initial-page-4');
  });

  describe('initial state', () => {
    it('should initialize with 4 default pages', () => {
      const { result } = setup();

      expect(result.current.pages).toHaveLength(4);
      expect(result.current.pages[0]).toEqual({
        id: 'initial-page-1',
        label: 'Info',
        icon: 'info',
      });
      expect(result.current.pages[1]).toEqual({
        id: 'initial-page-2',
        label: 'Details',
        icon: 'details',
      });
    });

    it('should set first page as active', () => {
      const { result } = setup();

      expect(result.current.activePageId).toBe('initial-page-1');
    });

    it('should have no focused page initially', () => {
      const { result } = setup();

      expect(result.current.focusedPageId).toBeNull();
    });
  });

  describe('onAddPage', () => {
    it('should add a new page at the end', () => {
      mockUUID.mockReturnValueOnce('new-page-1');
      const { result } = setup();

      act(() => {
        result.current.onAddPage();
      });

      expect(result.current.pages).toHaveLength(5);
      expect(result.current.pages[4]).toEqual({
        id: 'new-page-1',
        label: 'Page 5',
        icon: 'details',
      });
    });

    it('should set the new page as active', () => {
      mockUUID.mockReturnValueOnce('new-page-1');
      const { result } = setup();

      act(() => {
        result.current.onAddPage();
      });

      expect(result.current.activePageId).toBe('new-page-1');
    });
  });

  describe('onAddPageAfter', () => {
    it('should add a page after the specified index', () => {
      mockUUID.mockReturnValueOnce('new-page-after');
      const { result } = setup();

      act(() => {
        result.current.onAddPageAfter(1); // After second page
      });

      expect(result.current.pages).toHaveLength(5);
      expect(result.current.pages[2]).toEqual({
        id: 'new-page-after',
        label: 'Page 5',
        icon: 'details',
      });
    });

    it('should set the new page as active', () => {
      mockUUID.mockReturnValueOnce('new-page-after');
      const { result } = setup();

      act(() => {
        result.current.onAddPageAfter(0);
      });

      expect(result.current.activePageId).toBe('new-page-after');
    });
  });

  describe('removePage', () => {
    it('should remove the specified page', () => {
      const { result } = setup();

      act(() => {
        result.current.removePage('initial-page-2');
      });

      expect(result.current.pages).toHaveLength(3);
      expect(
        result.current.pages.find((p: PageType) => p.id === 'initial-page-2')
      ).toBeUndefined();
    });

    it('should update active page when removing the active page', () => {
      const { result } = setup();

      act(() => {
        result.current.removePage('initial-page-1'); // Remove active page
      });

      expect(result.current.activePageId).toBe('initial-page-2'); // Should be first remaining page
    });

    it('should keep active page when removing non-active page', () => {
      const { result } = setup();

      act(() => {
        result.current.removePage('initial-page-3');
      });

      expect(result.current.activePageId).toBe('initial-page-1'); // Should remain unchanged
    });
  });

  describe('reorderPages', () => {
    it('should reorder pages correctly', () => {
      const { result } = setup();

      act(() => {
        result.current.reorderPages(0, 2); // Move first page to third position
      });

      expect(result.current.pages[0].id).toBe('initial-page-2');
      expect(result.current.pages[1].id).toBe('initial-page-3');
      expect(result.current.pages[2].id).toBe('initial-page-1');
    });
  });

  describe('renamePage', () => {
    it('should rename the specified page', () => {
      const { result } = setup();

      act(() => {
        result.current.renamePage('initial-page-1', 'New Page Name');
      });

      expect(result.current.pages[0].label).toBe('New Page Name');
    });

    it('should not affect other pages', () => {
      const { result } = setup();

      act(() => {
        result.current.renamePage('initial-page-1', 'New Page Name');
      });

      expect(result.current.pages[1].label).toBe('Details');
      expect(result.current.pages[2].label).toBe('Other');
    });
  });

  describe('moveToFirst', () => {
    it('should move the specified page to first position', () => {
      const { result } = setup();

      act(() => {
        result.current.moveToFirst('initial-page-3');
      });

      expect(result.current.pages[0].id).toBe('initial-page-3');
      expect(result.current.pages[1].id).toBe('initial-page-1');
      expect(result.current.pages[2].id).toBe('initial-page-2');
    });

    it('should do nothing if page is already first', () => {
      const { result } = setup();
      const originalOrder = result.current.pages.map((p: PageType) => p.id);

      act(() => {
        result.current.moveToFirst('initial-page-1');
      });

      expect(result.current.pages.map((p: PageType) => p.id)).toEqual(
        originalOrder
      );
    });

    it('should do nothing if page is not found', () => {
      const { result } = setup();
      const originalOrder = result.current.pages.map((p: PageType) => p.id);

      act(() => {
        result.current.moveToFirst('non-existent-page');
      });

      expect(result.current.pages.map((p: PageType) => p.id)).toEqual(
        originalOrder
      );
    });
  });

  describe('onMenuClick', () => {
    it('should set the specified page as active', () => {
      const { result } = setup();

      act(() => {
        result.current.onMenuClick('initial-page-3');
      });

      expect(result.current.activePageId).toBe('initial-page-3');
    });
  });

  describe('onFocus', () => {
    it('should set the focused page', () => {
      const { result } = setup();

      act(() => {
        result.current.onFocus('initial-page-2');
      });

      expect(result.current.focusedPageId).toBe('initial-page-2');
    });

    it('should clear focus when passed null', () => {
      const { result } = setup();

      act(() => {
        result.current.onFocus('initial-page-2');
      });

      act(() => {
        result.current.onFocus(null);
      });

      expect(result.current.focusedPageId).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle removing the last page gracefully', () => {
      const { result } = setup();

      // Remove all but one page
      act(() => {
        result.current.removePage('initial-page-2');
        result.current.removePage('initial-page-3');
        result.current.removePage('initial-page-4');
      });

      expect(result.current.pages).toHaveLength(1);
      expect(result.current.activePageId).toBe('initial-page-1');

      // Now try to remove the last page
      act(() => {
        result.current.removePage('initial-page-1');
      });

      expect(result.current.pages).toHaveLength(0);
      expect(result.current.activePageId).toBeNull(); // Should be cleared
    });

    it('should clear focus when focused page is removed', () => {
      const { result } = setup();

      act(() => {
        result.current.onFocus('initial-page-2');
      });

      expect(result.current.focusedPageId).toBe('initial-page-2');

      act(() => {
        result.current.removePage('initial-page-2');
      });

      expect(result.current.focusedPageId).toBeNull();
    });

    it('should not clear focus when a different page is removed', () => {
      const { result } = setup();

      act(() => {
        result.current.onFocus('initial-page-3');
      });

      act(() => {
        result.current.removePage('initial-page-2');
      });

      expect(result.current.focusedPageId).toBe('initial-page-3');
    });

    it('should maintain consistency through multiple operations', () => {
      mockUUID.mockReturnValueOnce('new-page-multi');
      const { result } = setup();

      // Add a page
      act(() => {
        result.current.onAddPage();
      });

      expect(result.current.pages).toHaveLength(5);
      expect(result.current.activePageId).toBe('new-page-multi');

      // Reorder pages
      act(() => {
        result.current.reorderPages(4, 1); // Move new page from end to second position
      });

      expect(result.current.pages[1].id).toBe('new-page-multi');
      expect(result.current.activePageId).toBe('new-page-multi'); // Should remain active

      // Rename the active page
      act(() => {
        result.current.renamePage('new-page-multi', 'Renamed Page');
      });

      expect(result.current.pages[1].label).toBe('Renamed Page');
      expect(result.current.activePageId).toBe('new-page-multi'); // Still active

      // Remove a different page
      act(() => {
        result.current.removePage('initial-page-3');
      });

      expect(result.current.pages).toHaveLength(4);
      expect(result.current.activePageId).toBe('new-page-multi'); // Still active
      expect(
        result.current.pages.find((p: PageType) => p.id === 'new-page-multi')
          ?.label
      ).toBe('Renamed Page');
    });
  });
});
