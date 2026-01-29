import { createTheme } from '@mui/material/styles';

/**
 * This is the default MUI theme used in the app
 * Modify this to override the default theme options for MUI components
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#2B313B',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },
    secondary: {
      main: '#5B5DF9',
    },
    text: {
      primary: '#2B313B',
      secondary: '#718098)',
      // disabled: '#',
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
