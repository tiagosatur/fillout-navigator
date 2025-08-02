import React from 'react';
import { AddPageButton } from '../AddPageButton/AddPageButton';
import { PlusButton } from '../PlusButton/PlusButton';

interface PageSeparatorProps {
  isEnd?: boolean;
  onAddPage: () => void;
  onAddPageAfter: () => void;
}

export const PageSeparator = React.memo(
  ({ isEnd = false, onAddPage, onAddPageAfter }: PageSeparatorProps) => {
    if (isEnd) {
      return (
        <div className='flex items-center'>
          <div className='h-0 border-t border-dashed border-gray-300 w-5 flex-shrink-0' />
          <AddPageButton onClick={onAddPage} />
        </div>
      );
    }

    return (
      <div className='relative flex items-center group py-4'>
        <div className='w-6 group-hover:w-14 h-1 border-t border-dashed border-gray-300 transition-all duration-300 ease-out delay-75 group-hover:delay-75 group-focus-within:w-14' />

        <PlusButton
          onClick={onAddPageAfter}
          className='group-focus-within:opacity-100 group-focus-within:visible'
          showByDefault={false}
        />
      </div>
    );
  }
);
