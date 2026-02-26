/** @jsxImportSource @emotion/react */

import { Box, Button, Icon, TextField } from '@mui/material';
import { useState } from 'react';

const PIN_LENGTH = 4;
const BUTTON_HEIGHT = 72;

interface LoginFlowProps {
  pin: number | undefined;
  setPin: React.Dispatch<React.SetStateAction<number | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginFlow({
  pin,
  setPin,
  setName,
}: LoginFlowProps): JSX.Element {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [nameInput, setNameInput] = useState('');

  const submitPIN = () => {
    if (!/^\d{4}$/.test(pinInput)) {
      setPinError('A Game PIN is 4 digits');
      return;
    }

    setPinError('');
    setPin(Number(pinInput));
  };

  const inputSx = {
    width: pin === undefined ? 200 : 350,
    '& .MuiOutlinedInput-root': {
      height: BUTTON_HEIGHT,
      borderRadius: '16px',
      backgroundColor: 'neutrals.white',
      boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
      '& input': {
        p: '12px',
        color: 'neutrals.600',
        textAlign: 'center',
        fontSize: '32px',
      },
      '& fieldset': {
        border: '1px solid silver',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid silver',
      },
      '&:hover fieldset': {
        border: '1px solid silver',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'neutrals.500',
      opacity: 1,
    },
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      {pin === undefined ? (
        <TextField
          autoFocus
          placeholder='Game PIN'
          variant='outlined'
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          error={pinError !== ''}
          helperText={pinError}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: PIN_LENGTH,
          }}
          sx={inputSx}
        />
      ) : (
        <TextField
          autoFocus
          placeholder='Name'
          variant='outlined'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          inputProps={{ maxLength: 16 }}
          sx={inputSx}
        />
      )}
      <Button
        onClick={pin === undefined ? submitPIN : () => setName(nameInput)}
        sx={{
          padding: '12px',
          height: BUTTON_HEIGHT,
          borderRadius: '16px',
          backgroundColor: 'neutrals.white',
          boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
          border: '1px solid silver',
        }}
      >
        <Icon sx={{ fontSize: 32, color: 'neutrals.600' }}>
          arrow_right_alt
        </Icon>
      </Button>
    </Box>
  );
}
