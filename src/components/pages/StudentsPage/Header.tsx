/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

interface HeaderProps {
  isMobile: boolean;
  statusText: string;
}

export default function Header({
  isMobile,
  statusText,
}: HeaderProps): JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        color: 'neutrals.200',
        py: '10px',
        px: isMobile ? '40px' : '80px',
        borderBottom: '2px solid neutrals.200',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box display='flex' gap={2} alignItems='flex-end'>
        <img
          src='/StudentsPage/frempco-logo-icon.svg'
          alt='Frempco logo icon'
          style={{ height: 28, width: 'auto' }}
        />
        <img
          src='/StudentsPage/frempco-logo-text.svg'
          alt='Frempco logo text'
          style={{ height: 24, width: 'auto' }}
        />
      </Box>
      {!isMobile && statusText && (
        <Typography variant='h4' sx={{ color: 'neutrals.white' }}>
          {statusText}
        </Typography>
      )}
    </Box>
  );
}
