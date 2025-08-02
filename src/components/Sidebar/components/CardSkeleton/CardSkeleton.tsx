interface CardSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const CardSkeleton = ({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'rectangular',
}: CardSkeletonProps) => {
  const baseClasses = 'bg-gray-200';

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};
