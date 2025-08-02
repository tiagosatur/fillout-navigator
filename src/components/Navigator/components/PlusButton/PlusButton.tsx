import { Plus } from 'lucide-react';

interface PlusButtonProps {
  onClick: () => void;
  className?: string;
  showByDefault?: boolean;
}

export const PlusButton = ({
  onClick,
  className = '',
  showByDefault = false,
}: PlusButtonProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
    // Blur the button after clicking to remove focus
    e.currentTarget.blur();
  };

  const positionClasses =
    'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2';
  const appearanceClasses =
    'bg-white border border-gray-300 rounded-full w-6 h-6 shadow-md';
  const layoutClasses = 'flex items-center justify-center';
  const interactionClasses = 'hover:bg-gray-50 hover:shadow-lg cursor-pointer';
  const animationClasses =
    'transition-transform duration-200 delay-150 scale-75 group-hover:scale-100 group-focus-within:scale-100';
  const visibilityClasses = showByDefault
    ? 'opacity-100'
    : 'opacity-0 group-hover:opacity-100 group-hover:delay-75';
  const utilityClasses = 'z-10';

  return (
    <button
      onClick={onButtonClick}
      className={`
        ${positionClasses}
        ${appearanceClasses}
        ${layoutClasses}
        ${interactionClasses}
        ${animationClasses}
        ${visibilityClasses}
        ${utilityClasses}
        ${className}
      `}
    >
      <Plus size={12} color='#000' strokeWidth={3} />
    </button>
  );
};
