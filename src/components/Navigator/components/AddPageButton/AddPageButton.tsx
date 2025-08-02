import {
  BACKGROUND_COLORS,
  BUTTON_TEXT_COLORS,
  ICON_COLORS,
} from '@/styles/theme';
import type { BaseButtonProps } from '@/types';
import { Plus } from 'lucide-react';

interface AddPageButtonProps extends BaseButtonProps {
  label?: string;
}
export const AddPageButton = ({
  label = 'Add page',
  onClick,
  className = '',
}: AddPageButtonProps) => (
  <button
    className={`flex items-center gap-1.5 py-1.5 px-2.5 h-[32px] flex-shrink-0 rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80 ${className}`}
    onClick={onClick}
    style={{
      backgroundColor: BACKGROUND_COLORS.WHITE,
      color: BUTTON_TEXT_COLORS.ACTIVE,
      border: '1px solid #E5E7EB',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Plus size={16} color={ICON_COLORS.BLACK} />
    {label}
  </button>
);
