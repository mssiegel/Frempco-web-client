import { useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

export default function SetTeacherEmailButton({
  classroomName,
  isActiveClassroom,
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  const [email, setEmail] = useState('');
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
      {isActiveClassroom && (
        <Button
          variant='contained'
          size='small'
          color='secondary'
          sx={{ my: 3 }}
          startIcon={<EmailIcon />}
          onClick={() => setOpen(true)}
        >
          Set teacher email
        </Button>
      )}

      <BasicModal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={updateTeacherEmail}>
          <Typography variant='h6' sx={{ mb: 1 }}>
            Teacher's email address
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
            Set email
          </Button>
        </form>
      </BasicModal>
    </>
  );
}
