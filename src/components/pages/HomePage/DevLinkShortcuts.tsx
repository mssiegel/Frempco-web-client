/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import { useCallback } from 'react';
import { throttle } from 'lodash-es';
import { testClassroomName } from '@utils/classrooms';
import Link from '@components/shared/Link';

export default function DevLinkShortcuts({
  visitTeachersPageHelper,
  visitStudentsPageHelper,
}) {
  async function testVisitStudentsPage() {
    const classroom = testClassroomName;
    const student = `Student ${Math.trunc(Math.random() * 10000).toString()}`;
    await visitStudentsPageHelper(classroom, student);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledTestVisitStudentsPage = useCallback(
    throttle(() => testVisitStudentsPage(), 2000, {
      leading: true,
      trailing: false,
    }),
    [],
  );

  return (
    <>
      <Typography variant='h5' sx={{ m: 3, mt: 10, color: 'gray' }}>
        These link shortcuts only appear in the development environment:
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link
          href='#'
          onClick={() => visitTeachersPageHelper(testClassroomName)}
        >
          Visit Teachers admin page
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={throttledTestVisitStudentsPage}>
          Visit Students classroom page
        </Link>
      </Typography>
    </>
  );
}
