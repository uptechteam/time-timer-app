import { createTheme } from '@shopify/restyle';

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  customBlack: '#24282F',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    customBlack: palette.customBlack,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    digitalTimer: {
      fontFamily: 'Poppins-Bold',
      fontSize: 30,
      lineHeight: 34,
      color: 'customBlack',
    },
  },
});

export type Theme = typeof theme;
export default theme;
