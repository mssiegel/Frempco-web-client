import { createTheme } from '@mui/material/styles';
import '@mui/material/styles';
import { palette, typography, MuiButton } from './themeVariables';

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
  palette,
  typography,
  components: {
    MuiButton,
  },
});

export default theme;
