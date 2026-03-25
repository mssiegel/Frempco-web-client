/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import Link from '@components/shared/Link';

interface DevLinkShortcutsProps {
  visitTeachersPage: () => void;
  visitStudentsPage: (isDevTestUser?: boolean) => void;
}

export default function DevLinkShortcuts({
  visitTeachersPage,
  visitStudentsPage,
}) {
  const isDevTestUser = true;

  return (
    <>
      <Typography variant='h5' sx={{ mb: 3, color: 'gray' }}>
        These link shortcuts only appear in the development environment:
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={visitTeachersPage}>
          Visit Teachers admin page
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={() => visitStudentsPage(isDevTestUser)}>
          Visit Students classroom page
        </Link>
      </Typography>
    </>
  );
}
