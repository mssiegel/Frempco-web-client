import { Button } from '@mui/material';
import {
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
} from '@mui/icons-material';

export default function ActivateButton({
  socket,
  classroomName,
  isActiveClassroom,
  setIsActiveClassroom,
}) {
  function activateClassroom() {
    // TODO: add a callback so it will only activate the classroom if the server responds with success
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
      sx={{ my: 3, mr: 2 }}
      startIcon={<PowerOffIcon />}
      onClick={deactivateClassroom}
    >
      Deactivate classroom
    </Button>
  ) : (
    <Button
      variant='contained'
      size='large'
      sx={{ my: 3, mr: 2 }}
      startIcon={<PowerIcon />}
      onClick={activateClassroom}
    >
      Activate classroom
    </Button>
  );
}
