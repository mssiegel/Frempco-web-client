/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

interface HeaderProps {
  isMobile: boolean;
}

export default function Header({ isMobile }: HeaderProps): JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        color: 'neutrals.200',
        py: '24px',
        px: isMobile ? '40px' : '80px',
        borderBottom: '2px solid neutrals.200',
      }}
    >
      Header placeholder
    </Box>
  );
}
