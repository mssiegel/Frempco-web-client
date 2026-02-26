/** @jsxImportSource @emotion/react */

import { Box, Button, Icon, TextField } from '@mui/material';

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
    <Box sx={{ display: 'flex', gap: 2 }}>
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
        }}
      />
      <Button
        aria-label='Join game'
        sx={{
          padding: '12px',
          borderRadius: '16px',
          backgroundColor: 'neutrals.white',
          boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
          border: '1px solid silver',
        }}
      >
        <Icon sx={{ fontSize: 40, color: 'neutrals.600' }}>
          arrow_right_alt
        </Icon>
      </Button>
    </Box>
  );
}
