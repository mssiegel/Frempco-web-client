/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import { chunk } from 'lodash-es';

import { getRandom } from '@utils/classrooms';
import UnpairedStudentItem from './UnpairedStudentItem';
import SetCharacterList from './SetCharacterList';

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
        {chunk(unpairedStudents, 2).map(([student1, student2], i) => (
          <Grid
            container
            key={i}
            sx={{
              background: `${i % 2 === 0 ? '#f8e5e0' : ''}`,
            }}
          >
            <Grid item xs={9}>
              <UnpairedStudentItem
                i={i * 2}
                student={student1}
                socket={socket}
                setUnpairedStudents={setUnpairedStudents}
              />
              {student2 && (
                <UnpairedStudentItem
                  i={i * 2 + 1}
                  student={student2}
                  socket={socket}
                  setUnpairedStudents={setUnpairedStudents}
                />
              )}
            </Grid>

            {student2 && (
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Button
                  variant='contained'
                  size='small'
                  sx={{ top: '25%' }}
                  onClick={() => pairStudents(i * 2)}
                >
                  Pair up
                </Button>
              </Grid>
            )}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <SetCharacterList
            characters={characters}
            setCharacters={setCharacters}
          />
        </Box>
      </Box>
    </>
  );
}
