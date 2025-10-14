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
