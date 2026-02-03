import { createTheme } from '@mui/material/styles';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutrals: Palette['primary'];
  }
  interface PaletteOptions {
    neutrals?: PaletteOptions['primary'];
  }
  interface PaletteColor {
    white?: string;
  }
  interface SimplePaletteColorOptions {
    white?: string;
  }
}

/**
 * @description
 * This is the default MUI theme used in the app
 * Modify this to override the default theme options for MUI components
 * The styles come from our design system in Figma.
 */
const theme = createTheme({
  palette: {
    primary: {
      dark: '#070AC5',
      main: '#5B5DF9',
      light: '#9D9EFB',
      600: '#070AC5',
      500: '#5B5DF9',
      400: '#9D9EFB',
      300: '#C4C5FD',
      200: '#EBECFE',
      100: '#F8F8FF',
    },
    // secondary: {},
    neutrals: {
      dark: '#2B313B',
      main: '#4D586A',
      light: '#718098',
      contrastText: '#FFF',
      600: '#2B313B',
      500: '#4D586A',
      400: '#718098',
      300: '#A0AABA',
      200: '#D0D5DD',
      100: '#F3F4F6',
      white: '#FFF',
    },
    text: {
      primary: '#2B313B',
      secondary: '#718098',
    },
  },
  typography: {
    fontFamily: 'Inter',
    h2: {
      fontSize: 48,
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '60px' /* 125% */,
      letterSpacing: '-0.96px',
    },
  },
});

export default theme;
