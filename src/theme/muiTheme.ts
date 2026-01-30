import { createTheme } from '@mui/material/styles';

/**
 * This is the default MUI theme used in the app
 * Modify this to override the default theme options for MUI components
 */
const theme = createTheme({
  // palette: {
  //   primary: {},
  //   secondary: {},
  //   text: {},
  // },

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
