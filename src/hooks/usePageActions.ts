import { useMemo, useCallback } from 'react';
import { Flag, Edit2, Copy, Files, Trash2 } from 'lucide-react';
import type { PageAction, PageActionHandler } from '@/types';

interface Page {
  id: string;
  label: string;
  icon: string;
}

interface PageManager {
  moveToFirst: (pageId: string) => void;
  renamePage: (pageId: string, newName: string) => void;
  removePage: (pageId: string) => void;
}

interface UsePageActionsProps {
  pages: Page[];
  pageManager: PageManager;
  onCloseDropdown?: () => void;
}

export const usePageActions = ({
  pages,
  pageManager,
  onCloseDropdown,
}: UsePageActionsProps) => {
  const { moveToFirst, renamePage, removePage } = pageManager;

  // Define available page actions using command pattern
  const pageActions: PageAction[] = useMemo(
    () => [
      {
        id: 'set-first',
        label: 'Set as first page',
        icon: Flag,
        variant: 'default',
      },
      {
        id: 'rename',
        label: 'Rename',
        icon: Edit2,
        variant: 'default',
      },
      {
        id: 'copy',
        label: 'Copy',
        icon: Copy,
        variant: 'default',
      },
      {
        id: 'duplicate',
        label: 'Duplicate',
        icon: Files,
        variant: 'default',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: Trash2,
        variant: 'destructive',
        requiresConfirmation: true,
        confirmationMessage: 'Are you sure you want to delete this page?',
      },
    ],
    []
  );

  // Handle page actions with business logic
  const handlePageAction: PageActionHandler = useCallback(
    (pageId: string, actionId: string) => {
      const action = pageActions.find((a) => a.id === actionId);
      const page = pages.find((p) => p.id === pageId);

      if (!action || !page) return;

      // Handle confirmation if required
      if (action.requiresConfirmation) {
        const message =
          action.confirmationMessage ||
          `Are you sure you want to ${action.label.toLowerCase()}?`;
        if (!confirm(message.replace('this page', `"${page.label}"`))) {
          return;
        }
      }

      // Execute the action
      switch (actionId) {
        case 'set-first':
          moveToFirst(pageId);
          break;
        case 'rename':
          // For now, use a simple prompt - in a real app you'd want a proper modal
          const newName = prompt('Enter new page name:', page.label);
          if (newName && newName.trim() && newName !== page.label) {
            renamePage(pageId, newName.trim());
          }
          break;
        case 'copy':
          // TODO: Implement copy functionality
          console.log('Copy not implemented yet');
          break;
        case 'duplicate':
          // TODO: Implement duplicate functionality
          console.log('Duplicate not implemented yet');
          break;
        case 'delete':
          removePage(pageId);
          break;
        default:
          console.log(`Unknown action: ${actionId}`);
      }

      // Close dropdown after action
      onCloseDropdown?.();
    },
    [pages, pageActions, moveToFirst, renamePage, removePage, onCloseDropdown]
  );

  return {
    pageActions,
    handlePageAction,
  };
};
