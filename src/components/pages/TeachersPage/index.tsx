import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { ClassroomProps, EMPTY_EMAIL } from '@utils/classrooms';
import Link from '@components/shared/Link';
import CreateGameRoom from './CreateGameRoom';
import ActiveGameRoom from './ActiveGameRoom/index';

const CHARACTERS = [
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const TEN_SECONDS = 10000;
  const [isConnected, setIsConnected] = useState(true);
  const [gameRoomPIN, setGameRoomPIN] = useState(classroomName || '');
  const [characters, setCharacters] = useState(CHARACTERS);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const wasCharactersUpdated =
    JSON.stringify(characters) !== JSON.stringify(CHARACTERS);

  useEffect(() => {
    // Check if the teacher is still connected to the classroom every 10 seconds
    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(
          `${apiUrl}/classrooms/${classroomName}`,
          { method: 'GET' },
        );
        const { isActive } = await getResponse.json();
        if (!isActive) {
          setIsConnected(false);
          clearInterval(connectionCheckInterval);
        }
      } catch (error) {
        // If the request fails, assume the connection was lost
        setIsConnected(false);
        clearInterval(connectionCheckInterval);
      }
    }, TEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, []);

  if (!isConnected) {
    return (
      <Box my={10}>
        <Typography variant='h4' textAlign='center'>
          You are no longer connected to this classroom on Frempco. Return to
          the <Link href='/'>Frempco homepage</Link> and restart your classroom.
        </Typography>
      </Box>
    );
  }

  return gameRoomPIN ? (
    <ActiveGameRoom
      classroomName={gameRoomPIN}
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
