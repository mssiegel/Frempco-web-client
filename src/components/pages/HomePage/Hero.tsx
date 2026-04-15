import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import studentViewDesktopImage from '../../../../public/HomePage/student-view-of-a-chat-desktop.png';
import studentViewMobileImage from '../../../../public/HomePage/student-view-of-a-chat-mobile.png';

interface HeroProps {
  isMobile: boolean;
  activityButtonsRef: React.RefObject<HTMLDivElement>;
  visitStudentsPage: (isDevTestUser?: boolean) => void;
  visitTeachersPage: (isDevTestUser?: boolean) => void;
}

export default function Hero({
  isMobile,
  activityButtonsRef,
  visitStudentsPage,
  visitTeachersPage,
}: HeroProps) {
  return (
    <Grid
      container
      sx={{
        background: '#F8F8FF',
        pt: 6,
      }}
    >
      {/* Left margin - 1 column */}
      <Grid item md={1} />

      {/* Text content - 5 columns */}
      <Grid item md={5}>
        <Box>
          <Typography variant={isMobile ? 'h3' : 'h2'} mb={3}>
            Bring Learning to Life Through{' '}
            <Box component='span' color='primary.500'>
              Role Play
            </Box>
          </Typography>
          <Typography variant='body1' color='neutrals.400'>
            A <strong>classroom activity</strong> that excites both{' '}
            <strong>teachers</strong> and <strong>students</strong>. No accounts
            needed. <strong>100% free</strong>.
          </Typography>

          <Box
            ref={activityButtonsRef}
            my={6}
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}
            gap={2}
          >
            <StudentsButton
              visitStudentsPage={visitStudentsPage}
              fullWidth={isMobile}
            />
            <TeachersButton
              visitTeachersPage={visitTeachersPage}
              fullWidth={isMobile}
            />
          </Box>
        </Box>
      </Grid>

      {/* Spacing - 1 column */}
      <Grid item md={1} />

      {/* Image - 4 columns */}
      <Grid item md={4} sx={{ margin: 'auto' }}>
        <Image
          src={isMobile ? studentViewMobileImage : studentViewDesktopImage}
          alt='View of a student chatting as the ghost of Julius Caesar'
          priority={true}
          style={{
            maxWidth: '450px',
            height: 'auto',
            border: '1px solid silver',
            borderRadius: '18px',
          }}
        />
      </Grid>

      {/* Right margin - 1 column */}
      <Grid item md={1} />
    </Grid>
  );
}
