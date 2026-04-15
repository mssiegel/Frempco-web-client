import { Box, Grid, Typography, Icon, Paper } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';

interface HowItWorksProps {
  isMobile: boolean;
}

interface StepCardProps {
  icon: string;
  text: string;
  isMobile: boolean;
}

const CARD_INFO = [
  {
    icon: 'person_add', // Name of Google Material Font Icon
    text: '1) Teacher Creates an Activity',
  },
  {
    icon: 'add_link',
    text: '2) Students Join With a Code',
  },
  {
    icon: 'social_distance',
    text: '3) Teacher Pairs up the Students',
  },
  {
    icon: 'conversation',
    text: '4) Students Chat as Characters',
  },
];

export default function HowItWorks({ isMobile }: HowItWorksProps): JSX.Element {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        py: isMobile ? 7 : 15,
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
        <Typography variant={isMobile ? 'h4' : 'h3'} align='center' pb={2}>
          How it Works
        </Typography>
        <Typography align='center' pb={isMobile ? 4 : 6}>
          From setup to engagement in under a minute
        </Typography>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {CARD_INFO.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StepCard icon={step.icon} text={step.text} isMobile={isMobile} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item md={1} />
    </Grid>
  );
}

function StepCard({ icon, text, isMobile }: StepCardProps): JSX.Element {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
        px: 2,
        my: isMobile ? 1 : 0,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'primary.100',
        backgroundColor: 'neutrals.white',
        height: '200px',
      }}
    >
      <Box
        sx={{
          width: '72px',
          height: '72px',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'primary.200',
          borderRadius: '12px',
        }}
      >
        <Icon sx={{ fontSize: 32, color: 'primary.main' }}>{icon}</Icon>
      </Box>
      <Typography>{text}</Typography>
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
