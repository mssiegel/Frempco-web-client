/** @jsxImportSource @emotion/react */

import { Box, TextField } from '@mui/material';

const PIN_LENGTH = 4;

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
  return (
    <Box>
      <TextField
        autoFocus
        placeholder='Game PIN'
        variant='outlined'
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: PIN_LENGTH,
        }}
        sx={{
          width: 200,
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: 'neutrals.white',
            boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
            '& input': {
              p: '16px',
              color: 'neutrals.500',
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
        }}
      />
    </Box>
  );
}
