/** @jsxImportSource @emotion/react */
import { Box, Grid, Typography, List, ListItem } from '@mui/material';
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
import roleplayMasks from '../../../../public/roleplayMasks.png';

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
        `Classroom not activated: ${classroom}\n Please wait for your teacher to activate your classroom and try again.`,
      );
    if (student) {
      socket.emit('new student entered', { classroom, student });
      setUser({ isLoggedIn: true, name: student });
      router.push(`/student/classroom/${classroom}`);
    }
  }

  function visitTeachersPage(classroom: string) {
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
        <Grid item sm={12} md={6} textAlign='center'>
          <Box maxWidth='700px'>
            <Typography variant='h4' mb={3}>
              The FREE Classroom roleplaying product
            </Typography>
            <Image src={roleplayMasks} alt='Roleplaying masks' width={250} />
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

        <Grid item sm={12} md={6}>
          <StudentBenefitsList />
        </Grid>
      </Grid>

      {/* Section Two */}
      {/* <Grid container color={(theme) => theme.palette.common.white}>
        <Grid item sm={12}>
          <Typography variant='h4' my={6} textAlign='center'>
            A fun and immersive student experience
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant='h4'>How it works</Typography>
          <List
            sx={{
              listStyleType: 'disc',
              fontSize: '22px',
            }}
          >
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              The teacher enters a list of role-playing names
            </ListItem>
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              Each student is placed into a one-on-one chat with a classmate
            </ListItem>
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              Students act out their roles according to teacher-defined
              scenarios
            </ListItem>
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              Once the role-play scenario concludes, students copy their chats
              and submit them for grading, just like they would an essay or
              report
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box css={homepageCSS.exampleChat}>
            <Image
              src={ExampleChat}
              alt='example chat between two students'
              fill
              sizes='100vw'
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            fontSize={20}
            my={2}
            px={6}
            color={(theme) => theme.palette.common.white}
            textAlign='center'
          >
            Two students taking on roles from History.
          </Typography>
        </Grid>
      </Grid> */}

      {/* <Box color={(theme) => theme.palette.common.white}>
        <Typography variant='h4' my={6} textAlign='center'>
          An intuitive overview for teachers
        </Typography>
        <Box css={homepageCSS.exampleOverview}>
          <Image
            src={ExampleTeacherOverview}
            alt='example overview for the teacher'
            fill
            sizes='100vw'
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography my={2} textAlign='center' fontSize={20}>
          An example of the teacher overview.
        </Typography>
      </Box> */}
      {/* 
      <Box color={(theme) => theme.palette.common.white} mt={7}>
        <Box css={homepageCSS.finalTextBox}>
          <Typography fontSize={26}>
            Frempco supports the following curriculums for students aged 10-18:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              fontSize: '26px',
            }}
          >
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              History
            </ListItem>
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              English Literature
            </ListItem>
            <ListItem sx={{ display: 'list-item', marginLeft: '24px' }}>
              Creative Writing
            </ListItem>
          </List>
        </Box>
        <Typography fontSize={24} py={4} textAlign='center'>
          To contact us, email Moshe Siegel at{' '}
          <Link
            sx={{ color: 'lightblue', textDecoration: 'none' }}
            href={
              'mailto:siegel.moshes@gmail.com?subject=Feedback%20on%20Frempco'
            }
          >
            siegel.moshes@gmail.com
          </Link>
        </Typography>
      </Box> */}
    </main>
  );
}
