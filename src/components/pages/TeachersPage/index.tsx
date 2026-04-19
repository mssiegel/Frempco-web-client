import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';

import { SocketContext } from '@contexts/SocketContext';
import { EMPTY_EMAIL } from '@utils/activities';
import CreateActivity from './CreateActivity';
import InProgressActivity from './InProgressActivity/index';

const CHARACTERS = ['Batman', 'Wonder Woman', 'Spiderman'];

export default function TeachersPage(): JSX.Element {
  const socket = useContext(SocketContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activityPin, setActivityPin] = useState('');
  const [characters, setCharacters] = useState(CHARACTERS);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const wasCharactersUpdated =
    JSON.stringify(characters) !== JSON.stringify(CHARACTERS);

  const handleCreateActivity = (newActivityPin: string): void => {
    setActivityPin(newActivityPin);
    socket.emit('create activity', {
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
    />
  );
}
