/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function TeachersButton({ visitTeachersPage }) {
  function visitTeachersPageHelper() {
    const classroom = getRandomInt(1000, 9999);
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
