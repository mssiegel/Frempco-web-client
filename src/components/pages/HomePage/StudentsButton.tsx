/** @jsxImportSource @emotion/react */

import { Button, Typography } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { useState, useRef, useCallback } from 'react';
import { throttle } from 'lodash-es';

import BasicModal from '@components/shared/Modal';
import ModalTextField from '@components/shared/ModalTextField';

export default function StudentsButton({ visitStudentsPageHelper }) {
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const handleCloseStudentModal = () => setOpenStudentModal(false);
  const classStudentInput = useRef<HTMLInputElement>(null);
  const studentNameInput = useRef<HTMLInputElement>(null);

  async function visitStudentsPage() {
    const classroom = classStudentInput.current.value.trim().toLowerCase();
    const student = studentNameInput.current.value.trim();
    await visitStudentsPageHelper(classroom, student);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledVisitStudentsPage = useCallback(
    throttle(() => visitStudentsPage(), 2000, {
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
        onClick={() => setOpenStudentModal(true)}
      >
        Students page
      </Button>

      <BasicModal open={openStudentModal} handleClose={handleCloseStudentModal}>
        <Typography variant='h5'>Hello student</Typography>

        <ModalTextField
          label='Classroom'
          refObject={classStudentInput}
          autoFocus={true}
        />
        <ModalTextField
          label='Your Name'
          refObject={studentNameInput}
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
