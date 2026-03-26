/** @jsxImportSource @emotion/react */

import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Icon,
  Paper,
} from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';

interface StepCardProps {
  icon: string;
  title: string;
}

const CARD_INFO = [
  {
    title: 'Teacher Creates a Game & Sets Roles',
    icon: 'person_add', // Name of Google Material Font Icon
  },
  {
    title: 'Students Join with a Simple Link',
    icon: 'add_link',
  },
  {
    title: 'Students are Assigned Roles & Paired',
    icon: 'social_distance',
  },
  {
    title: 'Learning Happens Through Conversation',
    icon: 'conversation',
  },
];

export default function HowItWorks(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      sx={{
        pt: { xs: 7, md: 15 },
        pb: { xs: 7, md: 15 },
        background: `linear-gradient(to bottom, ${theme.palette.neutrals.white}, ${theme.palette.primary[100]})`,
      }}
    >
      <Grid item md={1} />

      <Grid item xs={12} md={10}>
        {/* Decorative wave */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {waveDecoration}
        </Box>

        {/* Title and subtitle */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            sx={{
              typography: isMobile ? 'h4' : 'h3',
              textAlign: 'center',
            }}
          >
            How it Works
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
            }}
          >
            From setup to engagement in under a minute
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {CARD_INFO.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StepCard icon={step.icon} title={step.title} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item md={1} />
    </Grid>
  );
}

function StepCard({ icon, title }: StepCardProps): JSX.Element {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        my: { xs: 1, md: 0 },
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'primary.100',
        backgroundColor: 'neutrals.white',
        height: '246px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '72px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.200',
            borderRadius: '12px',
          }}
        >
          <Icon sx={{ fontSize: 32, color: 'primary.main' }}>{icon}</Icon>
        </Box>
        <Typography sx={{ maxWidth: { xs: '80%', md: '65%' } }}>
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}

// FYI - This doesnt match exactly, but the SVG can be exported from Figma.
const waveDecoration = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='231'
    height='24'
    viewBox='0 0 231 24'
    fill='none'
  >
    <path
      d='M0 12C38.66 2 57.33 2 96 12C134.66 22 153.33 22 192 12C210.66 7 220.33 7 231 12'
      stroke='#9D9EFB'
      strokeWidth='4'
      fill='none'
      strokeLinecap='round'
    />
  </svg>
);
