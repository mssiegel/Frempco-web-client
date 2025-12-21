/** @jsxImportSource @emotion/react */
import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from '@components/shared/Link';

import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import DevLinkShortcuts from './DevLinkShortcuts';
import StudentBenefitsList from './StudentBenefitsList';
import homepageCSS from './Index.css';
import ExampleChat from '../../../../public/exampleChat.png';
import ExampleTeacherOverview from '../../../../public/exampleTeacherOverview.png';
import RoleplayMasks from '../../../../public/roleplayMasks.png';

export default function HomePage() {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const socket = useContext(SocketContext);
  const { setUser } = useContext(UserContext);

  async function visitStudentsPage(classroom: string, student: string) {
    const getResponse = await fetch(`${apiUrl}/classrooms/${classroom}`);
    const { isActive } = await getResponse.json();
    if (!isActive)
      return window.alert(
        `Classroom not found: ${classroom}\n Check that you entered the correct Classroom PIN.`,
      );
    if (student) {
      socket.emit('new student entered', { classroom, student });
      setUser({ isLoggedIn: true, name: student });
      router.push(`/student/classroom/${classroom}`);
    }
  }

  function visitTeachersPage(classroom: string) {
    socket.emit('activate classroom', { classroomName: classroom });
    setUser({ isLoggedIn: true });
    router.push(`/teacher/classroom/${classroom}`);
  }

  return (
    <main>
      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
        <DevLinkShortcuts
          visitTeachersPage={visitTeachersPage}
          visitStudentsPage={visitStudentsPage}
        />
      )}

      <Typography variant='h3' textAlign='center' mb={6} pt={2} color='black'>
        Frempco
      </Typography>

      {/* Section One */}
      <Grid px={1} container color='black'>
        <Grid
          item
          sm={12}
          md={6}
          textAlign='center'
          display='flex'
          justifyContent='center'
        >
          <Box maxWidth='700px'>
            <Typography variant='h4' mb={3}>
              The FREE Classroom roleplaying product
            </Typography>
            <Image
              src={RoleplayMasks}
              alt='Roleplaying masks'
              priority={true}
              width={250}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <Box
              my={6}
              display='flex'
              justifyContent='center'
              flexDirection='column'
              alignItems='center'
            >
              <StudentsButton visitStudentsPage={visitStudentsPage} />
              <TeachersButton visitTeachersPage={visitTeachersPage} />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          sm={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <StudentBenefitsList />
        </Grid>
      </Grid>

      {/* Section Two */}
      <Grid
        container
        px={1}
        pb={3}
        color={(theme) => theme.palette.common.black}
        sx={{ backgroundColor: '#e0dfd3' }}
      >
        <Grid item sm={12} md={6} mt={4}>
          <Box css={homepageCSS.exampleChat}>
            <Image
              src={ExampleChat}
              alt='example chat between two students'
              sizes='100vw'
              style={{
                border: '1px solid gray',
                borderRadius: '10px',
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
          <Typography
            fontSize={20}
            my={1}
            color={(theme) => theme.palette.common.black}
            textAlign='center'
          >
            Two students taking on roles from History.
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={6}
          mt={4}
          px={1}
          display='flex'
          alignItems='center'
        >
          <div>
            <Typography variant='h4' mb={3}>
              How it works:
            </Typography>
            <Typography fontSize={22} mb={2}>
              1. The teacher enters a list of roleplaying names based on
              whatever topic the class is studying.
            </Typography>
            <Typography fontSize={22} mb={2}>
              2. Each student gets assigned a name and is placed into a
              one-on-one chat with a classmate.
            </Typography>
            <Typography fontSize={22} mb={2}>
              3. Through their one-on-one conversations, students act out their
              roles.
            </Typography>
            <Typography fontSize={22} mb={2}>
              4. When finished, students copy their chats and submit them for
              grading, just like they would an essay or report.
            </Typography>
          </div>
        </Grid>
      </Grid>

      {/* Section Three */}
      <Box color={(theme) => theme.palette.common.black}>
        <Typography variant='h5' mt={6} mb={3} textAlign='center'>
          The teacher can observe all student conversations. <br />
          Example Teacher&apos;s dashboard:
        </Typography>
        <Box css={homepageCSS.exampleOverview}>
          <Image
            src={ExampleTeacherOverview}
            alt='example overview for the teacher'
            sizes='100vw'
            style={{
              border: '1px solid lightgray',
              borderRadius: '5px',
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      </Box>

      <Typography color='black' fontSize={22} pb={4} mt={7} textAlign='center'>
        Frempco is a FREE roleplaying product for classroom teachers and their
        students. <br />
        Moshe Siegel maintains Frempco and you can email him at{' '}
        <Link
          sx={{ color: 'blue', textDecoration: 'none' }}
          href={
            'mailto:siegel.moshes@gmail.com?subject=Feedback%20on%20Frempco'
          }
        >
          siegel.moshes@gmail.com
        </Link>
      </Typography>
    </main>
  );
}
