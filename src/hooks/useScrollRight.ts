import { useEffect, useState, type RefObject } from 'react';

export const useScrollRight = (
  ref: RefObject<HTMLElement | null>,
  deps: unknown[]
) => {
  const [isAddedMiddlePageClicked, setIsAddedMiddlePageClicked] =
    useState(false);

  useEffect(() => {
    if (ref.current && !isAddedMiddlePageClicked) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, [...deps, isAddedMiddlePageClicked]);

  const hasAddedMiddlePage = (value: boolean) => {
    setIsAddedMiddlePageClicked(value);
  };

  return { hasAddedMiddlePage };
};
