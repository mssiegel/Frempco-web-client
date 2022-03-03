import { useState } from 'react';
import { Button } from '@mui/material';
import {
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
} from '@mui/icons-material';

export default function ActivateButton({ socket, classroomName }) {
  const [isActiveClassroom, setIsActiveClassroom] = useState(false);

  function activateClassroom() {
    socket.emit('activate classroom', { classroomName });
    setIsActiveClassroom(true);
  }

  function deactivateClassroom() {
    const confirmation = window.prompt(
      'Type YES to confirm you want to deactivate the classroom.',
    );
    if (confirmation?.toUpperCase() === 'YES') {
      socket.emit('deactivate classroom');
      setIsActiveClassroom(false);
    }
  }

  return isActiveClassroom ? (
    <Button
      variant='contained'
      size='small'
      color='warning'
      sx={{ my: 3 }}
      startIcon={<PowerOffIcon />}
      onClick={deactivateClassroom}
    >
      Deactivate classroom
    </Button>
  ) : (
    <Button
      variant='contained'
      size='large'
      sx={{ my: 3 }}
      startIcon={<PowerIcon />}
      onClick={activateClassroom}
    >
      Activate classroom
    </Button>
  );
}
