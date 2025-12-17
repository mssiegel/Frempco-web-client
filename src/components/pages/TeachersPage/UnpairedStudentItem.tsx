/** @jsxImportSource @emotion/react */

import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Close as CloseIcon,
  PersonOutline as PersonOutlineIcon,
} from '@mui/icons-material';
import { Button, Box, IconButton } from '@mui/material';
import { currentTime, getRandom, swap, SOLO } from '@utils/classrooms';

export default function UnpairedStudentItem({
  i,
  student,
  socket,
  setUnpairedStudents,
  characters,
  setStudentChats,
  studentChats,
}) {
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

  function removeStudent(student) {
    const confirmation = confirm(
      `Are you sure you want to remove ${student.realName}?`,
    );
    if (confirmation) socket.emit('remove student from classroom', student);
  }

  function startSoloChat() {
    student.character = getRandom(characters);
    socket.emit(
      'solo mode: start chat',
      {
        studentSocketId: student.socketId,
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
            startTime: currentTime(),
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
      <Box sx={{ fontSize: '18px' }}>
        <IconButton
          aria-label='move up'
          size='small'
          sx={{
            color: 'green',
            ':hover': { color: 'white', bgcolor: 'green' },
          }}
          onClick={() => swapStudents(i, i - 1)}
        >
          <ArrowUpwardIcon fontSize='small' />
        </IconButton>

        <IconButton
          aria-label='move down'
          size='small'
          sx={{
            color: 'green',
            ':hover': { color: 'white', bgcolor: 'green' },
          }}
          onClick={() => swapStudents(i, i + 1)}
        >
          <ArrowDownwardIcon fontSize='small' />
        </IconButton>

        {student.realName}

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
          sx={{ marginLeft: '10px' }}
          onClick={startSoloChat}
        >
          Solo <PersonOutlineIcon />
        </Button>
      </Box>
    </>
  );
}
