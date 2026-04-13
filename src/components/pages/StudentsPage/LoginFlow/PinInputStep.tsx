import { Box, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { Dispatch, SetStateAction, useState } from 'react';

import SubmitButton from './SubmitButton';

const PIN_LENGTH = 4;

interface PinInputStepProps {
  setPin: Dispatch<SetStateAction<string>>;
  buttonHeight: number;
  inputSx: SxProps<Theme>;
  isMobile: boolean;
}

export default function PinInputStep({
  setPin,
  buttonHeight,
  inputSx,
  isMobile,
}: PinInputStepProps): JSX.Element {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const isInvalidFormatForPIN = (inputPIN: string) => !/^\d{4}$/.test(inputPIN);

  async function submitPIN(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isInvalidFormatForPIN(pinInput)) {
      setPinError('An Activity PIN is 4 digits');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/activities/${pinInput}`);
      const { isActive } = await response.json();
      if (!isActive) {
        setPinError('Activity not found. Check your Activity PIN.');
        return;
      }

      setPinError('');
      setPin(pinInput);
    } catch {
      setPinError('Unable to verify Activity PIN. Please try again.');
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
          autoFocus={!isMobile}
          autoComplete='off'
          placeholder='Activity PIN'
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
