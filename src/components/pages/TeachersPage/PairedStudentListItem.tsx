/** @jsxImportSource @emotion/react */

import { useContext } from 'react';
import { Divider, Button, Box } from '@mui/material';

import { SocketContext } from '@contexts/SocketContext';
import conversationCSS from './Conversation.css';

export default function PairedStudentListItem({
  studentChats,
  displayedChat,
  setDisplayedChat,
}) {
  const socket = useContext(SocketContext);

  function unpair(chatId, student1, student2) {
    const unpairConfirmed = confirm(
      `Are you sure you want to unpair ${student1.realName} & ${student2.realName}?`,
    );
    unpairConfirmed &&
      socket.emit('unpair student chat', { chatId, student1, student2 });
  }

  return (
    <>
      {studentChats.map(({ chatId, studentPair: [student1, student2] }) => {
        const selected = chatId === displayedChat;
        return (
          <div key={chatId}>
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
                  onClick={() => setDisplayedChat(chatId)}
                >
                  Display chat
                </Button>
              )}

              <Button
                sx={{ marginRight: 6, float: 'right' }}
                size='small'
                color='warning'
                onClick={() => unpair(chatId, student1, student2)}
              >
                Unpair
              </Button>
            </Box>
          </div>
        );
      })}
    </>
  );
}
