/** @jsxImportSource @emotion/react */

import { Button, Icon } from '@mui/material';
interface StudentsButtonProps {
  visitStudentsPage: (isDevTestUser?: boolean) => void;
  fullWidth?: boolean;
}

export default function StudentsButton({
  visitStudentsPage,
  fullWidth,
}: StudentsButtonProps) {
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        startIcon={<Icon sx={{ fontSize: 24 }}>play_arrow</Icon>}
        onClick={() => visitStudentsPage()}
        fullWidth={fullWidth}
      >
        Join a Game
      </Button>
    </>
  );
}
