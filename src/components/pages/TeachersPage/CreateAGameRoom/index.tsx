import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import SaveCharactersAccordion from './SaveCharactersAccordion';
import SetEmailAccordion from './SetEmailAccordion';

interface CreateAGameRoomProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

export default function CreateAGameRoom({
  characters,
  setCharacters,
}: CreateAGameRoomProps): JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <Box sx={{ my: 3, mx: 3 }}>
      <Typography variant='h3' mb={3}>
        Create a Game Room
      </Typography>

      <SaveCharactersAccordion
        characters={characters}
        setCharacters={setCharacters}
      />

      <SetEmailAccordion email={email} setEmail={setEmail} />
    </Box>
  );
}
