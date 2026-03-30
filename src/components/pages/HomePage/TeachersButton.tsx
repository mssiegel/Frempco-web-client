import { Button } from '@mui/material';

interface TeachersButtonProps {
  visitTeachersPage: (isDevTestUser?: boolean) => void;
  fullWidth?: boolean;
}

export default function TeachersButton({
  visitTeachersPage,
  fullWidth,
}: TeachersButtonProps) {
  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        onClick={() => visitTeachersPage()}
        fullWidth={fullWidth}
      >
        Start a Game
      </Button>
    </>
  );
}
