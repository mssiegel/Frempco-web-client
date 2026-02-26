/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

export default function Header(): JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        color: 'neutrals.200',
        py: '50px',
        borderBottom: '2px solid neutrals.200',
      }}
    >
      Header placeholder
    </Box>
  );
}
