/** @jsxImportSource @emotion/react */

import { Button, Typography } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import { useState, useRef } from 'react';

import { getClassroom } from '@utils/classrooms';
import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

export default function TeachersButton({ visitTeachersPage }) {
  const [open, setOpen] = useState(false);
  const classroomInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  function visitTeachersPageHelper() {
    const classroom = classroomInput.current.value.trim().toLowerCase();
    const classroomObj = getClassroom(classroom);
    if (!classroomObj) return window.alert(`Invalid classroom: ${classroom}`);

    const password = passwordInput.current.value;
    if (String(classroomObj.password) !== password)
      return window.alert(`IncorrectPassword: ${password}`);

    visitTeachersPage(classroom);
  }

  return (
    <>
      <Button
        variant='contained'
        size='large'
        startIcon={<SchoolIcon />}
        onClick={() => setOpen(true)}
      >
        Teachers page
      </Button>
      <BasicModal open={open} onClose={() => setOpen(false)}>
        <Typography variant='h5'>Hello teacher</Typography>

        <ModalTextField
          label='Classroom'
          refObject={classroomInput}
          autoFocus={true}
        />
        <ModalTextField
          label='Password'
          refObject={passwordInput}
          type='password'
        />

        <Button
          variant='contained'
          size='large'
          onClick={visitTeachersPageHelper}
        >
          Visit Teacher&apos;s Room
        </Button>
      </BasicModal>
      ;
    </>
  );
}
