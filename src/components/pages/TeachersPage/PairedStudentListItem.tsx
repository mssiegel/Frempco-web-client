/** @jsxImportSource @emotion/react */

import { useContext } from 'react';
import { Divider, Button, Box } from '@mui/material';

import { SocketContext } from '@contexts/SocketContext';
import conversationCSS from './Conversation.css';
import { SOLO } from '@utils/classrooms';

export default function PairedStudentListItem({
  studentChats,
  displayedChat,
  setDisplayedChat,
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

  function endChat(chatId, chatMode, student1, student2) {
    const endChatConfirmed = confirm(
      `Are you sure you want to end the ${
        chatMode === SOLO ? 'solo ' : ''
      }chat for ${student1.realName} & ${student2.realName}?`,
    );
    if (!endChatConfirmed) return;
    if (chatMode === SOLO) {
      socket.emit('solo mode: end chat', { chatId });
      setStudentChats((chats) =>
        chats.filter((chat) => chat.chatId !== chatId),
      );
      setUnpairedStudents((unpaired) => [...unpaired, student1]);
    } else {
      socket.emit('unpair student chat', { chatId, student1, student2 });
      setStudentChats((chats) =>
        chats.filter((chat) => chat.chatId !== chatId),
      );
      setUnpairedStudents((unpaired) => [...unpaired, student1, student2]);
    }
  }

  return (
    <>
      {/* TODO refactor: move the 'end all chats' button to the pairedStudentsList */}
      <Button
        sx={{ display: 'block', margin: '8px auto 14px auto' }}
        variant='contained'
        size='medium'
        color='warning'
        onClick={() => endAllChats()}
      >
        End all chats
      </Button>

      {studentChats.map((chat) => {
        const student1 =
          chat.mode === SOLO ? chat.student : chat.studentPair[0];
        const student2 =
          chat.mode === SOLO ? { realName: 'chatbot' } : chat.studentPair[1];

        const selected = chat.chatId === displayedChat;
        return (
          <div key={chat.chatId}>
            <Divider sx={{ borderColor: 'darkgray' }} />
            <span css={selected && conversationCSS.student1}>
              {student1.realName}
            </span>
            <span> &amp; </span>
            <span css={selected && conversationCSS.student2}>
              {student2.realName}
            </span>

            <Box sx={{ minHeight: 40 }}>
              {!selected && (
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => setDisplayedChat(chat.chatId)}
                >
                  Display chat
                </Button>
              )}

              <Button
                sx={{ marginRight: 6, float: 'right' }}
                size='small'
                color='warning'
                onClick={() =>
                  endChat(chat.chatId, chat.mode, student1, student2)
                }
              >
                {chat.mode === SOLO ? 'End solo chat' : 'End chat'}
              </Button>
            </Box>
          </div>
        );
      })}
    </>
  );
}
