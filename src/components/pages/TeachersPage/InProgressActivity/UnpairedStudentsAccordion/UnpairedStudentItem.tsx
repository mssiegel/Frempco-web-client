import { Dispatch, SetStateAction } from 'react';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Close as CloseIcon,
  PersonOutline as PersonOutlineIcon,
} from '@mui/icons-material';
import { Button, Box, IconButton, Typography } from '@mui/material';
import { Socket } from 'socket.io-client';
import { getRandom, swap, SOLO } from '@utils/activities';
import { SoloChat, Student, StudentChat } from '../../types';

interface UnpairedStudentItemProps {
  i: number;
  student: Student;
  socket: Socket;
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
  characters: string[];
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  totalUnpairedStudents: number;
}

export default function UnpairedStudentItem({
  i,
  student,
  socket,
  setUnpairedStudents,
  characters,
  setStudentChats,
  totalUnpairedStudents,
}: UnpairedStudentItemProps) {
  function swapStudents(student1Index: number, student2Index: number) {
    setUnpairedStudents((unpairedStudents) => {
      const unpaired = [...unpairedStudents];
      // address edge case if the new index is the first or last student
      if (student2Index < 0) student2Index = unpaired.length - 1;
      else if (student2Index === unpaired.length) student2Index = 0;

      swap(unpaired, student1Index, student2Index);
      return unpaired;
    });
  }

  function removeStudent(student: Student) {
    const confirmation = confirm(
      `Are you sure you want to remove ${student.realName}?`,
    );
    if (confirmation) {
      socket.emit('teacher:removed-unpaired-student-from-activity', {
        sessionId: student.sessionId,
      });
    }
    setUnpairedStudents((students) =>
      students.filter((s) => s.sessionId !== student.sessionId),
    );
  }

  function startSoloChat() {
    student.character = getRandom(characters);
    socket.emit(
      'solo mode: start chat',
      {
        studentSessionId: student.sessionId,
        characterName: student.character,
      },
      ({ chatId, messages }) => {
        setStudentChats((chats) => [
          ...chats,
          {
            mode: SOLO,
            chatId,
            student,
            conversation: messages,
            isCompleted: false,
          },
        ]);
      },
    );

    // Remove the student who is now solo chatting from the unpaired list
    setUnpairedStudents((unpairedStudents) => {
      return unpairedStudents.filter((_, curStudentI) => curStudentI !== i);
    });
  }

  return (
    <>
      <Box sx={{ fontSize: '18px', display: 'flex' }}>
        <IconButton
          aria-label='remove student'
          size='small'
          sx={{
            color: 'red',
            ':hover': { color: 'white', bgcolor: '#ff0000ad' },
          }}
          onClick={() => removeStudent(student)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          sx={{
            marginLeft: '10px',
            height: '25px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
          onClick={startSoloChat}
        >
          Solo <PersonOutlineIcon />
        </Button>

        <Typography component='span' variant='body1' fontSize='18px' ml={2}>
          {student.realName}
        </Typography>

        {totalUnpairedStudents > 2 && (
          <>
            <IconButton
              aria-label='move up'
              size='small'
              sx={{
                marginLeft: 'auto',
                color: 'secondary.600',
                ':hover': { color: 'neutrals.white', bgcolor: 'secondary.600' },
              }}
              onClick={() => swapStudents(i, i - 1)}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>

            <IconButton
              aria-label='move down'
              size='small'
              sx={{
                color: 'secondary.600',
                ':hover': { color: 'neutrals.white', bgcolor: 'secondary.600' },
              }}
              onClick={() => swapStudents(i, i + 1)}
            >
              <ArrowDownwardIcon fontSize='small' />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );
}
