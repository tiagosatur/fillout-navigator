import type { PageType } from '@/hooks/usePageManager/usePageManager';
import { DragOverlay } from '@dnd-kit/core';
import { NavButton } from '../NavButton/NavButton';

interface DragOverlayNavButtonProps {
  activeId: string | null;
  activePage: PageType | undefined;
  activePageId: string | null;
}

export const DragOverlayNavButton = ({
  activeId,
  activePage,
}: DragOverlayNavButtonProps) => {
  return (
    <DragOverlay>
      {activeId && activePage ? (
        <div className='rotate-2 scale-105'>
          <NavButton
            label={activePage.label}
            icon={activePage.icon}
            isActive={false}
            isFocused={false}
            onClick={() => {}}
            onFocus={() => {}}
            className='shadow-2xl border-2 border-blue-400'
          />
        </div>
      ) : null}
    </DragOverlay>
  );
};
