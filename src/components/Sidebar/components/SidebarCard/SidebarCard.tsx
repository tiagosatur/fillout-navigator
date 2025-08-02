import type { LucideIcon } from 'lucide-react';

interface SidebarCardProps {
  icon: LucideIcon;
  label: string;
  iconColor?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: () => void;
}

export const SidebarCard = ({
  icon: Icon,
  label,
  iconColor = 'text-gray-600',
  backgroundColor = 'bg-gray-100',
  className = '',
  onClick,
}: SidebarCardProps) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-2 ${className}`}
    onClick={onClick}
  >
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full ${backgroundColor}`}
    >
      <Icon size={18} className={iconColor} strokeWidth={2} />
    </div>
    <span className='text-xs font-medium text-gray-700 leading-tight'>
      {label}
    </span>
  </div>
);
