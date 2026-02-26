import { TextField } from '@mui/material';
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
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const submitPIN = () => {
    if (!/^\d{4}$/.test(pinInput)) {
      setPinError('A Game PIN is 4 digits');
      return;
    }

    setPinError('');
    setPin(Number(pinInput));
  };

  return (
    <>
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
      <SubmitButton onClick={submitPIN} height={buttonHeight} />
    </>
  );
}