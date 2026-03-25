import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import CharactersEditor from './CharactersEditor';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage(): JSX.Element {
  const [characters, setCharacters] = useState<string[]>(CHARACTERS);

  return (
    <Box sx={{ mt: 3, ml: 3 }}>
      <Typography variant='h3'>Create a Gameroom</Typography>

      <CharactersEditor
        characters={characters}
        setCharacters={setCharacters}
      />
    </Box>
  );
}
