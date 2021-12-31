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
import Layout from '@components/shared/Layout';
import { SocketContext } from '@contexts/SocketContext';

interface Student {
  name: string;
  socketId: string;
}

type StudentPair = [Student, Student];

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
  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [pairedStudents, setPairedStudents] = useState<StudentPair[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('new student joined', (student) => {
        console.log(student);
        // Note: this component's useEffect cannot listen to socket events when unmounted.
        // For development coding the students must be active on a different browser tab than the teacher.
        setUnpairedStudents((unpaired) => [...unpaired, student]);
      });
    }

    return () => {
      if (socket) {
        socket.off('new student joined');
      }
    };
  });

  function activateClassroom() {
    socket.emit('activate classroom', { classroomName });
    setIsActiveClassroom(true);
  }

  function deactivateClassroom() {
    const confirmation = window.prompt(
      'Type YES to confirm you want to deactivate the classroom.',
    );
    if (confirmation?.toUpperCase() === 'YES') {
      socket.emit('deactivate classroom', { classroomName });
      setIsActiveClassroom(false);
    }
  }

  function pairStudents() {
    if (unpairedStudents.length < 2)
      return window.alert('Pairing requires at least 2 students.');
    const studentPairs = [];
    unpairedStudents.forEach((student, i) => {
      if (i % 2 !== 0) studentPairs.push([unpairedStudents[i - 1], student]);
    });

    setPairedStudents(studentPairs);
    socket.emit('pair students', { studentPairs });

    // reset unpaired students
    const isUnpairedEven = unpairedStudents.length % 2 === 0;
    const lastStudent = unpairedStudents[unpairedStudents.length - 1];
    setUnpairedStudents(isUnpairedEven ? [] : [lastStudent]);
  }

  function displayChat() {
    console.log('display chat clicked');
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
              Total unpaired students: {unpairedStudents.length}
            </ListSubheader>
          }
        >
          {unpairedStudents.map((student, i) => (
            <div key={student.name + student.socketId}>
              {i % 2 === 0 && <Divider />}
              <ListItemText inset primary={student.name} />
            </div>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              size='large'
              color='success'
              sx={{ mt: 2 }}
              startIcon={<ChatIcon />}
              onClick={pairStudents}
            >
              Pair up students
            </Button>
          </Box>
        </List>

        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            my: 5,
            bgcolor: 'background.paper',
          }}
          subheader={
            <ListSubheader component='div'>
              Total paired students: {pairedStudents.length * 2}
            </ListSubheader>
          }
        >
          {pairedStudents.map(([student1, student2], i) => (
            <div key={student1.socketId + student2.socketId}>
              <Divider />
              <ListItemText
                inset
                primary={student1.name + ' & ' + student2.name}
              />
              <ListItemText
                inset
                primary={
                  <Button size='small' onClick={displayChat}>
                    Display chat
                  </Button>
                }
              />
            </div>
          ))}
        </List>
      </main>
    </Layout>
  );
}
