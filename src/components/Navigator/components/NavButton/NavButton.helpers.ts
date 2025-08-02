import {
  BACKGROUND_COLORS,
  BUTTON_TEXT_COLORS,
  ICON_COLORS,
} from '@/styles/theme';

export const getButtonStyle = (
  isActive: boolean,
  isFocused: boolean = false
) => {
  const applyStyle = isActive || isFocused;

  return {
    backgroundColor: applyStyle
      ? BACKGROUND_COLORS.WHITE
      : BACKGROUND_COLORS.DEFAULT,
    color: applyStyle ? BUTTON_TEXT_COLORS.ACTIVE : BUTTON_TEXT_COLORS.DEFAULT,
    border: applyStyle
      ? 'bg-white border border-gray-200 shadow-sm'
      : 'bg-gray-50 border border-transparent',
    boxShadow: applyStyle ? 'shadow-md' : 'shadow-none',
    textColor: applyStyle
      ? BUTTON_TEXT_COLORS.ACTIVE
      : BUTTON_TEXT_COLORS.DEFAULT,
    iconColor: applyStyle ? ICON_COLORS.ACTIVE : ICON_COLORS.DEFAULT,
  };
};
