/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

function getRandomPin(pinLength: number) {
  const randomPin = Math.random().toString();
  return randomPin.slice(2, pinLength + 2);
}

export default function TeachersButton({ visitTeachersPage }) {
  function visitTeachersPageHelper() {
    const classroom = getRandomPin(4);
    visitTeachersPage(classroom);
  }

  return (
    <>
      <Button
        variant='contained'
        size='large'
        endIcon={<SchoolIcon />}
        onClick={visitTeachersPageHelper}
        sx={{
          height: '75px',
          borderRadius: '12px',
          backgroundColor: 'rgb(68, 197, 68)',
          maxWidth: '300px',
        }}
      >
        Teacher: Make Classroom
      </Button>
    </>
  );
}
