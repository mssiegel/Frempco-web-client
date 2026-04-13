import { Typography } from '@mui/material';

import Link from '@components/shared/Link';

interface DevLinkShortcutsProps {
  visitTeachersPage: (isDevTestUser?: boolean) => void;
  visitStudentsPage: (isDevTestUser?: boolean) => void;
}

export default function DevLinkShortcuts({
  visitTeachersPage,
  visitStudentsPage,
}: DevLinkShortcutsProps) {
  const isDevTestUser = true;

  return (
    <>
      <Typography variant='h5' sx={{ mb: 3, color: 'gray' }}>
        These link shortcuts only appear in the development environment:
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={() => visitTeachersPage(isDevTestUser)}>
          Visit Teachers admin page
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={() => visitStudentsPage(isDevTestUser)}>
          Visit Students activity page
        </Link>
      </Typography>
    </>
  );
}
