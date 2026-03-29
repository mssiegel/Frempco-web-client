import { Dispatch, SetStateAction, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface EmailEditorProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onSave: () => void;
}

export default function EmailEditor({
  email,
  setEmail,
  onSave,
}: EmailEditorProps): JSX.Element {
  const emailInput = useRef<HTMLInputElement>(null);

  function updateTeacherEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailAddress = emailInput.current?.value.trim() ?? '';
    if (emailAddress !== email) setEmail(emailAddress);
    onSave();
  }

  return (
    <Box component='form' onSubmit={updateTeacherEmail}>
      <Typography variant='body2' mb={1}>
        Provide your email to get emailed all the chats from your game room.
      </Typography>
      <TextField
        label='Email address'
        type='email'
        inputRef={emailInput}
        autoFocus={false}
        inputProps={{ maxLength: 50 }}
        defaultValue={email}
        fullWidth
      />
      <Button variant='contained' color='primary' type='submit' sx={{ m: 2 }}>
        Save email
      </Button>
    </Box>
  );
}
