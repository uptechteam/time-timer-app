import { createTheme } from '@shopify/restyle';

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  customBlack: '#24282F',
  gray: '#BDBFC1',
  gray1: '#E9EAEA',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    customBlack: palette.customBlack,
    white: palette.white,
    backgroundActive: palette.customBlack,
    backgroundInactive: palette.gray,
    borderActive: palette.customBlack,
    borderInactive: palette.gray1,
  },
  spacing: {
    s: 8,
    m: 19,
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
    controlButton: {
      fontFamily: 'Poppins-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 15,
      lineHeight: 18,
      color: 'white',
    },
  },
});

export type Theme = typeof theme;
export default theme;
