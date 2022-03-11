/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListSubheader,
  TextField,
} from '@mui/material';
import { Chat as ChatIcon, PersonOutline } from '@mui/icons-material';

import { getRandom, swap } from '@utils/classrooms';
import UnpairedStudentItem from './UnpairedStudentItem';
import BasicModal from '@components/shared/Modal';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

export default function UnpairedStudentsList({
  socket,
  unpairedStudents,
  setUnpairedStudents,
}) {
  const [characters, setCharacters] = useState(CHARACTERS);
  const [openCharacterModal, setOpenCharacterModal] = useState(false);
  const handleCloseCharacterModal = () => setOpenCharacterModal(false);
  const charListRef = useRef<HTMLTextAreaElement>();

  const setCharList = () => {
    const characters = charListRef.current.value.trim().split('\n');
    const trimmedCharacters = characters
      .map((ch) => ch.trim())
      .filter((ch) => ch);
    setCharacters(trimmedCharacters);
    setOpenCharacterModal(false);
  };

  useEffect(() => {
    if (socket) {
      socket.on('new student joined', (student) => {
        console.log(student);
        // Note: this component's useEffect cannot listen to socket events when unmounted.
        // For development coding the students must be active on a different browser tab than the teacher.
        setUnpairedStudents((unpaired) => [...unpaired, student]);
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
        socket.off('unpaired student left');
      }
    };
  }, [setUnpairedStudents, socket]);

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
      student1.character = getRandom(characters) || student1.realName;
      do {
        student2.character = getRandom(characters) || student2.realName;
      } while (
        student2.character === student1.character &&
        characters.length > 1
      );
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
    <>
      <BasicModal
        open={openCharacterModal}
        handleClose={handleCloseCharacterModal}
      >
        <TextField
          label='Character List'
          multiline
          fullWidth
          rows={8}
          defaultValue={`${characters.join('\n').trim()} `}
          inputRef={charListRef}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant='contained' size='large' onClick={setCharList}>
            Save
          </Button>
        </Box>
      </BasicModal>
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
            <UnpairedStudentItem
              i={i}
              student={student}
              socket={socket}
              unpairedStudents={unpairedStudents}
              setUnpairedStudents={setUnpairedStudents}
              swapUnpairedStudent={swapUnpairedStudent}
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            size='large'
            color='success'
            sx={{ mt: 2 }}
            startIcon={<PersonOutline />}
            onClick={() => setOpenCharacterModal(true)}
          >
            Set Character List
          </Button>
        </Box>
      </List>
    </>
  );
}
