import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

interface SetTeacherEmailButtonProps {
  classroomName: string;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function SetTeacherEmailButton({
  classroomName,
  email,
  setEmail,
}: SetTeacherEmailButtonProps) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const [open, setOpen] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);

  async function updateTeacherEmail(event) {
    event.preventDefault();

    const emailAddress = emailInput.current.value.trim();

    await fetch(`${apiUrl}/classrooms/${classroomName}/email/${emailAddress}`, {
      method: 'PATCH',
    });
    setEmail(emailAddress);
    setOpen(false);
  }

  return (
    <>
      <Typography fontFamily='Lora' fontSize='20px' sx={{ mb: 1 }}>
        Email: {email}
      </Typography>
      <Button
        variant='contained'
        size='large'
        color='secondary'
        sx={{ mb: 3 }}
        startIcon={<EmailIcon />}
        onClick={() => setOpen(true)}
      >
        Set teacher email
      </Button>

      <BasicModal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={updateTeacherEmail}>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {"Teacher's email address"}
          </Typography>
          <Typography variant='subtitle1'>
            Enter your email below to get emailed all the chats from this
            classroom.
          </Typography>

          <ModalTextField
            label='Email address'
            type='email'
            refObject={emailInput}
            autoFocus={true}
            maxLength={50}
            defaultValue={email}
            required
          />
          <Button variant='contained' size='large' type='submit' sx={{ mt: 1 }}>
            Save
          </Button>
        </form>
      </BasicModal>
    </>
  );
}
