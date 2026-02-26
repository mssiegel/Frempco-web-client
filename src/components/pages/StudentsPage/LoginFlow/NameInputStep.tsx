import { TextField } from '@mui/material';
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

  return (
    <>
      <TextField
        autoFocus
        placeholder='Name'
        variant='outlined'
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        inputProps={{ maxLength: NAME_MAX_LENGTH }}
        sx={inputSx}
      />
      <SubmitButton onClick={() => setName(nameInput)} height={buttonHeight} />
    </>
  );
}