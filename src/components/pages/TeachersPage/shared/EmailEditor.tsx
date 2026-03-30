import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';

interface SharedEmailEditorProps {
  email: string;
  onSave: (emailAddress: string) => void | Promise<void>;
  autoFocus?: boolean;
}

export default function SharedEmailEditor({
  email,
  onSave,
  autoFocus = false,
}: SharedEmailEditorProps): JSX.Element {
  async function updateTeacherEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const emailAddress = (
      formData.get('teacherEmail')?.toString() ?? ''
    ).trim();
    await onSave(emailAddress);
  }

  return (
    <Box component='form' onSubmit={updateTeacherEmail}>
      <Typography variant='body2' mb={1}>
        Provide your email to get emailed all the chats from your game room.
      </Typography>
      <TextField
        label='Email address'
        type='email'
        name='teacherEmail'
        autoFocus={autoFocus}
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
