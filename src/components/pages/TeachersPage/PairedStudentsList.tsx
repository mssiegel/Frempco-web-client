import { useContext } from 'react';
import { Box, Button } from '@mui/material';

import { SocketContext } from '@contexts/SocketContext';
import { SOLO } from '@utils/classrooms';
import PairedStudentListItem from './PairedStudentListItem';

export default function PairedStudentsList({
  studentChats,
  setDisplayedChat,
  displayedChat,
  setStudentChats,
  setUnpairedStudents,
}) {
  const socket = useContext(SocketContext);

  function endAllChats() {
    const endAllChatsConfirmed = confirm(
      'Are you sure you want to end all the chats?',
    );
    if (!endAllChatsConfirmed) return;

    const newUnpairedList = [];

    for (const chat of studentChats) {
      if (chat.mode === SOLO) {
        socket.emit('solo mode: end chat', { chatId: chat.chatId });
        newUnpairedList.push(chat.student);
      } else {
        const [student1, student2] = chat.studentPair;
        socket.emit('unpair student chat', {
          chatId: chat.chatId,
          student1,
          student2,
        });
        newUnpairedList.push(student1, student2);
      }
    }
    setStudentChats([]);

    // We concat the 'newUnpairedList' to 'unpaired' in case a new student
    // joined while this function was running.
    setUnpairedStudents((unpaired) => [...unpaired, ...newUnpairedList]);
  }

  return (
    <Box
      sx={{
        maxWidth: '400px',
        bgcolor: 'white',
        border: '1px solid black',
        p: '5px',
        my: 3,
      }}
    >
      Total paired students:{' '}
      <strong>
        {studentChats.reduce(
          (total, chat) => total + (chat.mode === 'PAIRED' ? 2 : 1),
          0,
        )}
      </strong>
      <Button
        sx={{ display: 'block', margin: '8px auto 14px auto' }}
        variant='contained'
        size='medium'
        color='warning'
        onClick={() => endAllChats()}
      >
        End all chats
      </Button>
      {studentChats.map((chat) => (
        <PairedStudentListItem
          key={chat.chatId}
          chat={chat}
          displayedChat={displayedChat}
          setDisplayedChat={setDisplayedChat}
          setStudentChats={setStudentChats}
          setUnpairedStudents={setUnpairedStudents}
        />
      ))}
    </Box>
  );
}
