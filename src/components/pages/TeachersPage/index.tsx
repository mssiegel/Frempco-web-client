/** @jsxImportSource @emotion/react */

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

import { ClassroomProps, getRandom, swap } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import unpairedStudentsCSS from './UnpairedStudents.css';

interface Student {
  socketId: string;
  realName: string;
  character?: string;
}

type StudentPair = [Student, Student];

const CHARACTERS = [
  'Wealthy merchant',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function TeachersPage({ classroomName }: ClassroomProps) {
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
    // pair up any unpaired students
    const studentPairs = [];
    unpairedStudents.forEach((student, i) => {
      if (i % 2 !== 0) studentPairs.push([unpairedStudents[i - 1], student]);
    });
    // assign character names
    for (const [student1, student2] of studentPairs) {
      student1.character = getRandom(CHARACTERS);
      do {
        student2.character = getRandom(CHARACTERS);
      } while (student2.character === student1.character);
    }
    setPairedStudents((paired) => [...paired, ...studentPairs]);
    socket.emit('pair students', { studentPairs });

    // reset unpaired students
    const isUnpairedEven = unpairedStudents.length % 2 === 0;
    const lastStudent = unpairedStudents[unpairedStudents.length - 1];
    setUnpairedStudents(isUnpairedEven ? [] : [lastStudent]);
  }

  function displayChat() {
    console.log('display chat clicked');
  }

  function swapUnpairedStudent(studentI) {
    // moves a student down in the list of unpaired students
    const unpaired = [...unpairedStudents];
    const endI = studentI + 1 === unpairedStudents.length;
    swap(unpaired, studentI, endI ? 0 : studentI + 1);

    setUnpairedStudents(unpaired);
  }

  return (
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
          <div key={student.realName + student.socketId}>
            {i % 2 === 0 && <Divider />}
            <ListItemText
              inset
              primary={student.realName}
              css={
                unpairedStudents.length > 1 &&
                unpairedStudentsCSS.unpairedStudent
              }
              onClick={() => swapUnpairedStudent(i)}
            />
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
              primary={student1.realName + ' & ' + student2.realName}
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
  );
}
