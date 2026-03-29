import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import SaveCharactersAccordion from './SaveCharactersAccordion';
import SetEmailAccordion from './SetEmailAccordion';

interface CreateGameRoomProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setWasGameRoomCreated: Dispatch<SetStateAction<boolean>>;
}

export default function CreateGameRoom({
  characters,
  setCharacters,
  email,
  setEmail,
  setWasGameRoomCreated,
}: CreateGameRoomProps): JSX.Element {
  return (
    <Box sx={{ my: 3, mx: 3 }}>
      <Typography variant='h3' mb={3}>
        Host a Game Room
      </Typography>

      <SaveCharactersAccordion
        characters={characters}
        setCharacters={setCharacters}
      />

      <SetEmailAccordion email={email} setEmail={setEmail} />

      <Box mt={3}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={() => setWasGameRoomCreated(true)}
        >
          Host Game Room
        </Button>
      </Box>
    </Box>
  );
}
