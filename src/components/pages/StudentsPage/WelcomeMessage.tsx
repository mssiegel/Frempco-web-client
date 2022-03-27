/** @jsxImportSource @emotion/react */

import { Box, Typography, Link } from '@mui/material';

import unpairedMessageCSS from './WelcomeMessage.css';

export default function WelcomeMessage({ classroom, removed }) {
  return (
    <Box css={unpairedMessageCSS.unpairedMessageContainer}>
      {removed ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Your teacher has removed you from the classroom.
          </Typography>
          <Typography variant='h4'>
            Please return to the Frempco <Link href='/'>homepage</Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Welcome to your classroom: {classroom}
          </Typography>
          <Typography variant='h4'>Your teacher will pair you soon.</Typography>
        </>
      )}
    </Box>
  );
}
