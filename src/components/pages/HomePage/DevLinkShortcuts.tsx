/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import Link from '@components/shared/Link';
import { TEST_CLASSROOM_NAME } from '@utils/classrooms';

interface DevLinkShortcutsProps {
  visitTeachersPage: (classroom: string) => void;
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
        <Link href='#' onClick={() => visitTeachersPage(TEST_CLASSROOM_NAME)}>
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
