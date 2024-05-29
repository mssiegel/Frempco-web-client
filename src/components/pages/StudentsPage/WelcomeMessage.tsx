/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

import Link from '@components/shared/Link';
import welcomeMessageCSS from './WelcomeMessage.css';

export default function WelcomeMessage({ classroomName, removedFromClass }) {
  return (
    <Box css={welcomeMessageCSS.welcomeMessageContainer}>
      {removedFromClass ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Your teacher removed you from the classroom.
          </Typography>
          <Typography variant='h4'>
            Please return to the <Link href='/'>Homepage</Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Welcome to classroom {classroomName}.
          </Typography>
          <Typography variant='h4'>Your teacher will pair you soon.</Typography>
        </>
      )}
    </Box>
  );
}
