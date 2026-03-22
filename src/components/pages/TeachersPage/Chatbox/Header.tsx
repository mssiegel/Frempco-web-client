import { Box, Typography } from '@mui/material';

import { ChatParticipants } from '../types';

interface HeaderProps {
  participants: ChatParticipants;
}

export default function Header({ participants }: HeaderProps) {
  const { student1, student2 } = participants;
  const characterRows = [
    {
      label: student1.realName + ':',
      value: student1.character,
    },
    {
      label: student2?.realName ? student2.realName + ':' : '',
      value: student2?.character ?? 'chatbot',
    },
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
