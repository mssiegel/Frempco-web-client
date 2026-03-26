import { Dispatch, SetStateAction, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface EmailEditorProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function EmailEditor({
  email,
  setEmail,
}: EmailEditorProps): JSX.Element {
  const emailInput = useRef<HTMLInputElement>(null);

  function updateTeacherEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailAddress = emailInput.current?.value.trim() ?? '';
    if (emailAddress !== email) setEmail(emailAddress);
  }

  return (
    <Box component='form' onSubmit={updateTeacherEmail}>
      <Typography variant='body1' sx={{ mb: 1 }}>
        Email: {email || 'Not set'}
      </Typography>

      <TextField
        label='Email address'
        type='email'
        inputRef={emailInput}
        autoFocus={false}
        inputProps={{ maxLength: 50 }}
        defaultValue={email}
        required
        fullWidth
      />

      <Button variant='contained' color='primary' type='submit' sx={{ mt: 1 }}>
        Save
      </Button>
    </Box>
  );
}
