import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

interface SetTeacherEmailButtonProps {
  gameRoomPIN: string;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function SetTeacherEmailButton({
  gameRoomPIN,
  email,
  setEmail,
}: SetTeacherEmailButtonProps) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const [open, setOpen] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);

  async function updateTeacherEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailAddress = emailInput.current?.value.trim() || '';

    await fetch(`${apiUrl}/classrooms/${gameRoomPIN}/email/${emailAddress}`, {
      method: 'PATCH',
    });
    setEmail(emailAddress);
    setOpen(false);
  }

  return (
    <>
      <Typography variant='body1' sx={{ mt: 3, mb: 1 }}>
        Email: {email || 'Not set'}
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<EmailIcon />}
        onClick={() => setOpen(true)}
      >
        Set Teacher Email
      </Button>

      <BasicModal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={updateTeacherEmail}>
          <Typography variant='h5' sx={{ mb: 1 }}>
            {"Teacher's email address"}
          </Typography>
          <Typography variant='body2'>
            Provide your email to get emailed all the chats from your game room.
          </Typography>

          <ModalTextField
            label='Email address'
            type='email'
            refObject={emailInput}
            autoFocus={true}
            maxLength={50}
            defaultValue={email}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ mt: 1 }}
          >
            Save
          </Button>
        </form>
      </BasicModal>
    </>
  );
}
