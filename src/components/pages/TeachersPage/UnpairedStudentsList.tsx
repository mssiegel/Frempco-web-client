/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

import { getRandom, swap, Student } from '@utils/classrooms';
import unpairedStudentsCSS from './UnpairedStudentsList.css';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function UnpairedStudentsList({ socket }) {
  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('new student joined', (student) => {
        console.log(student);
        // Note: this component's useEffect cannot listen to socket events when unmounted.
        // For development coding the students must be active on a different browser tab than the teacher.
        setUnpairedStudents((unpaired) => [...unpaired, student]);
      });

      socket.on('chat ended - two students', ({ student2 }) => {
        setUnpairedStudents((unpaired) => [...unpaired, student2]);
      });

      socket.on('unpaired student left', ({ socketId }) => {
        setUnpairedStudents((students) =>
          students.filter((student) => student.socketId !== socketId),
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('new student joined');
        socket.off('chat ended - two students');
        socket.off('student left');
      }
    };
  });

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
    socket.emit('pair students', { studentPairs });

    // reset unpaired students
    const isUnpairedEven = unpairedStudents.length % 2 === 0;
    const lastStudent = unpairedStudents[unpairedStudents.length - 1];
    setUnpairedStudents(isUnpairedEven ? [] : [lastStudent]);
  }

  function swapUnpairedStudent(studentI) {
    // moves a student down in the list of unpaired students
    const unpaired = [...unpairedStudents];
    const endI = studentI + 1 === unpairedStudents.length;
    swap(unpaired, studentI, endI ? 0 : studentI + 1);

    setUnpairedStudents(unpaired);
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader>
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
            css={unpairedStudents.length > 1 && unpairedStudentsCSS.studentName}
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
  );
}
