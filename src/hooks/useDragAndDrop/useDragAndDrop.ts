import { useState } from 'react';
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { PageType } from '../usePageManager/usePageManager';

interface UseDragAndDropProps {
  pages: PageType[];
  reorderPages: (oldIndex: number, newIndex: number) => void;
}

export const useDragAndDrop = ({
  pages,
  reorderPages,
}: UseDragAndDropProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors for better touch/mouse support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = pages.findIndex((page) => page.id === active.id);
      const newIndex = pages.findIndex((page) => page.id === over?.id);

      const isSourcePageFound = oldIndex >= 0;
      const isTargetPageFound = newIndex >= 0;

      // Only reorder if both pages were found
      if (isSourcePageFound && isTargetPageFound) {
        reorderPages(oldIndex, newIndex);
      }
    }

    setActiveId(null);
  };

  const pageIds = pages.map((page) => page.id);
  const activePage = pages.find((page) => page.id === activeId);

  return {
    // State
    activeId,
    activePage,
    pageIds,

    // Event handlers
    handleDragStart,
    handleDragEnd,

    // Configuration
    sensors,
    collisionDetection: closestCenter,
    sortingStrategy: horizontalListSortingStrategy,
  };
};
