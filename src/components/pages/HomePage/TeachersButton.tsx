/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

function getRandomPin(pinLength: number) {
  const randomPin = Math.random().toString();
  return randomPin.slice(2, pinLength + 2);
}

interface TeachersButtonProps {
  visitTeachersPage: (classroom: string) => void;
  fullWidth?: boolean;
}

export default function TeachersButton({
  visitTeachersPage,
  fullWidth,
}: TeachersButtonProps) {
  function visitTeachersPageHelper() {
    const classroom = getRandomPin(4);
    visitTeachersPage(classroom);
  }

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        onClick={visitTeachersPageHelper}
        fullWidth={fullWidth}
      >
        Start a Game
      </Button>
    </>
  );
}
