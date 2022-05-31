import { Box, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import { getClassroom } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import Chatbox from '@components/pages/TeachersPage/Chatbox';
import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import DevLinkShortcuts from './DevLinkShortcuts';

const exampleChat = {
  chatId: 'homepage sample chat',
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
      <Typography
        variant='h3'
        sx={{ color: (theme) => theme.palette.common.white }}
      >
        Welcome to Frempco!
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ m: 5 }}>
            <Typography variant='h3' sx={{ color: 'white', mb: 1 }}>
              Students:
            </Typography>
            <StudentsButton visitStudentsPage={visitStudentsPage} />

            <Typography variant='h3' sx={{ color: 'white', mb: 1, mt: 8 }}>
              Teachers:
            </Typography>
            <TeachersButton visitTeachersPage={visitTeachersPage} />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ my: 5 }}>
            <Chatbox chat={exampleChat} />
          </Box>
        </Grid>
      </Grid>

      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
        <DevLinkShortcuts
          visitTeachersPage={visitTeachersPage}
          visitStudentsPage={visitStudentsPage}
        />
      )}
    </main>
  );
}
