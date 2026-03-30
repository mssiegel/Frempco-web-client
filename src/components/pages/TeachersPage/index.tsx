import { useState } from 'react';

import { EMPTY_EMAIL } from '@utils/classrooms';
import CreateGameRoom from './CreateGameRoom';
import ActiveGameRoom from './ActiveGameRoom/index';

const CHARACTERS = [
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage(): JSX.Element {
  const [gameRoomPIN, setGameRoomPIN] = useState('');
  const [characters, setCharacters] = useState(CHARACTERS);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const wasCharactersUpdated =
    JSON.stringify(characters) !== JSON.stringify(CHARACTERS);

  return gameRoomPIN ? (
    <ActiveGameRoom
      gameRoomPIN={gameRoomPIN}
      characters={characters}
      setCharacters={setCharacters}
      email={email}
      setEmail={setEmail}
      wasCharactersUpdated={wasCharactersUpdated}
    />
  ) : (
    <CreateGameRoom
      characters={characters}
      setCharacters={setCharacters}
      email={email}
      setEmail={setEmail}
      setGameRoomPIN={setGameRoomPIN}
    />
  );
}
