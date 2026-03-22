import { Box } from '@mui/material';

import { ChatParticipants } from '../types';

const headerSx = {
  root: {
    fontStyle: 'italic',
    color: 'gray',
    mb: '5px',
  },
  student1: {
    color: 'primary.500',
  },
  student2: {
    color: 'secondary.600',
  },
};

interface HeaderProps {
  participants: ChatParticipants;
}

export default function Header({ participants }: HeaderProps) {
  const { student1, student2 } = participants;

  return (
    <Box sx={headerSx.root}>
      <Box component='span' mr={2}>
        ({student1.realName})
      </Box>
      <Box component='span' sx={headerSx.student1}>
        {student1.character}
      </Box>
      <br />
      {student2 && (
        <Box component='span' mr={2}>
          {student2.realName}
        </Box>
      )}
      <Box component='span' sx={headerSx.student2}>
        {student2 ? student2.character : 'chatbot'}
      </Box>
      <Box>------</Box>
    </Box>
  );
}