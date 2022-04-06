/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, TextField, Grid } from '@mui/material';
import { Chat as ChatIcon, PersonOutline } from '@mui/icons-material';

import { getRandom } from '@utils/classrooms';
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

  function pairStudents(studentIndex?: number) {
    if (unpairedStudents.length < 2)
      return window.alert('Pairing requires at least 2 students.');
    // pair up two students at studentIndex, or pair up all students if none given
    const studentPairs = [];
    if (studentIndex !== undefined) {
      studentPairs.push([
        unpairedStudents[studentIndex],
        unpairedStudents[studentIndex + 1],
      ]);
    } else {
      unpairedStudents.forEach((student, i) => {
        if (i % 2 !== 0) studentPairs.push([unpairedStudents[i - 1], student]);
      });
    }
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

    // remove the two unpaired students
    if (studentIndex !== undefined) {
      const newUnpairedStudents = [...unpairedStudents];
      newUnpairedStudents.splice(studentIndex, 2);
      setUnpairedStudents(newUnpairedStudents);
    } else {
      // or reset all unpaired students
      const isUnpairedEven = unpairedStudents.length % 2 === 0;
      const lastStudent = unpairedStudents[unpairedStudents.length - 1];
      setUnpairedStudents(isUnpairedEven ? [] : [lastStudent]);
    }
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

      <Box
        sx={{
          maxWidth: '400px',
          bgcolor: 'white',
          border: '1px solid black',
          p: '5px',
          pb: '15px',
        }}
      >
        Total unpaired students: <strong>{unpairedStudents.length}</strong>
        {unpairedStudents
          .reduce(function (studentPairs, currentValue, currentIndex, array) {
            if (currentIndex % 2 === 0)
              studentPairs.push(array.slice(currentIndex, currentIndex + 2));
            return studentPairs;
          }, [])
          .map((pair, i) => (
            <Grid
              container
              key={i}
              sx={{
                background: `${i % 2 === 0 ? '#f8e5e0' : ''}`,
              }}
            >
              <Grid item xs={9}>
                <Box>
                  <UnpairedStudentItem
                    i={i * 2}
                    student={pair[0]}
                    socket={socket}
                    setUnpairedStudents={setUnpairedStudents}
                  />
                </Box>
                <Box>
                  {pair[1] !== undefined && (
                    <UnpairedStudentItem
                      i={i * 2 + 1}
                      student={pair[1]}
                      socket={socket}
                      setUnpairedStudents={setUnpairedStudents}
                    />
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{
                  textAlign: 'center',
                }}
              >
                {pair[1] !== undefined && (
                  <Button
                    variant='contained'
                    size='small'
                    color='success'
                    sx={{ top: '25%' }}
                    onClick={() => pairStudents(i * 2)}
                  >
                    Pair up
                  </Button>
                )}
              </Grid>
              <Divider />
            </Grid>
          ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            size='large'
            color='success'
            sx={{ mt: 2 }}
            startIcon={<ChatIcon />}
            onClick={() => pairStudents()}
          >
            Pair up all students
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
      </Box>
    </>
  );
}
