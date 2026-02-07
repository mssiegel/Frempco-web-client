import { Components } from '@mui/material/styles';

export const palette = {
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
  secondary: {
    dark: '#95C021',
    main: '#BFE35B',
    light: '#DDF0A8',
    600: '#95C021',
    500: '#BFE35B',
    400: '#DDF0A8',
    300: '#F8FCEE',
  },
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
};

export const typography = {
  fontFamily: 'Inter',
  h1: {
    fontSize: '60px',
    fontWeight: 400,
    lineHeight: '72px' /* 120% */,
    letterSpacing: '-1.2px',
  },
  h2: {
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: '60px' /* 125% */,
    letterSpacing: '-0.96px',
  },
  h3: {
    fontSize: '36px',
    fontWeight: 400,
    lineHeight: '44px' /* 122.222% */,
    letterSpacing: '-0.72px',
  },
  h4: {
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '38px' /* 126.667% */,
  },
  h5: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px' /* 133.333% */,
  },
  body1: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '30px' /* 150% */,
  },
  body2: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px' /* 150% */,
  },
  caption: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px' /* 142.857% */,
  },
};

export const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      textTransform: 'none',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px' /* 150% */,
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
      '&:hover': {
        boxShadow: '3px 4px 0 0 rgba(0, 0, 0, 0.15)',
      },
      '&.Mui-disabled': {
        boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: {
        backgroundColor: palette.primary['500'],
        color: palette.neutrals.white,
        '&:hover': {
          backgroundColor: palette.primary['600'],
        },
        '.Mui-focusVisible': {
          backgroundColor: palette.primary['500'],
          border: `3px solid ${palette.primary['200']}`,
          boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
        },
        '&.Mui-disabled': {
          backgroundColor: palette.primary['200'],
        },
      },
    },
    {
      props: { variant: 'outlined', color: 'primary' },
      style: {
        backgroundColor: palette.neutrals.white,
        color: palette.primary['500'],
        border: `2px solid ${palette.primary['500']}`,
        '&:hover': {
          backgroundColor: palette.primary['200'],
          border: `2px solid ${palette.primary['500']}`,
        },
        '.Mui-focusVisible': {
          backgroundColor: palette.primary['200'],
          border: `3px solid ${palette.primary['300']}`,
          boxShadow: '3px 4px 0 0 rgba(0, 0, 0, 0.15)',
        },
        '&.Mui-disabled': {
          backgroundColor: palette.neutrals.white,
          color: palette.primary['300'],
          border: `2px solid ${palette.primary['300']}`,
        },
      },
    },
  ],
};
