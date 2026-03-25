import { Box } from '@mui/material';
import { useState } from 'react';

import CreateAGameRoom from './CreateAGameRoom';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage(): JSX.Element {
  const [isGameRoomCreated, setIsGameRoomCreated] = useState(false);
  const [characters, setCharacters] = useState<string[]>(CHARACTERS);

  return (
    <Box>
      {!isGameRoomCreated ? (
        <CreateAGameRoom
          characters={characters}
          setCharacters={setCharacters}
        />
      ) : (
        'TODO: Game room management page goes here'
      )}
    </Box>
  );
}
