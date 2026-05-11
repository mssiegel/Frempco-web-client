import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { useSocketConnection } from '@contexts/SocketContext';
import { CLIENT_EMIT_EVENTS } from '@socket/emitEvents.const';
import { EMPTY_EMAIL } from '@utils/activities';
import CreateActivity from './CreateActivity';
import InProgressActivity from './InProgressActivity/index';

const CHARACTERS = ['Batman', 'Wonder Woman', 'Spiderman'];

export default function TeachersPage(): JSX.Element {
  const { socket, connectSocket } = useSocketConnection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activityPin, setActivityPin] = useState('');
  const [characters, setCharacters] = useState(CHARACTERS);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const [wasCharactersUpdated, setWasCharactersUpdated] = useState(false);

  const handleCreateActivity = (newActivityPin: string): void => {
    setActivityPin(newActivityPin);
    connectSocket();
    socket.emit(CLIENT_EMIT_EVENTS.TEACHER_CREATE_ACTIVITY, {
      activityPin: newActivityPin,
      email,
    });
  };

  return activityPin ? (
    <InProgressActivity
      activityPin={activityPin}
      characters={characters}
      setCharacters={setCharacters}
      email={email}
      setEmail={setEmail}
      wasCharactersUpdated={wasCharactersUpdated}
    />
  ) : (
    <CreateActivity
      characters={characters}
      setCharacters={setCharacters}
      email={email}
      setEmail={setEmail}
      handleCreateActivity={handleCreateActivity}
      isMobile={isMobile}
      isCharactersSaved={wasCharactersUpdated}
      onCharactersSaved={() => setWasCharactersUpdated(true)}
    />
  );
}
