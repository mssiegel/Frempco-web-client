/** @jsxImportSource @emotion/react */

import { Button, Typography } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { useState, useRef, useCallback } from 'react';
import { throttle } from 'lodash-es';

import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

export default function StudentsButton({ visitStudentsPage }) {
  const [open, setOpen] = useState(false);
  const classroomInput = useRef<HTMLInputElement>(null);
  const studentInput = useRef<HTMLInputElement>(null);

  async function visitStudentsPageHelper() {
    const classroom = classroomInput.current.value.trim().toLowerCase();
    const student = studentInput.current.value.trim();
    await visitStudentsPage(classroom, student);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledVisitStudentsPage = useCallback(
    throttle(() => visitStudentsPageHelper(), 2000, {
      leading: true,
      trailing: false,
    }),
    [],
  );

  return (
    <>
      <Button
        variant='contained'
        size='large'
        startIcon={<LightbulbIcon />}
        onClick={() => setOpen(true)}
        sx={{height: '75px', borderRadius: '12px'}}
      >
        Student Login
      </Button>

      <BasicModal open={open} onClose={() => setOpen(false)}>
        <Typography variant='h5'>Hello student</Typography>

        <ModalTextField
          label='Classroom'
          refObject={classroomInput}
          autoFocus={true}
        />
        <ModalTextField
          label='Your Name'
          refObject={studentInput}
          maxLength={20}
        />

        <Button
          variant='contained'
          size='large'
          onClick={throttledVisitStudentsPage}
        >
          Visit Student&apos;s Room
        </Button>
      </BasicModal>
    </>
  );
}
