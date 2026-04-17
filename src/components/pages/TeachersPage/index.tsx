import { useContext, useState } from 'react';

import { SocketContext } from '@contexts/SocketContext';
import { EMPTY_EMAIL } from '@utils/activities';
import CreateActivity from './CreateActivity';
import InProgressActivity from './InProgressActivity/index';

const CHARACTERS = [
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage(): JSX.Element {
  const socket = useContext(SocketContext);
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
    />
  );
}
