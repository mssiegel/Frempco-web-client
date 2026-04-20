import { Dispatch, SetStateAction, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Chat as ChatIcon, Group as GroupIcon } from '@mui/icons-material';
import { chunk } from 'lodash-es';
import { Socket } from 'socket.io-client';

import { getRandom } from '@utils/activities';
import { SoloChat, Student, StudentChat } from '../../types';
import UnpairedStudentItem from './UnpairedStudentItem';

interface UnpairedStudentsListProps {
  socket: Socket;
  unpairedStudents: Student[];
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  characters: string[];
}

export default function UnpairedStudentsList({
  socket,
  unpairedStudents,
  setUnpairedStudents,
  setStudentChats,
  characters,
}: UnpairedStudentsListProps) {
  useEffect(() => {
    if (socket) {
      socket.on('new student joined', (student) => {
        console.log(student);
        // Note: this component's useEffect cannot listen to socket events when unmounted.
        // For development coding the students must be active on a different browser tab than the teacher.
        setUnpairedStudents((unpaired) => [...unpaired, student]);
      });

      socket.on('unpaired student left', ({ sessionId }) => {
        setUnpairedStudents((students) =>
          students.filter((student) => student.sessionId !== sessionId),
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

    if (studentIndex !== undefined) {
      // remove the two newly paired students from unpaired list
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
          maxWidth: '550px',
          bgcolor: 'white',
          border: '1px solid black',
          p: '5px',
          pb: '15px',
        }}
      >
        <Typography variant='body1'>
          Total unpaired students: <strong>{unpairedStudents.length}</strong>
        </Typography>
        {chunk(unpairedStudents, 2).map(([student1, student2], i) => (
          <Grid
            container
            key={i}
            sx={{
              backgroundColor: `${i % 2 === 0 ? 'secondary.400' : ''}`,
              borderLeft: '1px dotted silver',
              borderRight: '1px dotted silver',
            }}
          >
            <Grid item xs={9}>
              <UnpairedStudentItem
                i={i * 2}
                student={student1}
                socket={socket}
                setUnpairedStudents={setUnpairedStudents}
                characters={characters}
                setStudentChats={setStudentChats}
                totalUnpairedStudents={unpairedStudents.length}
              />
              {student2 && (
                <UnpairedStudentItem
                  i={i * 2 + 1}
                  student={student2}
                  socket={socket}
                  setUnpairedStudents={setUnpairedStudents}
                  characters={characters}
                  setStudentChats={setStudentChats}
                  totalUnpairedStudents={unpairedStudents.length}
                />
              )}
            </Grid>

            {student2 && (
              <Grid
                item
                xs={3}
                sx={{ textAlign: 'center', alignSelf: 'center' }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => pairStudents(i * 2)}
                  sx={{
                    boxShadow: 'none',
                    marginRight: '8px',
                    '&:hover': { boxShadow: 'none' },
                  }}
                >
                  Pair up &nbsp;
                  <GroupIcon />
                </Button>
              </Grid>
            )}
          </Grid>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            startIcon={<ChatIcon />}
            onClick={() => pairStudents()}
          >
            Pair up all students
          </Button>
        </Box>
      </Box>
    </>
  );
}
