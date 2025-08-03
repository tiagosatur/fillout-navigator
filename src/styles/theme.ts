export const colors = {
  yellow: 'rgba(245, 157, 14, 1)',
  white: 'rgba(255, 255, 255, 1)',
  gray: {
    hundred: 'rgba(157, 164, 178, 1)', // icon color without button background
    fithteen: 'rgba(157, 164, 178, 0.15)', // Also used in icons without button background
    thirtyfive: 'rgba(157, 164, 178, 0.35)', // For button background hover
    text: 'rgba(103, 114, 137, 1)', // For button text color
  },
  red: 'rgba(239, 73, 79, 1)',
  blue: 'rgba(47, 114, 226, 1)', // Also use for button stroke
  black: 'rgba(26, 26, 26, 1)', // For default text color
};

export const BACKGROUND_COLORS = {
  WHITE: colors.white,
  DEFAULT: colors.gray.fithteen,
  HOVER: colors.gray.thirtyfive,
} as const;

export const ICON_COLORS = {
  ACTIVE: colors.yellow,
  BLACK: colors.black,
  FOCUSED: colors.yellow,
  DEFAULT: colors.gray.hundred,
} as const;

export const BUTTON_TEXT_COLORS = {
  ACTIVE: colors.black,
  DEFAULT: colors.gray.text,
} as const;
