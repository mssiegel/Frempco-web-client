import { Box, Typography } from '@mui/material';

interface CharacterRow {
  label: string;
  value: string;
}

interface HeaderProps {
  characterRows: CharacterRow[];
}

export default function Header({ characterRows }: HeaderProps) {

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

function CharacterRow({ label, value }: CharacterRowProps) {
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
