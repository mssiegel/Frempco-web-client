import { Box, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useState } from 'react';
import SubmitButton from './SubmitButton';

const PIN_LENGTH = 4;

interface PinInputStepProps {
  setPin: React.Dispatch<React.SetStateAction<number | undefined>>;
  buttonHeight: number;
  inputSx: SxProps<Theme>;
}

export default function PinInputStep({
  setPin,
  buttonHeight,
  inputSx,
}: PinInputStepProps): JSX.Element {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const isInvalidFormatForPIN = (inputPIN: string) => !/^\d{4}$/.test(inputPIN);

  async function submitPIN(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isInvalidFormatForPIN(pinInput)) {
      setPinError('A Game PIN is 4 digits');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/classrooms/${pinInput}`);
      const { isActive } = await response.json();
      if (!isActive) {
        setPinError('Classroom not found. Check your Game PIN.');
        return;
      }

      setPinError('');
      setPin(Number(pinInput));
    } catch {
      setPinError('Unable to verify Game PIN. Please try again.');
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h1' align='center' sx={{ color: 'primary.500' }}>
        Frempco
      </Typography>
      <Box
        component='form'
        onSubmit={submitPIN}
        sx={{ display: 'flex', gap: 2, mt: '32px' }}
      >
        <TextField
          autoFocus
          autoComplete='off'
          placeholder='Game PIN'
          variant='outlined'
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          error={pinError !== ''}
          helperText={pinError}
          inputProps={{
            inputMode: 'numeric',
            maxLength: PIN_LENGTH,
          }}
          sx={inputSx}
        />
        <SubmitButton height={buttonHeight} />
      </Box>
    </Box>
  );
}
