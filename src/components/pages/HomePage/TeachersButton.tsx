/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

function getRandomPin(pinLength: number) {
  const randomPin = Math.floor(Math.random() * Math.pow(10, pinLength));
  return randomPin.toString().padStart(pinLength, '0');
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
        startIcon={<SchoolIcon />}
        onClick={visitTeachersPageHelper}
        sx={{
          height: '75px',
          borderRadius: '12px',
          backgroundColor: 'rgb(68, 197, 68)',
        }}
      >
        Create Classroom
      </Button>
    </>
  );
}
