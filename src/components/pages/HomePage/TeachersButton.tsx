/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

function getRandomPin(len: number) {
  const min = Math.ceil(1);
  const max = Math.floor(+''.padStart(len, '9'));
  return Math.floor(Math.random() * (max - min) + min)
    .toString()
    .padStart(len, '0');
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
