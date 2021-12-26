import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
} from '@mui/icons-material';

import { getAllClassroomNames } from '@utils/classrooms';
import Layout from '@components/Layout';
import { SocketContext } from '@contexts/SocketContext';

export async function getStaticPaths() {
  const paths = getAllClassroomNames();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      classroomName: params.classroomName,
    },
  };
}

export default function TeacherDashboard({ classroomName }) {
  const socket = useContext(SocketContext);

  const [isActiveClassroom, setIsActiveClassroom] = useState(false);
  const [students, setStudents] = useState([
    'Test Student',
    'Test Student2',
    'Test Student3',
    'Test Student4',
    'Test Student5',
    'Test Student6',
  ]);

  useEffect(() => {
    if (socket) {
      socket.on('new student joined', (student) => {
        // Note: this component's useEffect cannot listen to socket events when unmounted.
        // For development coding the students must be active on a different browser tab than the teacher.
        setStudents((students) => [...students, student]);
      });
    }

    return () => {
      if (socket) {
        socket.off('new student joined');
      }
    };
  });

  async function activateClassroom() {
    socket.emit('activate classroom', { classroomName });
    setIsActiveClassroom(true);
  }

  async function deactivateClassroom() {
    const confirmation = window.prompt(
      'Type YES to confirm you want to deactivate the classroom.',
    );
    if (confirmation?.toUpperCase() === 'YES') {
      socket.emit('deactivate classroom', { classroomName });
      setIsActiveClassroom(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography variant='h4' sx={{ color: 'white' }}>
          Hello teacher! Welcome to your classroom: {classroomName}
        </Typography>
        <Typography variant='h4' sx={{ color: 'white' }}>
          Your socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
        </Typography>
        {isActiveClassroom ? (
          <Button
            variant='contained'
            size='small'
            color='warning'
            sx={{ my: 3 }}
            startIcon={<PowerOffIcon />}
            onClick={deactivateClassroom}
          >
            Deactivate classroom
          </Button>
        ) : (
          <Button
            variant='contained'
            size='large'
            sx={{ my: 3 }}
            startIcon={<PowerIcon />}
            onClick={activateClassroom}
          >
            Activate classroom
          </Button>
        )}

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader component='div'>
              Total active students: {students.length}
            </ListSubheader>
          }
        >
          {students.map((student, i) => (
            <div key={i}>
              {i % 2 === 0 && <Divider />}
              <ListItemText inset primary={student} />
            </div>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              size='large'
              color='success'
              sx={{ mt: 2 }}
              startIcon={<ChatIcon />}
            >
              Pair up students
            </Button>
          </Box>
        </List>
      </main>
    </Layout>
  );
}
