import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import SaveCharactersAccordion from './SaveCharactersAccordion';
import SetEmailAccordion from './SetEmailAccordion';

interface CreateGameRoomProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setGameRoomPIN: Dispatch<SetStateAction<string>>;
}

export default function CreateGameRoom({
  characters,
  setCharacters,
  email,
  setEmail,
  setGameRoomPIN,
}: CreateGameRoomProps): JSX.Element {
  const create4DigitPin = (): string =>
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

  const handleCreateGameRoom = (): void => {
    setGameRoomPIN(create4DigitPin());
  };

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

      <Typography variant='body2' sx={{ m: 1 }}>
        <strong>Characters:</strong> {characters.join(', ')}
      </Typography>

      <Typography variant='body2' sx={{ m: 1 }}>
        <strong>Email:</strong> {email || 'Not set'}
      </Typography>

      <Box mt={3}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleCreateGameRoom}
        >
          Host Game Room Now
        </Button>
      </Box>
    </Box>
  );
}
