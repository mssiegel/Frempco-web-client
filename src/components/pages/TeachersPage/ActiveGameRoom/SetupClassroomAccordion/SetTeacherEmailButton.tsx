import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';
import EmailEditor from '@TeachersPage/shared/EmailEditor';

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

  async function updateTeacherEmail(emailAddress: string) {
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
        <Typography variant='h5' sx={{ mb: 1 }}>
          {"Teacher's email address"}
        </Typography>
        <EmailEditor
          email={email}
          onSave={updateTeacherEmail}
          autoFocus={true}
        />
      </BasicModal>
    </>
  );
}
