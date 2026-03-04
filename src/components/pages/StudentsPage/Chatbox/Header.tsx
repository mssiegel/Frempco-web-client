/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

interface HeaderProps {
  yourCharacter: string;
  peerCharacter: string;
}

export default function Header({
  yourCharacter,
  peerCharacter,
}: HeaderProps): JSX.Element {
  const characterRows = [
    { label: "You're:", value: yourCharacter },
    { label: 'With:', value: peerCharacter },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        borderRadius: '12px 12px 0 0',
        py: '10px',
        px: '16px',
      }}
    >
      {characterRows.map(({ label, value }) => (
        <CharacterRow key={label} label={label} value={value} />
      ))}
    </Box>
  );
}

interface CharacterRowProps {
  label: string;
  value: string;
}

function CharacterRow({ label, value }: CharacterRowProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Typography variant='body2' sx={{ color: 'neutrals.200' }}>
        {label}
      </Typography>
      <Typography variant='body2' sx={{ color: 'neutrals.white' }}>
        {value}
      </Typography>
    </Box>
  );
}
