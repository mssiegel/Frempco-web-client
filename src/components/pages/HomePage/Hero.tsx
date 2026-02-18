/** @jsxImportSource @emotion/react */

import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import exampleRoleplay from '../../../../public/homepage-example-roleplay.png';

interface HeroProps {
  isMobile: boolean;
  gameButtonsRef: React.RefObject<HTMLDivElement>;
  visitStudentsPage: (classroom: string, student: string) => void;
  visitTeachersPage: (classroom: string) => void;
}

export default function Hero({
  isMobile,
  gameButtonsRef,
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
      <Grid item xs={12} md={1} />

      {/* Text content - 5 columns */}
      <Grid item xs={12} md={5}>
        <Box>
          <Typography variant={isMobile ? 'h3' : 'h2'} mb={3}>
            Bring Learning to Life Through{' '}
            <Box component='span' color='primary.500'>
              Student Role-Play
            </Box>
          </Typography>
          <Typography variant='body1' color='neutrals.400'>
            Paired conversations that help classmates step into character, think
            critically, and engage authentically. No accounts, instant setup.
            100% free.
          </Typography>

          <Box
            ref={gameButtonsRef}
            my={6}
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}
            gap={1}
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
      <Grid item xs={12} md={1} />

      {/* Image - 4 columns */}
      <Grid item xs={12} md={4}>
        <Image
          src={exampleRoleplay}
          alt='Example roleplay between two students'
          priority={true}
          style={{
            maxWidth: '320px',
            height: 'auto',
            border: '2px solid silver',
            borderRadius: '18px',
          }}
        />
      </Grid>

      {/* Right margin - 1 column */}
      <Grid item xs={12} md={1} />
    </Grid>
  );
}
