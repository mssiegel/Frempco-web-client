import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import {
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import Head from 'next/head';
import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Link from '@components/shared/Link';
import Layout from '@components/shared/Layout';
import { getClassroom, sampleClassroomName } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from '@components/pages/TeachersPage/Chatbox';
import BasicModal from '@components/shared/Modal';

const exampleChat = {
  chatId: 'as343da11sf#as31afdsf',
  studentPair: [
    {
      socketId: '343d11sf',
      realName: 'Sam Carlome',
      character: 'Perfectionist Dentist',
    },
    {
      socketId: 'as31afsf',
      realName: 'Jessica Placard',
      character: 'Party Planner',
    },
  ],
  conversation: [
    [
      'student1',
      'Perfectionist Dentist',
      "I'm finally graduating dental school!!!",
    ],
    ['student2', 'Party Planner', 'This calls for a party!!!!!'],
    ['student1', 'Perfectionist Dentist', 'YESSS!!'],
    ['student1', 'Perfectionist Dentist', 'I am so excited!'],
    ['student2', 'Party Planner', 'I can bring party food'],
    ['student2', 'Party Planner', 'pretzels and chocolate cake'],
    ['student1', 'Perfectionist Dentist', 'NO!!'],
    ['student1', 'Perfectionist Dentist', "those aren't healthy"],
  ],
  startTime: '',
};

export default function Home() {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const socket = useContext(SocketContext);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openTeacherModal, setOpenTeacherModal] = useState(false);
  const handleCloseStudentModal = () => setOpenStudentModal(false);
  const handleCloseTeacherModal = () => setOpenTeacherModal(false);
  const classStudentInput = useRef<HTMLInputElement>(null);
  const studentNameInput = useRef<HTMLInputElement>(null);
  const classTeacherInput = useRef<HTMLInputElement>(null);
  const passTeacherInput = useRef<HTMLInputElement>(null);

  async function visitStudentsPage() {
    const classroom = classStudentInput.current.value;
    const classroomObj = getClassroom(classroom);
    if (!classroomObj) return window.alert(`Invalid classroom: ${classroom}`);
    const getResponse = await fetch(`${apiUrl}/classrooms/${classroom}`);
    const { isActive } = await getResponse.json();
    if (!isActive)
      return window.alert(
        `Classroom not activated: ${classroom}\n Please wait for your teacher to activate your classroom and try again.`,
      );
    const student = studentNameInput.current.value;
    if (student?.trim()) {
      socket.emit('new student entered', { classroom, student });
      // TODO: GET STUDENTS NAME TO SHOW ON STUDENT PAGE
      router.push(`/student/classroom/${classroom}`);
    }
  }

  function visitTeachersPage() {
    const classroom = classTeacherInput.current.value;
    const classroomObj = getClassroom(classroom);
    if (!classroomObj) return window.alert(`Invalid classroom: ${classroom}`);

    const password = passTeacherInput.current.value;
    if (String(classroomObj.password) !== password)
      return window.alert(`IncorrectPassword: ${password}`);

    // Visit teachers page
    router.push(`/teacher/classroom/${classroom}`);
  }

  return (
    <Layout>
      <Head>
        <title>Frempco</title>
        <meta
          name='description'
          content='Frempco lets teachers pair up classmates for text-based improvised chats. Students build up real-world friendships through collaboration and storytelling.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography
          variant='h1'
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          Welcome to Frempco!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ m: 5 }}>
              <Typography variant='h3' sx={{ color: 'white', mb: 1 }}>
                For Students:
              </Typography>
              <Button
                variant='contained'
                size='large'
                startIcon={<LightbulbIcon />}
                onClick={() => setOpenStudentModal(true)}
              >
                Students page
              </Button>

              <Typography variant='h3' sx={{ color: 'white', mb: 1, mt: 8 }}>
                For Teachers:
              </Typography>
              <Button
                variant='contained'
                size='large'
                startIcon={<SchoolIcon />}
                onClick={() => setOpenTeacherModal(true)}
              >
                Teachers page
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ my: 5 }}>
              <Chatbox chat={exampleChat} />
            </Box>
          </Grid>
        </Grid>

        <BasicModal
          open={openStudentModal}
          handleClose={handleCloseStudentModal}
        >
          <Typography>Hello Students!</Typography>

          {genTextField('Classroom', classStudentInput)}
          {genTextField('Your Name', studentNameInput)}

          <Button variant='contained' size='large' onClick={visitStudentsPage}>
            Join Room
          </Button>
        </BasicModal>

        <BasicModal
          open={openTeacherModal}
          handleClose={handleCloseTeacherModal}
        >
          <Typography>Hello Teachers!</Typography>

          {genTextField('Classroom', classTeacherInput)}
          {genTextField('Password', passTeacherInput, 'password')}

          <Button variant='contained' size='large' onClick={visitTeachersPage}>
            Join Room
          </Button>
        </BasicModal>

        {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
          <>
            <Typography variant='h5' sx={{ m: 3, mt: 10, color: 'gray' }}>
              These link shortcuts only appear in the development environment:
            </Typography>
            <Typography variant='h5' sx={{ m: 3 }}>
              <Link href={`/teacher/classroom/${sampleClassroomName}`}>
                Visit Teachers admin page
              </Link>
            </Typography>
            <Typography variant='h5' sx={{ m: 3 }}>
              <Link href={`/student/classroom/${sampleClassroomName}`}>
                Visit Students classroom page
              </Link>
            </Typography>
          </>
        )}
      </main>
    </Layout>
  );
}

const genTextField = (label, ref, type = 'input') => {
  return (
    <>
      <TextField
        fullWidth
        margin='normal'
        label={label}
        variant='outlined'
        type={type}
        inputRef={ref}
      />
    </>
  );
};
