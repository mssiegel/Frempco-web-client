import { Box, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { SocketContext } from '@contexts/SocketContext';
import SubmitButton from './SubmitButton';

const NAME_MAX_LENGTH = 16;

interface NameInputStepProps {
  setName: Dispatch<SetStateAction<string>>;
  buttonHeight: number;
  inputSx: SxProps<Theme>;
  pin: string;
}

export default function NameInputStep({
  setName,
  buttonHeight,
  inputSx,
  pin,
}: NameInputStepProps): JSX.Element {
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');
  const socket = useContext(SocketContext);

  function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNameInput(value);

    if (value.trim() !== '') setNameError('');
  }

  function submitName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = nameInput.trim();

    if (trimmedName === '') {
      setNameError('Please enter your name');
      return;
    }

    setNameError('');
    setName(trimmedName);
    socket.emit('new student entered', {
      classroom: pin,
      student: trimmedName,
    });
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h1' align='center' sx={{ color: 'primary.500' }}>
          Enter Name
        </Typography>
        <Box
          component='form'
          onSubmit={submitName}
          sx={{ display: 'flex', gap: 2, mt: '32px' }}
        >
          <TextField
            autoFocus
            autoComplete='off'
            placeholder='Name'
            variant='outlined'
            value={nameInput}
            onChange={handleNameInputChange}
            error={nameError !== ''}
            helperText={nameError}
            inputProps={{ maxLength: NAME_MAX_LENGTH }}
            sx={inputSx}
          />
          <SubmitButton height={buttonHeight} />
        </Box>
      </Box>
    </>
  );
}
