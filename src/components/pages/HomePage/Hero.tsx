/** @jsxImportSource @emotion/react */

import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import RoleplayMasks from '../../../../public/roleplayMasks.png';

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
    <Grid px={1} container color='black'>
      <Grid
        item
        sm={12}
        md={6}
        textAlign='center'
        display='flex'
        justifyContent='center'
      >
        <Box>
          <Typography variant={isMobile ? 'h3' : 'h2'} mb={3}>
            Bring Learning to Life Through{' '}
            <Box component='span' color='primary.500'>
              Student Role-Play
            </Box>
          </Typography>

          <Box ref={gameButtonsRef} my={6} display='flex' gap={1}>
            <StudentsButton visitStudentsPage={visitStudentsPage} />
            <TeachersButton visitTeachersPage={visitTeachersPage} />
          </Box>
        </Box>
      </Grid>

      <Grid item sm={12} md={6}>
        <Image
          src={RoleplayMasks}
          alt='Roleplaying masks'
          priority={true}
          width={250}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Grid>
    </Grid>
  );
}
