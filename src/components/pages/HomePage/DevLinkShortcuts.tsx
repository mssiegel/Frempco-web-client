/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import { testClassroomName } from '@utils/classrooms';
import Link from '@components/shared/Link';

export default function DevLinkShortcuts({ visitStudentsPageHelper }) {
  async function testVisitStudentsPage() {
    const classroom = testClassroomName;
    const student = `Student ${Math.trunc(Math.random() * 10000).toString()}`;
    await visitStudentsPageHelper(classroom, student);
  }

  return (
    <>
      <Typography variant='h5' sx={{ m: 3, mt: 10, color: 'gray' }}>
        These link shortcuts only appear in the development environment:
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href={`/teacher/classroom/${testClassroomName}`}>
          Visit Teachers admin page
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ m: 3 }}>
        <Link href='#' onClick={testVisitStudentsPage}>
          Visit Students classroom page
        </Link>
      </Typography>
    </>
  );
}
