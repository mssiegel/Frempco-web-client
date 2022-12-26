/** @jsxImportSource @emotion/react */
import { Box, Grid, Typography, List, ListItem } from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getClassroom } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import DevLinkShortcuts from './DevLinkShortcuts';
import homepageCSS from './Index.css';
import ExampleChat from '../../../../public/exampleChat.png';
import ExampleOverview from '../../../../public/exampleOverview.png';

export default function HomePage() {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const socket = useContext(SocketContext);
  const { setUser } = useContext(UserContext);

  async function visitStudentsPage(classroom: string, student: string) {
    const classroomObj = getClassroom(classroom);
    if (!classroomObj) return window.alert(`Invalid classroom: ${classroom}`);
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
      {/** first page */}
      <Box color={(theme) => theme.palette.common.white}>
        <Grid container textAlign='center'>
          <Grid item md={12} p={2}>
            <Typography
              variant='h3'
              textAlign='left'
              css={homepageCSS.frempcoHeading}
            >
              Frempco
            </Typography>
          </Grid>

          <Grid
            item
            sm={12}
            md={7}
            p={2}
            my={6}
            css={homepageCSS.firstPageContainer}
          >
            <Typography variant='h4' textAlign='center' mb={3}>
              Don&apos;t just tell your students. Show them.
            </Typography>
            <Box maxWidth='700px' mx='auto'>
              <Typography fontSize='28px'>
                Improve learning outcomes by guiding students through
                educational role-play exercises
              </Typography>
            </Box>
            <Box mx='auto' my={6} display='flex' maxWidth='500px'>
              <Box mr={2}>
                <TeachersButton visitTeachersPage={visitTeachersPage} />
              </Box>
              <Box ml='auto'>
                <StudentsButton visitStudentsPage={visitStudentsPage} />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={5} p={2} textAlign='left'>
            <Box maxWidth='500px'>
              <Typography variant='h4' css={homepageCSS.subjectMatter}>
                Teach your subject matter while strengthening critical life
                skills.
              </Typography>
            </Box>
            <List
              sx={{
                listStyleType: 'disc',
                maxWidth: '450px',
                fontSize: '28px',
              }}
            >
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                Reflecting on other perspectives
              </ListItem>
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                Improving communication
              </ListItem>
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                Understanding theory in real-world contexts
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box css={homepageCSS.blankContainer}></Box>
      </Box>

      {/** second page */}
      <Box color={(theme) => theme.palette.common.white}>
        <Grid container minHeight='100vh'>
          <Grid item sm={12}>
            <Typography variant='h3' my={6} textAlign='center'>
              A fun and immersive student experience
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} mb={6} p={2}>
            <Typography variant='h3'>How it works</Typography>
            <List
              sx={{
                listStyleType: 'disc',
                fontSize: '28px',
              }}
            >
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                The teacher enters a list of role-playing names
              </ListItem>
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                Each student is placed into a one-on-one chat with a classmate
              </ListItem>
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
                Students act out their roles according to teacher-defined
                scenarios
              </ListItem>
              <ListItem sx={{ display: 'list-item', margin: '0 0 24px 24px' }}>
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
                alt='example chat'
                layout='fill'
                objectFit='contain'
              />
            </Box>
            <Box
              color={(theme) => theme.palette.common.white}
              css={homepageCSS.exampleChatText}
            >
              <Typography fontSize={24} my={2} px={6}>
                Two 10th grade students taking on the roles of characters from
                the novel,{' '}
                <Box component='span' fontStyle='italic' fontSize={24}>
                  “Lord of the Flies.”
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/** third page */}
      <Box color={(theme) => theme.palette.common.white}>
        <Typography variant='h3' my={6} textAlign='center'>
          An intuitive overview for teachers
        </Typography>
        <Box css={homepageCSS.exampleOverview}>
          <Image
            src={ExampleOverview}
            alt='example overview'
            layout='fill'
            objectFit='contain'
          />
        </Box>
        <Typography my={3} textAlign='center' fontSize={24}>
          An example of the teacher overview.
        </Typography>
      </Box>

      {/** fourth page */}
      <Box color={(theme) => theme.palette.common.white} mt={12}>
        <Box css={homepageCSS.finalTextBox}>
          <Typography my={3} fontSize={28}>
            Frempco supports the following curriculums for students aged 10-18:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              fontSize: '28px',
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
        <Box css={homepageCSS.contact}>
          <Typography fontSize={24} py={3}>
            If you have questions or would like free trial access, email Moshe
            Siegel at siegel.moshes@gmail.com
          </Typography>
        </Box>
        <Box css={homepageCSS.blankContainer}></Box>
      </Box>

      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
        <DevLinkShortcuts
          visitTeachersPage={visitTeachersPage}
          visitStudentsPage={visitStudentsPage}
        />
      )}
    </main>
  );
}
