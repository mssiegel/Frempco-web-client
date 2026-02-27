import { Box, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useState } from 'react';
import SubmitButton from './SubmitButton';

const NAME_MAX_LENGTH = 16;

interface NameInputStepProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  buttonHeight: number;
  inputSx: SxProps<Theme>;
}

export default function NameInputStep({
  setName,
  buttonHeight,
  inputSx,
}: NameInputStepProps): JSX.Element {
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');

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
