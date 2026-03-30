import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@contexts/SocketContext';
import {
  DEV_TEST_USER_QUERY_PARAM,
  TEST_CLASSROOM_NAME,
  DEV_TEST_USER_SESSION_FLAG,
  EMPTY_EMAIL,
} from '@utils/classrooms';
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
  const socket = useContext(SocketContext);
  const [gameRoomPIN, setGameRoomPIN] = useState('');
  const [characters, setCharacters] = useState(CHARACTERS);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const wasCharactersUpdated =
    JSON.stringify(characters) !== JSON.stringify(CHARACTERS);

  const create4DigitPin = (): string =>
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

  const handleCreateGameRoom = (nextGameRoomPIN = create4DigitPin()): void => {
    setGameRoomPIN(nextGameRoomPIN);
    socket.emit('activate classroom', { classroomName: nextGameRoomPIN });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDevTestUserRequested =
      new URLSearchParams(window.location.search).get(
        DEV_TEST_USER_QUERY_PARAM,
      ) === 'true';
    // Persist this flag in sessionStorage (instead of React state) so
    // Next.js Fast Refresh after local saves does not create a new dev test
    // game room. sessionStorage survives within the current tab session, so
    // we initialize only one dev test user per session.
    const hasInitializedDevTestUser =
      sessionStorage.getItem(DEV_TEST_USER_SESSION_FLAG) === 'true';

    if (isDevTestUserRequested && !hasInitializedDevTestUser) {
      handleCreateGameRoom(TEST_CLASSROOM_NAME);
      sessionStorage.setItem(DEV_TEST_USER_SESSION_FLAG, 'true');
    }
  }, []);

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
      handleCreateGameRoom={handleCreateGameRoom}
    />
  );
}
